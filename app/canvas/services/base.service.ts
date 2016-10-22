import { BaseModel } from '../models/base.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
	bases: BaseModel[] = [];

	private source = new ReplaySubject<BaseModel[]>();

	beacon = this.source.asObservable();

	active: BaseModel = null;

	addBase(base: BaseModel) {
		this.bases.push(base);

		this.update();
	}

	removeBase(base: BaseModel) {
		let currentIndex = this.bases.indexOf(base);

		this.bases.splice(currentIndex, 1);

		this.update();
	}

	getActive(): BaseModel {
		return this.active;
	}

	setActive(base: BaseModel): void {
		this.active = base;
	}

	protected update() {
		this.source.next(this.bases);
	}
}
