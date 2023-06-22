import { v1 as uuid } from "uuid";
import {
  Entry,
  Gender,
  HealthCheckRating,
  diagnoseType,
  discharge,
  newEntry,
  newPatientEntry,
  plainCheck,
  plainHealtcare,
  plainHospital,
  sickLeave,
} from "../type/types";

export const createNewId = (): string => {
  const id = uuid();
  return id;
};

const isEmpty = (text: string): boolean => {
  return text.trim() === "";
};

const isString = (text: unknown): text is string => {
  return text instanceof String || typeof text === "string";
};

const isNumber = (num: unknown): num is number => {
  return num instanceof String || typeof num === "number";
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

function isStringArray(array: unknown[]): array is string[] {
  return array.every((element) => typeof element === "string");
}

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const dateParser = (date: unknown): string => {
  if (!isString(date) || isEmpty(date) || !isDate(date)) {
    throw new Error("Enter date correctly" + date);
  }
  return date;
};

const criteriaParser = (criteria: unknown): string => {
  if (!isString(criteria) || isEmpty(criteria)) {
    throw new Error("Enter criteria correctly" + criteria);
  }
  return criteria;
};

const nameParser = (name: unknown): string => {
  if (!isString(name) || isEmpty(name)) {
    throw new Error("Enter name correctly" + name);
  }
  return name;
};

const occupationParser = (occupation: unknown): string => {
  if (!isString(occupation) || isEmpty(occupation)) {
    throw new Error("Enter occupation correctly" + occupation);
  }
  return occupation;
};
const ssnParser = (ssn: unknown): string => {
  if (!isString(ssn) || isEmpty(ssn)) {
    throw new Error("Enter ssn correctly" + ssn);
  }
  return ssn;
};

const genderParser = (gender: unknown): Gender => {
  if (!isString(gender) || isEmpty(gender) || !isGender(gender)) {
    throw new Error("Enter gender correctly " + gender);
  }
  return gender;
};

const ratingParser = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isRating(rating)) {
    throw new Error("Enter rating correctly " + rating);
  }
  return rating;
};

const specialistParser = (specialist: unknown): string => {
  if (!isString(specialist) || isEmpty(specialist)) {
    throw new Error("enter specialist correctly" + specialist);
  }
  return specialist;
};
const employerNameParser = (EmployerName: unknown): string => {
  if (!isString(EmployerName) || isEmpty(EmployerName)) {
    throw new Error("enter EmployerName correctly" + EmployerName);
  }
  return EmployerName;
};

const descriptionParser = (description: unknown): string => {
  if (!isString(description) || isEmpty(description)) {
    throw new Error("enter description correctly" + description);
  }
  return description;
};

const parseDiagnosisCodes = (
  diagnosises: unknown[]
): Array<diagnoseType["code"]> => {
  if (
    !isStringArray(diagnosises) ||
    !diagnosises ||
    typeof diagnosises !== "object"
  ) {
    throw new Error("enter diagnoses codes correctly" + diagnosises);
  }

  return diagnosises;
};

const parsesickLeave = (sickLeave: unknown): sickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("enter sickLeave correctly");
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return {
      startDate: dateParser(sickLeave.startDate),
      endDate: dateParser(sickLeave.endDate),
    };
  }
  throw new Error("enter sickLeave correctly");
};

const parseDischarge = (dischagre: unknown): discharge => {
  if (!dischagre || typeof dischagre !== "object") {
    throw new Error("enter discharge correctly");
  }
  if ("date" in dischagre && "criteria" in dischagre) {
    return {
      date: dateParser(dischagre.date),
      criteria: criteriaParser(dischagre.criteria),
    };
  }
  throw new Error("enter discharge correctly");
};

export const toNewPatient = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("There is a problem with the object");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    if ("entries" in object) {
      return {
        name: nameParser(object.name),
        dateOfBirth: dateParser(object.dateOfBirth),
        ssn: ssnParser(object.ssn),
        gender: genderParser(object.gender),
        occupation: occupationParser(object.occupation),
        entries: object.entries as Entry[],
      };
    } else {
      return {
        name: nameParser(object.name),
        dateOfBirth: dateParser(object.dateOfBirth),
        ssn: ssnParser(object.ssn),
        gender: genderParser(object.gender),
        occupation: occupationParser(object.occupation),
        entries: [] as Entry[],
      };
    }
  }

  throw new Error("Something wrong with parameters");
};

export const toNewEntry = (object: unknown): newEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("There is a problem with the object");
  }

  if (
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          const returnedOb: plainHospital = {
            date: dateParser(object.date),
            specialist: specialistParser(object.specialist),
            description: descriptionParser(object.description),
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };

          if ("diagnosisCodes" in object) {
            returnedOb["diagnosisCodes"] = parseDiagnosisCodes(
              object.diagnosisCodes as unknown[]
            );
          }
          return returnedOb;
        }
        throw new Error("Discharge is missing");

      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const returnedOb: plainCheck = {
            date: dateParser(object.date),
            specialist: specialistParser(object.specialist),
            description: descriptionParser(object.description),
            type: "HealthCheck",
            healthCheckRating: ratingParser(object.healthCheckRating),
          };
          return returnedOb;
        }

        throw new Error("Health check rate is missing");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const returnedOb: plainHealtcare = {
            date: dateParser(object.date),
            specialist: specialistParser(object.specialist),
            description: descriptionParser(object.description),
            type: "OccupationalHealthcare",
            employerName: employerNameParser(object.employerName),
          };

          if ("diagnosisCodes" in object) {
            returnedOb["diagnosisCodes"] = parseDiagnosisCodes(
              object.diagnosisCodes as unknown[]
            );
          }
          if ("sickLeave" in object) {
            returnedOb["sickLeave"] = parsesickLeave(object.sickLeave);
          }
          return returnedOb;
        }

        throw new Error("Diagnosis code or sickleave is missing is missing");
    }
  }

  throw new Error("Something wrong with parameters");
};
