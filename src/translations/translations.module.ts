import {  NgModule } from '@angular/core';
import { TranslationsPipe } from './translations.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TranslationsPipe],
  exports: [TranslationsPipe],
  imports: [CommonModule]
})
export class TranslationsModule {}
