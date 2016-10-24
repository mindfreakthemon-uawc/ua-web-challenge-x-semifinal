export class LayerModel {

	get centerX() {
		return this.startX + this.width / 2;
	}

	get centerY() {
		return this.startY + this.height / 2;
	}

	constructor(public src: string,
		public image: HTMLImageElement,
		public startX: number,
		public startY: number,
		public width: number,
		public height: number,
		public angle: number = 0) {
	}
}
