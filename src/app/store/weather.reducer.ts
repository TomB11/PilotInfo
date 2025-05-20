import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { StationReport } from '../interfaces/station';

export const setWeatherData = createAction(
  '[Weather] Set Data',
  props<{ data: StationReport[] }>()
);

interface WeatherState {
  data: StationReport[];
}

export const initialState: WeatherState = {
  data: []
};

export const weatherReducer = createReducer(
  initialState,
  on(setWeatherData, (state, { data }) => ({ ...state, data }))
);