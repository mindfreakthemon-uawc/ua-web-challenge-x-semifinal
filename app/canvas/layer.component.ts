import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { LayerModel } from './models/layer.model';

@Component({
	selector: 'layer-cmp',
	templateUrl: 'build/templates/canvas/layer.html',
	styleUrls: ['build/styles/canvas/layer.css']
})
export class LayerComponent {
	@Input()
	layer: LayerModel;

	@Input()
	active: boolean = false;

	@ViewChild('image')
	image: ElementRef;

	@Input()
	coefficient: number = 1;

	@Output()
	resizeBeacon = new EventEmitter<string>();

	@Output()
	dragBeacon = new EventEmitter<boolean>();

	@Output()
	rotateBeacon = new EventEmitter<boolean>();
}
