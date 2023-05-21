import { LabelAndScore } from "../graphQL/types/Stats";

export function toTitleOption(text: string, deviceType: string){
  return { title: { text, style: { fontSize: deviceType === 'mobile' ? '12px' : '20px' } } };
};

export function toFontSizeOption(deviceType: string) {
  return ({
    dataLabels: {
      style: {
        fontSize: deviceType === 'mobile' ? '10px' : '20px',
        colors: ['#fff'],
      }
    }
  })
};

export function toStatsSingleInput(arr: LabelAndScore[]) {
  const labels = arr.map(a => a.label);
  const scores = arr.map(a => a.score);
  return [labels, scores];
}

export function toStatsPairedInput(arr: LabelAndScore[]) {
  const data = arr.map(a => ({ x: a.label, y: a.score }));
  return [{ data }];
};