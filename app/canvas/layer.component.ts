import { Component, Input, EventEmitter, Output } from '@angular/core';
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
	active: boolean;

	@Output()
	onResizeFlagChange = new EventEmitter<boolean>();

	@Output()
	onDragFlagChange = new EventEmitter<boolean>();
}
