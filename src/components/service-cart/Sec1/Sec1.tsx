// src/components/pages/ServiceCartPage.tsx
import React, { useMemo, useState } from "react";

type Item = {
  id: "janitorial" | "move-out-in" | "post-construction";
  title: string;
  img: string;
  qty: number;
};

const INITIAL_ITEMS: Item[] = [
  {
    id: "janitorial",
    title: "Janitorial Office Cleaning Service Quote",
    img: "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/about-1.jpg",
    qty: 8,
  },
  {
    id: "move-out-in",
    title: "Move-out/Move-in cleaning Quote",
    img: "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/about-1.jpg",
    qty: 7,
  },
  {
    id: "post-construction",
    title: "Post Construction Cleaning Quote",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
];

/** Per-product CTA URLs */
const CTA_LINKS: Record<Item["id"], { buy: string; more: string }> = {
  "janitorial": {
    buy:
      "https://shop.app/checkout/85233566001/cn/hWN3ANcLVc1RzeHbNfwGm8vK/en-us/shoppay_login?_cs=3.AMPS&redirect_source=direct_checkout_product&tracking_unique=976c4f68-3683-47b6-b9d2-e4a76f96f93c&tracking_visit=633607ac-810C-4B0D-FA67-09CE3EDA1B70",
    more:
      "https://www.escapechores.com/checkouts/cn/hWN3ANi7oJCjAn66z0wYrcuY/en-us?skip_shop_pay=true",
  },
  "move-out-in": {
    buy:
      "https://shop.app/checkout/85233566001/cn/hWN3AOxnlOGM2bjbQ4mi9Et0/en-us/shoppay_login?_cs=3.AMPS&redirect_source=direct_checkout_product&tracking_unique=976c4f68-3683-47b6-b9d2-e4a76f96f93c&tracking_visit=633607ac-810C-4B0D-FA67-09CE3EDA1B70",
    more:
      "https://www.escapechores.com/checkouts/cn/hWN3AP4XErFTDTiIbMzZTrhS/en-us?skip_shop_pay=true",
  },
  "post-construction": {
    buy:
      "https://shop.app/checkout/85233566001/cn/hWN3APYaCFIC7fQOddVqNrDW/en-us/shoppay_login?_cs=3.AMPS&redirect_source=direct_checkout_product&tracking_unique=976c4f68-3683-47b6-b9d2-e4a76f96f93c&tracking_visit=633607ac-810C-4B0D-FA67-09CE3EDA1B70",
    more:
      "https://www.escapechores.com/checkouts/cn/hWN3APdIuvFR7vhnWXYtopko/en-us?skip_shop_pay=true",
  },
};

export default function ServiceCartPage() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);

  const remove = (id: Item["id"]) => setItems((prev) => prev.filter((i) => i.id !== id));
  const dec = (id: Item["id"]) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    );
  const inc = (id: Item["id"]) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const hasItems = useMemo(() => items.length > 0, [items.length]);

  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row">
          {/* Left: Product list */}
          <div className="col-lg-8">
            <div className="p-md-4 p-3 bg-white rounded-3 shadow-sm">
              <h6 className="mb-4 text-uppercase" style={{ letterSpacing: 1 }}>
                Product
              </h6>

              {!hasItems && (
                <p className="text-muted mb-0">Your list is empty. Add a service to get started.</p>
              )}

              {items.map((item, idx) => {
                const cta = CTA_LINKS[item.id];
                return (
                  <div
                    key={item.id}
                    className="d-flex align-items-start"
                    style={{
                      paddingTop: idx === 0 ? 0 : 24,
                      paddingBottom: 24,
                      borderBottom: idx === items.length - 1 ? "none" : "1px solid #f1f1f1",
                      gap: 18,
                    }}
                  >
                    <div
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 12,
                        overflow: "hidden",
                        flex: "0 0 auto",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="mb-2" style={{ lineHeight: 1.25 }}>{item.title}</h5>

                      {/* Quantity + CTAs (inline, sleek) */}
                      <div className="d-flex align-items-center flex-wrap" style={{ gap: 12 }}>
                        {/* Quantity pill */}
                        <div>
                          <div className="label mb-1">Quantity</div>
                          <div
                            className="d-inline-flex align-items-center justify-content-between rounded-pill border px-3"
                            style={{ height: 40, minWidth: 120 }}
                          >
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => dec(item.id)}
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>
                            <span className="mx-3">{item.qty}</span>
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => inc(item.id)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Buy with Shop */}
                        <a
                          href={cta.buy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary py-2 px-3"
                          style={{
                            borderRadius: 999,
                            fontWeight: 700,
                            letterSpacing: 0.4,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Buy with Shop
                        </a>

                        {/* More payment options */}
                        <a
                          href={cta.more}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#0f1841",
                            textDecoration: "underline",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          More payment options
                        </a>

                        {/* Remove row */}
                        <button
                          type="button"
                          className="btn btn-link text-danger"
                          onClick={() => remove(item.id)}
                          title="Remove"
                          aria-label={`Remove ${item.title}`}
                          style={{ paddingLeft: 0, marginLeft: "auto" }}
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Form Request */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="p-md-4 p-3 bg-white rounded-3 shadow-sm">
              <h6 className="mb-4 text-uppercase" style={{ letterSpacing: 1 }}>
                Form Request
              </h6>

              <form className="contactForm">
                <div className="form-group">
                  <label className="label">Name *</label>
                  <input className="form-control" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label className="label">Phone</label>
                  <input className="form-control" placeholder="Enter your phone" />
                </div>
                <div className="form-group">
                  <label className="label">Company Name</label>
                  <input className="form-control" placeholder="Enter your company" />
                </div>
                <div className="form-group">
                  <label className="label">Email *</label>
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label className="label">Start date of project</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="label">Tell us about your project *</label>
                  <textarea className="form-control" rows={4} placeholder="Message" />
                </div>
                <div className="form-group">
                  <label className="label">Location of Project</label>
                  <input className="form-control" placeholder="City, State" />
                </div>

                <button type="submit" className="btn btn-primary btn-block w-100">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
