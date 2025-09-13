import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  localStorage = globalThis.localStorage;

  getItem<T>(key: string) {
    if (!this.localStorage) {
      return null;
    }
    const item = this.localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : null;
  }

  setItem<T>(key: string, value: T) {
    if (!this.localStorage) {
      return false;
    }

    this.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  removeItem(key: string) {
    if (!this.localStorage) {
      return false;
    }

    this.localStorage.removeItem(key);
    return true;
  }
}
