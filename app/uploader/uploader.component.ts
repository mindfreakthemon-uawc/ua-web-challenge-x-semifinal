import { Component } from '@angular/core';
import { LayerService } from '../canvas/services/layer.service';
import { LayerModel } from '../canvas/models/layer.model';
import { BaseService } from '../canvas/services/base.service';
import { Router } from '@angular/router';

@Component({
	selector: 'uploader-cmp',
	templateUrl: 'build/templates/uploader/uploader.html',
	styleUrls: ['build/styles/uploader/uploader.css']
})
export class UploaderComponent {
	constructor(public layerService: LayerService,
		public baseService: BaseService,
		private router: Router) {
	}

	handleFileSelect(event: Event) {
		let input = event.target as HTMLInputElement;
		let file = input.files[0];
		let image = new Image();
		let url = URL.createObjectURL(file);

		image.addEventListener('load', () => {
			URL.revokeObjectURL(url);

			let base = this.baseService.active;
			let layer = new LayerModel(
				URL.createObjectURL(file),
				0, 0,
				Math.min(base.canvasWidth, image.width),
				Math.min(base.canvasHeight, image.height)
			);

			this.layerService.add(layer);
			this.layerService.active = layer;
		});

		image.src = url;
		input.value = null;

		this.router.navigate([{ outlets: { aux: null } }]);
	}
}
