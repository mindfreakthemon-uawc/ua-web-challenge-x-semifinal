import { BaseModel } from './base.model';

export class MugBaseModel extends BaseModel {
	get name(): string {
		return 'Mug';
	}

	get src(): string {
		return '/build/statics/images/mug.jpg';
	}

	get width(): number {
		return 900;
	}

	get height(): number {
		return 959;
	}

	get canvasX(): number {
		return 270;
	}

	get canvasY(): number {
		return 200;
	}

	get canvasWidth(): number {
		return 480;
	}

	get canvasHeight(): number {
		return 480;
	}
}
