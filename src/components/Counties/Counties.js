import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import useSearchValueState from "../../context/useSearchValueState";
import useSearchValueDispatch from "../../context/useSearchValueDispatch";

import { endpoints } from "../../config/constants";
import searchUtil from "../../utils/searchUtil";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import ContentCard from "../ContentCard/ContentCard";
import ContentMessage from "../ContentMessage/ContentMessage";

import useStyles from "./Counties.style";

const Counties = () => {
  const classes = useStyles();
  const { stateId } = useParams();
  let { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const requestURLConst = `for=county:*&in=state:${Number(stateId)}`;

  const { data, error } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService
  );

  useEffect(() => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div data-testid="id-counties-error">
        <Link className={classes.link} to={"/"}>
          <ContentMessage
            type="message"
            title="No data found!"
            description="Let's try with another State."
          />
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div data-testid="id-counties-progress">
        <ContentMessage type="progress" />
      </div>
    );
  }

  const searchResults = searchUtil(data.data, searchValue);

  if (
    (Array.isArray(searchResults) && searchResults.length === 0) ||
    searchResults === undefined
  ) {
    return (
      <div data-testid="id-states-no-search-results">
        <ContentMessage
          type="message"
          title="No Search Results Found!"
          description="Let's ask again."
        />
      </div>
    );
  }

  return (
    <Container
      data-testid="id-counties-container"
      className={classes.root}
      maxWidth="md"
    >
      <Typography variant="h1" className={classes.title}>
        Counties
      </Typography>
      <Divider className={classes.divider} />
      {searchResults.map(
        (county) =>
          county.NAME &&
          county.state &&
          county.county && (
            <ContentCard
              key={Number(county.county)}
              title={county.NAME}
              population={county.POP}
              density={county.DENSITY}
            />
          )
      )}
    </Container>
  );
}

export default Counties;
