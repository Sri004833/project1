
import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import ChartDisplay from "./components/ChartDisplay";
import Controls from "./components/Controls";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="App">
      {user ? (
        <div>
          <Dashboard />
          <Upload setData={setData} setFilteredData={setFilteredData} />
          {data.length > 0 && (
            <>
              <Controls data={data} setFilteredData={setFilteredData} />
              <ChartDisplay data={filteredData} />
            </>
          )}
        </div>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
