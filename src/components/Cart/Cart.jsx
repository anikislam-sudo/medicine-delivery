import React, { useState } from "react";
import classes from "./Cart.module.css";

const Cart = () => {
  // Sample medicine data array
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Aboitb",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 10,
      quantity: 10,
      total: 200,
      packageType: "Unit",
    },
    {
      id: 2,
      name: "Aboitb",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 100,
      quantity: 2,
      total: 200,
      packageType: "Strip",
    },
    {
      id: 3,
      name: "Aboitb",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 1000,
      quantity: 1,
      total: 1000,
      packageType: "Packet",
    },
    {
      id: 4,
      name: "Napa One",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 245,
      quantity: 2,
      total: 490,
      packageType: "Strip",
    },
    {
      id: 5,
      name: "Aboitb",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 1000,
      quantity: 10,
      total: 2000,
      packageType: "Packet",
    },
    {
      id: 6,
      name: "Aboitb",
      manufacturer: "Veritas Pharmaceuticals Ltd.",
      dosage: "60 mg",
      type: "Capsule",
      pricePerUnit: 1000,
      quantity: 10,
      total: 2000,
      packageType: "Packet",
    },
  ]);

  // Calculate order summary
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.08; // 8% discount
  const shipping = 60;
  const total = subtotal - discount + shipping;

  const removeAll = () => {
    setCartItems([]);
    console.log("Remove all items");
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          return {
            ...item,
            quantity: newQuantity,
            total: item.pricePerUnit * newQuantity,
          };
        }
        return item;
      })
    );
    console.log(`Decrease quantity for item ${id}`);
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            total: item.pricePerUnit * newQuantity,
          };
        }
        return item;
      })
    );
    console.log(`Increase quantity for item ${id}`);
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    console.log(`Remove item ${id}`);
  };

  return (
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
                      {cartItems.length} items
                    </span>
                  </div>
                  <button className={classes.removeAllBtn} onClick={removeAll}>
                    Remove All
                  </button>
                </div>
              </div>

              {/* Cart Items - Scrollable */}
              <div className={classes.cartItems}>
                {cartItems.map((item) => (
                  <div className={classes.cartItem} key={item.id}>
                    <div className={classes.itemDetails}>
                      <h4>{item.name}</h4>
                      <p>
                        {item.manufacturer} | {item.dosage} | {item.type}
                      </p>
                      <p className={classes.itemPrice}>
                        ৳{item.pricePerUnit} Per {item.packageType}
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
                        <span className={classes.quantity}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className={classes.quantityBtn}
                        >
                          +
                        </button>
                      </div>
                      <div className={classes.itemTotal}>
                        <span>৳{item.total.toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={classes.removeBtn}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className={classes.cartSummary}>
            <div className={classes.summaryRow}>
              <span className={classes.label}>
                Subtotal ({cartItems.length} items)
              </span>
              <span className={classes.value}>৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className={classes.summaryRow}>
              <span className={classes.label}>Discount (8%)</span>
              <span className={classes.discount}>৳ -{discount.toFixed(2)}</span>
            </div>
            <div className={`${classes.summaryRow} ${classes.borderedBottom}`}>
              <span className={classes.label}>Shipping</span>
              <span className={classes.value}>৳ {shipping}</span>
            </div>
            <div className={`${classes.summaryRow} ${classes.borderedBottom}`}>
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
      </div>
    </div>
  );
};

export default Cart;
