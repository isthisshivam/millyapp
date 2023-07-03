import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/Store";
import AppWrapper from "./AppWrapper";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://c1b0f74a7c1d4496965449945cd10397@o4504374508126208.ingest.sentry.io/4504375048470528",
  enableInExpoDevelopment: true,
  maxBreadcrumbs: 10,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
