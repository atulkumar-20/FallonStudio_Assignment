import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Users } from "./page/Users";
import { Admin } from "./page/Admin";
import { Home } from "./page/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
