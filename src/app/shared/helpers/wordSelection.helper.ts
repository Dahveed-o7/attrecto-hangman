import { Difficulty } from '../types/difficulty.type';

export const selectWord = (difficulty: Difficulty, fromList: readonly string[]) => {
  const ranges = [
    [6, 8],
    [9, 11],
    [12, 14],
  ];
  let min = 6,
    max = 8;
  switch (difficulty) {
    case 'easy': {
      [min, max] = ranges[0];
      break;
    }
    case 'medium': {
      [min, max] = ranges[1];
      break;
    }
    case 'hard': {
      [min, max] = ranges[2];
      break;
    }
  }
  const filteredList = fromList.filter((val) => val.length >= min && val.length <= max);
  return filteredList[Math.floor(Math.random() * filteredList.length)];
};
