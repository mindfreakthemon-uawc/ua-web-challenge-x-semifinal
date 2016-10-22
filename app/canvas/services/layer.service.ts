import { LayerModel } from '../models/layer.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LayerService {
	layers: LayerModel[] = [];

	private source = new ReplaySubject<LayerModel[]>();

	beacon = this.source.asObservable();

	private _active: LayerModel = null;

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

	get active(): LayerModel {
		return this._active;
	}

	set active(value: LayerModel) {
		this._active = value;
	}

	protected update() {
		this.source.next(this.layers);
	}
}
