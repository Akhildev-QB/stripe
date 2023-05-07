const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { id } = req?.query;

    if (!id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      await stripe.paymentMethods.detach(id);
      res.send({ success: true });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
