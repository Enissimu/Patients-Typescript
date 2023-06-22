import { newEntry } from "./types";

export interface BaseSetEntryProps {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
}

export interface BaseEntryProps {
  description: string;
  date: string;
  specialist: string;
  onSubmit: (values: newEntry) => void;
}
