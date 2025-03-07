import { provideRouter, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SupportedMarketsComponent } from './supported-markets/supported-markets.component';
import { PricingComponent } from './pricing/pricing.component';
import { ApplicationConfig } from '@angular/core';



export const routes: Routes = [
    { path: 'start', component: StartComponent },
    { path: '', component: StartComponent },//default
    { path: 'markets', component: SupportedMarketsComponent },
    { path: 'pricing', component: PricingComponent },

];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };

