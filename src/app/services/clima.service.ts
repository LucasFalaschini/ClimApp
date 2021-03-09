import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/HTTP';
import { Clima } from '../models/clima.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  // TODO las opciones del clima son:
  // (main) Clear - Clouds - Snow - Rain

  // Sitio web de consulta: https://openweathermap.org/

  // 5 dias cada 3hs
  // http://api.openweathermap.org/data/2.5/forecast?q=Necochea,AR&appid=2d775446b1f8702fc4d41e604afdc8a9&units=metric&lang=es&q=

  // url: string = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&lang=es&q=`;
  apiKey = environment.key;
  url: string = environment.url;
  urlConfig: string = environment.urlConfig;
  urlFull: string = this.url + this.apiKey + this.urlConfig
  urlDias: string = ``

  clima: Clima = new Clima();
  storageCargado: boolean = false;

  constructor(private http: HttpClient) {
    this.cargarStorage(this.storageCargado);
   }

  getApi(cityName: string, countryCode: string) {
    return this.http.get(`${this.urlFull}${cityName},${countryCode}`)
  }

  getClimaDias() {
    return this.http.get(``)
  }


  guardarStorage(clima: Clima) {
    localStorage.setItem('data', JSON.stringify(clima))
  }

  cargarStorage(cargado: boolean) {
    if (localStorage.getItem('data')) {
      cargado = true;
      return this.clima = JSON.parse(localStorage.getItem('data'));
    } else {
      cargado = false;
      return this.clima = new Clima();
    }
  }

}
