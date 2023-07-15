import { IsString, IsNumber, IsArray } from 'class-validator';

export class VariantDto {
  @IsNumber()
  rom: number;

  @IsNumber()
  ram: number;

  @IsNumber()
  official: number;

  @IsNumber()
  unofficial: number;
}
