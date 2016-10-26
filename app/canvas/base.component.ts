import { Component, Input, ViewChild, ElementRef, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';

@Component({
	selector: 'base-cmp',
	templateUrl: 'build/templates/canvas/base.html',
	styleUrls: ['build/styles/canvas/base.css']
})
export class BaseComponent implements OnInit {
	@Input()
	base: BaseModel;

	@ViewChild('wrapper')
	wrapper: ElementRef;

	@Output()
	outsideClickBeacon = new EventEmitter();

	@Output()
	coefficientBeacon = new EventEmitter<number>();

	@HostListener('window:resize')
	handleResize() {
		this.coefficientBeacon.emit(this.coefficient);
	}

	ngOnInit() {
		this.coefficientBeacon.emit(this.coefficient);
	}

	get coefficient() {
		return this.wrapper.nativeElement.offsetWidth / this.base.width;
	}
}
