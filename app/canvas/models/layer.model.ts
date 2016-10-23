export class LayerModel {
	constructor(public src: string,
		public startX: number,
		public startY: number,
		public width: number,
		public height: number,
		public angle: number = 0) {
	}
}
