import { PartialType } from '@nestjs/mapped-types';

export class CreatePhoneDto {
  releasedDate: any;
  title: string;
  brand: string;
  model: string;
  model_id: string;
  category: string;
  variants: {
    ROM: number;
    RAM: number;
    official: number;
    unofficial: number;
  }[];
  status: string;
  approved: boolean;
  img_url: string;
  content: ContentDto;
}

export class ContentDto {
  [key: string]: any;
}

export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {}
