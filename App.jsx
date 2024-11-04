import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPostForm from "./components/BlogPostForm";
import PostList from "./components/PostList";
import Up from "./components/Up";
import In from "./components/In";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<PostList/>}/>
            <Route path="/create" element={<BlogPostForm/>}/>
            <Route path="/signup" element={<Up/>}/>
            <Route path="/Signin" element={<In/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}
export default App;