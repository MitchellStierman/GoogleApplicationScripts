import Stripe from 'stripe';
import { API_KEY, STRIPE_API_ENDPOINT } from './constants';

const authHeader = {
  Authorization: `Basic ${Utilities.base64Encode(API_KEY)}:`,
};

const convertPayload = (params: { [key: string]: string | number }) => {
  return Object.entries(params)
    .map(([key, value]: [key: string, value: string | number]) =>
      [encodeURIComponent(key), encodeURIComponent(value)].join('=')
    )
    .join('&');
};

// create product
export const createProduct = (
  productName: string,
  description: string
): Stripe.Product => {
  const params = {
    method: 'POST',
    headers: authHeader,
    payload: { name: productName, description },
  };

  const res = UrlFetchApp.fetch(STRIPE_API_ENDPOINT.PRODUCTS, params);

  return JSON.parse(res.getContentText());
};

// create price
export const createPrice = ({
  product,
  price,
}: {
  product: Stripe.Product;
  price: number;
}): Stripe.Price => {
  const params = {
    method: 'POST',
    headers: authHeader,
    payload: {
      unit_amount: String(price),
      currency: 'USD',
      product: product.id,
    },
    muteHttpExceptions: true,
  };


  const res = UrlFetchApp.fetch(STRIPE_API_ENDPOINT.PRICES, params);

  return JSON.parse(res.getContentText());
};

// create Payment Link
export const createPaymentLink = (priceId: string): Stripe.PaymentLink => {
  const params = {
    method: 'POST',
    headers: {
      ...authHeader,
      'content-type': 'application/x-www-form-urlencoded',
    },
    payload: convertPayload({
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': 1,
    }),
    muteHttpExceptions: true,
  };


  const res = UrlFetchApp.fetch(STRIPE_API_ENDPOINT.PAYMENT_LINK, params);

  return JSON.parse(res.getContentText());
};

export const grabPaymentLink = ({
  description,
  price,
}: {
  description: string;
  price: number;
}): string => {
  const productTest = createProduct(
    'Default Tree Service Product',
    description
  );
  const priceTest = createPrice({
    product: productTest,
    price: price * 100,
  });
  return createPaymentLink(priceTest.id).url;
};
