export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
  type: "HealthCheck";
}

export interface sickLeave {
  startDate: string;
  endDate: string;
}

export interface discharge {
  date: string;
  criteria: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  diagnosisCodes?: Diagnosis["code"][];
  sickLeave?: sickLeave;
  type: "OccupationalHealthcare";
}

export interface HospitalEntry extends BaseEntry {
  diagnosisCodes?: Diagnosis["code"][];
  discharge: discharge;
  type: "Hospital";
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type newEntry = UnionOmit<Entry, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type PatientGetValues = Omit<Patient, "id">;
