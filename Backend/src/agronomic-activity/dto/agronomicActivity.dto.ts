/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsInt, IsUUID } from 'class-validator';

export class AgronomicActivityDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsNotEmpty()
  @IsString()
  public inputs: string;

  @IsNotEmpty()
  @IsInt()
  public duration: number;

  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @IsNotEmpty()
  @IsUUID()
  public plotId: string;
}
