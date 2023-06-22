import { Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DiagnosisCodesMultipleSelectCheckmarks } from "./diagnosisCodeInput";
import { BaseEntryProps } from "../../../../types/propTypes";
import { SyntheticEvent, useState } from "react";
import { Diagnosis } from "../../../../types/types";

export const OccupationalHC = ({
  description,
  date,
  specialist,
  onSubmit,
}: BaseEntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis["code"][]>([]);
  const [employee, setEmployee] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const sendEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const sickLeave = {
      endDate,
      startDate,
    };
    onSubmit({
      description,
      specialist,
      date,
      sickLeave,
      diagnosisCodes: diagnoses,
      employerName: employee,
      type: "OccupationalHealthcare",
    });
  };

  return (
    <div>
      <form onSubmit={sendEntry}>
        <div>
          <TextField
            label="Employee"
            variant="standard"
            value={employee}
            onChange={({ target }) => setEmployee(target.value)}
          />
        </div>
        <DiagnosisCodesMultipleSelectCheckmarks
          setDiagnoses={setDiagnoses}
        ></DiagnosisCodesMultipleSelectCheckmarks>{" "}
        <div>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="date"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                ></TextField>{" "}
              </LocalizationProvider>{" "}
            </Grid>

            <Grid item>
              <Typography>End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="date"
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                ></TextField>
              </LocalizationProvider>
            </Grid>
          </Grid>
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
