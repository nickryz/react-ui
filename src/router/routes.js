import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage/HomePage.jsx";
import AboutPage from "@/pages/AboutPage/AboutPage.jsx";
import App from "@/App.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
    ],
  },
]);

export default routes;
