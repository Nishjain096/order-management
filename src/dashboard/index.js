import React,{useContext} from "react";
import "./style.scss";
import Header from "../components/header";
import Products from "../components/product";
import Cart from "../components/cart";
import { ThemeContext } from "../ThemeContext";
const Dashboard = () => {
    const [search, setSearch] = React.useState("");
    const [cartItems, setCartItems] = React.useState("");
    const { theme} = useContext(ThemeContext);

    // getting the localStorage value into state if any 
    React.useEffect(() => {
        const cartString = localStorage.getItem("cart");
        if (cartString ) {
            const cartData = JSON.parse(cartString);
            setCartItems(cartData);
        }
    }, [])
    return (<>
        <div className={`container ${theme}`}>
            {/* passing search set method to get the searched value from header and passing into products component to search */}
            <Header setSearch={setSearch} />
            <Products search={search} setCartItems={setCartItems} />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
    </>)
}

export default Dashboard;