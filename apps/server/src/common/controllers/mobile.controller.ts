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
  Patch,
} from '@nestjs/common';
import { MobileDto } from '../dtos/create-mobile.dto';
import { MobileService } from '../providers/mobile.service';
import { Role } from '../constants/user-role.enum';
import { Roles } from '../decorators/roles.decorator';
import { ResType } from 'types';
import { UpperCase } from '../pipes/UpperCase.pipe';
import { UpdatePhoneDto } from '../dtos/phone.dto';
import { MobileQueryDto } from '../dtos/query-pagination.dto';

@Controller('mobiles')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get()
  async getMobiles(@Query() mobileQueryDto: MobileQueryDto) {
    console.log(mobileQueryDto);
    const data = await this.mobileService.getProductByQuery(mobileQueryDto);
    return data;
  }

  @Get(':id')
  async getMobileById(@Param('id') id: string) {
    const data = await this.mobileService.getMobileById(id);
    return data;
  }

  @Get('model/:id')
  async findOneMobileByQuery(@Param('id') id: string) {
    const data = await this.mobileService.getMobileByModel(id);
    return data;
  }

  @Roles(Role.admin)
  @Patch('update-status/:id')
  async updateMobileStatus(
    @Body() body: UpdatePhoneDto,
    @Param('id') id: string,
  ) {
    const { status, category } = body;

    const data = await this.mobileService.updateMobileById(id, {
      status,
      category,
    });
    return data;
  }

  @Roles(Role.admin)
  @Patch('update-price/:id')
  async updateMobileVariantPrices(
    @Body() body: UpdatePhoneDto,
    @Param('id') id: string,
  ) {
    const { status, variants } = body;
    const data = await this.mobileService.updateMobileById(id, {
      status,
      variants,
    });

    return data;
  }

  @Roles(Role.admin)
  @Delete(':id')
  async deleteMobileById(@Param('id') id: string) {
    const data = await this.mobileService.deleteMobileById(id);
    return data;
  }
}
