export interface SpeedRegistry {
  distancePerStroke: string;
  speedCalculated: string;
  sprocketTeeth: number;
  chainringTeeth: number;
  cadence: number;
  diameter: number;
}

export interface RatioData {
  speedRegistry: SpeedRegistry;
  sprocketTeeth: number;
  chainringTeeth: number;
  ratio: number;
}

export interface SpeedChartData {
  chainRingTeeth: string;
  speeds: string[];
}
