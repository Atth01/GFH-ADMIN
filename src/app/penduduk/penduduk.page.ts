import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-penduduk',
  templateUrl: './penduduk.page.html',
  styleUrls: ['./penduduk.page.scss'],
})
export class PendudukPage implements OnInit {
  public penduduk!: string;
  constructor(private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    this.penduduk = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
