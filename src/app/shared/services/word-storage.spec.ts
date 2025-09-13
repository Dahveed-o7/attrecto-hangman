import { TestBed } from '@angular/core/testing';

import { WordStorage } from './word-storage';

describe('WordStorage', () => {
  let service: WordStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
