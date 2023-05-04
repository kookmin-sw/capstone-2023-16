export enum Gender {
  MALE,
  FEMALE,
}

export enum Job {
  STUDENT,
  EDUCATOR,
  JOB_SEEKER,
  EMPLOYEE,
  IT,
  FINANCE,
  ART,
  ETC,
}

export type PersonaInfo = {
  nickname: string;
  age: number;
  gender: Gender;
  introduction?: string;
  isPublic: boolean;
  job: Job;
};
