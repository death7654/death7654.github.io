import { Component } from '@angular/core';
import { TilesComponent } from '../../tiles/tiles.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [TilesComponent, RouterLink],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  advertisement = [
    {
      title: 'Precision',
      description:
        'Advanced algorithms analyze market trends with pinpoint accuracy, ensuring data-driven investment decisions',
    },
    {
      title: 'Automation',
      description:
        'Our system removes human error and emotions by automating investments, executing trades at the perfect moment',
    },
    {
      title: 'Optimization',
      description:
        'Continuous learning and adaptation refine strategies, maximizing returns while managing risk efficiently',
    },
  ];
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
}