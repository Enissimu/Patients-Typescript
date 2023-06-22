import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";
import { HealthCheck } from "./neweEntryForms/heatlhCheck";
import { Hospital } from "./neweEntryForms/Hospital";
import { OccupationalHC } from "./neweEntryForms/OccupationalHC";
import { newEntry } from "../../../types/types";
import { BaseEntry } from "./neweEntryForms/baseEntry";

export enum Status {
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
}

interface newEntryFormProps {
  onSubmit: (values: newEntry) => void;
  error?: string;
}

export const NewEntryForm = ({ onSubmit, error }: newEntryFormProps) => {
  const [typeOfEntry, SetTypeOfEntry] = useState<Status>(Status.Hospital);

  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");

  return (
    <div>
      <Box component="div" sx={{ p: 2, border: "1px dashed grey" }}>
        <div>
          {error && <Alert severity="error">{error}</Alert>}

          <Button
            variant="contained"
            color={"error"}
            onClick={() => {
              SetTypeOfEntry(Status.HealthCheck);
            }}
          >
            HealthCheck
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => SetTypeOfEntry(Status.Hospital)}
          >
            Hospital
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => SetTypeOfEntry(Status.OccupationalHealthcare)}
          >
            OccupationalHealthcare
          </Button>
        </div>
        <BaseEntry
          setDescription={setDescription}
          setDate={setDate}
          setSpecialist={setSpecialist}
        ></BaseEntry>

        {typeOfEntry === Status.HealthCheck ? (
          <HealthCheck
            description={description}
            date={date}
            specialist={specialist}
            onSubmit={onSubmit}
          ></HealthCheck>
        ) : typeOfEntry === Status.Hospital ? (
          <Hospital
            description={description}
            date={date}
            specialist={specialist}
            onSubmit={onSubmit}
          ></Hospital>
        ) : (
          <OccupationalHC
            description={description}
            date={date}
            specialist={specialist}
            onSubmit={onSubmit}
          ></OccupationalHC>
        )}
      </Box>
    </div>
  );
};
