import useVh from "@/utils/useVh.js";
import MainHeader from "@/components/app/MainHeader.jsx";
import { Outlet } from "react-router";
import CanvasScreen from "@/components/app/CanvasScreen.jsx";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import TestScene from "@/components/canvas/TestScene.jsx";

function App() {
  useVh();

  return (
    <>
      <SmoothScrollbar />
      <CanvasScreen />
      <MainHeader className="fixed w-full top-0 left-0" />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
