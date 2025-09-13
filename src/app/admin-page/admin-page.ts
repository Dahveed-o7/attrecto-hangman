import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GameStorage } from '../shared/services/game-storage';
import { Router, RouterModule } from '@angular/router';
import { uniqueWordValidator } from '../shared/validators/unique-word.validator';

@Component({
  selector: 'app-admin-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage {
  gameStorageService = inject(GameStorage);
  fb = inject(NonNullableFormBuilder);
  router = inject(Router);
  words = signal(this.gameStorageService.getWordList());

  addWordForm = this.fb.group({
    userWord: this.fb.control('', [
      Validators.minLength(6),
      Validators.maxLength(14),
      Validators.required,
      uniqueWordValidator(this.words),
    ]),
  });

  onSubmit() {
    console.log(this.addWordForm);
    if (this.addWordForm.invalid) {
      return;
    }
    const userWord = this.addWordForm.controls.userWord.value;
    this.words.update((words) => [...words, userWord]);
    this.gameStorageService.addWord(userWord);
    this.addWordForm.controls.userWord.updateValueAndValidity();
  }

  onCancel() {
    this.router.navigate(['home']);
  }
}
