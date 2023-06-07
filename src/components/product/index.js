import React, { useContext } from "react";
import products from "../../assets/data/products.json";
import "./style.scss";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../../ThemeContext";
const Products = (props) => {
  const [data, setData] = React.useState([]);
  const {theme} = useContext(ThemeContext);
  const breadCrumbs = [
    { title: "Menu", link: "#" },
    { title: "Food", link: "#" },
    { title: "Hamburger" },
  ];
  React.useEffect(() => {
    // implementing search logic to filter the array and to avoide case sensetive, here I have convert the string into lowerCase
    if (props.search) {
      const filtered = products.filter((el) => {
        if (el.name.toLowerCase().includes(props.search.toLowerCase())) {
          return el;
        } else {
          return false;
        }
      });
      setData(filtered);
    } else {
      setData(products);
    }
  }, [props.search]);

  /**
 * Adding item to cart
 * @param  {object} ele object to add into cart state
 */
  const addToCart = (ele) => {
    const cartString = localStorage.getItem("cart");
    ele.quantity = 1;
    // checking if the cart is already set in local storage or not
    if (cartString) {
      const cartData = JSON.parse(cartString);
      const array = upsert(cartData, ele);
      localStorage.setItem("cart", JSON.stringify(array));
      props.setCartItems(() => [...array]);
    } else {
      localStorage.setItem("cart", JSON.stringify([ele]));
      props.setCartItems([ele]);
    }
  };


  /**
 * Upsert method is an utility to update the element if found else add into array
 * @param  {Array} array array in which we need to find the element
 * @param  {Object} element object to add or update into array
 * @return {Array}    returns the updated array
 */
  function upsert(array, element) {
    // checking the product id if exist in array then upgrade the quantity or else add the element into array
    const i = array.findIndex((_element) => _element.id === element.id);
    if (i > -1) {
      array[i].quantity = array[i].quantity + 1;
    } else array.push(element);
    return array;
  }

  return (
    <div className={`mainContainer ${theme}`}>
      <div className="categoryInfoWrapper">
        <div className="categoryInfo">
          <Icon icon="iconoir:page-left" className="catIcon" height={54} />
          <div className="catDetails">
            <h2 className="catTitle">Hamburger</h2>
            <span className="catDesc">Discover whatever you need easily</span>
          </div>
        </div>
        <div className="breadCrumbs">
          <ul>
            {breadCrumbs.map((ele, key) => {
              return (
                <li key={key}>
                  {ele.link ? (
                    <a href={ele.link}>{ele.title}</a>
                  ) : (
                    <span>{ele.title}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="productContainer">
        {data.map((ele, key) => {
          return (
            <div
              key={key}
              className="productCard"
              onClick={() => {
                addToCart(ele);
              }}
            >
              <div className="imgWrapper">
                <img src={ele.image} alt={ele.image} />
              </div>
              <p className="productName">{ele.name}</p>
              <p className="productPrice">{ele.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Products;
