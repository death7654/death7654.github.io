import { provideRouter, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SupportedMarketsComponent } from './supported-markets/supported-markets.component';
import { PricingComponent } from './pricing/pricing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'markets', component: SupportedMarketsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
