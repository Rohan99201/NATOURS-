/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51IkNLlSGR8K8d1ESjsX3JJxcqIK6aE7uTrOCla7CflFJeObEQaCFaYYr8lGpeXm48yH4qFW2dqjdKHQPu55iYVjn00LmFxqUYY'
  );

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
