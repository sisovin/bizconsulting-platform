import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioData, RecentTransaction, PerformanceMetric } from '@libs/interfaces/src/investment.interface';
import { PortfolioEntity } from './entities/portfolio.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { MetricEntity } from './entities/metric.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PaginationDto } from './dto/pagination.dto';
import { InvestmentEntity } from './entities/investment.entity';
import { User } from '../user/user.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(MetricEntity)
    private readonly metricRepository: Repository<MetricEntity>,
    @InjectRepository(InvestmentEntity)
    private readonly investmentRepository: Repository<InvestmentEntity>,
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

  async createInvestment(createInvestmentDto: CreateInvestmentDto, user: User): Promise<InvestmentEntity> {
    const investment = this.investmentRepository.create({ ...createInvestmentDto, owner: user });
    return this.investmentRepository.save(investment);
  }

  async findAll(paginationDto: PaginationDto, user: User): Promise<InvestmentEntity[]> {
    const { page, limit } = paginationDto;
    const [result, total] = await this.investmentRepository.findAndCount({
      where: { owner: user },
      take: limit,
      skip: (page - 1) * limit,
    });
    return result;
  }

  async findOne(id: string, user: User): Promise<InvestmentEntity> {
    const investment = await this.investmentRepository.findOne({ where: { id, owner: user } });
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }

  async updateInvestment(id: string, updateInvestmentDto: UpdateInvestmentDto, user: User): Promise<InvestmentEntity> {
    const investment = await this.findOne(id, user);
    if (investment.owner.id !== user.id) {
      throw new ForbiddenException('You do not have permission to update this investment');
    }
    Object.assign(investment, updateInvestmentDto);
    return this.investmentRepository.save(investment);
  }

  async removeInvestment(id: string, user: User): Promise<void> {
    const investment = await this.findOne(id, user);
    if (investment.owner.id !== user.id) {
      throw new ForbiddenException('You do not have permission to delete this investment');
    }
    await this.investmentRepository.remove(investment);
  }
}
