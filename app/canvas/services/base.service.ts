import { BaseModel } from '../models/base.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
	bases: BaseModel[] = [];

	source = new ReplaySubject<BaseModel[]>();

	beacon = this.source.asObservable();

	private _active: BaseModel = null;

	private _coefficient: number = 1;

	add(base: BaseModel) {
		this.bases.push(base);

		this.update();
	}

	get active(): BaseModel {
		return this._active;
	}

	set active(value: BaseModel) {
		this._active = value;
	}

	get coefficient(): number {
		return this._coefficient;
	}

	set coefficient(value: number) {
		this._coefficient = value;
	}

	protected update() {
		this.source.next(this.bases);
	}
}
