import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { LayerService } from '../canvas/services/layer.service';
import { Router } from '@angular/router';

interface Trace {
	x: number;
	y: number;
	initial: boolean;
}

@Component({
	selector: 'drawer-cmp',
	templateUrl: 'build/templates/drawer/drawer.html',
	styleUrls: ['build/styles/drawer/drawer.css']
})
export class DrawerComponent implements AfterViewInit {
	drawing = false;

	traces: Trace[] = [];

	traceIndex: number = 0;

	@ViewChild('canvasRef')
	canvasRef: ElementRef;

	color: string = '#6666ff';

	strokeWidth: number = 5;

	constructor(public layerService: LayerService,
		private router: Router) {
	}

	get canvas(): HTMLCanvasElement {
		return this.canvasRef.nativeElement as HTMLCanvasElement;
	}

	get context(): CanvasRenderingContext2D {
		let element = this.canvas as HTMLCanvasElement;

		return element.getContext('2d');
	}

	@HostListener('window:resize')
	handleResize() {
		this.clear();
	}

	ngAfterViewInit() {
		this.context.lineJoin = 'round';
	}

	draw(event: MouseEvent, initial: boolean = false) {
		if (!this.drawing) {
			return;
		}

		this.traces.push({
			x: event.offsetX,
			y: event.offsetY,
			initial
		});

		this.redraw();
	}

	clear() {
		let context = this.context;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		this.traces = [];
		this.traceIndex = 0;
	}

	add() {
		this.layerService.upload(this.trim(this.canvas).toDataURL())
			.then(() => this.close());
	}

	redraw() {
		let context = this.context;

		context.strokeStyle = this.color;
		context.lineWidth = this.strokeWidth;

		this.traces
			.slice(this.traceIndex)
			.forEach((trace, index, traces) => {
				context.beginPath();

				if (!trace.initial && index) {
					context.moveTo(traces[index - 1].x, traces[index - 1].y);
				} else {
					context.moveTo(trace.x - 1, trace.y);
				}

				context.lineTo(trace.x, trace.y);
				context.closePath();
				context.stroke();

			});

		this.traceIndex = this.traces.length - 1;
	}

	protected trim(canvas) {
		let { width, height } = canvas;
		let context = canvas.getContext('2d');
		let imageData = context.getImageData(0, 0, width, height);

		let topLeftCorner = { x: width, y: height };
		let bottomRightCorner = { x: -1, y: -1 };

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let pixelPosition = (x * 4) + (y * width * 4);

				if (imageData.data[pixelPosition + 3] > 0) {
					if (x < topLeftCorner.x) {
						topLeftCorner.x = x;
					}

					if (y < topLeftCorner.y) {
						topLeftCorner.y = y;
					}

					if (x > bottomRightCorner.x) {
						bottomRightCorner.x = x;
					}

					if (y > bottomRightCorner.y) {
						bottomRightCorner.y = y;
					}
				}
			}
		}

		width = bottomRightCorner.x - topLeftCorner.x;
		height = bottomRightCorner.y - topLeftCorner.y;

		let trimmedCanvas = document.createElement('canvas');
		let trimmedContext = trimmedCanvas.getContext('2d');
		let trimmedData = context.getImageData(topLeftCorner.x, topLeftCorner.y, width, height);

		trimmedCanvas.width = width;
		trimmedCanvas.height = height;
		trimmedContext.putImageData(trimmedData, 0, 0);

		return trimmedCanvas;
	}

	protected close() {
		this.router.navigate([{ outlets: { aux: null } }]);
	}
}
