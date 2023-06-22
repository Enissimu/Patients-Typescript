import patientData from "../data/patients";
import {
  Entry,
  newEntry,
  newPatientEntry,
  patientPreview,
  patientType,
} from "../type/types";
import { createNewId } from "../utils/utils";

const getPatients = (): patientType[] => {
  return patientData;
};
const getNonSensetivePatients = (): patientPreview[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const newPatient = (patient: newPatientEntry): patientType => {
  const newPatientOb = { id: createNewId(), ...patient };
  patientData.push(newPatientOb);
  return newPatientOb;
};

const newEntry = (entry: newEntry, patient: patientType): Entry => {
  const newEntryFor = { id: createNewId(), ...entry };
  patient.entries.push(newEntryFor);

  return newEntryFor;
};

export default {
  getPatients,
  newPatient,
  getNonSensetivePatients,
  newEntry,
};
