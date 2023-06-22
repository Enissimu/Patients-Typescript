import diagnoseData from "../data/diagnoses";
import { diagnoseType } from "../type/types";

const getDiagnoses = (): diagnoseType[] => {
  return diagnoseData;
};

export default { getDiagnoses };
