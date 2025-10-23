import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Problem1 from "./problem1/problem1";
import Problem2 from "./problem2/problem2";
import Problem3 from "./problem3/problem3";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="problem1" element={<Problem1 />} />
          <Route path="problem2" element={<Problem2 />} />
          <Route path="problem3" element={<Problem3 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
