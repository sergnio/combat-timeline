import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CombatTimeline from "./CombatTimeline";
import styled from "styled-components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CombatTimeline />
  </React.StrictMode>
);
