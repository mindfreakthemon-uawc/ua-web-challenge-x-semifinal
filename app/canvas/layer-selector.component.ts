import { Component, Input, Output, EventEmitter } from '@angular/core';
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
	activateBeacon = new EventEmitter<LayerModel>();

	@Output()
	resetBeacon = new EventEmitter<LayerModel>();

	@Output()
	removeBeacon = new EventEmitter<LayerModel>();

	@Output()
	frontBeacon = new EventEmitter<LayerModel>();

	@Output()
	upBeacon = new EventEmitter<LayerModel>();

	@Output()
	downBeacon = new EventEmitter<LayerModel>();

	@Output()
	backBeacon = new EventEmitter<LayerModel>();

	showing: boolean = false;

	constructor(protected sanitizer: DomSanitizer) {
	}

	transform(url: string): string {
		return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')') as string;
	}
}
