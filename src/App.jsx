import { useState } from "react";
import InfoDisplay from "./components/InfoDisplay";
import Search from "./components/Search";

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (value) => {
    setCity(value);
  };

  return (
    <div className="relative w-fit h-fit border-2 border-black bg-white rounded-2xl">
      <Search onSearch={handleSearch} />
      {city && <InfoDisplay city={city} />}
    </div>
  );
}

export default App;
