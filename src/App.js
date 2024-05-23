import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { GlobalContextComponent } from "./global-context/GlobalContextComponent";
import Login from "./pages/Login.page";
import Protectd from "./pages/Protected.page";
import Admin from "./pages/Admin.page";
import NotFound from "./pages/NotFound.page";
import { FetchAnimation } from "../src/functions/FetchData.function";

function App() {
    return (
        <GlobalContextComponent>
            <section className="app">
                <FetchAnimation />
                <Toaster position="top-right" reverseOrder={false} />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin/*" element={<Protectd Component={Admin} />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </section>
        </GlobalContextComponent>
    );
}

export default App;
