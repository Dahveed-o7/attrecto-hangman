import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { GameStorage } from './shared/services/game-storage';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./menu-page/menu-page').then((m) => m.MenuPage),
  },
  {
    path: 'game',
    loadComponent: () => import('./game-page/game-page').then((m) => m.GamePage),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin-page/admin-page').then((m) => m.AdminPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      let savedGame = inject(GameStorage).getSavedGame();
      return savedGame ? '/game' : '/home';
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
