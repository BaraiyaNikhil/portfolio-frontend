// src/context/CursorContext.jsx
import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorText, setCursorText] = useState("");
  const [active, setActive] = useState(false);

  return (
    <CursorContext.Provider value={{ cursorText, setCursorText, active, setActive }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
