// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import fetch from "node-fetch";
import 'dotenv/config';
import { addOrder } from '../order/controllers/orderControllers.js'
import 'dotenv/config';
import crypto from 'crypto';
let result = {};
// hacer la orden.
const addNewOrder = async (payment) => {
  // Crear y guardar la nueva orden en la base de datos
  listItems = payment.additional_info?.items || [];
  console.log(listItems)
  const order = await addOrder(payment)

  //#126790040320

};

// Agrega credencialeS
const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const createPreferences = async (req, res) => {
  try {
    const preference = new Preference(mercadoPagoClient);
    const body = {
      items: req.body.cartItems.map((item) => ({
        title: item.descripcion,
        description: item.descripcion,
        unit_price: Number(item.precio),
        quantity: Number(item.quantity),
        currency_id: "ARS",
      })),
      /* "back_urls": {
        success: `https://jjtxsbw0-5173.brs.devtunnels.ms/wallet/success`,
        failure: `https://jjtxsbw0-5173.brs.devtunnels.ms/wallet/failure`, 
        pending: `https://jjtxsbw0-5173.brs.devtunnels.ms/wallet/pending`,
      }, 
      "auto_return": 'approved', */
      "external_reference": process.env.EXTERNAL_REFERENCE,
      "notification_url": 'https://2839c67e3eb8.ngrok-free.app/mercadopago/webhook',
    };

    const response = await preference.create({ body });
    result = {
      success: true,
      status: 200,
      message: "Se obtuvo exitosamente el ID de MP",
      data: response,
    }
  } catch (error) {
    result = { success: false, status: 400, message: error.message, data: {} }
  } finally {
    res.json(result);
  }
};
// captura de la respuesta:  webhooks
const validateWebHookSignature = (req) => {
  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  
  if (!signature || !requestId) {
    return false;
  }
  
  try {
    // 1. Extraer valores del header x-signature
    const parts = {};
    signature.split(',').forEach(part => {
      const [key, value] = part.split('=');
      parts[key] = value;
    });
    
    const ts = parts.ts;
    const v1 = parts.v1;
    
    // 2. Construir el template según documentación de MP
    const { id } = req.query; // ID del pago/orden
    const dataId = req.query.id;
    console.log('query',req.query)
    const template = `id:${dataId};request-id:${requestId};ts:${ts};`;
    
    // 3. Calcular HMAC con tu SECRET_KEY
    const SECRET_KEY = process.env.MP_WEBHOOK_SECRET;
    const calculatedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(template)
      .digest('hex');
    
    // 4. Comparar firmas
    console.log('v1',v1)
    console.log('calc',calculatedSignature)
    return calculatedSignature === v1;
    
  } catch (error) {
    console.error('Error validando firma:', error);
    return false;
  }
};


// function verifySignatureOfProvider(signature: string | null, xRequestId: string | null, dataId: string | null): boolean {
//     if (isEmptyOrNull(signature) || isEmptyOrNull(xRequestId) || isEmptyOrNull(dataId)) {
//         return false;
//     }

//     const [timestamp, xSignature] = signature!.split(',');
//     const [, valueOfTimestamp] = timestamp.split('=');
//     const [, valueOfXSignature] = xSignature.split('=');

//     const signatureTemplateParsed = `id:${dataId};request-id:${xRequestId};ts:${valueOfTimestamp};`
//     const cyphedSignature = crypto
//         .createHmac('sha256', process.env.MERCADO_PAGO_CHECKOUT_API_WEBHOOK_SECRET!)
//         .update(signatureTemplateParsed)
//         .digest('hex');

//     return valueOfXSignature == cyphedSignature;
// }
//};

export const mpwebhook = async (req, res) => {
  console.log('=== PAGO DESDE EL SITIO ===');
  console.log('Headers:', req.headers);
  console.log('Nootificacion recibida:', JSON.stringify(req.body, null, 2));
  console.log('Query params:', req.query);
  // en req.body.data.id viene el id del pago
  // Respond immediately to Mercado Pago to avoid timeouts
  res.status(200).send('OK');
  console.log('Validate Signature',validateWebHookSignature(req)) ;


  const paymentId = req.query.id || (req.body && req.body.data && req.body.data.id);
  try {
    if (!paymentId) {
      console.log("No paymentId found in webhook payload.");
      return;
    }
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
      const payment = await response.json();
      console.log('Se encontro el pago por ID');
      console.log(payment.additional_info?.items);
      // generar una nueva orden si el pago fue aprobado
      // y guardar en la base de datos
      //addNewOrder(payment)
    }

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
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};