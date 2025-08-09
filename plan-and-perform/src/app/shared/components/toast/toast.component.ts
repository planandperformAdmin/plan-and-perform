import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent{

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success', duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

}
