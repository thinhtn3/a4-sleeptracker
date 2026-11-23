import { Component } from '@angular/core';
import { IonContent, IonList, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
	selector: 'app-log-sleepiness',
	templateUrl: './log-sleepiness.component.html',
	styleUrls: ['./log-sleepiness.component.scss'],
	imports: [IonContent, IonList, IonItem, IonLabel],
})
export class LogSleepinessComponent {
	// scale (index 0 is unused)
	levels:number[] = [1, 2, 3, 4, 5, 6, 7];
	scaleValues = StanfordSleepinessData.ScaleValues;

	constructor(private modalController:ModalController, private sleepService:SleepService) {}

	save(level:number) {
		// records current time of each log
		this.sleepService.logSleepinessData(new StanfordSleepinessData(level));
		this.modalController.dismiss();
	}
}