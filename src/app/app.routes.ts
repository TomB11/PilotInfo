import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { EnterFormPageComponent } from './pages/enter-form-page/enter-form-page.component';
import { ResultTablePageComponent } from './pages/result-table-page/result-table-page.component';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

const canMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const storeWeatherInfo = inject(Store)

    let weatherInfo = false;
    storeWeatherInfo.select((state: any) => state.weather).subscribe((weather: any) => {
        weatherInfo = weather.data.length > 0 ? true : false;
    });

    if (weatherInfo) {
        return true
    }

    return new RedirectCommand(router.parseUrl('enterForm'))
} 

export const routes: Routes = [
    {path: 'enterForm', component: EnterFormPageComponent},
    {path: 'resultTable', component: ResultTablePageComponent, canMatch: [canMatch]},
    {path: '**', pathMatch:'full', redirectTo: 'enterForm'},
    {path: '', pathMatch:'full', redirectTo: 'enterForm'}
];
