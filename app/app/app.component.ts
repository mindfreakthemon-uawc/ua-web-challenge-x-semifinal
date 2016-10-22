import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: 'build/templates/app/app.html',
	styleUrls: ['build/styles/app/app.css']
})
export class AppComponent {
	@HostBinding('class.loaded') loaded = true;
}
