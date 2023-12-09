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
    { title: 'Penduduk', url: '/penduduk', icon: 'mail' },
    { title: 'Info', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Iuran', url: '/folder/favorites', icon: 'heart' },
    { title: 'Pesan', url: '/folder/archived', icon: 'mail' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  // Fungsi untuk memicu tampilan dan penyembunyian side menu
  toggleMenu() {
    this.menu.toggle();
  }
}
