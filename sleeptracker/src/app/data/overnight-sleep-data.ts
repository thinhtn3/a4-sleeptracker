import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	public sleepStart:Date;
	public sleepEnd:Date;
	public quality?:number;
	public note?:string;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	// returns hour slept as decimal. for charts
	get hoursSlept():number {
		var difference_ms = this.sleepEnd.getTime() - this.sleepStart.getTime();
		return difference_ms / (1000*60*60);
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
