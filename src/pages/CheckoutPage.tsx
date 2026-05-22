import { useState } from "react";
import { useCart } from "../context/CartContext";

type Page =
  | "home"
  | "products"
  | "detail"
  | "cart"
  | "checkout"
  | "success"
  | "about"
  | "contact"
  | "favorites";

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

export default function CheckoutPage({
  onNavigate,
}: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNum: "",
    cardExp: "",
    cardCvv: "",
  });

  const shipping = totalPrice >= 50 ? 0 : 5;
  const codFee = payMethod === "cod" ? 2 : 0;
  const total = totalPrice + shipping + codFee;

  const set = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.address || !form.email) {
      alert("Please fill required fields");
      return;
    }

    clearCart();
    onNavigate("success");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          <div className="checkout-header">
            <h1>Checkout</h1>

            <div className="step-indicator">
              <div className={`step ${step >= 1 ? "active" : ""}`}>
                <span>1</span>
                <p>Address</p>
              </div>

              <div className="line" />

              <div className={`step ${step >= 2 ? "active" : ""}`}>
                <span>2</span>
                <p>Payment</p>
              </div>

              <div className="line" />

              <div className={`step ${step >= 3 ? "active" : ""}`}>
                <span>3</span>
                <p>Review</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="section">
                  <h3>Contact Information</h3>

                  <div className="grid-2">
                    <div className="input-group">
                      <label>First Name</label>
                      <input
                        placeholder="Enter first name"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          set("firstName", e.target.value)
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Last Name</label>
                      <input
                        placeholder="Enter last name"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          set("lastName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          set("email", e.target.value)
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Phone</label>
                      <input
                        placeholder="Enter phone number"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          set("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h3>Delivery Address</h3>

                  <div className="input-group">
                    <label>Address</label>
                    <input
                      placeholder="Street address"
                      required
                      value={form.address}
                      onChange={(e) =>
                        set("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid-3">
                    <div className="input-group">
                      <label>City</label>
                      <input
                        placeholder="City"
                        value={form.city}
                        onChange={(e) =>
                          set("city", e.target.value)
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>State</label>
                      <input
                        placeholder="State"
                        value={form.state}
                        onChange={(e) =>
                          set("state", e.target.value)
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Pincode</label>
                      <input
                        placeholder="ZIP / Postal"
                        value={form.pincode}
                        onChange={(e) =>
                          set("pincode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => setStep(2)}
                >
                  <span>Continue to Payment</span>
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="section">
                  <h3>Payment Method</h3>

                  <div className="payment-methods">
                    {["card", "upi", "cod"].map((m) => (
                      <button
                        type="button"
                        key={m}
                        className={`pay-method ${payMethod === m ? "active" : ""
                          }`}
                        onClick={() => setPayMethod(m)}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {payMethod === "card" && (
                    <div className="card-box">
                      <div className="input-group">
                        <label>Card Number</label>
                        <input
                          placeholder="1234 5678 9012 3456"
                          value={form.cardNum}
                          onChange={(e) =>
                            set("cardNum", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid-2">
                        <div className="input-group">
                          <label>Expiry</label>
                          <input
                            placeholder="MM / YY"
                            value={form.cardExp}
                            onChange={(e) =>
                              set("cardExp", e.target.value)
                            }
                          />
                        </div>

                        <div className="input-group">
                          <label>CVV</label>
                          <input
                            placeholder="***"
                            value={form.cardCvv}
                            onChange={(e) =>
                              set("cardCvv", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payMethod === "upi" && (
                    <div className="upi-box">
                      <input placeholder="Enter UPI ID" />
                    </div>
                  )}

                  {payMethod === "cod" && (
                    <p className="cod-note">
                      Cash on Delivery charge: £2
                    </p>
                  )}
                </div>

                <div className="btn-row">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setStep(1)}
                  >
                    <span>Back</span>
                  </button>

                   <button
                    type="button"
                    className="checkout-btn"
                    onClick={() => setStep(3)}
                  >
                    <span>Review Order</span>
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className="section">
                  <h3>Review Order</h3>

                  <div className="review-box">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="review-item"
                      >
                        <div>
                          <h4>{item.product.name}</h4>
                          <p>
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <strong>
                          £
                          {item.product.price *
                            item.quantity}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="btn-row">
                   <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setStep(2)}
                  >
                    <span>Back</span>
                  </button>

                   <button
                    type="submit"
                    className="checkout-btn"
                  >
                    <span>Place Order</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <div className="order-summary-card">
            <div className="summary-header">
              <h2>Your Order</h2>
              <span>{items.length} items</span>
            </div>

            <div className="order-items">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="order-item"
                >
                  <div className="item-image">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </div>

                  <div className="item-info">
                    <h4>{item.product.name}</h4>

                    <p>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <strong>
                    £
                    {item.product.price *
                      item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-pricing">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>£{totalPrice}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `£${shipping}`}
                </span>
              </div>

              {codFee > 0 && (
                <div className="summary-row">
                  <span>COD Fee</span>
                  <span>£{codFee}</span>
                </div>
              )}

              <div className="summary-total">
                <span>Total</span>
                <span>£{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}