import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Adaugă RouterModule

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] // Adaugă RouterModule
})
export class HomePage implements OnInit {

  // Aici sunt proprietățile cu valori statice pentru a vedea designul
  kcalConsumed: number = 1800;
  kcalTarget: number = 2500;
  
  proteinConsumed: number = 150;
  proteinTarget: number = 200;

  carbsConsumed: number = 180;
  carbsTarget: number = 300;

  fatsConsumed: number = 60;
  fatsTarget: number = 70;

  constructor() {}

  ngOnInit() {
    // ...
  }

  getDonutChartBackground(): string {
    const percentage = (this.kcalConsumed / this.kcalTarget) * 100;
    const filledColor = 'var(--ion-color-primary)';
    const emptyColor = '#e0e0e0';

    return `conic-gradient(${filledColor} ${percentage}%, ${emptyColor} ${percentage}%)`;
  }
}