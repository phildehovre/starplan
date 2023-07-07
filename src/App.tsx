import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./components/Dashboard";
import "./Global.scss";
import RessourcePage from "./Pages/RessourcePage";
import Ressource from "./components/Ressource";
import SelectedTemplateContextProvider from "./contexts/SelectedTemplateContext";
import SelectedCampaignContextProvider from "./contexts/SelectedCampaignContext";
import New from "./components/New";

export const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY
);

function App() {
  return (
    <div className="App">
      <Router>
        <SelectedCampaignContextProvider>
          <SelectedTemplateContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<New />} />
                <Route path=":ressource" element={<RessourcePage />}>
                  {/* <Route path='' element={<Create />} /> */}
                  <Route path=":id" element={<Ressource />} />
                </Route>
              </Route>
            </Routes>
          </SelectedTemplateContextProvider>
        </SelectedCampaignContextProvider>
      </Router>
    </div>
  );
}

export default App;
