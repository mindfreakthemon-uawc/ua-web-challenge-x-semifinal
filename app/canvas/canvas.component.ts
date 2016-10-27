import { Component, ViewChildren, QueryList, HostListener, OnInit } from '@angular/core';
import { LayerService } from './services/layer.service';
import { LayerModel } from './models/layer.model';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';
import { LayerComponent } from './layer.component';

export const MIN_SIZE = 50;

@Component({
	selector: 'canvas-cmp',
	templateUrl: 'build/templates/canvas/canvas.html',
	styleUrls: ['build/styles/canvas/canvas.css']

})
export class CanvasComponent {
	dragging: boolean = false;

	rotating: boolean = false;

	resizing: string = null;

	@ViewChildren(LayerComponent)
	layerComponents: QueryList<LayerComponent>;

	get activeComponent(): LayerComponent {
		return this.layerComponents
			.reduce((previous, current) => {
				if (current.layer === this.layerService.active) {
					return current;
				} else {
					return previous;
				}
			}, null);
	}

	protected previousEvent: MouseEvent;

	constructor(protected layerService: LayerService,
		protected baseService: BaseService) {
	}

	clearFlags() {
		this.dragging = false;
		this.rotating = false;
		this.resizing = null;

		this.previousEvent = null;
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		let transform = true;
		let movementX = 0;
		let movementY = 0;
		let coefficient = event.shiftKey ? 10 : 1;

		switch (event.key) {
			case 'ArrowLeft':
				movementX = -1;
				break;

			case 'ArrowRight':
				movementX = 1;
				break;

			case 'ArrowUp':
				movementY = -1;
				break;

			case 'ArrowDown':
				movementY = 1;
				break;

			default:
				transform = false;
		}

		if (transform) {
			event.preventDefault();

			let dragging = this.dragging;

			this.dragging = true;

			this.transform(movementX * coefficient, movementY * coefficient);

			this.dragging = dragging;
		}
	}

	handleMouseMove(event: MouseEvent) {
		if (this.dragging || this.rotating || this.resizing) {
			this.ensureMovement(event);

			this.transform(event.movementX, event.movementY, event.pageX, event.pageY);
		}
	}

	transform(movementX: number, movementY: number, pageX: number = 0, pageY: number = 0) {
		let active = this.layerService.active;
		let component = this.activeComponent;

		if (!active || !component) {
			return;
		}

		let coefficient = this.baseService.coefficient;

		let { startX, startY, width, height } = active;

		if (this.resizing) {
			this.layerService.resize(active, this.resizing, movementX / coefficient, movementY / coefficient);
		}

		if (this.dragging) {
			this.layerService.drag(active, movementX / coefficient, movementY / coefficient);
		}

		if (this.rotating) {
			let angle = this.calculateComponentAngle(component, pageX, pageY);

			this.layerService.rotate(active, angle);
		}

		if (this.shouldReset(active)) {
			// reset
			Object.assign(active, { startX, startY, width, height });
		}
	}

	protected calculateComponentAngle(component: LayerComponent, pageX: number, pageY: number) {
		let rect = component.image.nativeElement.getBoundingClientRect();
		let centerX = window.scrollX + rect.left + (rect.width / 2);
		let centerY = window.scrollY + rect.top + (rect.height / 2);

		return -Math.atan2(centerX - pageX, centerY - pageY);
	}

	protected shouldReset(active: LayerModel) {
		if (active.height < 0 || active.width < 0) {
			// not to make it too small
			return true;
		}

		if (active.startX < (MIN_SIZE - active.width) || active.startY < (MIN_SIZE - active.height)) {
			// not to leave top / left borders
			return true;
		}

		let base = this.baseService.active;

		// not to leave right / bottom borders
		return active.startX > (base.canvasWidth - MIN_SIZE) || active.startY > (base.canvasHeight - MIN_SIZE);
	}

	/**
	 * safari does not know movementX / movementY. #hacks4lyfe
	 */
	protected ensureMovement(event: MouseEvent) {
		if ('movementX' in event) {
			return;
		}

		Object.assign(event, {
			movementX: this.previousEvent ? event.screenX - this.previousEvent.screenX : 0,
			movementY: this.previousEvent ? event.screenY - this.previousEvent.screenY : 0
		});

		this.previousEvent = event;
	}
}
