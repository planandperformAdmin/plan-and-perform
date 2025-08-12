import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  async onRegister() {
  if (this.registerForm.invalid) return;

  const email = this.registerForm.value.email;
  const password = this.registerForm.value.password;

  if (!email || !password) {
    await this.toastService.presentToast('Email and password are required', 'danger');
    return;
  }

  const { user, error } = await this.authService.register(email, password);

  if (error) {
    await this.toastService.presentToast(`Register error: ${error.message}`, 'danger');
    return;
  }

  if (user) {
    await this.toastService.presentToast('Registration successful! Please login.', 'success');
    this.router.navigate(['/login']);
  }
}


}
