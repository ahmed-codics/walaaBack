import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Client from "./pages/Client";

function App() {
  return (
    <div className="flex h-screen font-montserrat ">
      <Sidebar cla/>
      <div className="flex-1 p-4 ml-64 overflow-auto"> {/* Ensure content is visible */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
