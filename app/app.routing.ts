import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UploaderComponent } from './uploader/uploader.component';
import { DrawerComponent } from './drawer/drawer.component';

const appRoutes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'upload', component: UploaderComponent, outlet: 'aux' },
	{ path: 'draw', component: DrawerComponent, outlet: 'aux' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
	useHash: true
});
