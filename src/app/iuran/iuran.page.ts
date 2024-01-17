import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-iuran',
  templateUrl: './iuran.page.html',
  styleUrls: ['./iuran.page.scss'],
})
export class IuranPage implements OnInit {
  info!: string;
  isMenuOpen = false;
  infoData: any[] = [];
  tahunList: any[] = [];
  searchNIK: string = '';
  selectedStatus: string = 'all';
  filteredInfoData: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.getIuran();
  }

  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  getPayment() {
    // Panggil metode sesuai kebutuhan Anda
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

  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.filteredInfoData = this.infoData.filter((info: any) => info.kd_penduduk.includes(this.searchNIK));

      if (this.filteredInfoData.length > 0) {
        this.presentToast('Data berhasil ditemukan!', 'success', 'checkmark-circle-outline');
      } else {
        this.presentToast('Data tidak ditemukan.', 'warning', 'alert-circle-outline');
        this.getIuran();
      }
    } else {
      this.getIuran();
    }
  }

  async getIuran() {
    await this.storage.create();
    this._apiService.getIuran().then((res: any) => {
      console.log('Response from getIuran:', res);
      if (res.msg == 'ok') {
        this.infoData = res.data;
        this.filterByStatus(); // Memastikan data sudah difilter saat pertama kali diambil
      } else if (res.msg == 'err') {
        this.presentToast('Something went wrong:' + String(res.err), 'danger', 'alert-circle-outline');
      }
    });
  }

  edit(kd_iuran: string) {
    console.log('kd_iuran:', kd_iuran);

    if (kd_iuran && kd_iuran.trim() !== '') {
      this.navCtrl.navigateRoot('/updateiuran?kd_iuran=' + kd_iuran);
    } else {
      this.presentToast('Invalid kd_iuran value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_iuran: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this information?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete_Iuran(kd_iuran);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Iuran(kd_iuran: string) {
    try {
      const res = await this._apiService.delete_Iuran(kd_iuran);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getIuran(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteInfo:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  goToInfoPage() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }

  exportToExcel() {
    if (this.infoData && this.infoData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.infoData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'InfoData');
      XLSX.writeFile(wb, 'iuran_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }

  filterByStatus() {
    if (this.selectedStatus === 'all') {
      this.filteredInfoData = [...this.infoData];
    } else {
      this.filteredInfoData = this.infoData.filter((info: any) => info.status.toString() === this.selectedStatus);
    }
  }
}
