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
