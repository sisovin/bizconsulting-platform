import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth-api.service';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    // Add providers here as needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
