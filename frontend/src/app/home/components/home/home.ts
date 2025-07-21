import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { Footer } from "../../../footer/components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Button, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
