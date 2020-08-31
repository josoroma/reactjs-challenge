import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { default as AppToolbar } from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import useSearchValueState from "../../context/useSearchValueState";
import useSearchValueDispatch from "../../context/useSearchValueDispatch";

import useStyles from "./Toolbar.style";

const Toolbar = () => {
  const classes = useStyles();
  let { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const handleOnChange = (value) => {
    dispatch({ type: "setSearchValueReducer", payload: value });
  };

  const handleOnCancelSearch = () => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
  };

  return (
    <header>
      <AppBar>
        <AppToolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={6}>
              <Link className={classes.link} to={"/"}>
                <Typography className={classes.title} variant="h6">
                  Population Estimates
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <SearchBar
                inputProps={{ "data-testid": "id-search-bar-input" }}
                value={searchValue}
                onChange={(value) => handleOnChange(value)}
                onCancelSearch={handleOnCancelSearch}
                closeIcon={<CloseIcon data-testid="id-search-close-icon" />}
              />
            </Grid>
          </Grid>
        </AppToolbar>
      </AppBar>
    </header>
  );
};

export default Toolbar;
