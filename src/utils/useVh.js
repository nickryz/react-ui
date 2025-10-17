import { useEffect } from "react";
import { useWindowSize } from "@reactuses/core";

function useVh() {
  const { height } = useWindowSize();

  useEffect(() => {
    const updateVh = () => {
      if (!height) return;
      // Calculate 1% of the actual window innerHeight
      const newVh = height * 0.01;
      // Set the CSS custom property --vh
      document.documentElement.style.setProperty("--vh", `${newVh}px`);
    };

    // Initial call to set the value
    updateVh();
  }, [height]); // Empty dependency array ensures this runs only once on mount
}

export default useVh;
