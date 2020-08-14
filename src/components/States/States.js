import React from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import useSWR from "swr";

import { endpoints } from "../../config/constants";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import ContentCard from "../ContentCard/ContentCard";
import ContentMessage from "../ContentMessage/ContentMessage";

import useStyles from "./States.style";

function State() {
  const classes = useStyles();

  const requestURLConst = "for=state:*&DATE_CODE=1";

  const { data, error } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService
  );

  if (error) {
    return (
      <ContentMessage
        type="message"
        title="Good Catch!"
        description="Let's try gain."
      />
    );
  }

  if (!data) {
    return <ContentMessage type="progress" />;
  }

  const { data: response } = data;

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" className={classes.title}>
        US Population by State{" "}
        <small className={classes.smallTitle}>as per the 2010 US Census</small>
      </Typography>
      <Divider className={classes.divider} />
      {response.map(
        (state) =>
          state.NAME &&
          state.state && (
            <Link
              className={classes.link}
              key={Number(state.state)}
              to={`${Number(state.state)}/counties`}
            >
              <ContentCard
                title={state.NAME}
                population={state.POP}
                density={state.DENSITY}
              />
            </Link>
          )
      )}
    </Container>
  );
}

export default State;
