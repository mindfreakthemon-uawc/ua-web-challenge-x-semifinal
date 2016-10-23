import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LayerModel } from './models/layer.model';
import { LayerService } from './services/layer.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'layer-cmp',
	templateUrl: 'build/templates/canvas/layer.html',
	styleUrls: ['build/styles/canvas/layer.css']
})
export class LayerComponent {
	@Input()
	layer: LayerModel;

	@ViewChild('image')
	image: ElementRef;

	@Input()
	coefficient: number = 1;

	@Output()
	resizeBeacon = new EventEmitter<string>();

	@Output()
	dragBeacon = new EventEmitter<boolean>();

	@Output()
	rotateBeacon = new EventEmitter<boolean>();

	get active() {
		return this.layerService.active === this.layer;
	}

	constructor(public layerService: LayerService,
		public sanitizer: DomSanitizer) {
	}

	@HostListener('mousedown')
	handleMouseDown() {
		this.layerService.active = this.layer;
	}

	transform(url: string): string {
		return this.sanitizer.bypassSecurityTrustUrl(url) as string;
	}
}
