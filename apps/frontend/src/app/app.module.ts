import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth-api.service';
import { InvestmentDashboardComponent } from './investment-dashboard/investment-dashboard.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'investment-dashboard', component: InvestmentDashboardComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InvestmentDashboardComponent,
    LoadingSpinnerComponent,
    // Add more components here as needed
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    // Add more modules here as needed
  ],
  providers: [
    AuthService,
    AuthApiService,
    AuthGuard,
    // Add providers here as needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
