import { Component, OnInit } from '@angular/core'; // Tambahkan OnInit
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit { // Implementasi OnInit
  public info!: string;
  isMenuOpen = false;
  infoData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController
  ) {
    this.getInfo();
  }

  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async getInfo() {
    await this.storage.create();
        this._apiService.getInfo().then((res: any) => {
          if (res.msg == 'ok') {
            this.infoData = res.data;
          } else if (res.msg == 'notFound') {
            this.presentToast(
              'Belum ada info !',
              'warning',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            this.presentToast(
              'Something went wrong',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
}
