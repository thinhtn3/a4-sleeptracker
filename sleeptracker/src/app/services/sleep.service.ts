import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = false;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
		this.loadData();
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.saveData();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.saveData();
	}
	
	public deleteData(id:string) {
		SleepService.AllSleepData = SleepService.AllSleepData.filter(entry => entry.id !== id);
		SleepService.AllOvernightData = SleepService.AllOvernightData.filter(entry => entry.id !== id);
		SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(entry => entry.id !== id);
		this.saveData();
	}

	private async saveData() {
		await Preferences.set({ key: 'overnight', value: JSON.stringify(SleepService.AllOvernightData) });
		await Preferences.set({ key: 'sleepiness', value: JSON.stringify(SleepService.AllSleepinessData) });
	}

	// turning the date text back into Dates
	private async loadData() {
		var overnight = await Preferences.get({ key: 'overnight' });
		var sleepiness = await Preferences.get({ key: 'sleepiness' });

		var overnightList = JSON.parse(overnight.value || '[]');
		var sleepinessList = JSON.parse(sleepiness.value || '[]');

		for (var overnightItem of overnightList) {
			var overnightEntry = new OvernightSleepData(new Date(overnightItem.sleepStart), new Date(overnightItem.sleepEnd));
			SleepService.AllOvernightData.push(overnightEntry);
			SleepService.AllSleepData.push(overnightEntry);
		}

		for (var sleepinessItem of sleepinessList) {
			var sleepinessEntry = new StanfordSleepinessData(sleepinessItem.loggedValue, new Date(sleepinessItem.loggedAt));
			SleepService.AllSleepinessData.push(sleepinessEntry);
			SleepService.AllSleepData.push(sleepinessEntry);
		}
	}
}
