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

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Phone.name) private mobileModel: Model<PhoneDocument>,

    private utilsService: UtilsService,
  ) {}

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

  async getMobilesByStatus(query: PaginationQuery<string>) {
    const currentPage = Number(query.page) || 1;
    const limit = Number(query.limit) || 12;
    const skip = limit * (currentPage - 1);
    const count = await this.mobileModel.count();

    const latestMobiles = await this.mobileModel
      .find({ status: query.data })
      .limit(limit)
      .skip(skip)
      .sort({ releasedDate: 'desc' })
      .select([
        'brand',
        'model',
        'img_url',
        'variants',
        'updatedAt',
        'model_id',
        'status',
      ]);
    return { perPage: limit, count, mobiles: latestMobiles };
  }

  async getLatestMobiles(pageNumber?: number, perPage?: number) {
    const currentPage = Number(pageNumber) || 1;
    const limit = Number(perPage) || 12;
    const skip = limit * (currentPage - 1);
    const count = await this.mobileModel.count();
    const latestMobiles = await this.mobileModel
      .find({})
      .limit(limit)
      .skip(skip)
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
    return { perPage: limit, count, latestMobiles };
  }
  async getAllMobiles(pageNumber?: number, perPage?: number, status?: string) {
    const currentPage = Number(pageNumber) || 1;
    const limit = Number(perPage) || 12;
    const skip = limit * (currentPage - 1);
    const count = await this.mobileModel.count();
    const cursor = status ? { status } : {};
    console.log(cursor);
    const latestMobiles = await this.mobileModel
      .find(cursor)
      .limit(limit)
      .skip(skip)
      .sort({ releasedDate: 'desc' })
      .select([
        'brand',
        'model',
        'img_url',
        'variants',
        'updatedAt',
        'model_id',
        'status',
      ]);
    return { perPage: limit, count, latestMobiles };
  }

  async approveMobiles(id: string) {
    const updatedOptions = await this.mobileModel.updateOne(
      { _id: id },
      { $set: { status: Status.UPCOMING } },
    );
    return updatedOptions;
  }

  async getMobilesByCategory(
    category: string,
    pageNumber: string,
    perPage: string,
  ) {
    try {
      const curser = {
        category: { $regex: new RegExp('\\b' + category + '\\b', 'i') },
      };

      const currentPage = Number(pageNumber) || 1;
      const limit = Number(perPage) || 12;
      const skip = limit * (currentPage - 1);
      const count = await this.mobileModel.countDocuments(curser);
      const brands = await this.mobileModel
        .find(curser)
        .limit(limit)
        .skip(skip)
        .sort({ releasedDate: 'desc' })
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

  async getMobileById(id: string): Promise<any> {
    try {
      const document = await this.mobileModel.findById(id);
      if (!document) throw new NotFoundException('Mobile not found');
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getMobileByModelId(model: string): Promise<any> {
    try {
      const document = await this.mobileModel.findOne({ model_id: model });
      if (!document) throw new NotFoundException('Mobile not found');
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
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

  async getMobilesByBrandName(
    name: string,
    pageNumber: string,
    perPage: string,
  ) {
    try {
      const curser = {
        brand: { $regex: new RegExp('\\b' + name + '\\b', 'i') },
      };
      const currentPage = Number(pageNumber) || 1;
      const limit = Number(perPage) || 12;
      const skip = limit * (currentPage - 1);
      const count = await this.mobileModel.countDocuments(curser);
      const brands = await this.mobileModel
        .find(curser)
        .limit(limit)
        .skip(skip)
        .sort({ releasedDate: 'desc' })
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
      const id = this.utilsService.verifyId(_id);
      const updatedOptions = await this.mobileModel.updateOne(
        { _id: id },
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
  async deleteMobileById(_id: string): Promise<{ id: string }> {
    try {
      const id = this.utilsService.verifyId(_id);
      const deleteOptions = await this.mobileModel.findOneAndDelete({
        _id: id,
      });
      if (!deleteOptions) throw new NotFoundException('Document not found');
      return { id: deleteOptions.id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
