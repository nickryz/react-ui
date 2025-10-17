import useVh from "@/utils/useVh.js";
import MainHeader from "@/components/app/MainHeader.jsx";
import { Outlet } from "react-router";
import LenisScroll from "@/components/app/LenisScroll.jsx";

function App() {
  useVh();

  return (
    <>
      <LenisScroll />
      <MainHeader className="fixed w-full top-0 left-0" />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
