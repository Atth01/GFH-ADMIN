import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/penduduk',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'penduduk',
    loadChildren: () => import('./penduduk/penduduk.module').then( m => m.PendudukPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'pesan',
    loadChildren: () => import('./pesan/pesan.module').then( m => m.PesanPageModule)
  },
  {
    path: 'updatependuduk',
    loadChildren: () => import('./updatependuduk/updatependuduk.module').then( m => m.UpdatependudukPageModule)
  },
  {
    path: 'updateinfo',
    loadChildren: () => import('./updateinfo/updateinfo.module').then( m => m.UpdateinfoPageModule)
  },
  {
    path: 'addpenduduk',
    loadChildren: () => import('./addpenduduk/addpenduduk.module').then( m => m.AddpendudukPageModule)
  },
  {
    path: 'updateiuran',
    loadChildren: () => import('./updateiuran/updateiuran.module').then( m => m.UpdateiuranPageModule)
  },
  {
    path: 'addinfo',
    loadChildren: () => import('./addinfo/addinfo.module').then( m => m.AddinfoPageModule)
  },
  {
    path: 'blok',
    loadChildren: () => import('./blok/blok.module').then( m => m.BlokPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
