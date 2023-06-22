import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils/utils";
import { patientType } from "../type/types";
const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientService.getNonSensetivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const found: patientType | undefined = patientService
    .getPatients()
    .find((a) => a.id === id);

  if (found) {
    return res.json(found);
  } else {
    return res.status(404);
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const found: patientType | undefined = patientService
    .getPatients()
    .find((a) => a.id === id);

  if (found) {
    try {
      const toNewEntryOb = toNewEntry(req.body);
      const newEntryOb = patientService.newEntry(toNewEntryOb, found);
      return res.json(newEntryOb);
    } catch (error: unknown) {
      let errorMessage = "Error is ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      return res.status(404).json({ error: errorMessage });
    }
  } else {
    return res.status(404);
  }
});

router.post("/", (req, res) => {
  try {
    const toNewPatientOb = toNewPatient(req.body);

    const newPatient = patientService.newPatient(toNewPatientOb);

    return res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Error is ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(404).json({ error: errorMessage });
  }
});

export default router;
