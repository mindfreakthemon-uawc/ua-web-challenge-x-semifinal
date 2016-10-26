import { Component, AfterViewInit } from '@angular/core';
import { BaseService } from '../canvas/services/base.service';
import { LayerService } from '../canvas/services/layer.service';
import { ShirtBaseModel } from '../canvas/models/shirt-base.model';
import { MugBaseModel } from '../canvas/models/mug-base.model';
import { LayerModel } from '../canvas/models/layer.model';

@Component({
	selector: 'main-component',
	templateUrl: 'build/templates/main/main.html'
})
export class MainComponent implements AfterViewInit {

	constructor(public layerService: LayerService,
		public baseService: BaseService) {
	}

	ngAfterViewInit() {
		let shirt = new ShirtBaseModel();
		let mug = new MugBaseModel();

		this.baseService.add(shirt);
		this.baseService.add(mug);
		this.baseService.active = shirt;

		this.layerService.upload('/build/statics/images/gallery/slowpoke.png');
	}
}
