import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  {

  constructor(private navController: NavController) { }

  goTo(path: string) {
    this.navController.navigateRoot(path);
  }

}
