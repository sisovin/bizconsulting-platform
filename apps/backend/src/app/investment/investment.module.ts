import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { InvestmentEntity } from './entities/investment.entity';
import { PortfolioEntity } from './entities/portfolio.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { MetricEntity } from './entities/metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentEntity, PortfolioEntity, TransactionEntity, MetricEntity])],
  providers: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}
