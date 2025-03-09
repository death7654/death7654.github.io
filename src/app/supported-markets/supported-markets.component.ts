/* eslint-disable @typescript-eslint/no-require-imports */
import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supported-markets',
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [
    NavbarComponent,
    BaseChartDirective,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './supported-markets.component.html',
  styleUrl: './supported-markets.component.scss',
})
export class SupportedMarketsComponent {
  constructor(private http: HttpClient) {}

  https_data: any;
  data = [
    {
      name: 'Google',
      market_name: 'GOOG',
      image: '../../assets/icons/google.svg',
    },
    {
      name: 'Apple',
      market_name: 'AAPL',
      image: '../../assets/icons/apple.svg',
    },
    {
      name: 'Microsoft',
      market_name: 'MSFT',
      image: '../../assets/icons/microsoft.svg',
    },
    {
      name: 'Meta',
      market_name: 'META',
      image: '../../assets/icons/meta.svg',
    },
    {
      name: 'Tesla',
      market_name: 'TSLA',
      image: '../../assets/icons/tesla.svg',
    },
    {
      name: 'Twitter',
      market_name: 'TWTR',
      image: '../../assets/icons/twitter.svg',
    },
    {
      name: 'Nvidia',
      market_name: 'NVDA',
      image: '../../assets/icons/nvidia.svg',
    },
    {
      name: 'Amazon',
      market_name: 'AMZN',
      image: '../../assets/icons/amazon.svg',
    },
    {
      name: 'Oracle',
      market_name: 'ORCL',
      image: '../../assets/icons/oracle.svg',
    },
    {
      name: 'Costco',
      market_name: 'COST',
      image: '../../assets/icons/costco.svg',
    },
    {
      name: 'Netflix',
      market_name: 'NFLX',
      image: '../../assets/icons/netflix.svg',
    },
    {
      name: 'Cisco',
      market_name: 'CSCO',
      image: '../../assets/icons/cisco.svg',
    },
    {
      name: 'Toyota',
      market_name: 'TM',
      image: '../../assets/icons/toyota.svg',
    },
    {
      name: 'IBM',
      market_name: 'IBM',
      image: '../../assets/icons/ibm.svg',
    },
    {
      name: 'AMD',
      market_name: 'AMD',
      image: '../../assets/icons/amd.svg',
    },
    {
      name: 'Intel',
      market_name: 'INTC',
      image: '../../assets/icons/intel.svg',
    },
    {
      name: 'Walmart',
      market_name: 'WMT',
      image: '../../assets/icons/walmart.svg',
    },
    {
      name: 'Starbucks',
      market_name: 'SBUX',
      image: '../../assets/icons/starbucks.svg',
    },
    {
      name: "McDonald's",
      market_name: 'MCD',
      image: '../../assets/icons/mcdonald.svg',
    },
    {
      name: 'Nintendo',
      market_name: 'NTDOY',
      image: '../../assets/icons/nintendo.svg',
    },
  ];

  chartdata: number[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  apply_data() {
    this.lineChartData.datasets[0].data = this.https_data;
    this.chart?.update();
  }
  parse_data(stock: string) {
    const filePath = `assets/jsons/${stock}.json`;
    this.http.get(filePath).subscribe(
      (response) => {
        this.https_data = response;
        this.apply_data();
        console.log(this.https_data);
      },
      (error) => {
        console.error('Error loading JSON:', error);
      }
    );
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Market Price',
        backgroundColor: 'rgba(232,72,85,0.1)',
        borderColor: '#FF6694',
        pointBackgroundColor: '#000',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
        pointHitRadius: 25,
        tension: 0.3,
      },
    ],
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        position: 'left',
        grid: {
          color: '#797979',
        },
      },
      x: {
        grid: {
          color: '#797979',
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
}
