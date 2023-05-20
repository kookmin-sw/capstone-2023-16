import { LabelAndScore } from "../graphQL/types/Stats";

export function toStatsSingleInput(arr: LabelAndScore[]) {
  const labels = arr.map(a => a.label);
  const scores = arr.map(a => a.score);
  return [labels, scores];
}

export function toStatsPairedInput(arr: LabelAndScore[]) {
  const data = arr.map(a => ({ x: a.label, y: a.score }));
  return [{ data }];
};