import { Component, AfterViewInit } from '@angular/core';
import { BaseService } from '../canvas/services/base.service';
import { LayerService } from '../canvas/services/layer.service';
import { ShirtBaseModel } from '../canvas/models/shirt-base.model';
import { MugBaseModel } from '../canvas/models/mug-base.model';

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

		this.baseService.addBase(shirt);
		this.baseService.addBase(mug);
		this.baseService.active = shirt;
	}
}
