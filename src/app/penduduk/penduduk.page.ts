import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-penduduk',
  templateUrl: 'penduduk.page.html',
  styleUrls: ['penduduk.page.scss'],
})
export class PendudukPage {
  public Data: any;
  isReadOnly = false; // Define isReadOnly property

  public penduduk: string = '';

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private router: Router
  ) {
    this.getPenduduk();
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

  async getPenduduk() {
    await this.storage.create();
    // Adjust as needed, e.g., provide a default value or remove the parameter if not needed
    this._apiService.getPenduduk(/*val*/).then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.penduduk = String(res.data[0].penduduk);
      } else if (res.msg == 'err') {
        this.presentToast(
          'Something went wrong: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }

  update(nik: string) {
    console.log('nik:', nik);

    if (nik && nik.trim() !== '') {
      this.navCtrl.navigateRoot('/update?nik=' + nik);
    } else {
      this.presentToast('Invalid nik value', 'danger', 'alert-circle-outline');
    }
  }

  tambah() {
    this.navCtrl.navigateRoot('/create?penduduk=' + this.penduduk);
  }
}
