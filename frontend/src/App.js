import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Signup from "./components/SignupComponent";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddEntry from "./components/AddEntry"
import EntriesList from "./components/EntriesList"
import UpdateEntry from "./components/UpdateEntry"
import ProfileComponent from "./components/ProfileComponent"

function App() {
  return (
    <div className="bg-container">
      <BrowserRouter>
        <Nav />
        <Routes>
            <Route element={<PrivateComponent />} />
            <Route path="/entries" element={<EntriesList/>} />
            <Route path="/add" element={<AddEntry/>} />
            <Route path="/update/:id" element={<UpdateEntry/>} />
            <Route path="/logout" element={<h1>logout Component</h1>} />
            <Route path="/" element={<h1><ProfileComponent/></h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
