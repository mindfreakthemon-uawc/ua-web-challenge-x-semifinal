export class LayerModel {

	get centerX() {
		return this.startX + this.width / 2;
	}

	get centerY() {
		return this.startY + this.height / 2;
	}

	public height: number = this.originalHeight;

	public width: number = this.originalWidth;

	constructor(public src: string,
		public image: HTMLImageElement,
		public startX: number,
		public startY: number,
		public originalWidth: number,
		public originalHeight: number,
		public angle: number = 0) {
	}
}
