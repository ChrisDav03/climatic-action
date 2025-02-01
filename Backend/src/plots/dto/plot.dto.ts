/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

export class PlotDto {
  @IsNotEmpty()
  @IsNumber()
  public latitude: number;

  @IsNotEmpty()
  @IsNumber()
  public longitude: number;

  @IsNotEmpty()
  @IsNumber()
  public size: number;

  @IsNotEmpty()
  @IsString()
  public cropType: string;

  @IsNotEmpty()
  @IsUUID()
  public userId: string;
}
