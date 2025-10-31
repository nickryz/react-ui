import useVh from "@/utils/useVh.js";
import MainHeader from "@/components/app/MainHeader.jsx";
import CanvasScreen from "@/components/app/CanvasScreen.jsx";
import AnimatedOutlet from "@/components/app/AnimatedOutlet.jsx";
import { SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import React from "react";

function App() {
  useVh();

  return (
    <>
      <CanvasScreen />
      <SmoothScrollbar />
      <MainHeader className="fixed w-full top-0 left-0" />
      <main>
        <AnimatedOutlet />
      </main>
    </>
  );
}

export default App;
