import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  async onLogin() {
  if (this.loginForm.invalid) return;

  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  if (!email || !password) {
    await this.toastService.presentToast('Email and password are required', 'danger');
    return;
  }

  const { user, error } = await this.authService.login(email, password);

  if (error) {
    await this.toastService.presentToast(`Login error: ${error.message}`, 'danger');
    return;
  }

  if (user) {
    await this.toastService.presentToast('Login successful!', 'success');
    this.router.navigate(['/edit-profile']);
  }
}


}
