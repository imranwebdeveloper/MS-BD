import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phone, PhoneDocument, Status } from '../schema/mobile';
import { UtilsService } from './utils.service';
import { UpdatePhoneDto } from '../dtos/phone.dto';
import { MobileQueryDto } from '../dtos/query-pagination.dto';

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Phone.name) private mobileModel: Model<PhoneDocument>,
  ) {}

  async getProductByQuery(paginationQuery: MobileQueryDto) {
    try {
      let cursor = {};
      const {
        limit = '12',
        page = '1',
        brand,
        status,
        priceRange,
      } = paginationQuery;

      if (brand) {
        cursor['brand'] = { $regex: new RegExp(`\\b${brand}\\b`, 'i') };
      }

      if (status) {
        cursor['status'] = status;
      }

      if (status === 'public') {
        cursor['status'] = { $in: [Status.UPCOMING, Status.AVAILABLE] };
      }

      if (priceRange) {
        const rangeArray = priceRange.split('-').map((item) => Number(item));
        const gte = rangeArray[0];
        const lte = rangeArray[1];

        cursor['variants'] =
          rangeArray.length === 1
            ? {
                $elemMatch: {
                  $or: [
                    { official: { $gte: gte } },
                    { unofficial: { $gte: gte } },
                  ],
                },
              }
            : {
                $elemMatch: {
                  $or: [
                    { official: { $gte: gte, $lte: lte } },
                    { unofficial: { $gte: gte, $lte: lte } },
                  ],
                },
              };
      }

      const countCompanyPhones = await this.mobileModel.countDocuments(cursor);
      const sortedCompanyPhones = await this.mobileModel
        .find(cursor)
        .limit(+limit)
        .skip(+limit * (+page - 1))
        .sort({ releasedDate: 'desc' })
        .select([
          'brand',
          'model',
          'img_url',
          'variants',
          'updatedAt',
          'model_id',
          'status',
          'title',
        ]);

      return {
        message: 'success',
        data: {
          limit: +limit,
          count: +countCompanyPhones,
          mobiles: sortedCompanyPhones,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMobileById(id: string): Promise<any> {
    try {
      const data = await this.mobileModel.findById(id);
      return { message: 'success', data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMobileByModel(model_id: string, mobileQueryDto?: MobileQueryDto) {
    try {
      const data = await this.mobileModel.findOne({ model_id });
      if (!data) throw new NotFoundException('No Mobile List found');
      return { message: 'success', data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMobileById<T>(id: string, options: UpdatePhoneDto): Promise<T> {
    try {
      const updatedOptions = await this.mobileModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...options } },
        { new: true },
      );
      return { message: 'success', data: updatedOptions } as T;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteMobileById(_id: string) {
    try {
      const deleteOptions = await this.mobileModel.findOneAndDelete({ _id });
      return { message: 'success', data: { id: deleteOptions.id } };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
