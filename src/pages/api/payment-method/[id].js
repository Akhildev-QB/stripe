const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { id } = req?.query;

    if (!id) {
      res.status(400).send({ success: false, message: 'Invalid input' });
    } else {
      const { card } = await stripe.paymentMethods.retrieve(id);

      res.send({
        number: card.last4,
        expiry: `${card.exp_month}/${card.exp_year}`,
      });
    }
  } catch (error) {
    const message = `Stripe Error: ${error.message}`;
    res.status(500).send({ success: false, message });
  }
}
