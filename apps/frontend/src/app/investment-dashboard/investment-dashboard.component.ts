import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-investment-dashboard',
  templateUrl: './investment-dashboard.component.html',
  styleUrls: ['./investment-dashboard.component.css']
})
export class InvestmentDashboardComponent implements OnInit {
  portfolioData: any;
  recentTransactions: any[];
  performanceMetrics: any;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPortfolioData();
    this.fetchRecentTransactions();
    this.fetchPerformanceMetrics();
  }

  fetchPortfolioData(): void {
    this.http.get('/api/portfolio-data').subscribe(data => {
      this.portfolioData = data;
      this.loading = false;
      this.renderChart();
    });
  }

  fetchRecentTransactions(): void {
    this.http.get('/api/recent-transactions').subscribe(data => {
      this.recentTransactions = data;
    });
  }

  fetchPerformanceMetrics(): void {
    this.http.get('/api/performance-metrics').subscribe(data => {
      this.performanceMetrics = data;
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('portfolioChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.portfolioData.dates,
        datasets: [{
          label: 'Portfolio Value',
          data: this.portfolioData.values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
