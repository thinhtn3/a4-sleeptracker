import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, ModalController, IonChip, AlertController } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { LogOvernightComponent } from '../log-overnight/log-overnight.component';
import { LogSleepinessComponent } from '../log-sleepiness/log-sleepiness.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonChip],
})
export class HomePage {
    constructor(public sleepService:SleepService, private modalController:ModalController, private alertController:AlertController) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	async openLogOvernight() {
		var modal = await this.modalController.create({ component: LogOvernightComponent });
		await modal.present();
	}

	async openLogSleepiness() {
		var modal = await this.modalController.create({ component: LogSleepinessComponent });
		await modal.present();
	}

	async confirmDelete(id:string) {
	var alert = await this.alertController.create({
		header: 'Delete this entry?',
		message: 'This cannot be undone.',
		buttons: [
			{ text: 'Cancel', role: 'cancel' },
			{ text: 'Delete', role: 'destructive', handler: () => this.sleepService.deleteData(id) }
		]
	});
		await alert.present();
	}	
}
