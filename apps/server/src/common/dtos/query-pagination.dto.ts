import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
