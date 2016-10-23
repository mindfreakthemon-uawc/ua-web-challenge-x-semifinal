import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { LayerService } from './services/layer.service';
import { LayerModel } from './models/layer.model';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';
import { BaseComponent } from './base.component';
import { LayerComponent } from './layer.component';

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

	rotating: boolean = false;

	resizing: string = null;
	
	@ViewChild(BaseComponent)
	baseComponent: BaseComponent;

	@ViewChildren(LayerComponent)
	layerComponents: QueryList<LayerComponent>;

	constructor(public layerService: LayerService,
	            public baseService: BaseService) {}

	ngAfterViewInit() {
		this.baseService.beacon
			.subscribe((bases) => this.bases = bases);
		this.layerService.beacon
			.subscribe((layers) => this.layers = layers);
	}

	clearFlags() {
		this.dragging = false;
		this.rotating = false;
		this.resizing = null;
	}

	transform(event: MouseEvent) {
		let active = this.layerService.active;

		if (!active) {
			return;
		}

		let component = this.layerComponents
			.reduce<LayerComponent>((previous, current) => current.layer === active ? current : previous, null);

		if (!component) {
			return;
		}

		let rect = component.image.nativeElement.getBoundingClientRect();
		let centerX = window.scrollX + rect.left + (rect.width / 2);
		let centerY = window.scrollY + rect.top + (rect.height / 2);
		let coefficient = this.baseService.coefficient;
		let angle = - Math.atan2(centerX - event.pageX, centerY - event.pageY);
		let movementX = event.movementX / coefficient;
		let movementY = event.movementY / coefficient;

		let { startX, startY, width, height } = active;

		this.resize(active, movementX, movementY);

		this.drag(active, movementX, movementY);

		this.rotate(active, angle);

		if (active.height < MIN_SIZE || active.width < MIN_SIZE) {
			// reset
			Object.assign(active, { startX, startY, width, height });
		}
	}

	protected rotate(active: LayerModel, angle: number) {
		if (this.rotating) {
			active.angle = angle;
		}
	}

	protected drag(active: LayerModel, movementX: number, movementY: number) {
		if (this.dragging) {
			active.startX += movementX;
			active.startY += movementY;
		}
	}

	protected resize(active: LayerModel, movementX: number, movementY: number) {
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
	}
}
