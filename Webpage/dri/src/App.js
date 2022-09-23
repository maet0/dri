import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agb from "./pages/Agb";
import Datenschutz from "./pages/Datenschutz";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import ScrollToTop from "./helpers/scrollToTop";
import { Helmet } from "react-helmet"


function App() {
  return (
    <Router>
      <Helmet>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28b4e4" />
        <meta name="msapplication-TileColor" content="#28b4e4" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agb" element={<Agb />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </Router>

  );
};

export default App;