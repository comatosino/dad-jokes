import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

import Loader from "../Loader";

import "./App.css";

type JokeResponse = {
  joke: string;
  status: number;
};

const App: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [joke, setJoke] = useState<string>();

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    const url = "https://icanhazdadjoke.com";
    const reqConfig: AxiosRequestConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get<JokeResponse>(url, reqConfig);

      if (response.data.status !== 200) {
        throw new Error("Could not fetch joke!");
      }
      setJoke(response.data.joke);
    } catch (error) {
      console.log(error);
    }
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

        {/* reload the page to fetch a new image */}
        <button onClick={() => window.location.reload()}>
          Get another dad joke!
        </button>
      </section>
    </>
  );
};

export default App;
