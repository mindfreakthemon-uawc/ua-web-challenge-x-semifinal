import { Component, Input, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { BaseModel } from './models/base.model';
import { LayerService } from './services/layer.service';
import { BaseService } from './services/base.service';

@Component({
	selector: 'base-cmp',
	templateUrl: 'build/templates/canvas/base.html',
	styleUrls: ['build/styles/canvas/base.css']
})
export class BaseComponent implements AfterViewInit {
	@Input()
	base: BaseModel;

	@ViewChild('image')
	image: ElementRef;

	constructor(public layerService: LayerService,
	            public baseService: BaseService) {}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		// console.log(this.image.nativeElement.width);
	}

	ngAfterViewInit() {
		// console.log(this.image.nativeElement.width);
	}
}
