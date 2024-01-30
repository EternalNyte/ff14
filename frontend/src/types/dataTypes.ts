export type JobData = {
  id: number;
  name: string;
  short_name: string;
}

export type AbilityData = {
  id: number;
  name: string;
  job_id: number;
  recast: number;
  duration: number;
  type: string;
  amount: string;
  target: string;
}

export type CSVData = (string | number)[][];

