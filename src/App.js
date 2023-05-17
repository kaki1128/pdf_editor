import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./DocTemplate/Preview";
import Setting from "./DocTemplate/Setting";

function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Setting />} />
                <Route exact path="/preview" element={<Preview />} />
            </Routes>
        </Router >
    )
}

export default App;