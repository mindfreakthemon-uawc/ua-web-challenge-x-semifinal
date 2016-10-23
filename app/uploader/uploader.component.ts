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
	error: string;

	constructor(public layerService: LayerService,
		public baseService: BaseService,
		private router: Router) {
	}

	handleFileSelect(event: Event) {
		let input = event.target as HTMLInputElement;
		let file = input.files[0];
		let url = URL.createObjectURL(file);

		this.add(url);
	}

	handleRemoteUrlPaste(event: ClipboardEvent) {
		let items = event.clipboardData.items;

		if (items.length) {
			event.preventDefault();

			items[0].getAsString((text) => this.add(text));
		}
	}

	handleRemoteUrl(event: Event) {
		let input = event.target as HTMLInputElement;

		this.add(input.value);
	}

	protected close() {
		this.router.navigate([{ outlets: { aux: null } }]);
	}

	protected add(url: string) {
		let image = new Image();

		image.addEventListener('load', () => {
			let base = this.baseService.active;
			let canvasMin = Math.min(base.canvasWidth, base.canvasHeight);
			let imageMax = Math.max(image.width, image.height);
			let coefficient = 1;

			if (imageMax > canvasMin) {
				coefficient = canvasMin / imageMax;
			}

			let layer = new LayerModel(
				url,
				0, 0,
				coefficient * image.width,
				coefficient * image.height
			);

			this.layerService.add(layer);
			this.layerService.active = layer;

			this.close();
		});

		image.addEventListener('error', () => {
			this.error = 'network';
		});

		image.src = url;
	}
}
