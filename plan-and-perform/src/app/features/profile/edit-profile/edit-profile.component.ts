import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouterModule, Router } from '@angular/router'; // Adaugă Router și RouterModule

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule], // Adaugă RouterModule
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  @ViewChild('editProfileModal') editProfileModal!: IonModal;

  profileForm = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    sex: ['', Validators.required],
    activityLevel: ['', Validators.required],
    profilePictureUrl: ['']
  });

  userId: string | null = null;
  userEmail: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router // Injectează Router-ul
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (!user) {
      await this.toastService.presentToast('User not authenticated', 'danger');
      return;
    }

    this.userId = user.id;
    this.userEmail = user.email ?? null;
    await this.loadProfile();
  }

  getAge(): number | null {
    const birthDate = this.profileForm.get('birthDate')?.value;
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  async loadProfile() {
    if (!this.userId) return;

    const { data, error } = await this.authService.getProfile(this.userId);

    if (error) {
      console.log('No profile found yet or error:', error.message);
      return;
    }

    if (data) {
      this.profileForm.patchValue({
        username: data.username,
        firstName: data.first_name,
        lastName: data.last_name,
        birthDate: data.birth_date,
        sex: data.sex,
        activityLevel: data.activity_level,
        profilePictureUrl: data.profile_picture_url || ''
      });
    }
  }

  async onSave() {
    if (this.profileForm.invalid || !this.userId || !this.userEmail) {
      await this.toastService.presentToast('Form is invalid or missing user data', 'danger');
      return;
    }

    const profileData = {
      user_id: this.userId,
      email: this.userEmail,
      username: this.profileForm.value.username!,
      first_name: this.profileForm.value.firstName!,
      last_name: this.profileForm.value.lastName!,
      birth_date: this.profileForm.value.birthDate!,
      sex: this.profileForm.value.sex!,
      activity_level: this.profileForm.value.activityLevel!,
      profile_picture_url: this.profileForm.value.profilePictureUrl || ''
    };

    const { error } = await this.authService.upsertProfile(profileData);

    if (error) {
      await this.toastService.presentToast(`Save error: ${error.message}`, 'danger');
    } else {
      await this.toastService.presentToast('Profile saved successfully', 'success');
      this.editProfileModal.dismiss();
    }
  }

  // Adaugă această metodă onLogout() pentru a rezolva eroarea
  async onLogout() {
    await this.authService.logout();
    await this.toastService.presentToast('Logged out successfully!', 'success');
    this.router.navigate(['/login']); // Redirecționează către pagina de login
  }
}