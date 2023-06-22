import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckRating } from "../../../../types/types";
import { useState } from "react";

const StyledRating = styled(Rating)(({ theme }: { theme: any }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <FavoriteIcon color="success" />,
    label: "Healthy",
  },
  2: {
    icon: <FavoriteIcon color="secondary" />,
    label: "LowRisk",
  },
  3: {
    icon: <FavoriteIcon color="warning" />,
    label: "HighRisk",
  },
  4: {
    icon: <FavoriteIcon color="error" />,
    label: "CriticalRisk",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export const RadioGroupRating = ({
  setHCR,
}: {
  setHCR: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}) => {
  const [HealthLabel, setHealthLabel] = useState("LowRisk");

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const key = Number(event.target.value) - 1;
      const HCR = Number(
        Object.keys(HealthCheckRating).find((h) => Number(h) === key)
      );
      setHealthLabel(customIcons[event.target.value].label);
      if (HCR) {
        setHCR(HCR);
      }
    }
  };

  return (
    <div>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
        max={4}
        IconContainerComponent={IconContainer}
        onChange={radioHandler}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
      <a> {HealthLabel} </a>
    </div>
  );
};
