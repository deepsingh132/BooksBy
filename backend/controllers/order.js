const Order = require("../models/Order");
const { orderConfirmationEmail } = require("../utils/EmailTemplates");
const { sendEmail } = require("../utils/sendGrid");


const sendOrderConfirmation = async (order) => {
  try {
    let subject = "BooksBy Order Confirmation";
    let to = order.email;
    let from = process.env.FROM_EMAIL;
    let html = orderConfirmationEmail(order);
    await sendEmail({ to, from, subject, html });
  } catch (err) {
    console.log("Error: ", err);
  }
}

const createOrder = async (orderDetails) => {

  const productId = JSON.parse(orderDetails.metadata.productId);
  const name = JSON.parse(orderDetails.metadata.name);
  const price = JSON.parse(orderDetails.metadata.price);
  const img = JSON.parse(orderDetails.metadata.img);
  const quantity = JSON.parse(orderDetails.metadata.quantity);
  const products = productId.map((id, index) => {
    return {
      productId: id,
      name: name[index],
      price: price[index],
      img: img[index],
      quantity: quantity[index],
    };
  });
  try {
    const order = {
      userId: orderDetails.client_reference_id,
      name: orderDetails.customer_details.name,
      email: orderDetails.customer_details.email,
      id: orderDetails.id,
      products: products,
      phone: orderDetails.customer_details.phone,
      shippingFee: orderDetails.shipping_cost.amount_total > 0 ? orderDetails.shipping_cost.amount_total / 100 : 0,
      shippingMethod: orderDetails.shipping_cost.shipping_rate,
      paymentMethod: orderDetails.payment_method_types[0],
      amount: orderDetails.amount_total / 100,
      address: orderDetails.shipping_details.address,
      link: orderDetails.invoiceUrl,
      pdf: orderDetails.invoicePdf,
      time: new Date(orderDetails.created * 1000).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      status: orderDetails.payment_status,
  };

  const newOrder = new Order(order);
  const stripeId = newOrder.id;
  const orderExists = await Order.findOne({ id: stripeId });
  if (!orderExists && (newOrder.amount > 0 || newOrder.products.length > 0)) {
    try {
      const savedOrder = await newOrder.save();
      await sendOrderConfirmation(savedOrder);
      return savedOrder;
    } catch (err) {
      console.log("Error: ", err);
      return err;
    }
  } else {
    return orderExists;
  }
  } catch (err) {
    console.log("Error: ", err);
    return err;
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json(err);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {createOrder, updateOrder, deleteOrder, getOrders, getAllOrders, getIncome}