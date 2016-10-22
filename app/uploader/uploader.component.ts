import { Component } from '@angular/core';
import { LayerService } from '../canvas/services/layer.service';
import { LayerModel } from '../canvas/models/layer.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'uploader-cmp',
	templateUrl: 'build/templates/uploader/uploader.html',
	styleUrls: ['build/styles/uploader/uploader.css']
})
export class UploaderComponent {
	constructor(public layerService: LayerService,
	            private sanitizer: DomSanitizer) {}

	handleFileSelect(event: Event) {
		let input = event.target as HTMLInputElement;
		let file = input.files[0];
		let image = new Image();
		let url = URL.createObjectURL(file);

		image.addEventListener('load', () => {
			URL.revokeObjectURL(url);

			let imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)) as string;
			let layer = new LayerModel(imageUrl, 0, 0, image.width, image.height);

			this.layerService.addLayer(layer);
		});

		image.src = url;
		input.value = null;
	}
}
