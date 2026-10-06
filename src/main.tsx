import { render } from "preact";
import { LazyMotion, domAnimation } from "framer-motion";
import "./index.css";
import { Page } from "./page";

render(
  <LazyMotion features={domAnimation} strict>
    <Page />
  </LazyMotion>,
  document.getElementById("root") as HTMLElement
);
