// Client-safe plan definitions — no Stripe SDK here
export const PLANS = {
  monthly: {
    priceId: 'price_1TKKaYGsCXs6oDPlIukIo47k',
    label: '30-day Access',
    price: '$4',
    description: 'Full access to all 10 modules for 30 days',
  },
  lifetime: {
    priceId: 'price_1TKKZrGsCXs6oDPl71bVaMZa',
    label: 'Lifetime Access',
    price: '$10',
    description: 'Permanent access to all 10 modules',
  },
} as const;

export type PlanKey = keyof typeof PLANS;
