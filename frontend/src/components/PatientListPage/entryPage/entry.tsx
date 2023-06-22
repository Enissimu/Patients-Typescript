import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../../types/types";
import { getAll } from "../../../services/diagnosses";

import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { HealthCheckRating } from "../../../types/types";

const assertNever = (x: never): never => {
  throw new Error("Unexpected object: " + x);
};

const HealthCheckRate = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon style={{ color: "green" }}></FavoriteIcon>;
    case 1:
      return <FavoriteIcon style={{ color: "yellowgreen" }}></FavoriteIcon>;

    case 2:
      return <FavoriteIcon style={{ color: "yellow" }}></FavoriteIcon>;

    case 3:
      return <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>;

    default:
      return <></>;
  }
};

const DiagnosesList = ({
  diagnoses,
  didiagnoses,
}: {
  diagnoses: string[];
  didiagnoses: Diagnosis[];
}) => {
  return (
    <ul>
      {diagnoses.map((a, index) => {
        const findDiagnose = didiagnoses.find((b) => b.code === a);

        return (
          <li key={index}>
            {" "}
            {a} {findDiagnose?.name}{" "}
          </li>
        );
      })}
    </ul>
  );
};

const CommonProps = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>{entry.description} </p>
      <p>specialist: {entry.specialist} </p>{" "}
    </div>
  );
};

export const SingleEntry = ({ entry }: { entry: Entry }) => {
  const [didiagnoses, setDidiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await getAll();
      setDidiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <strong> {entry.date} </strong>
          <MedicalServicesIcon></MedicalServicesIcon>

          <CommonProps entry={entry}></CommonProps>

          {entry.diagnosisCodes ? (
            <DiagnosesList
              didiagnoses={didiagnoses}
              diagnoses={entry.diagnosisCodes}
            ></DiagnosesList>
          ) : (
            <></>
          )}
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div>
          <strong> {entry.date} </strong>

          <CommonProps entry={entry}></CommonProps>
          <WorkIcon></WorkIcon>
          {entry.diagnosisCodes ? (
            <DiagnosesList
              didiagnoses={didiagnoses}
              diagnoses={entry.diagnosisCodes}
            ></DiagnosesList>
          ) : (
            <></>
          )}
        </div>
      );

    case "HealthCheck":
      return (
        <div>
          <strong> {entry.date} </strong>
          <MedicalServicesIcon></MedicalServicesIcon>
          <HealthCheckRate rating={entry.healthCheckRating}></HealthCheckRate>
          <CommonProps entry={entry}></CommonProps>
        </div>
      );

    default:
      return assertNever(entry);
  }
};
