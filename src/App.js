import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

// Custom Global State
import { SearchValueProvider } from "context/SearchValue";

// Layout Components
import { ContentMessage, Toolbar } from "components";

// Route Components/Screens
const States = React.lazy(() => import("components/States/States"));
const Counties = React.lazy(() => import("components/Counties/Counties"));

const App = () => (
  <div>
    <CssBaseline />
    <SearchValueProvider>
      <Suspense
        fallback={
          <div data-testid="id-app-load-page-progress">
            <ContentMessage type="progress" />
          </div>
        }
      >
        <Router>
          <Toolbar />
          <Switch>
            <Route path="/:stateId/counties">
              <Counties />
            </Route>
            <Route path="/">
              <States />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </SearchValueProvider>
  </div>
);

export default App;
