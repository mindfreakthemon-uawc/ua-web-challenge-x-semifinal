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
		this.baseService.setActive(mug);
	}

	clearFlags() {
		this.dragging = false;
		this.resizing = null;
	}

	transform(event: MouseEvent) {
		let active = this.layerService.getActive();

		if (!active) {
			return;
		}

		let { startX, startY, width, height } = active;

		switch (this.resizing) {
			case 'top-left':
				active.startX += event.movementX;
				active.startY += event.movementY;
				active.width -= event.movementX;
				active.height -= event.movementY;
				break;

			case 'top-right':
				active.width += event.movementX;
				active.startY += event.movementY;
				active.height -= event.movementY;
				break;

			case 'middle-top':
				active.startY += event.movementY;
				active.height -= event.movementY;
				break;

			case 'middle-left':
				active.startX += event.movementX;
				active.width -= event.movementX;
				break;

			case 'middle-right':
				active.width += event.movementX;
				break;

			case 'middle-bottom':
				active.height += event.movementY;
				break;

			case 'bottom-left':
				active.startX += event.movementX;
				active.height += event.movementY;
				active.width -= event.movementX;
				break;

			case 'bottom-right':
				active.width += event.movementX;
				active.height += event.movementY;
				break;
		}

		if (this.dragging) {
			active.startX += event.movementX;
			active.startY += event.movementY;
		}

		if (active.height < MIN_SIZE || active.width < MIN_SIZE) {
			// reset
			Object.assign(active, { startX, startY, width, height });
		}
	}
}
