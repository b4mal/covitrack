import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, today, active, total, ...props  }) {
  return (
    <Card
      onClick = {props.onClick}
      className={`infoBox ${active && "infoBox--selected"}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary" gutterBottom>
          {title}
        </Typography>

        <h2 className="infoBox__today">
          {today}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
