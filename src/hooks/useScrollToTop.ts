import { useEffect } from "react";

const useScrollToTop = (inputs: any[]) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, inputs);
};

export default useScrollToTop;
