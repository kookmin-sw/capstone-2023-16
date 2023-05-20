export type GetPersonaFollowerStatisticsInputType = {
  opt: {
    personaId: string,
    resultLimit?: number,
  }
};

export type LabelAndScore = {
  label: string,
  score: number,
};

export type GetPersonaFollowerStatisticsResultType = {
  getPersonaFollowersStatistics?: {
    categoryScores: LabelAndScore[],
    genderScores: LabelAndScore[],
    jobScores: LabelAndScore[],
    tagScores: LabelAndScore[],
  }|any,
};