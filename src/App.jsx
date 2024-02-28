import "./App.css";

import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NotFoundPage from "./pages/PageNotFound";
import AddStudent from "./Pages/AddStudent";
import ViewStudent from "./Pages/ViewStudent";
import EditStudent from "./Pages/EditStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/add" element={<AddStudent />}></Route>
        <Route path="/edit/:id" element={<EditStudent />}></Route>
        <Route path="/view" element={<ViewStudent />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
