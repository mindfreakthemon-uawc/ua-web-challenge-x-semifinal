import { LayerModel } from '../models/layer.model';
import { Point } from '../interfaces/point';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LayerService {
	layers: LayerModel[] = [];

	private updateSource = new ReplaySubject<LayerModel[]>();
	updateBeacon = this.updateSource.asObservable();

	addLayer(layer: LayerModel) {
		this.layers.push(layer);

		this.update();
	}

	removeLayer(layer: LayerModel) {
		let currentIndex = this.layers.indexOf(layer);

		this.layers.splice(currentIndex, 1);

		this.update();
	}

	zIndexLayer(layer: LayerModel, index: number) {
		let currentIndex = this.layers.indexOf(layer);

		this.layers.splice(currentIndex, 1);
		this.layers.splice(index > currentIndex ? index - 1 : index, 0, layer);

		this.update();
	}

	positionLayer(layer: LayerModel, startX: number, startY: number) {
		layer.startX = startX;
		layer.startY = startY;

		this.update();
	}

	rotateLayer(layer: LayerModel, angle: number) {
		layer.angle = angle;

		this.update();
	}

	resizeLayer(layer: LayerModel, width: number, height: number) {
		layer.width = width;
		layer.height = height;

		this.update();
	}

	protected update() {
		this.updateSource.next(this.layers);
	}
}