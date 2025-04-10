import React from "react";
import classes from "./Cart.module.css";

const Cart = () => {
  const removeAll = () => {
    console.log("Remove all items");
  };

  const decreaseQuantity = (id) => {
    console.log(`Decrease quantity for item ${id}`);
  };

  const increaseQuantity = (id) => {
    console.log(`Increase quantity for item ${id}`);
  };

  const removeItem = (id) => {
    console.log(`Remove item ${id}`);
  };

  return (
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
            <div className={classes.cartHeader}>
              <div className={classes.cartTitle}>
                Cart <span className={classes.itemCount}>5 items</span>
              </div>
              <button className={classes.removeAllBtn} onClick={removeAll}>
                Remove All
              </button>
            </div>

            {/* Cart Item 1 */}
            <div className={classes.cartItems}>
              <div className={classes.cartItem}>
                <div className={classes.itemDetails}>
                  <h4>Napa</h4>
                  <p>Beximco Pharmaceuticals Ltd. | 500 mg | Tablet</p>
                  <p className={classes.itemPrice}>৳10 Per Unit</p>
                </div>
                <div className={classes.itemActions}>
                  <div className={classes.quantityControl}>
                    <button
                      onClick={() => decreaseQuantity(1)}
                      className={classes.quantityBtn}
                    >
                      −
                    </button>
                    <span className={classes.quantity}>10</span>
                    <button
                      onClick={() => increaseQuantity(1)}
                      className={classes.quantityBtn}
                    >
                      +
                    </button>
                  </div>
                  <div className={classes.itemTotal}>
                    <span>৳200.00</span>
                    <button
                      onClick={() => removeItem(1)}
                      className={classes.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart Item 2 */}
              <div className={classes.cartItem}>
                <div className={classes.itemDetails}>
                  <h4>1stCef</h4>
                  <p>Medimet Pharmaceuticals Ltd. | 500 mg | Capsule</p>
                  <p className={classes.itemPrice}>৳10 Per Unit</p>
                </div>
                <div className={classes.itemActions}>
                  <div className={classes.quantityControl}>
                    <button
                      onClick={() => decreaseQuantity(2)}
                      className={classes.quantityBtn}
                    >
                      −
                    </button>
                    <span className={classes.quantity}>10</span>
                    <button
                      onClick={() => increaseQuantity(2)}
                      className={classes.quantityBtn}
                    >
                      +
                    </button>
                  </div>
                  <div className={classes.itemTotal}>
                    <span>৳200.00</span>
                    <button
                      onClick={() => removeItem(2)}
                      className={classes.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className={classes.cartSummary}>
          <div className={classes.summaryRow}>
            <span>Subtotal (70 items)</span>
            <span>৳ 500.00</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Discount (BDT)</span>
            <span>৳ -100.00</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Shipping</span>
            <span>৳ 60.00</span>
          </div>
          <div className={classes.summaryRow}>
            <span className={classes.totalLabel}>Total (With Vat)</span>
            <span className={classes.totalAmount}>৳ 400.00</span>
          </div>

          <div className={classes.freeDelivery}>
            <div className={classes.giftIcon}>🎁</div>
            <div className={classes.freeDeliveryText}>
              <h4>Enjoy Free Delivery!</h4>
              <p>Over BDT 1,000 Order</p>
            </div>
          </div>

          <button className={classes.checkoutBtn}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
