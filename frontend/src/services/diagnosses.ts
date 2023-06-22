import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types/types";

export const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};
