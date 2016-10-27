import { BaseModel } from '../models/base.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
	bases: BaseModel[] = [];

	active: BaseModel = null;

	coefficient: number = 1;

	add(base: BaseModel) {
		this.bases.push(base);
	}
}
