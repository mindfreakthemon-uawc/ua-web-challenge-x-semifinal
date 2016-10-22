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

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],

	providers: [
		LayerService
	],

	declarations: [
		AppComponent,
		MainComponent,
		CanvasComponent,
		UploaderComponent,
		LayerComponent,
		BaseComponent
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
