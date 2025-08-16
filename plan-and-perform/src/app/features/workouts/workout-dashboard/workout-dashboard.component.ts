import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-workout-dashboard',
  templateUrl: './workout-dashboard.component.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./workout-dashboard.component.scss'],
})
export class WorkoutDashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
