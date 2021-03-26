import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GlobalStyles from "./global";
import SafeProvider from "./contexts/SafeContext";
import VaultProvider from "./contexts/VaultsContext";

ReactDOM.render(
  <SafeProvider>
    <VaultProvider>
      <GlobalStyles />
      <App />
    </VaultProvider>
  </SafeProvider>,
  document.getElementById("root"),
);
