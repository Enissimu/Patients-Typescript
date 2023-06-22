import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect } from "react";
import { getAll } from "../../../../services/diagnosses";
import { Diagnosis } from "../../../../types/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let names: string[] = [];

export const DiagnosisCodesMultipleSelectCheckmarks = ({
  setDiagnoses,
}: {
  setDiagnoses: React.Dispatch<React.SetStateAction<Diagnosis["code"][]>>;
}) => {
  const [diagnosisCode, setDiagnosisCode] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await getAll();
      names = diagnoses.map((a) => a.code);
    };
    void fetchDiagnosisList();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCode>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setDiagnoses(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={diagnosisCode}
          onChange={handleChange}
          input={<OutlinedInput label="Code" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((code) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={diagnosisCode.indexOf(code) > -1} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
