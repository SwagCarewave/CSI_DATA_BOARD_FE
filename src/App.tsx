// src/App.tsx

import { useEffect, useState } from "react";
import Skeleton from "./components/Skeleton";
import skeletonData from "./data/skeletonData.json";

function App() {
  const [frameIndex, setFrameIndex] = useState(0);

  const persons = skeletonData.persons;

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % persons.length);
    }, 300);

    return () => clearInterval(timer);
  }, [persons.length]);

  return (
    <div>
      <Skeleton frame={persons[frameIndex]} />
    </div>
  );
}

export default App;