import { BaseModel } from './base.model';

export class MugBaseModel extends BaseModel {
	get name(): string {
		return 'mug';
	}

	get src(): string {
		return './build/statics/images/base/mug.png';
	}

	get width(): number {
		return 900;
	}

	get height(): number {
		return 959;
	}

	get canvasX(): number {
		return 75;
	}

	get canvasY(): number {
		return 150;
	}

	get canvasWidth(): number {
		return 500;
	}

	get canvasHeight(): number {
		return 600;
	}
}
