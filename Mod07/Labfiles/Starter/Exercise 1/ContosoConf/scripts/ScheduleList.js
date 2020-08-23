import { ScheduleItem } from "./ScheduleItem.js";

export class ScheduleList {
	constructor(element, localStarStorage) {
		this.element = element;
		this.localStarStorage = localStarStorage;
	}
	async startDownload() {
		let response = await fetch("/schedule/list");
		let data = await response.json();


		if (response.ok) {
			this.downloadDone(data);
		} else {
			this.downloadFailed();
		}
	}

	downloadDone(responseData) {
		this.addAll(responseData.schedule);
	}

	downloadFailed() {
		alert("Could not retrieve schedule data at this time. Please try again later.");
	}

	addAll(itemsArray) {
		itemsArray.forEach(this.add, this);
	}

	add(itemData) {
		const item = new ScheduleItem(itemData, this.localStarStorage);
		this.element.appendChild(item.element);
	}
}

