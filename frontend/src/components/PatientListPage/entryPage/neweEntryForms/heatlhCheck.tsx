import { Button } from "@mui/material";
import { BaseEntryProps } from "../../../../types/propTypes";
import { RadioGroupRating } from "./HealthRatingBar2";
import { SyntheticEvent, memo, useState } from "react";
import { HealthCheckRating } from "../../../../types/types";

export const HealthCheck = ({
  description,
  date,
  specialist,
  onSubmit,
}: BaseEntryProps) => {
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const sendEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      specialist,
      date,
      healthCheckRating,
      type: "HealthCheck",
    });
  };

  return (
    <div>
      <p>HealthCheck Rating</p>
      <form onSubmit={sendEntry}>
        <div>
          <RadioGroupRating setHCR={setHealthCheckRating}></RadioGroupRating>
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
