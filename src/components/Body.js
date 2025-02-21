import RestCard from "./RestCard";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listofCards, setlistofCards] = useState([]);
  const [filteredCards, setfilteredCards] = useState([]);

  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://quickbite-server-8hwk.onrender.com/api/restaurants?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setlistofCards(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredCards(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className="text-3xl text-center text-red-600 font-roboto font-bold">
        {" "}
        you are offline
      </h1>
    );

  return listofCards.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body font-roboto ">
      <div className="flex flex-wrap justify-center">
        <div>
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid border-black p-4 m-4 rounded-lg w-60"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
            placeholder="Search Your Food"
          />
          <button
            className="p-2 m-2 h-12 bg-[#FF9800]  text-xl rounded-lg"
            onClick={() => {
              const filteredSearch = listofCards.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredCards(filteredSearch);
              setsearchText("");
            }}>
            search
          </button>
          <button
            className="h-12 px-2 m-2 bg-[#FF9800]  text-xl  rounded-lg"
            onClick={() => {
              const filteredList = listofCards.filter(
                (res) => res.info.avgRating > 4.2
              );
              setfilteredCards(filteredList);
            }}>
            Top rated Restaurants
          </button>
          <button
            className="h-12 px-2 m-2 bg-[#00ff48]  text-xl  rounded-lg"
            onClick={() => {
              const filteredVeg = listofCards.filter((v) => v.info.veg == true);
              setfilteredCards(filteredVeg);
            }}>
            Veg
          </button>
        </div>
      </div>
      <div className="flex flex-wrap p-4 m-4 justify-center">
        {filteredCards.map((ele) => (
          <Link key={ele.info.id} to={"/menu/" + ele.info.id}>
            <RestCard restData={ele} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
