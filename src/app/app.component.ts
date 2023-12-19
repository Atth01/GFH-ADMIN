// Import yang diperlukan
import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Referensi ke IonMenu
  @ViewChild(IonMenu) menu!: IonMenu;

  // Daftar halaman menu
  public appPages = [
    { title: 'Penduduk', url: '/penduduk', icon: 'people' },
    { title: 'Info', url: '/info', icon: 'information' },
    { title: 'Iuran', url: '/iuran', icon: 'cash' },
    { title: 'Pesan', url: '/pesan', icon: 'chatbox' },
    { title: 'Blok', url: '/blok', icon: 'home' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  // Fungsi untuk memicu tampilan dan penyembunyian side menu
  toggleMenu() {
    this.menu.toggle();
  }
}
