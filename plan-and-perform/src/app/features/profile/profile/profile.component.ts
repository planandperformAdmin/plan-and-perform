import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) { }

  async logout() {
    await this.authService.logout();
    await this.toastService.presentToast('Logged out successfully!', 'success');
    this.router.navigate(['/login']); // Redirecționează către pagina de login
  }

}
