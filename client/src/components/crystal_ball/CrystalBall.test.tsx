import React from "react";
import { render, fireEvent, act, waitForElement } from "@testing-library/react";
import CrystalBall from "./CrystalBall";
import { unmountComponentAtNode } from "react-dom";
import axios from "axios";

jest.mock("axios");

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

test("renders CrystalBall", () => {
  let linkElement: any = null;

  act(() => {
    const { getByText } = render(<CrystalBall />);
    linkElement = getByText(/What is your future/i);
  });

  expect(linkElement).toBeInTheDocument();
});

test("renders message from backend", async () => {
  // Setup
  axios.get.mockResolvedValue({ data: "message!" });
  act(() => {
    const { getByText } = render(<CrystalBall />);
    fireEvent.click(getByText(/Get My Fortune Told/i));
  });

  // Get results
  const msgElement: any = await waitForElement(() =>
    document.getElementById("msg")
  );
  const text: string = msgElement.innerHTML.valueOf();

  // Assert
  expect(msgElement).toBeInTheDocument();
  expect(text).toContain("message!");
});
