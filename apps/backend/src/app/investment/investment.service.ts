import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioData, RecentTransaction, PerformanceMetric } from '@libs/interfaces/src/investment.interface';
import { PortfolioEntity } from './entities/portfolio.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { MetricEntity } from './entities/metric.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(MetricEntity)
    private readonly metricRepository: Repository<MetricEntity>,
  ) {}

  async getPortfolioData(): Promise<PortfolioData> {
    const portfolioData = await this.portfolioRepository.find();
    return {
      dates: portfolioData.map(data => data.date),
      values: portfolioData.map(data => data.value),
    };
  }

  async getRecentTransactions(): Promise<RecentTransaction[]> {
    return this.transactionRepository.find({
      order: { date: 'DESC' },
      take: 10,
    });
  }

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    return this.metricRepository.find();
  }
}
