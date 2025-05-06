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
