import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
	IonList, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime,
	ModalController
} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
	selector: 'app-log-overnight',
	templateUrl: './log-overnight.component.html',
	styleUrls: ['./log-overnight.component.scss'],
	imports: [
		FormsModule,
		IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
		IonList, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime
	],
})
export class LogOvernightComponent implements OnInit {
	bedtimeText:string = '';
	wakeTimeText:string = '';

	constructor(private modalController:ModalController, private sleepService:SleepService) {}

	ngOnInit() {
		// default
		var bedtime = new Date();
		bedtime.setDate(bedtime.getDate() - 1);
		bedtime.setHours(22, 0, 0);
    
		var wakeTime = new Date();
		wakeTime.setHours(8, 0, 0);

		this.bedtimeText = this.toDateTimeString(bedtime);
		this.wakeTimeText = this.toDateTimeString(wakeTime);
	}

	save() {
		var bedtime = new Date(this.bedtimeText);
		var wakeTime = new Date(this.wakeTimeText);
		this.sleepService.logOvernightData(new OvernightSleepData(bedtime, wakeTime));
		this.modalController.dismiss();
	}

	private toDateTimeString(date:Date):string {
		var month = String(date.getMonth() + 1).padStart(2, '0');
		var day = String(date.getDate()).padStart(2, '0');
		var hours = String(date.getHours()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');

		return date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':00';
	}
}