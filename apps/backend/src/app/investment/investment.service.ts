import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PortfolioData, RecentTransaction, PerformanceMetric, PortfolioMetrics, ApiResponse } from '@libs/interfaces/src/investment.interface';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PaginationDto } from './dto/pagination.dto';
import { User } from '../user/user.entity';

@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolioData(): Promise<PortfolioMetrics> {
    const portfolioData = await this.prisma.portfolio.findMany();
    const totalValue = portfolioData.reduce((acc, data) => acc + data.value, 0);
    const averageReturn = totalValue / portfolioData.length;
    const riskLevel = this.calculateRiskLevel(totalValue);

    return {
      totalValue,
      averageReturn,
      riskLevel,
    };
  }

  async getRecentTransactions(): Promise<RecentTransaction[]> {
    return this.prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 10,
    });
  }

  async getPerformanceMetrics(): Promise<PortfolioMetrics> {
    const metrics = await this.prisma.metric.findMany();
    const totalValue = metrics.reduce((acc, metric) => acc + metric.value, 0);
    const averageReturn = totalValue / metrics.length;
    const riskLevel = this.calculateRiskLevel(totalValue);

    return {
      totalValue,
      averageReturn,
      riskLevel,
    };
  }

  async createInvestment(createInvestmentDto: CreateInvestmentDto, user: User): Promise<ApiResponse<any>> {
    const investment = await this.prisma.investment.create({
      data: {
        ...createInvestmentDto,
        owner: { connect: { id: user.id } },
      },
    });
    return {
      success: true,
      data: investment,
    };
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

  private calculateRiskLevel(totalValue: number): RiskLevel {
    if (totalValue < 10000) {
      return RiskLevel.LOW;
    } else if (totalValue < 50000) {
      return RiskLevel.MEDIUM;
    } else {
      return RiskLevel.HIGH;
    }
  }
}
