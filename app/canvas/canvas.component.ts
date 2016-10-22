import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ShirtBaseModel } from './models/shirt-base.model';
import { LayerService } from './services/layer.service';
import { LayerModel } from './models/layer.model';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';
import { MugBaseModel } from './models/mug-base.model';
import { BaseComponent } from './base.component';

export const MIN_SIZE = 50;

@Component({
	selector: 'canvas-cmp',
	templateUrl: 'build/templates/canvas/canvas.html',
	styleUrls: ['build/styles/canvas/canvas.css']

})
export class CanvasComponent implements AfterViewInit {
	layers: LayerModel[] = [];

	bases: BaseModel[] = [];

	dragging: boolean = false;

	resizing: string = null;
	
	@ViewChild(BaseComponent)
	baseComponent: BaseComponent;

	constructor(public layerService: LayerService,
	            public baseService: BaseService) {}

	ngAfterViewInit() {
		this.baseService.beacon
			.subscribe((bases) => this.bases = bases);
		this.layerService.beacon
			.subscribe((layers) => this.layers = layers);

		let shirt = new ShirtBaseModel();
		let mug = new MugBaseModel();

		this.baseService.addBase(shirt);
		this.baseService.addBase(mug);
		this.baseService.active = mug;
	}

	clearFlags() {
		this.dragging = false;
		this.resizing = null;
	}

	transform(event: MouseEvent) {
		let active = this.layerService.active;

		if (!active) {
			return;
		}

		let movementX = event.movementX / this.baseService.coefficient;
		let movementY = event.movementY / this.baseService.coefficient;
		let { startX, startY, width, height } = active;

		switch (this.resizing) {
			case 'top-left':
				active.startX += movementX;
				active.startY += movementY;
				active.width -= movementX;
				active.height -= movementY;
				break;

			case 'top-right':
				active.width += movementX;
				active.startY += movementY;
				active.height -= movementY;
				break;

			case 'middle-top':
				active.startY += movementY;
				active.height -= movementY;
				break;

			case 'middle-left':
				active.startX += movementX;
				active.width -= movementX;
				break;

			case 'middle-right':
				active.width += movementX;
				break;

			case 'middle-bottom':
				active.height += movementY;
				break;

			case 'bottom-left':
				active.startX += movementX;
				active.height += movementY;
				active.width -= movementX;
				break;

			case 'bottom-right':
				active.width += movementX;
				active.height += movementY;
				break;
		}

		if (this.dragging) {
			active.startX += movementX;
			active.startY += movementY;
		}

		if (active.height < MIN_SIZE || active.width < MIN_SIZE) {
			// reset
			Object.assign(active, { startX, startY, width, height });
		}
	}
}
