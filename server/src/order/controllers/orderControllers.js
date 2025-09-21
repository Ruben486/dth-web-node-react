import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "No se encontro las Orden" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "No se encontro la Order" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "No se encontro la Order" });
    }
    res.status(200).json({ message: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addOrder = async (payment) => {

  const newOrder = {
    paymentId: payment.id,
    status: payment.status,
    status_detail: payment.status.detail,
    transaction_amount: payment.transaction_amount,
    date_created: payment.date_created,
    date_approved: payment.date_approved, // corrected typo
    payment_method: {
      id: payment.payment_method_id,
      type: payment.payment_type_id,
    },
    order: {
      id: payment.order?.id,
      type: payment.order?.type,
     },
    payer: {
      email: payment.payer?.email,
      identification: {
        number: payment.payer?.identification.number,
        type: payment.payer?.identification.type,
      }
    },
    external_reference: payment.external_reference,
    description: payment.description,
    metadata: payment.metadata,
    productos: []
  };
  try {
    const orderInstance = new Order(newOrder);
    const savedOrder = await orderInstance.save()
    console.log('Nueva orden guardada:', savedOrder);
    return savedOrder
  } catch (error) {
    console.log(error)
  }
};
