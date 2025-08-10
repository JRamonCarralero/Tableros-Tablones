import { Component } from '@angular/core';
import { Footer } from "../../../footer/components/footer/footer";
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-home',
  imports: [Footer, SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  emailAddress: string = 'informacion@tyt.com';
}
