import { BaseModel } from '../models/base.model';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
	bases: BaseModel[] = [];

	source = new ReplaySubject<BaseModel[]>();

	beacon = this.source.asObservable();

	active: BaseModel = null;

	coefficient: number = 1;

	add(base: BaseModel) {
		this.bases.push(base);

		this.update();
	}

	update() {
		this.source.next(this.bases);
	}
}
