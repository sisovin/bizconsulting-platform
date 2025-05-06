import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PortfolioData, RecentTransaction, PerformanceMetric } from '@libs/interfaces/src/investment.interface';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PaginationDto } from './dto/pagination.dto';
import { User } from '../user/user.entity';

@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolioData(): Promise<PortfolioData> {
    const portfolioData = await this.prisma.portfolio.findMany();
    return {
      dates: portfolioData.map(data => data.date),
      values: portfolioData.map(data => data.value),
    };
  }

  async getRecentTransactions(): Promise<RecentTransaction[]> {
    return this.prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 10,
    });
  }

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    return this.prisma.metric.findMany();
  }

  async createInvestment(createInvestmentDto: CreateInvestmentDto, user: User): Promise<any> {
    const investment = await this.prisma.investment.create({
      data: {
        ...createInvestmentDto,
        owner: { connect: { id: user.id } },
      },
    });
    return investment;
  }

  async findAll(paginationDto: PaginationDto, user: User): Promise<any[]> {
    const { page, limit } = paginationDto;
    const investments = await this.prisma.investment.findMany({
      where: { ownerId: user.id },
      take: limit,
      skip: (page - 1) * limit,
    });
    return investments;
  }

  async findOne(id: string, user: User): Promise<any> {
    const investment = await this.prisma.investment.findFirst({
      where: { id, ownerId: user.id },
    });
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }

  async updateInvestment(id: string, updateInvestmentDto: UpdateInvestmentDto, user: User): Promise<any> {
    const investment = await this.findOne(id, user);
    if (investment.ownerId !== user.id) {
      throw new ForbiddenException('You do not have permission to update this investment');
    }
    const updatedInvestment = await this.prisma.investment.update({
      where: { id },
      data: updateInvestmentDto,
    });
    return updatedInvestment;
  }

  async removeInvestment(id: string, user: User): Promise<void> {
    const investment = await this.findOne(id, user);
    if (investment.ownerId !== user.id) {
      throw new ForbiddenException('You do not have permission to delete this investment');
    }
    await this.prisma.investment.delete({
      where: { id },
    });
  }
}
