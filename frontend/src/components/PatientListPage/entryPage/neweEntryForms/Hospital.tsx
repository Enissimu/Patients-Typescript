import { Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { BaseEntryProps } from "../../../../types/propTypes";
import { DiagnosisCodesMultipleSelectCheckmarks } from "./diagnosisCodeInput";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SyntheticEvent, useState } from "react";
import { Diagnosis } from "../../../../types/types";

export const Hospital = ({
  description,
  date,
  specialist,
  onSubmit,
}: BaseEntryProps) => {
  const [criteria, setCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis["code"][]>([]);

  const sendEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const discharge = { criteria, date: dischargeDate };
    onSubmit({
      description,
      specialist,
      date,
      diagnosisCodes: diagnoses,
      discharge,
      type: "Hospital",
    });
  };
  return (
    <div>
      <form onSubmit={sendEntry}>
        <div>
          <Typography>Discharge</Typography>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Criteria"
                variant="standard"
                onChange={({ target }) => setCriteria(target.value)}
                value={criteria}
              />
            </Grid>

            <Grid item>
              <InputLabel>Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="date"
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                ></TextField>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </div>
        <div>
          <DiagnosisCodesMultipleSelectCheckmarks
            setDiagnoses={setDiagnoses}
          ></DiagnosisCodesMultipleSelectCheckmarks>
        </div>

        <Button color="inherit" variant="contained" type="button">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};
