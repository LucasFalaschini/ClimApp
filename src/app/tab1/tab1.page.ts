import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';
import { AlertController } from '@ionic/angular';
import { Clima } from '../models/clima.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  clima;
  climaObj: Clima = new Clima();
  form: boolean = false;
  codigo;
  guardar: boolean = false;

  constructor(private climaService: ClimaService, 
              public alertController: AlertController) {


  }

  ngOnInit() {
  }

  getClima(cityName: string, countryCode: string) {
    this.climaService.getApi(cityName, countryCode).subscribe( resp => {
        console.log(resp);
        this.clima = resp;
        this.climaObj.lugar = this.clima.name;
        this.climaObj.temperatura = this.clima.main.temp;
        this.climaObj.min = this.clima.main.temp_min
        this.climaObj.max = this.clima.main.temp_max
        this.climaObj.humedad = this.clima.main.humidity
        this.climaObj.guardado = this.guardar;
        this.climaObj.codigo = this.clima.sys.country;
        this.climaObj.descripcion = this.clima.weather.main;

        if(this.climaObj.guardado ) {
          this.climaService.guardarStorage(this.climaObj);
        }
        
    }, (error) => {
      if(error.error.cod === 404)
      console.log("Este es un re error", error.error.cod);
      this.notfoundAlerta()
    })
  }

  submitLocation(cityName: HTMLInputElement, countryCode: HTMLInputElement) {
    
    if(cityName.value !== '') {
      this.getClima(cityName.value, countryCode.value)
      cityName.value = '';
      countryCode.value = '';
      this.form = true;
      
    } else  {
      this.vacioAlerta();
    }
  }


  async vacioAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      message: 'Por favor, ingrese un valor valido',
      buttons: ['OK']
    });
    await alert.present();
  }


  async notfoundAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      message: 'No se ha encontrado la ciudad. Por favor, verifique si los datos son correctos.',
      buttons: ['OK']
    });
    await alert.present();
  }


}
