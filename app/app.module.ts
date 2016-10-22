// import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app/app.component';
import { MainComponent } from './main/main.component';
import { CanvasComponent } from './canvas/canvas.component';
import { UploaderComponent } from './uploader/uploader.component';
import { LayerService } from './canvas/services/layer.service';
import { LayerComponent } from './canvas/layer.component';
import { BaseComponent } from './canvas/base.component';
import { BaseService } from './canvas/services/base.service';
import { DrawerComponent } from './drawer/drawer.component';
import { BaseSelectorComponent } from './canvas/base-selector.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],

	providers: [
		LayerService,
		BaseService
	],

	declarations: [
		AppComponent,
		MainComponent,
		CanvasComponent,
		UploaderComponent,
		DrawerComponent,
		LayerComponent,
		BaseComponent,
		BaseSelectorComponent
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
