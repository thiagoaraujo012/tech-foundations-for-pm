import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia' as const,
});

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    label: '30-day Access',
    price: '$4',
    description: 'Full access to all 10 modules for 30 days',
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME!,
    label: 'Lifetime Access',
    price: '$10',
    description: 'Permanent access to all 10 modules',
  },
} as const;

export type PlanKey = keyof typeof PLANS;
