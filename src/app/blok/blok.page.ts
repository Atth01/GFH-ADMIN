import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-blok',
  templateUrl: './blok.page.html',
  styleUrls: ['./blok.page.scss'],
})
export class BlokPage implements OnInit {
  public blokData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private apiService: ApiserviceService,
    private toastCtrl: ToastController
  ) {
    this.getBlokData();
  }

  ngOnInit() {
    // Mendapatkan parameter 'kd' dari URL
    const kd = this.activatedRoute.snapshot.paramMap.get('kd');
    // Jika perlu mendapatkan atau menyimpan data di penyimpanan lokal
    const storedData = this.storage.get('some_key');
    // Panggil fungsi untuk mendapatkan data blok
    this.getBlokData();
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

  async getBlokData(kd?: string) {
    // Jika perlu menginisialisasi penyimpanan
    await this.storage.create();

    this.apiService.getBlok().then((res: any) => {
      if (res.msg == 'ok') {
        this.blokData = res.data;
      } else if (res.msg == 'notFound') {
        this.presentToast(
          'Belum ada blok!',
          'warning',
          'alert-circle-outline'
        );
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  // Contoh fungsi untuk berpindah halaman jika diperlukan
  goToOtherPage() {
    this.navCtrl.navigateForward('/other-page');
  }
}
