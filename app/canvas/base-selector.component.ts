import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BaseModel } from './models/base.model';

@Component({
	selector: 'base-selector-cmp',
	templateUrl: 'build/templates/canvas/base-selector.html',
	styleUrls: ['build/styles/canvas/base-selector.css']
})
export class BaseSelectorComponent {
	@Input()
	bases: BaseModel[] = [];

	@Input()
	active: BaseModel;

	@Output()
	activateBeacon = new EventEmitter<BaseModel>();

	changing: boolean = false;
}
