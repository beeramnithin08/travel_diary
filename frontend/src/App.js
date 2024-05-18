import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Signup from "./components/SignupComponent";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddEntry from "./components/AddEntry";
import EntriesList from "./components/EntriesList";
import UpdateEntry from "./components/UpdateEntry";
import ProfileComponent from "./components/ProfileComponent";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="bg-container">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProfileComponent />} />
            <Route path="/entries" element={<EntriesList />} />
            <Route path="/add" element={<AddEntry />} />
            <Route path="/update/:id" element={<UpdateEntry />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
