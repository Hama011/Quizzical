import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Options from "./components/Options";
import Quiz from "./components/Quiz";

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Options />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </main>
  );
}

export default App;
