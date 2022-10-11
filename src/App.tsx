import { useEffect, useState } from "react";
import { greet } from "./utils/greet";
import axios, { Axios } from "axios";

const baseUrl = process.env.NODE_ENV === "production" ? "https://env-var-testing.onrender.com/" : "http://localhost:4000"

function App(): JSX.Element {

  const [message, setMessage] = useState<string>();
  // const [isFirstLoad, setIsFirstLoad] = useState(true);

  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    // try... catch documentation:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      const res = await fetch(`${baseUrl}${endpoint}`);
      const body = await res.json();
      setMessage(body.message);
    } catch (err) {
      console.log(err);
      setMessage(`${err.name}: ${err.message}`);
    }
  };

  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    // if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/");
      // setIsFirstLoad(false);
    // }
  },[]);


  return <>
      <h1>{greet("World")}</h1>
      <p>this is my backend response:{` ${message}`}</p>

  </>

  
}

export default App;
