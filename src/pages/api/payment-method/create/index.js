const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { id } = req?.body;

    if (!id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const { client_secret: secret } = await stripe.setupIntents.create({
        payment_method_types: ['card'],
        customer: id,
      });

      res.send({ secret });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
