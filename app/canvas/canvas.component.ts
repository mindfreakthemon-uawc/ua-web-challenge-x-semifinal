import { Component, AfterViewInit } from '@angular/core';
import { ShirtBaseModel } from './models/shirt-base.model';
import { LayerService } from './services/layer.service';
import { LayerModel } from './models/layer.model';
import { BaseModel } from './models/base.model';

export const MIN_SIZE = 50;

@Component({
	selector: 'canvas-cmp',
	templateUrl: 'build/templates/canvas/canvas.html',
	styleUrls: ['build/styles/canvas/canvas.css']

})
export class CanvasComponent implements AfterViewInit {
	src: string;

	base: BaseModel;

	layers: LayerModel[] = [];

	active: LayerModel;

	dragging: boolean = false;

	resizing: string = null;

	constructor(public layerService: LayerService) {}

	ngAfterViewInit() {
		this.base = new ShirtBaseModel();

		this.layerService.updateBeacon
			.subscribe((layers) => this.layers = layers);
	}

	clearActive(event: MouseEvent) {
		let element = event.target as HTMLElement;

		if (element.matches('.fn-base-canvas')) {
			this.active = null;
		}
	}

	setActive(layer: LayerModel) {
		this.active = layer;
	}

	clearFlags() {
		this.dragging = false;
		this.resizing = null;
	}

	transform(event: MouseEvent) {
		if (!this.active) {
			return;
		}

		let { startX, startY, width, height } = this.active;

		switch (this.resizing) {
			case 'top-left':
				this.active.startX += event.movementX;
				this.active.startY += event.movementY;
				this.active.width -= event.movementX;
				this.active.height -= event.movementY;
				break;

			case 'top-right':
				this.active.width += event.movementX;
				this.active.startY += event.movementY;
				this.active.height -= event.movementY;
				break;

			case 'middle-top':
				this.active.startY += event.movementY;
				this.active.height -= event.movementY;
				break;

			case 'middle-left':
				this.active.startX += event.movementX;
				this.active.width -= event.movementX;
				break;

			case 'middle-right':
				this.active.width += event.movementX;
				break;

			case 'middle-bottom':
				this.active.height += event.movementY;
				break;

			case 'bottom-left':
				this.active.startX += event.movementX;
				this.active.height += event.movementY;
				this.active.width -= event.movementX;
				break;

			case 'bottom-right':
				this.active.width += event.movementX;
				this.active.height += event.movementY;
				break;
		}

		if (this.dragging) {
			this.active.startX += event.movementX;
			this.active.startY += event.movementY;
		}

		if (this.active.height < MIN_SIZE || this.active.width < MIN_SIZE) {
			// reset
			Object.assign(this.active, { startX, startY, width, height });
		}
	}
}
