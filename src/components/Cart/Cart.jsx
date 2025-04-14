import React from "react";
import classes from "./Cart.module.css";
import { FaHeadset } from "react-icons/fa";
const Cart = ({ medicineLines, removeItem, setMedicineLines }) => {
  // Calculate order summary
  const calculateSubtotal = () => {
    return medicineLines.reduce((sum, item) => {
      // Ensure both price and quantity are valid numbers
      const price = Number(item.unit_price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.08; // 8% discount
  const shipping = 60;
  const total = subtotal - discount + shipping;

  const removeAll = () => {
    setMedicineLines([]);
    console.log("Remove all items");
  };

  const decreaseQuantity = (id) => {
    setMedicineLines((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Make sure quantity is a number and doesn't go below 1
          const currentQty = Number(item.quantity) || 0;
          const newQty = currentQty > 1 ? currentQty - 1 : 0;
          return {
            ...item,
            quantity: newQty,
          };
        }
        return item;
      })
    );
    console.log(`Decrease quantity for item ${id}`);
  };

  const increaseQuantity = (id) => {
    setMedicineLines((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Make sure quantity is a number
          const currentQty = Number(item.quantity) || 0;
          return {
            ...item,
            quantity: currentQty + 1,
          };
        }
        return item;
      })
    );
    console.log(`Increase quantity for item ${id}`);
  };

  // Ensure we have valid medicine lines

  return (
    <>
      <div className={classes.medOrder}>
        <div className={classes.cartSection}>
          <h2>Medicine Cart</h2>
          <div className={classes.cardWrapper}>
            <div className={classes.cartContainer}>
              {/* Left Side - Cart Items */}
              <div className={classes.cartItemsWrapper}>
                {/* Cart Info */}
                <div className={classes.cartInfo}>
                  <div className={classes.infoIcon}>ℹ️</div>
                  <div className={classes.cartInfoText}>
                    <h4>Check Your Medicine Before Checkout</h4>
                    <p>Make Sure You Ordered Right Medicine</p>
                  </div>
                </div>

                {/* Cart Header */}
                <div className={classes.cartHeaderBorder}>
                  <div className={classes.cartHeader}>
                    <div className={classes.cartTitle}>
                      Cart{" "}
                      <span className={classes.itemCount}>
                        {medicineLines.length}{" "}
                        {medicineLines.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <button
                      className={classes.removeAllBtn}
                      onClick={removeAll}
                    >
                      Remove All
                    </button>
                  </div>
                </div>

                {/* Cart Items - Scrollable */}
                <div className={classes.cartItems}>
                  {medicineLines.map((item) => {
                    // Ensure price and quantity are valid numbers
                    const price = Number(item.unit_price) || 0;
                    const qty = Number(item.quantity) || 0;
                    const itemTotal = price * qty;

                    return (
                      <div className={classes.cartItem} key={item.id}>
                        <div className={classes.itemDetails}>
                          <h4>{item.name || "Unnamed Product"}</h4>
                          <p>
                            {item.manufacturer || item.pharmaceuticals} |{" "}
                            {item.dosage || item.strength} |{" "}
                            {item.type || item.form}
                          </p>
                          <p className={classes.itemPrice}>
                            ৳{price.toFixed(2)} Per {item.packageType || "Unit"}
                          </p>
                        </div>
                        <div className={classes.itemActions}>
                          <div className={classes.quantityControl}>
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className={classes.quantityBtn}
                            >
                              −
                            </button>
                            <span className={classes.quantity}>{qty}</span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className={classes.quantityBtn}
                            >
                              +
                            </button>
                          </div>
                          <div className={classes.itemTotal}>
                            <span>৳{itemTotal.toFixed(2)}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className={classes.removeBtn}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Summary */}
            <div className={classes.cartSummary}>
              <div className={classes.summaryRow}>
                <span className={classes.label}>
                  Subtotal ( {medicineLines.length}{" "}
                  {medicineLines.length === 1 ? "item" : "items"})
                </span>
                <span className={classes.value}>৳ {subtotal.toFixed(2)}</span>
              </div>
              <div className={classes.summaryRow}>
                <span className={classes.label}>Discount (8%)</span>
                <span className={classes.discount}>
                  ৳ -{discount.toFixed(2)}
                </span>
              </div>
              <div
                className={`${classes.summaryRow} ${classes.borderedBottom}`}
              >
                <span className={classes.label}>Shipping</span>
                <span className={classes.value}>৳ {shipping}</span>
              </div>
              <div
                className={`${classes.summaryRow} ${classes.borderedBottom}`}
              >
                <span className={classes.totalLabel}>Total (With Vat)</span>
                <div className={classes.totalGroup}>
                  <span className={classes.oldTotal}>
                    ৳ {subtotal.toFixed(2)}
                  </span>
                  <span className={classes.totalAmount}>
                    ৳ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                className={`${classes.freeDelivery} ${classes.borderedBottom}`}
              >
                <div className={classes.truckIcon}>🚚</div>
                <div className={classes.freeDeliveryText}>
                  <h4>Enjoy Free Delivery!</h4>
                  <p>Over 1500 Taka Order</p>
                </div>
              </div>

              <button className={classes.checkoutBtn}>Checkout</button>
            </div>
          </div>
          <div className={classes.container}>
            <FaHeadset className={classes.icon} />
            <div className={classes.textWrapper}>
              <p className={classes.title}>For Any Query Please Call At</p>
              <p className={classes.numbers}>
                +880 1969908181 &nbsp; | &nbsp; +880 1571016461
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
