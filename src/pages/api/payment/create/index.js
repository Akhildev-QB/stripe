const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { product, customerId, paymentId } = req?.body;

    if (!product || !customerId || !paymentId) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const { client_secret: secret } = await stripe.paymentIntents.create({
        amount: product.price,
        currency: 'jpy',
        customer: customerId,
        payment_method: paymentId,
        capture_method: 'automatic',
        metadata: { tax: 0, used_point: 0 },
      });
      res.send({ secret });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
