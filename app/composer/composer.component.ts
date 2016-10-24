import { Component, OnInit, NgZone } from '@angular/core';
import { LayerService } from '../canvas/services/layer.service';
import { Router } from '@angular/router';
import { LayerModel } from '../canvas/models/layer.model';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseService } from '../canvas/services/base.service';

@Component({
	selector: 'composer-cmp',
	templateUrl: 'build/templates/composer/composer.html',
	styleUrls: ['build/styles/composer/composer.css']
})
export class ComposerComponent implements OnInit {
	layers: LayerModel[] = [];

	loading: boolean = true;

	url: string;

	constructor(public layerService: LayerService,
		public baseService: BaseService,
		private ngZone: NgZone,
		private sanitizer: DomSanitizer,
		private router: Router) {
	}

	ngOnInit() {
		this.layerService.beacon
			.subscribe((layers) => {
				this.layers = layers;

				this.ngZone.run(() => this.compose());
			});
	}

	ngOnDestroy() {
		if (this.url) {
			URL.revokeObjectURL(this.url);
		}
	}

	protected compose() {
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');

		canvas.width = this.baseService.active.canvasWidth;
		canvas.height = this.baseService.active.canvasHeight;

		this.layers
			.forEach((layer) => {
				context.save();
				context.translate(layer.centerX, layer.centerY);
				context.rotate(layer.angle);
				context.translate(-layer.centerX, -layer.centerY);
				context.drawImage(layer.image, layer.startX, layer.startY, layer.width, layer.height);
				context.restore();
			});

		canvas.toBlob((blob) => {
			this.ngZone.run(() => {
				let url = URL.createObjectURL(blob);

				this.url = this.sanitizer.bypassSecurityTrustUrl(url) as string;

				this.loading = false;
			})
		});
	}

	protected close() {
		this.router.navigate([{ outlets: { aux: null } }]);
	}
}
