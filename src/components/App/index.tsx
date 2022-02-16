import { useState, useEffect } from "react";
import API from "../../utils/api";
import Loader from "../Loader";
import "./App.css";

const App: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [joke, setJoke] = useState<string>();

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    const nextJoke = await API.getJoke();
    if (!nextJoke) setJoke("Could not find a joke! Is this some kind of joke?!");
    else setJoke(nextJoke);
  };

  return (
    <>
      <Loader loaded={loaded} />

      <section className={loaded ? "content fade-in" : "content"}>
        <header>
          <h1>Dad Jokes</h1>
        </header>
        <img
          id="beard-box"
          src="https://placebeard.it/g/360/480/notag"
          alt="bearded fellow"
          onLoad={() => setLoaded(true)}
        />

        <footer>
          <p id="joke-box">{joke}</p>
        </footer>

        <button onClick={() => window.location.reload()}>
          Get another dad joke!
        </button>
      </section>
    </>
  );
};

export default App;
