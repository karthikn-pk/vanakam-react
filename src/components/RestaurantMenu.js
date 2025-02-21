import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resid } = useParams();

  const menuInfo = useRestaurantMenu(resid);
  const [openIndex, setOpenIndex] = useState(null); // State to track the index of the open category

  const Recommendcategories =
    menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (cat) =>
        cat?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const { name, cuisines, costForTwoMessage } =
    menuInfo?.data?.cards[2]?.card?.card?.info || {};
  return (
    <div className="text-center   font-roboto">
      <h1 className="font-bold  text-xl my-6">{name}</h1>
      <h1>
        {cuisines} - {costForTwoMessage}
      </h1>
      {Recommendcategories
        ? Recommendcategories.map((item, index) => (
            <RestaurantCategory
              key={item?.card?.card?.title}
              isOpen={index === openIndex} // Pass isOpen prop to determine if the category is open
              toggleCategory={() => {
                setOpenIndex(index === openIndex ? null : index); // Toggle the index of the open category
              }}
              data={item?.card?.card}
            />
          ))
        : null}
    </div>
  );
};

export default RestaurantMenu;
