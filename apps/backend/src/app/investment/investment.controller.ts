import { Controller, Get } from '@nestjs/common';
import { InvestmentService } from './investment.service';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get('portfolio-data')
  getPortfolioData() {
    return this.investmentService.getPortfolioData();
  }

  @Get('recent-transactions')
  getRecentTransactions() {
    return this.investmentService.getRecentTransactions();
  }

  @Get('performance-metrics')
  getPerformanceMetrics() {
    return this.investmentService.getPerformanceMetrics();
  }
}
