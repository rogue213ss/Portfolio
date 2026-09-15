import { useEffect, useState } from "react";

/**
 * True on devices with a fine pointer and hover support (typical desktop/
 * trackpad setups). Used to gate the custom cursor, particle density, and
 * other effects that don't make sense — or don't perform well — on touch.
 */
export function useIsDesktopPointer(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(query.matches);
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
