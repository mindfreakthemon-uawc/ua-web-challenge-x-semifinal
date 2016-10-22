import { Component, Input } from '@angular/core';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';

@Component({
	selector: 'base-selector-cmp',
	templateUrl: 'build/templates/canvas/base-selector.html',
	styleUrls: ['build/styles/canvas/base-selector.css']

})
export class BaseSelectorComponent {
	@Input()
	bases: BaseModel[] = [];

	constructor(public baseService: BaseService) {}
}
