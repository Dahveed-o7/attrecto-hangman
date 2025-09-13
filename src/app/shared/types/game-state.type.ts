export type GameState = {
  readonly word: string;
  readonly state: 'playing' | 'win' | 'lose';
  readonly guesses: readonly string[];
  readonly incorrectGuesses: number;
};
