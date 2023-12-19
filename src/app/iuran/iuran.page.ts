import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-iuran',
  templateUrl: './iuran.page.html',
  styleUrls: ['./iuran.page.scss'],
})
export class IuranPage implements OnInit {
  public info!: string; // Ganti dengan nama yang sesuai
  isMenuOpen = false;
  infoData: any[] = [];
  tahunList: any[] = []; // Pastikan inisialisasi

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.getIuran();
  }

  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // Inisialisasi tahunList jika diperlukan
     // Isi dengan data tahun yang diperlukan
  }


  getPayment() {
    // Panggil metode sesuai kebutuhan Anda, contoh:
    // this._apiService.getPaymentByYear(this.searchYear).then((res: any) => { ... });
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

  async getIuran() {
    await this.storage.create();
    this._apiService.getIuran().then((res: any) => {
      console.log('Response from getIuran:', res);
      if (res.msg == 'ok') {
        this.infoData = res.data;
      } else if (res.msg == 'err') {
        this.presentToast('Something went wrong:' + String(res.err), 'danger', 'alert-circle-outline');
      }
    });
  }
}
