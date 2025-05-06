import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';

@Module({
  imports: [PrismaModule],
  providers: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}
