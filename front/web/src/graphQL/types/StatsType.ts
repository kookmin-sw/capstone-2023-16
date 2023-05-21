export type LabelAndScore = {
  label: string,
  score: number,
};


/* 특정 페르소나의 팔로워 통계 */
export type GetPersonaFollowerStatisticsInputType = {
  opt: {
    personaId: string,
    resultLimit?: number,
  }
};

export type GetPersonaFollowerStatisticsResultType = {
  getPersonaFollowersStatistics?: {
    categoryScores: LabelAndScore[],
    genderScores: LabelAndScore[],
    jobScores: LabelAndScore[],
    tagScores: LabelAndScore[],
  }|any,
};


/* 특정 게시물에 대한 독자 통계 */
export type PostReaderPersonaStatisticsInputType = {
  opt: {
    personaId: string,
    resultLimit?: number,
    revisionLimit?: number,
  }|any,
};

export type PostReaderPersonaStatisticsResultType = {
  getPostReaderStatistics?: {
    categoryScores: LabelAndScore[],
    genderScores: LabelAndScore[],
    jobScores: LabelAndScore[],
    tagScores: LabelAndScore[],
  }|any,
};