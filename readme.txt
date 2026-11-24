Thinh Nguyen 
thinhtn3@uci.edu
4029942
Solo

1. How long, in hours, did the assignment take?
8-10 hours

2. Who or what online resources did you consult? (list specific URLs and people)
https://capacitorjs.com/docs/apis/preferences for persistent storage
https://ionicframework.com/docs/api/datetime-button for selecting date time
https://ionicframework.com/docs/api/modal for modal overlay

3. Any bonus features?
I added chips to the design to easily differentiate whether a log is logging sleep or sleepiness.
Also cleaned up the page by centering everything and adjusting the margins and paddings.

4. Design choices
Logging overnight sleep:
I use Ionic's date/time pickers with set defaults to 10 pm and 8 am because typing is much slower than tapping on a phone and also reduces error. 
If a wake time and a bedtime are invalid, then the save button is disabled, preventing incorrect data from being saved. 

Logging sleepiness during the day:
Each row takes up a full width, with its own description, with its own number followed by description, so tap targets are harder to miss. After tapping, it logs the entry and closes the modal for a quick check-in. 
Aim to reduce as much friction as possible for the user to log their sleepiness.

Viewing logged data:
All log entries are tracked via a chronological list with color-coded chips to easily identify which type of row is which. 
Delete buttons are in bright red to signal that this is a destructive button for deleting a log.

Native device resource or backing up logged data:
Log data are stored to the phone's native storage via Capacitor preferences so that, after closing the app, history is still kept without needing an account or internet. 

5. Any struggles?
Not really. Had experience with React and component libraries before so it translated pretty well.
The only thing I struggled with was Capacitor to store persistent data locally on mobile rather than localStorage

6. Who it's for?
Designed for college students who use iPhone or iOS devices and who want to be able to quickly track their sleep and sleepiness.


