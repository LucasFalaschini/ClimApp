import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Clima } from '../models/clima.model';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  clima;
  climaObj: Clima = new Clima();
  infoCargada: boolean = false;
  tipoClima: string = '';
  loading: boolean = true;

  constructor(private climaService: ClimaService,
              public loadingController: LoadingController) {
    // this.clima = climaService.cargarStorage(this.infoCargada);
    // this.cargarActual();
    // this.loading = true;
    // if(this.loading) {
    //   this.presentLoading();
    // }
  }
  
  ionViewWillEnter() {
    this.clima = this.climaService.cargarStorage(this.infoCargada);
    this.cargarActual();
    this.loading = false;
  }

  cargarActual() {
    this.climaService.getApi(this.clima.lugar, this.clima.codigo)
                      .subscribe(resp => {
                        this.clima = resp;
                        this.climaObj.lugar = this.clima.name;
                        this.climaObj.temperatura = this.clima.main.temp;
                        this.climaObj.min = this.clima.main.temp_min
                        this.climaObj.max = this.clima.main.temp_max
                        this.climaObj.humedad = this.clima.main.humidity
                        this.climaObj.codigo = this.clima.sys.country;
                        this.infoCargada = true;


                        // TODO Mas general
                        // this.climaObj.descripcion = this.clima.weather[0].main;
                        // if(this.climaObj.descripcion === 'Clear') {
                        //   this.tipoClima = 'cielo claro'
                        // }
                        // if(this.climaObj.descripcion === 'Clouds') {
                        //   this.tipoClima = 'algo de nubes'
                        // }
                        // if(this.climaObj.descripcion === 'Rain') {
                        //   this.tipoClima = 'lluvia de gran intensidad'
                        // }
                        // if(this.climaObj.descripcion === 'Snow') {
                        //   this.tipoClima = 'nevada ligera'
                        // }

                        // TODO Muy especifico
                        this.climaObj.descripcion = this.clima.weather[0].description;
                        console.log(this.climaObj);


                        if(this.climaObj.descripcion === 'cielo claro') {
                          this.tipoClima = 'cielo claro';
                        } 
                        if(this.climaObj.descripcion === 'nubes') {
                          this.tipoClima = 'nubes';
                        }
                        if(this.climaObj.descripcion === 'algo de nubes') {
                          this.tipoClima = 'algo de nubes';
                        }
                        if(this.climaObj.descripcion === 'nubes dispersas') {
                          this.tipoClima = 'nubes dispersas';
                        }
                        if(this.climaObj.descripcion === 'muy nuboso') {
                          this.tipoClima = 'muy nuboso';
                        }
                        if(this.climaObj.descripcion === 'lluvia ligera') {
                          this.tipoClima = 'lluvia ligera';
                        }
                        if(this.climaObj.descripcion === 'lluvia moderada') {
                          this.tipoClima = 'lluvia moderada';
                        }
                        if(this.climaObj.descripcion === 'lluvia de gran intensidad') {
                          this.tipoClima = 'lluvia de gran intensidad';
                        }
                        if(this.climaObj.descripcion === 'nevada ligera') {
                          this.tipoClima = 'nevada ligera';
                        }

                      })
  }

  doRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



  
}
