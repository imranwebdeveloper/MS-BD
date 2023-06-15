import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export enum Status {
  UPCOMING = 'UPCOMING',
  AVAILABLE = 'AVAILABLE',
  UNAPPROVED = 'UNAPPROVED',
}

export type PhoneDocument = Phone & Document;

@Schema({ timestamps: true })
export class Phone {
  @Prop()
  releasedDate: Date;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true, unique: true })
  model_id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  variants: {
    ROM: number;
    RAM: number;
    official: number;
    unofficial: number;
  }[];

  @Prop({ required: true, enum: Status })
  status: Status.UNAPPROVED;

  @Prop({ required: true })
  approved: boolean;

  @Prop({ required: true })
  img_url: string;

  @Prop({ required: true, type: Object })
  content: {
    [key: string]: any;
  };
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
