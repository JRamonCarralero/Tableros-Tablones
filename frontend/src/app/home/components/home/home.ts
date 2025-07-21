import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { Footer } from "../../../footer/components/footer/footer";
import { Image } from "primeng/image";

@Component({
  selector: 'app-home',
  imports: [Button, Footer, Image],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  emailAddress: string = 'informacion@tyt.com';
}
