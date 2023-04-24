import { useEffect, useState } from "react";

export const useSSR = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return { isBrowser };
};
