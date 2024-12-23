import { Pipe, PipeTransform } from '@angular/core';
import { TranslationsService } from './translations.service';

@Pipe({
  name: 'translations'
})
export class TranslationsPipe implements PipeTransform {
  constructor(public translationService: TranslationsService) {}

  transform(key: string, lang: string): string {
    return this.translationService.translate(key, lang);
  }

}
