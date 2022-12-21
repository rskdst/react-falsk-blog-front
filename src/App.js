
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import React,{useEffect} from "react";
import Register from "./pages/register";
import Jliu from "./pages/jliu";
import Article from "./pages/article"

function App() {

    useEffect(()=>{

    },[])
  return (
      <>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/jliu" element={<Jliu/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/article" element={<Article/>} />
          <Route path="*" element={<Layout/>} />
        </Routes>

      </>


  );
}

export default App;
