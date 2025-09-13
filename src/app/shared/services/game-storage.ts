import { inject, Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { defaultWordList } from '../constants/word-list.constants';
import { GameState } from '../types/game-state.type';
import { Difficulty } from '../types/difficulty.type';

@Injectable({
  providedIn: 'root',
})
export class GameStorage {
  #localStorageService = inject(LocalStorage);

  getWordList() {
    return this.#localStorageService.getItem<readonly string[]>('words') || defaultWordList;
  }

  addWord(word: string) {
    let originalWords = this.getWordList();

    return this.#localStorageService.setItem('words', [...originalWords, word]);
  }

  getSavedGame() {
    return this.#localStorageService.getItem<GameState>('game');
  }

  saveGame(game: GameState) {
    return this.#localStorageService.setItem('game', game);
  }

  deleteSave() {
    return this.#localStorageService.removeItem('game');
  }

  getDifficulty() {
    return (this.#localStorageService.getItem('difficulty') ?? 'easy') as Difficulty;
  }

  setDifficulty(difficulty: Difficulty) {
    this.deleteSave();
    return this.#localStorageService.setItem('difficulty', difficulty);
  }
}
