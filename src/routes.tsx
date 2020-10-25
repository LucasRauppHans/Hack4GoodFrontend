import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/LandingPage";

function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={Landing} />
         </Switch>
      </BrowserRouter>
   );
}

export default Routes;
