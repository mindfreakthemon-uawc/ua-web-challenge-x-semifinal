import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseModel } from './models/base.model';
import { LayerModel } from './models/layer.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'layer-selector-cmp',
	templateUrl: 'build/templates/canvas/layer-selector.html',
	styleUrls: ['build/styles/canvas/layer-selector.css']

})
export class LayerSelectorComponent {
	@Input()
	layers: LayerModel[] = [];

	@Input()
	active: LayerModel;

	@Output()
	activateBeacon = new EventEmitter<BaseModel>();

	@Output()
	resetBeacon = new EventEmitter<BaseModel>();

	@Output()
	removeBeacon = new EventEmitter<BaseModel>();

	showing: boolean = false;

	constructor(private sanitizer: DomSanitizer) {
	}

	transform(url: string): string {
		return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')') as string;
	}
}
