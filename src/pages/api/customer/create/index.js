const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { name, email, userId: dotc_user_id } = req?.body;

    if (!name || !email || !dotc_user_id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const user = { name, email, metadata: { dotc_user_id } };
      const { id } = await stripe.customers.create(user);

      res.send({ id });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
