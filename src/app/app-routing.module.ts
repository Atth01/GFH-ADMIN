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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
