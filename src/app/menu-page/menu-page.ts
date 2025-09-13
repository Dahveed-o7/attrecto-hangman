import { Component, inject, signal } from '@angular/core';
import { GameStorage } from '../shared/services/game-storage';
import { Difficulty } from '../shared/types/difficulty.type';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu-page',
  imports: [RouterLink, NgClass],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  gameStorageService = inject(GameStorage);

  difficulty = signal(this.gameStorageService.getDifficulty());

  selectDifficulty(difficulty: Difficulty) {
    this.gameStorageService.setDifficulty(difficulty);
    this.difficulty.set(difficulty);
  }
}
