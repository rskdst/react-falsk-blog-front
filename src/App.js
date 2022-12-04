
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import React from "react";
import Register from "./pages/register";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Layout/>} />
        </Routes>

      </div>


  );
}

export default App;