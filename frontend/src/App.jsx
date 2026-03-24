import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import News from "./pages/News";
import ProjectDetails from "./pages/ProjectDetails";
import AboutInitiative from "./pages/AboutInitiative";
import Testimonials from "./pages/Testimonials"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/initiative" element={<AboutInitiative />} />
        <Route path="/testimonials" element={<Testimonials />} />  {/* Add Testimonials route */}
       
      </Routes>
    </Router>
  );
}

export default App;