import { Component, inject } from '@angular/core';
import { GameStateSotre } from './store/game.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  imports: [],
  providers: [GameStateSotre],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  gameState = inject(GameStateSotre);
  router = inject(Router);

  readonly ABC = [...'abcdefghijklmnopqrstuvwxyz'];

  onExitClick() {
    this.gameState.endGame();
    this.router.navigate(['/', 'home']);
  }
}
