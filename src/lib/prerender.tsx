import { createContext, useContext } from "react";
export const PrerenderContext = createContext(false);
export const usePrerender = () => useContext(PrerenderContext);