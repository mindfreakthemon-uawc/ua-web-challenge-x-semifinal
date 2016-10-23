export abstract class BaseModel {
	abstract get src(): string;
	abstract get name(): string;

	abstract get width(): number;
	abstract get height(): number;

	abstract get canvasX(): number;
	abstract get canvasY(): number;
	abstract get canvasWidth(): number;
	abstract get canvasHeight(): number;
}
