export interface diagnoseType {
  code: string;
  name: string;
  latin?: string;
}

export interface patientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
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
  diagnosisCodes?: diagnoseType["code"][];
  sickLeave?: sickLeave;
  type: "OccupationalHealthcare";
}

export interface HospitalEntry extends BaseEntry {
  diagnosisCodes?: diagnoseType["code"][];
  discharge: discharge;
  type: "Hospital";
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type plainHospital = Omit<HospitalEntry, "id">;
export type plainHealtcare = Omit<OccupationalHealthcareEntry, "id">;

export type plainCheck = Omit<HealthCheckEntry, "id">;

export type newEntry = UnionOmit<Entry, "id">;

export type newPatientEntry = Omit<patientType, "id">;

export type patientPreview = Omit<patientType, "ssn" | "entries">;
