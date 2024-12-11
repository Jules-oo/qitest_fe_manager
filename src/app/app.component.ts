import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './_guards/auth.guard';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    providers: [HttpClient, AuthGuard],  
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qi_test_manager_fe_NEW';
}
