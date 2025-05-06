import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { calculatePagination } from '@libs/utils/src/api.utils';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInvestmentDto: CreateInvestmentDto, @Req() req: Request) {
    return this.investmentService.createInvestment(createInvestmentDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    const { page, limit } = paginationDto;
    const { skip, take } = calculatePagination(page, limit);
    return this.investmentService.findAll({ ...paginationDto, skip, take }, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.investmentService.findOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateInvestmentDto: UpdateInvestmentDto, @Req() req: Request) {
    return this.investmentService.updateInvestment(id, updateInvestmentDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.investmentService.removeInvestment(id, req.user);
  }
}
