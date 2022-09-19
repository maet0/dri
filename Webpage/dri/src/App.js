import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agb from "./pages/Agb";
import Datenschutz from "./pages/Datenschutz";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import ScrollToTop from "./helpers/scrollToTop";


function App() {
  return (
    <Router>
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