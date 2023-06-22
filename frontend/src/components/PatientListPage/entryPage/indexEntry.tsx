import { useParams } from "react-router-dom";
import patients from "../../../services/patients";
import { useEffect, useState } from "react";
import { PatientGetValues, newEntry } from "../../../types/types";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CircleIcon from "@mui/icons-material/Circle";
import { SingleEntry } from "./entry";
import { Box } from "@mui/material";
import { NewEntryForm } from "./newEntryForm";
import axios from "axios";
import patientService from "../../../services/patients";

export const PatientEntry = () => {
  const [Patiente, SetPatient] = useState<PatientGetValues>();
  const { patientId } = useParams();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patients.getOne(patientId);
      SetPatient(patient);
    };

    void fetchPatient();
  }, []);

  const submitNewEntry = async (values: newEntry) => {
    try {
      const entry = await patientService.postNewEntry(values, patientId);
      if (Patiente !== undefined) {
        const newPatient = {
          ...Patiente,
          entries: Patiente.entries.concat(entry.data),
        };
        SetPatient(newPatient);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError(e?.response?.data.error);
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        SetPatient(Patiente);
      }
    }
  };

  return (
    <div>
      <h3>
        {Patiente?.name}{" "}
        {Patiente?.gender === "Female" ? (
          <FemaleIcon></FemaleIcon>
        ) : Patiente?.gender === "Male" ? (
          <MaleIcon></MaleIcon>
        ) : (
          <CircleIcon></CircleIcon>
        )}{" "}
      </h3>

      <div>ssh: {Patiente?.ssn}</div>
      <div>occupation: {Patiente?.occupation} </div>

      <NewEntryForm onSubmit={submitNewEntry} error={error}></NewEntryForm>
      <h5>Entries</h5>

      {Patiente?.entries.map((a, index) => (
        <Box
          key={index}
          borderColor="primary.main"
          borderTop={4}
          borderBottom={4}
          borderRight={4}
          borderLeft={4}
          sx={{ borderRadius: 1 }}
        >
          <SingleEntry key={index} entry={a}></SingleEntry>
        </Box>
      ))}
    </div>
  );
};
