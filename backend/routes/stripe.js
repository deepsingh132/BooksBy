const { createOrder } = require("../controllers/order");
const Order = require("../models/Order");

const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/create-checkout-session", async (req, res) => {
  const stripeProducts = req.body.stripeProducts;
  const cartProducts = req.body.cartProducts;
  const shipping = req.body.shipping;
  const userID = req.body.userID;
  const domain = process.env.FRONTEND_URL;

  try {

    const lineItems = stripeProducts.map((product) => {
      return {
        price: product.productId,
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shipping * 100, currency: "inr" },
            display_name: "Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 6000, currency: "inr" },
            display_name: "Two day delivery",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],

      allow_promotion_codes: true,
      invoice_creation: { enabled: true },

      line_items: lineItems,
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      // add userID as a metadata object to the session
      client_reference_id: userID,
      // add cartProducts as a metadata object to the session
      metadata: {
        productId: JSON.stringify(
          cartProducts.map((product) => product.productId)
        ),
        name: JSON.stringify(cartProducts.map((product) => product.name)),
        price: JSON.stringify(cartProducts.map((product) => product.price)),
        img: JSON.stringify(cartProducts.map((product) => product.img)),
        quantity: JSON.stringify(
          cartProducts.map((product) => product.quantity)
        ),
      },
      mode: "payment",
      success_url:
        domain + "/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${domain}/cart`,
    });
    res.send(session.url);

  } catch (error) {
    console.error("Error creating checkout session: ", error);
    res.status(500).send("Internal Server Error!");
  }
});

router.get("/order/success", async (req, res) => {
  try {
    let result = {};
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const invoice = await stripe.invoices.retrieve(session.invoice);
    result.invoiceUrl = invoice?.hosted_invoice_url || null;
    result.invoicePdf = invoice?.invoice_pdf || null;
    const orderId = await Order.findOne({ id: session.id });
    result.orderID = orderId._id;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching order: ", error);
    res.status(500).send(error);
  }
});



const fulfillOrder = async (orderDetails) => {
  // TODO: fill me in
  try {
    const session = await stripe.checkout.sessions.retrieve(orderDetails.id);
    const invoice = await stripe.invoices.retrieve(session.invoice);
    session.invoiceUrl = invoice?.hosted_invoice_url || null;
    session.invoicePdf = invoice?.invoice_pdf || null;
    await createOrder(session);
  } catch (error) {
    console.error("Error fulfilling order: ", error);
  }
};

router.post("/webhook", async (req, res) => {

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  console.log("Webhook accessed")

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error("WebHooka Error: ", err);
      return res.status(400).send(`Webhook Error: ${err?.message}`);
    }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      await fulfillOrder(session);
      break;
    case "invoice.payment_succeeded":
      console.log("Invoice payment succeeded!");
      break;
    case "invoice.payment_failed":
      console.log("Invoice payment failed!");
      break;
    /**
     * TODO: implement and handle other event types
     */
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
    res.status(200).end();
  }
);

module.exports = router;
