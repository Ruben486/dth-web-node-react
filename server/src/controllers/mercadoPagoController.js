// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import fetch from "node-fetch";

let result = {};
let listItems = [];

const genNewOrder = (data) => {
  const newOrder = {
    idCliente: "payerId",
    productos: listItems,
    fechaOrden: new Date(),
    total: data.transaction_amount,
    estado: data.status,
    estadoPago: data.status_detail,
    formaDePago: data.payment_type_id,
    idTransaccion: data.order.id,
    idTransaccionMercadoPago: data.authorization_code,
    externalIdOrden: data.order.id,
    payerName: data.payer.last_name + "," + data.payer.first_name,
    payerEmail: data.payer.email,
    payerId: data.payer.id,
    payerPhone: data.payer.phone.number,
  };
  return newOrder;
};

// Agrega credencialeS
const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const createPreferences = async (req, res) => {
  try {
    const preference = new Preference(mercadoPagoClient);
    const body = {
      items: req.body.items.map((item) => ({
        title: item.descripcion,
        description: item.descripcion,
        unit_price: Number(item.precio),
        quantity: Number(item.quantity),
        currency_id: "ARS",
      })),
      "back_urls": {
        success: `${process.env.MP_BACK_URL_SUCCESS}`,
        failure: `${process.env.MP_BACK_URL_FAILURE}`, 
        pending: `${process.env.MP_BACK_URL_PENDING}`,
      },
      auto_return: "approved",
      "external_reference": req.body.external_reference,
      "notification_url": "https://a2e0-186-122-105-148.ngrok-free.app/webhook",
      
    };

    const response = await preference.create({ body });
    result = {
      success: false,
      status: 200,
      message: "Se obtuvo exitosamente el ID de MP",
      data: response,
    };
  } catch (error) {
    result = { success: false, status: 400, message: error.message, data: {} };
  } finally {
    res.json(result);
  }
};
// captura de la respuesta:  webhooks
export const mpwebhook = async (req, res) => {
  const paymentId = req.query.id;
  let data = null;
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );
    if (response.ok) {
      data = await response.json();
      console.log("data", data);
    }
    // generar una nueva orden si el pago fue aprobado
    // y guardar en la base de datos
    if (data.status === "approved") {
      listItems = data.additional_info.items;
      const newOrder = genNewOrder(data);
      console.log("newOrder", newOrder);
      // Aquí puedes guardar la nueva orden en tu base de datos
      // await saveOrder(newOrder);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
// solicitar pago a MP;
export const getPagoPorId = async (req, res) => {
  const paymentId = req.body.id;
  let data = null;
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );
    
    if (response.ok) {
      data = await response.json();
      console.log("data", data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};