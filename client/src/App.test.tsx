import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { unmountComponentAtNode } from "react-dom";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = document.getElementById("app-root");
  expect(linkElement).toBeInTheDocument();
});
