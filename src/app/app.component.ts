import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COLOR_PALETTE, LANGUAJES, PI, UNITS } from '../emuns';
import { TranslationsModule } from '../translations/translations.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { RatioData, SpeedChartData, SpeedRegistry } from '../interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    TranslationsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'BikeRatiosCalculator';
  public lang: string = LANGUAJES.ES;

  public chainrings: string = '';
  public sprokets: string = '';

  public diameter: number = 700;
  public cadence: number = 60;

  public rangeCalcs: RatioData[] = [];

  public unit: string = UNITS.MILIMETERS;

  public chartConfig: any;

  constructor() {}

  ngOnInit(): void {}

  public onReset(): void {
    this.chainrings = '';
    this.sprokets = '';
    this.diameter = 0;
    this.cadence = 0;
  }

  public onCalculateRatios(): void {
    const chainringTeeths: string[] = this.chainrings.trimEnd().split('-');
    const sprocketTeeths: string[] = this.sprokets.trimEnd().split('-');
    const diameterInMM = this.unitConverter(this.diameter, this.unit);

    const speedsforChainRing: SpeedChartData[] = [];

    const rangeCalcs: RatioData[] = [];
    chainringTeeths.forEach((chainringTeeth: string) => {
      const speedsforChaninring: SpeedChartData = {
        chainRingTeeth: chainringTeeth,
        speeds: [],
      };
      sprocketTeeths.forEach((sprocketTeeth: string) => {
        const ratio = (PI * diameterInMM * +chainringTeeth) / +sprocketTeeth;
        const ratioData: RatioData = {
          speedRegistry: this.calculateSpeedData(
            +chainringTeeth,
            +sprocketTeeth
          ),
          sprocketTeeth: +sprocketTeeth,
          chainringTeeth: +chainringTeeth,
          ratio: ratio,
        };
        rangeCalcs.push(ratioData);
        speedsforChaninring.speeds.push(
          ratioData.speedRegistry.speedCalculated
        );
      });
      speedsforChainRing.push(speedsforChaninring);
    });

    this.generateChart(sprocketTeeths, speedsforChainRing);
    this.rangeCalcs = rangeCalcs;

  }

  public onChangeLang(newLang: string) {
    this.lang = newLang;
  }

  public isLangSelected(lang:string): string {
    return lang === this.lang ? 'mx-3 selected ' : 'mx-3 text-white helvetica';
  }

  private calculateSpeedData(
    chainringTeeth: number,
    sprocketTeeth: number
  ): SpeedRegistry {
    const diameterInMM = this.unitConverter(this.diameter, this.unit);
    const distancePerStroke =
      (PI * diameterInMM * chainringTeeth) / sprocketTeeth;
    const speedCalculated = (this.cadence * 60 * distancePerStroke) / 1000;

    const newCalc: SpeedRegistry = {
      distancePerStroke: distancePerStroke.toFixed(2),
      speedCalculated: speedCalculated.toFixed(2),
      sprocketTeeth: sprocketTeeth,
      chainringTeeth: chainringTeeth,
      cadence: this.cadence,
      diameter: this.diameter,
    };

    return newCalc;
  }

  private generateChart(
    sprocketTeeths: string[],
    chainringSpeeds: SpeedChartData[]
  ) {
    let i = 0;
    let datasets = chainringSpeeds.map(
      (chainringData: SpeedChartData) => {
        let color = COLOR_PALETTE[i];
        i++;
        return {
          label: chainringData.chainRingTeeth,
          data: chainringData.speeds,
          borderColor: color,
          backgroundColor: color,
          yAxisID: 'y',
        };
      }
    );

    console.log(datasets);

    if(this.chartConfig){
      this.chartConfig.config.data = {
        labels: sprocketTeeths,
        datasets: datasets,
      };
      this.chartConfig.update();
    }
    else {
      this.chartConfig = new Chart('ratioChart', {
        type: 'line',
        data: {
          labels: sprocketTeeths,
          datasets: datasets,
        },
        options: {
          aspectRatio: 2.5,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: 'Ratio',
            },
          },
        },
      });
    }
  }

  private unitConverter(value: number, unit: string): number {
    let valueConverted: number = 0;

    switch (unit) {
      case UNITS.MILIMETERS:
        valueConverted = value / 1000;
        break;
      case UNITS.INCHES:
        valueConverted = value * 0.0254;
        break;
      default:
        break;
    }

    return valueConverted;
  }
}
