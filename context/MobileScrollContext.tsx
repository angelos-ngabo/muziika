"use client";

import { createContext, useContext, useRef, type RefObject } from "react";

interface MobileScrollContextValue {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export const MobileScrollContext = createContext<MobileScrollContextValue | null>(null);

export function useMobileScrollRoot(): RefObject<HTMLDivElement | null> | null {
  return useContext(MobileScrollContext)?.scrollRef ?? null;
}
