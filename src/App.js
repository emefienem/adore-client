import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/header/Header";
import Pages from "./components/mainpages/Pages";
import Footer from "./components/footer/Footer";
import Newsletter from "./components/mainpages/information/NewsLetter";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
          <Newsletter />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
