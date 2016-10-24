import { Component } from '@angular/core';
import { LayerService } from '../canvas/services/layer.service';
import { Router } from '@angular/router';

@Component({
	selector: 'uploader-cmp',
	templateUrl: 'build/templates/uploader/uploader.html',
	styleUrls: ['build/styles/uploader/uploader.css']
})
export class UploaderComponent {
	error: string;

	loading: boolean = false;

	constructor(public layerService: LayerService,
		private router: Router) {
	}

	handleError(error: string) {
		this.error = error;
		this.loading = false;
	}

	handleFileSelect(event: Event) {
		let input = event.target as HTMLInputElement;
		let file = input.files[0];
		let url = URL.createObjectURL(file);

		this.layerService.upload(url)
			.then(() => this.close())
			.catch((error) => this.handleError(error));

		this.loading = true;
	}

	handleRemoteUrlPaste(event: ClipboardEvent) {
		if (!event.clipboardData || !event.clipboardData.items) {
			return;
		}

		let items = event.clipboardData.items;

		if (items.length) {
			event.preventDefault();

			items[0].getAsString((text) => {
				this.layerService.upload(text)
					.then(() => this.close())
					.catch((error) => this.handleError(error));
			});

			this.loading = true;
		}
	}

	handleRemoteUrl(event: Event) {
		let input = event.target as HTMLInputElement;

		this.layerService
			.upload(input.value)
			.then(() => this.close())
			.catch((error) => this.handleError(error));

		this.loading = true;
	}

	protected close() {
		this.router.navigate([{ outlets: { aux: null } }]);
	}
}
