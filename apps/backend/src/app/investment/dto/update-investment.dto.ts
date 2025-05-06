import { IsString, IsNumber, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateInvestmentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  interestRate?: number;
}
