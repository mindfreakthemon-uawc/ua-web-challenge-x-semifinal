import { Component, Input } from '@angular/core';
import { BaseModel } from './models/base.model';

@Component({
	selector: 'base-cmp',
	templateUrl: 'build/templates/canvas/base.html',
	styleUrls: ['build/styles/canvas/base.css']
})
export class BaseComponent {
	@Input()
	base: BaseModel;
}
