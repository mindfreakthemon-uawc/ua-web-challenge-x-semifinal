import { Component, Input, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';
import { BaseModel } from './models/base.model';
import { LayerService } from './services/layer.service';
import { BaseService } from './services/base.service';

@Component({
	selector: 'base-cmp',
	templateUrl: 'build/templates/canvas/base.html',
	styleUrls: ['build/styles/canvas/base.css']
})
export class BaseComponent implements OnInit {
	@Input()
	base: BaseModel;

	@ViewChild('image')
	image: ElementRef;

	constructor(public layerService: LayerService, public baseService: BaseService) {
	}

	@HostListener('window:resize')
	handleResize() {
		this.calculate();
	}

	ngOnInit() {
		this.calculate();
	}

	calculate() {
		this.baseService.coefficient = this.coefficient;
	}

	get coefficient() {
		return this.image.nativeElement.width / this.base.width;
	}
}
