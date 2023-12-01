import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";

function AllBeersPage() {
  const [beers, setBeers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://ih-beers-api2.herokuapp.com/beers")
      .then((response) => {
        console.log(response);
        setBeers(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    const fetchSearchedBeers = async () => {
      try {
        const response = await axios.get(
          `https://ih-beers-api2.herokuapp.com/beers/search?q=${query}`
        );

        setBeers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchedBeers();
  }, [query]);

  const searchHandler = (string) => {
    setQuery(string);
  };
  return (
    <>
      <div className="page-container">
        <div
          style={{ textAlign: "center", color: "#80461b", marginTop: "10px" }}
        >
          All Beers{" "}
        </div>

        <Search searchHandler={searchHandler} />

        <div className="beers-list-container">
          <ul className="beers-list">
            {beers.map((eachBeer) => {
              return (
                <li
                  key={eachBeer._id}
                  className="eachBeer-item"
                  style={{ listStyleType: "none" }}
                >
                  <img src={eachBeer.image_url} alt="Beer" />
                  <div className="beer-item-content">
                    <div className="middle">
                      <p>
                        <span>Name:</span>
                        <span>{eachBeer.name}</span>
                      </p>
                      <p>
                        <span>Tagline:</span>
                        <span>{eachBeer.tagline}</span>
                      </p>

                      <p className="card-text custom-text">
                        <span>Created By:</span>
                        <span>{eachBeer.contributed_by} </span>
                      </p>

                      <Link to={"/beers/" + eachBeer._id}>See details</Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AllBeersPage;
