import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient) { }

  getPortfolioData(): Observable<any> {
    return this.http.get('/api/portfolio-data');
  }

  getRecentTransactions(): Observable<any> {
    return this.http.get('/api/recent-transactions');
  }

  getPerformanceMetrics(): Observable<any> {
    return this.http.get('/api/performance-metrics');
  }
}
