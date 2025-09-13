import { TestBed } from '@angular/core/testing';

import { GameStorage } from './game-storage';

describe('GameStorage', () => {
  let service: GameStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
