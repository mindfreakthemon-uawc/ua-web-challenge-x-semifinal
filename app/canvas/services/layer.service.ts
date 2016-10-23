import { LayerModel } from '../models/layer.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { BaseService } from './base.service';

@Injectable()
export class LayerService {
	layers: LayerModel[] = [];

	source = new ReplaySubject<LayerModel[]>();

	beacon = this.source.asObservable();

	active: LayerModel;

	constructor(public baseService: BaseService) {
	}

	add(layer: LayerModel) {
		this.layers.push(layer);
		this.center(layer);
		this.update();
	}

	upload(url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let image = new Image();

			image.addEventListener('load', () => {
				let layer = new LayerModel(url, 0, 0, image.width, image.height);

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

		this.update();
	}

	zIndex(layer: LayerModel, index: number) {
		let currentIndex = this.layers.indexOf(layer);

		this.layers.splice(currentIndex, 1);
		this.layers.splice(index > currentIndex ? index - 1 : index, 0, layer);

		this.update();
	}

	reset(layer: LayerModel) {
		layer.angle = 0;

		this.contain(layer);
		this.center(layer);
	}

	update() {
		this.source.next(this.layers);
	}
}
