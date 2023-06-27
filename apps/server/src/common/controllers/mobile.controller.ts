import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { MobileDto } from '../dtos/create-mobile.dto';
import { VariantUpdateDto } from '../dtos/mobile-variant.dto';
import { MobileService } from '../providers/mobile.service';
import { Role } from '../constants/user-role.enum';
import { Roles } from '../decorators/roles.decorator';
import { ResType, UpdateWriteOpResult } from 'types';
import { UpperCase } from '../pipes/UpperCase.pipe';

@Controller('mobiles')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get()
  async getMobiles(): Promise<ResType<any>> {
    const data = await this.mobileService.getMobiles();
    return { message: 'success', data };
  }

  @Get('status')
  async getMobilesByStatus(
    @Query('filter', UpperCase) status: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log(status);
    const { count, mobiles, perPage } =
      await this.mobileService.getMobilesByStatus({
        data: status,
        page,
        limit,
      });
    return {
      message: 'success',
      data: { count, mobiles, perPage },
    };
  }

  @Get('latest')
  async getLatestMobiles(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResType<any>> {
    const { count, latestMobiles, perPage } =
      await this.mobileService.getLatestMobiles(page, limit);
    return {
      message: 'success',
      data: { count, mobiles: latestMobiles, perPage },
    };
  }
  @Get('all')
  async getUnapprovedMobiles(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filter') filter: string,
  ): Promise<ResType<any>> {
    const { count, latestMobiles, perPage } =
      await this.mobileService.getAllMobiles(page, limit);
    return {
      message: 'success',
      data: { count, mobiles: latestMobiles, perPage },
    };
  }

  @Put('approve/:id')
  async approvedMobiles(@Param('id') id: string): Promise<ResType<any>> {
    const data = await this.mobileService.approveMobiles(id);
    return {
      message: 'success',
      data: data,
    };
  }

  @Get('brand/:name')
  async getMobilesByBrandsName(
    @Param('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<ResType<any>> {
    const data = await this.mobileService.getMobilesByBrandName(
      name,
      page,
      limit,
    );
    return { message: 'success', data };
  }
  @Get('category/:slug')
  async getMobilesByCategory(
    @Param('slug') slug: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<ResType<any>> {
    const { count, mobiles, perPage } =
      await this.mobileService.getMobilesByCategory(slug, page, limit);
    return {
      message: 'success',
      data: { count, mobiles: mobiles, perPage },
    };
  }
  @Get('price/:range')
  async getMobilesByPriceRange(
    @Param('range') range: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<ResType<any>> {
    const rangeArray = range.split('-').map((item) => Number(item));
    console.log(rangeArray);
    const { count, mobiles, perPage } =
      await this.mobileService.getMobilesByPriceRange(page, limit, rangeArray);
    return {
      message: 'success',
      data: { count, mobiles: mobiles, perPage },
    };
  }

  @Get(':id')
  async getMobileById(@Param('id') id: string): Promise<ResType<MobileDto>> {
    const mobile = await this.mobileService.getMobileById(id);
    return { message: 'success', data: mobile };
  }

  @Get('model/:name')
  async getMobileByModelId(
    @Param('name') name: string,
  ): Promise<ResType<MobileDto>> {
    const data = await this.mobileService.getMobileByModelId(name);
    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Post('new-mobile')
  async addNewMobile(@Body() mobileDto: MobileDto): Promise<ResType<any>> {
    const model_id = `${mobileDto.brandName}-${mobileDto.model
      .split(' ')
      .join('-')}`.toLowerCase();
    const category = mobileDto.category.split(' ').join('-').toLowerCase();
    const data = await this.mobileService.saveNewMobile({
      ...mobileDto,
      model_id,
      category,
    });
    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Put('update-price')
  async updateMobileVariantPrices(
    @Body() body: VariantUpdateDto,
  ): Promise<ResType<UpdateWriteOpResult>> {
    const { id, variants } = body;
    const data =
      await this.mobileService.updateMobileVariantPrices<UpdateWriteOpResult>(
        id,
        variants,
      );
    return { message: 'success', data: data };
  }

  @Roles(Role.admin)
  @Put('update-content')
  async updateMobileContent(@Body() body: any): Promise<ResType<MobileDto>> {
    const { id, content } = body;

    const data = await this.mobileService.updateMobileContent<MobileDto>(
      id,
      content,
    );

    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Delete(':id')
  async deleteMobileById(
    @Param('id') id: string,
  ): Promise<ResType<{ id: string }>> {
    const data = await this.mobileService.deleteMobileById(id);
    return { message: 'success', data };
  }
}
