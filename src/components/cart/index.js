import React, { useMemo,useContext } from "react";
import "./style.scss";
import { Icon } from "@iconify/react";
import { pdf } from "@react-pdf/renderer";
import PrintBill from "./printBill";
import { ThemeContext } from "../../ThemeContext";
const Cart = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const {theme} = useContext(ThemeContext)
  const taxAmount = 10;
  // using memo hook to returned a memorized value for performance
  const getSubTotal = useMemo(() => {
    let subTotal = 0;
    if (props.cartItems.length) {
      props.cartItems.forEach((element) => {
        const price = element.price.replace("$", "");
        subTotal = subTotal + parseFloat(price) * element.quantity;
      });
    }
    return subTotal;
  }, [props.cartItems]);

  /**
   * [To handle the cart items]
   * @param  {int} idx [Index of the item]
   * @param  {Boolean} isIncrease [flag to increase or decrease the quantity]
   */
  const modifyQty = (idx, isIncrease) => {
    let arr = props.cartItems;
    if (isIncrease) {
      arr[idx].quantity = arr[idx].quantity + 1;
    } else {
      if (arr[idx].quantity === 1) {
        arr.splice(idx, 1);
      } else {
        arr[idx].quantity = arr[idx].quantity - 1;
      }
    }
    props.setCartItems([...arr]);
  };

  /**
   * RenderPdf and calling the download function to download the pdf
   */
  const renderPDF = async () => {
    // calling pdf method and converting the response to blob;
    const blob = await pdf(
      <PrintBill
        details={props.cartItems}
        getSubTotal={getSubTotal}
        taxAmount={taxAmount}
      />
    ).toBlob();
    downloadBlob(blob);
  };

  /**
   * To download the pdf
   * @param  {blob} blob blob which we need to convert into pdf
   * @param  {string} name file name default is Invoice
   */
  function downloadBlob(blob, name = "Invoice.pdf") {
    if (window.navigator && window.navigator.msSaveOrOpenBlob)
      return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = data;
    link.target="_blank";

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  return (
    <div className={`cartContainer ${theme}`}>
      {!isVisible ? (
        <button
          className="btnCart"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <Icon icon="grommet-icons:cart" height={30} color="#ec5753" />
        </button>
      ) : (
        <>
          <div className="cartModal">
            <div className="cartHeader">
              <div>
                <h3 className="title">My Orders</h3>
                <span className="desc">Take Out</span>
              </div>
              <button
                className="closeBtn"
                onClick={() => {
                  setIsVisible(false);
                }}
              >
                <Icon icon="simple-line-icons:close" className="btnCloseIcon" height={30} />
              </button>
            </div>
            {props.cartItems.length ? (
              <>
                <div className="cartItemsWrapper">
                  {props.cartItems.map((ele, key) => {
                    return (
                      <div key={key} className="cartItemCard">
                        <div className="imgWrapper">
                          <img src={ele.image} alt={ele.name} />
                        </div>
                        <div className="itemDetails">
                          <p>{ele.name}</p>
                          <div className="price-qty">
                            <span className="lblPrice">{ele.price}</span>
                            <div className="qtyWrapper">
                              <Icon
                                icon="gg:remove-r"
                                onClick={() => {
                                  modifyQty(key, false);
                                }}
                              />
                              <p>{ele.quantity}</p>
                              <Icon
                                className="iconAdd"
                                icon="basil:add-solid"
                                height={24}
                                onClick={() => {
                                  modifyQty(key, true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="summary">
                  <div className="wrapper">
                    <span>Subtotal</span>
                    <span>$ {getSubTotal.toFixed(2)}</span>
                  </div>
                  <div className="wrapper">
                    <span>Tax ({taxAmount}%)</span>
                    <span>
                      $ {((getSubTotal * taxAmount) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="wrapper total">
                    <span>Total</span>
                    <span>
                      ${" "}
                      {((getSubTotal * taxAmount) / 100 + getSubTotal).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <div className="btnWrapper">
                    <button
                      className="btnPrint"
                      onClick={() => {
                        renderPDF();
                      }}
                    >
                      Print Bills
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>No Items Added</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
