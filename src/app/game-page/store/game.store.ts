import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { GameState } from '../../shared/types/game-state.type';
import { GameStorage } from '../../shared/services/game-storage';
import { afterNextRender, inject } from '@angular/core';
import { selectWord } from '../../shared/helpers/wordSelection.helper';
import { Difficulty } from '../../shared/types/difficulty.type';

export const mistakeLimit = 6;

const initialState: GameState = {
  guesses: [],
  incorrectGuesses: 0,
  state: 'playing',
  word: '',
};

export const GameStateSotre = signalStore(
  withState(initialState),

  withMethods((store, gameStorageService = inject(GameStorage)) => ({
    setGameState: (state: GameState) => {
      patchState(store, state);
    },
    startNewGame: () => {
      const wordList = gameStorageService.getWordList();
      const difficulty = gameStorageService.getDifficulty();
      const word = selectWord(difficulty, wordList);
      gameStorageService.saveGame({ ...initialState, word });
      patchState(store, { ...initialState, word });
    },
    guessLetter: (c: string) => {
      if (store.state() !== 'playing') {
        return;
      }
      let guesses = store.guesses().concat([c]);
      let word = store.word();
      let incorrectGuesses = store.incorrectGuesses();

      // letter not in word
      if (!store.word().includes(c)) {
        incorrectGuesses++;

        // did we lose?
        const state = incorrectGuesses === mistakeLimit ? 'lose' : 'playing';
        gameStorageService.saveGame({ guesses, incorrectGuesses, state, word });
        patchState(store, { incorrectGuesses, guesses, state });
        return;
      }

      // letter in word
      for (let letter of guesses) {
        word = word.replaceAll(letter, '');
      }

      // did we win?
      const state = word.length === 0 ? 'win' : 'playing';
      gameStorageService.saveGame({
        guesses,
        incorrectGuesses,
        state: 'playing',
        word: store.word(),
      });
      patchState(store, { guesses, state });
      return;
    },
    endGame: () => {
      gameStorageService.deleteSave();
    },
  })),
  withHooks({
    onInit: (store, gameStorageService = inject(GameStorage)) => {
      afterNextRender({
        read: () => {
          const loadedState = gameStorageService.getSavedGame();
          if (loadedState) {
            store.setGameState(loadedState);
          } else {
            store.startNewGame();
          }
        },
      });
    },
  })
);
