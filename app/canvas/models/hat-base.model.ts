import { BaseModel } from './base.model';

export class HatBaseModel extends BaseModel {
	get name(): string {
		return 'hat';
	}

	get src(): string {
		return './build/statics/images/base/hat.png';
	}

	get width(): number {
		return 800;
	}

	get height(): number {
		return 735;
	}

	get canvasX(): number {
		return 145;
	}

	get canvasY(): number {
		return 90;
	}

	get canvasWidth(): number {
		return 480;
	}

	get canvasHeight(): number {
		return 360;
	}
}
