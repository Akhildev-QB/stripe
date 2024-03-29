const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { id } = req?.query;

    if (!id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const { name, email, metadata } = await stripe.customers.retrieve(id);
      res.send({ id, name, email, userId: metadata?.dotc_user_id });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
