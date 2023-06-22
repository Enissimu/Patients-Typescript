import { TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BaseSetEntryProps } from "../../../../types/propTypes";

export const BaseEntry = ({
  setDescription,
  setDate,
  setSpecialist,
}: BaseSetEntryProps) => {
  return (
    <div>
      <div>
        <TextField
          label="description"
          variant="standard"
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div>
        <TextField
          label="specialist"
          variant="standard"
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>

      <Typography> Date</Typography>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            type="date"
            onChange={({ target }) => setDate(target.value)}
          ></TextField>
        </LocalizationProvider>
      </div>
    </div>
  );
};
