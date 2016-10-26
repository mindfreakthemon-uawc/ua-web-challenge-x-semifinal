import { BaseModel } from './base.model';

export class ShirtBaseModel extends BaseModel {
	get name(): string {
		return 't-shirt';
	}

	get src(): string {
		return '/build/statics/images/base/shirt.png';
	}

	get width(): number {
		return 900;
	}

	get height(): number {
		return 1100;
	}

	get canvasX(): number {
		return 240;
	}

	get canvasY(): number {
		return 200;
	}

	get canvasWidth(): number {
		return 420;
	}

	get canvasHeight(): number {
		return 600;
	}
}
