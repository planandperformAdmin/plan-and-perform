import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

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
