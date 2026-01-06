import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

/* HOME */
import HomePage from "./Components/HomeComponent/HomePage";

/* AUTH */
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";

/* DASHBOARDS */
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";

/* ITEMS */
import LostItemEntry from "./Components/ItemComponent/LostItemEntry";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemEntry from "./Components/ItemComponent/FoundItemEntry";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";

/* CHAT */
import ChatMessage from "./Components/MessageComponent/ChatMessage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* DASHBOARDS */}
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/StudentMenu" element={<StudentMenu />} />

        {/* ITEMS */}
        <Route path="/lost-entry" element={<LostItemEntry />} />
        <Route path="/lost-report" element={<LostItemReport />} />
        <Route path="/found-entry" element={<FoundItemEntry />} />
        <Route path="/found-report" element={<FoundItemReport />} />

        {/* CHAT */}
        <Route path="/chat" element={<ChatMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
