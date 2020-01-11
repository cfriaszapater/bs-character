import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./app";
import { givenAppStateWithMockData } from "./testUtil/givenAppStateWithMockData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it("renders without crashing", () => {
  const store = mockStore(givenAppStateWithMockData());
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
