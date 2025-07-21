import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/component/navbar/navbar";
import { Home } from "./home/components/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
