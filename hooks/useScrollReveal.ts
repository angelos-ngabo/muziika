import { useEffect, useRef, useState } from "react";
import { useMobileScrollRoot } from "@/context/MobileScrollContext";

function isInScrollView(node: HTMLElement, root: HTMLElement | null): boolean {
  if (!root) {
    const rect = node.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  }

  const nodeRect = node.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  return nodeRect.top < rootRect.bottom - 24 && nodeRect.bottom > rootRect.top + 24;
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const scrollRootRef = useMobileScrollRoot();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const root = scrollRootRef?.current ?? null;

    if (isInScrollView(node, root)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        root,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [scrollRootRef]);

  return { ref, visible };
}
