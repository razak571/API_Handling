import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // let [products, error, loading] = customReactQuery("/api/products");

  const [products, setProducts] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });

        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          log("Request Cancelled", error.message);
        }
        setError(true);
        setLoading(false);
      }
    })();

    //cleanup
    return () => {
      controller.abort();
    };
  }, [search]);

  // if (error) {
  //   return <h1>Something went wrong...!</h1>;
  // }

  // if (loading) {
  //   return <h1>Loading....</h1>;
  // }

  return (
    <>
      <h1>Chai aur API in React</h1>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h1>Loading...</h1>}
      {error && <h1>Somthing went wrong..!</h1>}

      {/* <button onClick={fetchData}>Fetch Data</button> */}
      <h3>Product name is: {products.length} </h3>
    </>
  );
}

export default App;

// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState("");
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setError(false);
//         setLoading(true);
//         const response = await axios.get(urlPath);
//         console.log(response.data);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//       }
//     })();
//   }, []);
//   return [products, error, loading];
// };
