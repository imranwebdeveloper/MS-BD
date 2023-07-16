import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phone, PhoneDocument, Status } from '../schema/mobile';
import { MobileDto } from '../dtos/create-mobile.dto';
import { VariantDto } from '../dtos/mobile-variant.dto';
import { UtilsService } from './utils.service';
import { PaginationQuery } from 'types';
import { UpdatePhoneDto } from '../dtos/phone.dto';
import { MobileQueryDto } from '../dtos/query-pagination.dto';

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Phone.name) private mobileModel: Model<PhoneDocument>,

    private utilsService: UtilsService,
  ) {}

  // new and update code
  async getMobileById(id: string): Promise<any> {
    try {
      const data = await this.mobileModel.findById(id);
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

  // Reusable function
  async getProductByQuery(paginationQuery: MobileQueryDto) {
    try {
      let curser = {};
      const { limit = '12', page = '1', brand, status } = paginationQuery;
      if (brand) {
        curser['brand'] = { $regex: new RegExp('\\b' + brand + '\\b', 'i') };
      } else if (status) {
        curser['status'] = status;
      }

      const countCompanyPhones = await this.mobileModel.countDocuments(curser);
      const sortedCompanyPhones = await this.mobileModel
        .find(curser)
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
  async getMobileByModel(model_id: string, mobileQueryDto?: MobileQueryDto) {
    try {
      const data = await this.mobileModel.findOne({ model_id });
      if (!data) throw new NotFoundException('No Mobile List found');
      return { message: 'success', data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // new and update code

  async getMobiles() {
    try {
      const doc = await this.mobileModel
        .find({})
        .select([
          'brand',
          'model',
          'img_url',
          'variants',
          'updatedAt',
          'model_id',
        ]);
      if (!doc) throw new NotFoundException('No Mobile List found');
      return doc;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getMobilesByPriceRange(
    pageNumber: string,
    perPage: string,
    range: number[],
  ) {
    const gte = range[0];
    const lte = range[1];

    try {
      let cursor: any = {
        variants: {
          $elemMatch: {
            $or: [
              { official: { $gte: gte, $lte: lte } },
              { unofficial: { $gte: gte, $lte: lte } },
            ],
          },
        },
      };

      if (range.length === 1) {
        cursor = {
          variants: {
            $elemMatch: {
              $or: [{ official: { $gte: gte } }, { unofficial: { $gte: gte } }],
            },
          },
        };
      }

      const currentPage = Number(pageNumber) || 1;
      const limit = Number(perPage) || 12;
      const skip = limit * (currentPage - 1);
      const count = await this.mobileModel.countDocuments(cursor);
      const brands = await this.mobileModel
        .find(cursor)
        .limit(limit)
        .skip(skip)
        .sort({ updatedAt: 'desc' })
        .select([
          'brand',
          'model',
          'img_url',
          'variants',
          'updatedAt',
          'model_id',
        ]);
      return { perPage: limit, count, mobiles: brands };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async saveNewMobile(mobile: MobileDto): Promise<{ id: string }> {
    try {
      const doc = new this.mobileModel(mobile);
      await doc.save();
      return { id: doc.id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMobileByBrand(brand: string): Promise<any> {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    try {
      const doc = await this.mobileModel.find({ brandName });
      if (!doc) throw new NotFoundException('No Mobile List found');
      return doc;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMobileVariantPrices<T>(
    _id: string,
    newPrice: VariantDto[],
  ): Promise<T> {
    try {
      const updatedOptions = await this.mobileModel.updateOne(
        { _id },
        { $set: { variants: newPrice, status: Status.AVAILABLE } },
      );
      if (!updatedOptions) throw new NotFoundException('Document not found');
      return updatedOptions as T;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMobileContent<T>(_id: string, content: any): Promise<T> {
    try {
      const id = this.utilsService.verifyId(_id);
      const fieldName = Object.keys(content)[0];
      const updatedOptions = await this.mobileModel.findOneAndUpdate(
        { _id: id, [fieldName]: { $exists: true } },
        { $set: content },
        { new: true },
      );
      if (!updatedOptions) throw new NotFoundException('Document not found');
      return updatedOptions as T;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
