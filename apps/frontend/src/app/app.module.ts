import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    AppComponent,
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
    // Add providers here as needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
