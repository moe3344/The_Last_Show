import Navbar from "./components/Navbar";
import ObituaryCard from "./components/ObituaryCard";
import { useState, useEffect} from "react";

const App = () => {
  const [obituaries, setObituaries] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
    fetch("http://localhost:5000/get-all-obituaries")
      .then((r) => r.json())
      .then((obituaries) => {
        obituaries = JSON.parse(obituaries.body);
        console.log("typeof: ", typeof obituaries);
        if (obituaries.length === 0) {
          setIsEmpty(true);
        } else {
          setObituaries(obituaries);
          setIsEmpty(false);
        }
      });
  }, [refresh]);

  const handleRefreshObituaries = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Navbar refreshObituaries={handleRefreshObituaries} />
      <div className="flex p-12">
        <main
          className={`${
            isEmpty ? " justify-center items-center h-screen" : " h-auto justify-start items-start"
          } flex flex-wrap w-full flex-1 text-center gap-12`}
        >
          {isEmpty && "No Obituary Yet"}
          {obituaries &&
            obituaries.map((obituary) => (
              <ObituaryCard key={obituary.id} obituary={obituary} />
            ))}
        </main>
      </div>
    </>
  );
};

export default App;
