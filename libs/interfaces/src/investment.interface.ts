export interface Investment {
  id: string;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  interestRate: number;

  calculateReturns(): number;
  calculateDuration(): number;
}

export interface PortfolioData {
  dates: string[];
  values: number[];
}

export interface RecentTransaction {
  id: string;
  date: string;
  amount: number;
  type: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
}

/**
 * Payload for creating a new investment
 */
export interface CreateInvestmentPayload {
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  interestRate: number;
}

/**
 * Shape of the API response
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/**
 * Metrics for the investment portfolio
 */
export interface PortfolioMetrics {
  totalValue: number;
  averageReturn: number;
  riskLevel: RiskLevel;
}

/**
 * Enum for risk levels
 */
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
