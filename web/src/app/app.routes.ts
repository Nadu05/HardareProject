import { Routes } from '@angular/router';
import { HeightAdjustComponent } from './height-adjust/height-adjust.component';
export const routes: Routes = [{
    path: 'height-adjust',
    component: HeightAdjustComponent
},
{ path: '', redirectTo: '/height-adjust', pathMatch: 'full' }];
