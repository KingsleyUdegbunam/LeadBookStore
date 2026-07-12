import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { convertToNaira } from "../../utilities/money";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderServices";

import "./OrderStatusPage.css";

export default function OrderStatusPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id]);
  console.log(order);

  if (loading) return <p style={{ marginBlock: "5rem" }}>Loading...</p>;
  if (!order) return <p style={{ marginBlock: "5rem" }}>Order not found</p>;
  return (
    <>
      <section className="main">
        <div className="back-to-tracking">
          <p className="back-to-orders">ALL ORDERS</p>
        </div>
        <article className="about-banner">
          <p className="about-header">ORDER STATUS</p>
          <p className="about-tag">Shipped</p>

          <div className="order-status-brief-container">
            <div className="order-status-brief-elem">
              <p className="order-status-brief-elem-header banner-subtle">
                Reference
              </p>
              <p className="order-status-brief-elem-body">{order.reference}</p>
            </div>
            <div className="order-status-briefs-elem">
              <p className="order-status-brief-elem-header banner-subtle">
                Placed
              </p>
              <p className="order-status-brief-elem-body">
                {dayjs(order.created_at).format("MMMM D, YYYY h:mm A")}
              </p>
            </div>
          </div>
        </article>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>

        <div className="tracking-tree article">
          <p className="about-header red-text">TRACKING</p>
          <article className="order-status-tree">
            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{
                    color: "var(--brand-red-clr)",
                    zIndex: 2,
                  }}
                />

                <div className="connecting-line"></div>
              </div>
              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Order Placed</p>
                <p className="order-status-branch-subtext dull-black">
                  We've received your order.
                </p>
              </div>
            </div>

            <div className="order-status-branch-inbetween">
              <div className="connecting-line connector"></div>
            </div>

            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{ color: "var(--brand-red-clr)", zIndex: 2 }}
                />

                <div className="connecting-line"></div>
              </div>

              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Payment Confirmed</p>
                <p className="order-status-branch-subtext dull-black">
                  Your payment has been verified.
                </p>
              </div>
            </div>

            <div className="order-status-branch-inbetween">
              <div className="connecting-line connector"></div>
            </div>

            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{ color: "var(--brand-red-clr)", zIndex: 2 }}
                />

                <div className="connecting-line"></div>
              </div>

              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Processing</p>
                <p className="order-status-branch-subtext dull-black">
                  We're preparing your books.
                </p>
              </div>
            </div>

            <div className="order-status-branch-inbetween">
              <div className="connecting-line connector"></div>
            </div>

            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{ color: "var(--brand-red-clr)", zIndex: 2 }}
                />

                <div className="connecting-line"></div>
              </div>

              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Shipped</p>
                <p className="order-status-branch-subtext dull-black">
                  Your order is on its way.
                </p>
              </div>
            </div>

            <div className="order-status-branch-inbetween">
              <div className="connecting-line connector"></div>
            </div>

            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{ color: "var(--brand-red-clr)", zIndex: 2 }}
                />

                <div className="connecting-line"></div>
              </div>

              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Out for Delivery</p>
                <p className="order-status-branch-subtext dull-black">
                  Your order is with the courier.
                </p>
              </div>
            </div>

            <div className="order-status-branch-inbetween">
              <div className="connecting-line connector"></div>
            </div>

            <div className="order-status-branch">
              <div className="order-branch-left-container">
                <IoIosCheckmarkCircle
                  style={{ color: "var(--brand-red-clr)", zIndex: 2 }}
                />

                <div className="connecting-line"></div>
              </div>

              <div className="order-branch-right-container">
                <p className="order-status-branch-text">Delivered</p>
                <p className="order-status-branch-subtext dull-black">
                  Your order has been delivered.
                </p>
              </div>
            </div>
          </article>
        </div>

        <article className="article tracked-items-detail-container">
          <p className="about-header tracking-items-header red-text">ITEMS</p>

          <div className="tracked-items-container">
            {order.items.map((item) => (
              <article className="tracked-item">
                <div className="tracked-image-div">
                  <img
                    style={{
                      width: 60,
                      aspectRatio: "2/3",
                    }}
                    src={item.coverImage}
                    alt=""
                  />
                </div>
                <div className="tracked-item-details">
                  <p className="tracked-book-title">{item.title}</p>
                  <p className="tracked-book-author dull-black">
                    {item.author}
                  </p>
                  <p className="tracked-book-qunat-cost">
                    Qty {item.quantity} .{" "}
                    <span>
                      {convertToNaira(item.price.paperback * item.quantity)}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="tracked-items-total-container">
            <p className="tracked-total-txt">TOTAL</p>
            <p className="tracked-total-digit">{convertToNaira(order.total)}</p>
          </div>
        </article>

        <article className="article tracked-item-delivery-details">
          <p className="about-header delivery-status-header red-text">
            DELIVERY INFORMATION
          </p>
          <div className="tracked-delivery-detail-div">
            <p className="tracked-label dull-black">Name</p>
            <p className="tracked detail">
              {`${order.shipping_details.lastName} ${order.shipping_details.firstName}.`}
            </p>
          </div>
          <div className="tracked-delivery-detail-div">
            <p className="tracked-label dull-black">Location</p>
            <p className="tracked detail">{`${order.shipping_details.address}, ${order.shipping_details.city}, ${order.shipping_details.state}, ${order.shipping_details.country}.`}</p>
          </div>
          <div className="tracked-delivery-detail-div">
            <p className="tracked-label dull-black">Phone</p>
            <p className="tracked detail">{order.shipping_details.tel}.</p>
          </div>
          <div className="tracked-delivery-detail-div">
            <p className="tracked-label dull-black">Email</p>
            <p className="tracked detail">{order.shipping_details.email}.</p>
          </div>
        </article>

        {/* <div className="cta-btns-container">
          <button className="button-primary">CONTINUE SHOPPING</button>
          <button className="button-secondary">VIEW ALL ORDERS</button>
        </div> */}
      </section>
    </>
  );
}
