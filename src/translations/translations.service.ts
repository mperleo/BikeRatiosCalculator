import { Injectable } from '@angular/core';
import { LANGUAJES } from '../emuns';


@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private translations = {
    formCardHeader: {
      es: 'Indica los datos de la transmisión',
      en: 'Indicate gearing data',
    },
    bikeDataCardHeader: {
      es: 'Indica los otros datos de la bici',
      en: 'Indicate other bike data',
    },
    tableCardHeader: {
      es: 'Tabla de velocidades',
      en: 'Speed records table',
    },
    graphCardHeader: {
      es: 'Gráfco de ratios',
      en: 'Ratio graph',
    },
    chainringTeethLabel: {
      es: 'Dientes del plato',
      en: 'Chainring teeth',
    },
    sprocketTeethLabel: {
      es: 'Dientes del piñon',
      en: 'Sprocket teeth',
    },
    unitLabel: {
      es: 'Unidad',
      en: 'Unit',
    },
    distancePerSrokeLabel: {
      es: 'Distancia por pedalada',
      en: 'Distance per pedal stroke',
    },
    wheelSizeLabel: {
      es: 'Diámetro de rueda',
      en: 'Wheel diameter',
    },
    speedLabel: {
      es: 'Velocidad',
      en: 'Speed',
    },
    cadenceLabel: {
      es: 'Cadencia',
      en: 'Cadence',
    },
    calculateButton: {
      es: 'Calcular',
      en: 'Calculate',
    },
    deleteFormButton: {
      es: 'Borrar formulario',
      en: 'Clear form',
    },
    credits: {
      es: 'Creado por',
      en: 'Created by ',
    },
    ratioLabel: {
      es: 'Ratio',
      en: 'Ratio',
    },
  };

  constructor() {}

  public translate(key: string, lang: string): string {
    let text: string = '';
    Object.keys(this.translations).some((k) => {
      if (key === k) {
        if (lang === LANGUAJES.ES) {
          text = Object(this.translations)[key].es;
        } else if (lang === LANGUAJES.EN) {
          text = Object(this.translations)[key].en;
        }
      }
    });

    return text;
  }
}
