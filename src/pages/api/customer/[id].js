const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { id } = req?.query;

    if (!id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const { name, email } = await stripe.customers.retrieve(id);

      const options = { type: 'card' };
      const { data } = await stripe.customers.listPaymentMethods(id, options);
      const paymentIds = data.map(({ id }) => id);

      res.send({ id, name, email, paymentIds });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
