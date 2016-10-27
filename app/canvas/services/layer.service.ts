import { LayerModel } from '../models/layer.model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

export const MAX_LAYERS = 10;

@Injectable()
export class LayerService {

	maxLayers: number = MAX_LAYERS;

	layers: LayerModel[] = [];

	active: LayerModel;

	get isAtLimit(): boolean {
		return this.layers.length >= MAX_LAYERS;
	}

	constructor(protected baseService: BaseService) {
	}

	add(layer: LayerModel) {
		this.layers.push(layer);
		this.center(layer);
	}

	upload(url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let image = new Image();

			image.setAttribute('crossOrigin', 'anonymous');
			image.addEventListener('load', () => {
				let layer = new LayerModel(url, image, 0, 0, image.width, image.height);

				this.contain(layer);
				this.center(layer);

				this.add(layer);
				this.active = layer;

				resolve();
			});

			image.addEventListener('error', () => {
				reject('network');
			});

			image.src = url;
		});
	}

	contain(layer: LayerModel) {
		let base = this.baseService.active;

		if (base) {
			let canvasMin = Math.min(base.canvasWidth, base.canvasHeight);
			let imageMax = Math.max(layer.width, layer.height);

			if (imageMax > canvasMin) {
				let coefficient = canvasMin / imageMax;

				layer.width *= coefficient;
				layer.height *= coefficient
			}
		}
	}

	center(layer: LayerModel) {
		let base = this.baseService.active;

		if (base) {
			layer.startX = (base.canvasWidth - layer.width) / 2;
			layer.startY = (base.canvasHeight - layer.height) / 2;
		}
	}

	remove(layer: LayerModel) {
		let currentIndex = this.layers.indexOf(layer);

		this.layers.splice(currentIndex, 1);
	}

	zIndex(layer: LayerModel) {
		return this.layers.indexOf(layer);
	}

	position(layer: LayerModel, index: number = null) {
		let currentIndex = this.zIndex(layer);
		let newIndex = index;

		if (index === -1 || index === 1) {
			newIndex = Math.max(currentIndex + index, 0);
		} else if (index === null) {
			newIndex = this.layers.length;
		}

		this.layers.splice(currentIndex, 1);
		this.layers.splice(newIndex, 0, layer);
	}

	reset(layer: LayerModel) {
		layer.angle = 0;

		this.contain(layer);
		this.center(layer);
	}

	rotate(layer: LayerModel, angle: number) {
		layer.angle = angle;
	}

	drag(layer: LayerModel, movementX: number, movementY: number) {
		layer.startX += movementX;
		layer.startY += movementY;
	}

	resize(layer: LayerModel, type: string, movementX: number, movementY: number) {
		switch (type) {
			case 'top-left':
				layer.startX += movementX;
				layer.startY += movementY;
				layer.width -= movementX;
				layer.height -= movementY;
				break;

			case 'top-right':
				layer.width += movementX;
				layer.startY += movementY;
				layer.height -= movementY;
				break;

			case 'middle-top':
				layer.startY += movementY;
				layer.height -= movementY;
				break;

			case 'middle-left':
				layer.startX += movementX;
				layer.width -= movementX;
				break;

			case 'middle-right':
				layer.width += movementX;
				break;

			case 'middle-bottom':
				layer.height += movementY;
				break;

			case 'bottom-left':
				layer.startX += movementX;
				layer.height += movementY;
				layer.width -= movementX;
				break;

			case 'bottom-right':
				layer.width += movementX;
				layer.height += movementY;
				break;
		}
	}
}
