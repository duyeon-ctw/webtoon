import { User } from '@/lib/types';

// Mock payment processing - in a real app, this would interface with payment processors
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'google_pay' | 'apple_pay' | 'bank_transfer';
  details: {
    lastFour?: string;
    expiryDate?: string;
    cardType?: string;
    accountEmail?: string;
    nickname: string;
  };
  isDefault: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethodId: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'active' | 'canceled' | 'paused' | 'trial';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentMethodId: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  currency: string;
  isPopular?: boolean;
  bonusCoins?: number;
}

// Mock data
const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'coins-100',
    name: 'Small Pack',
    coins: 100,
    price: 9.99,
    currency: 'USD',
  },
  {
    id: 'coins-300',
    name: 'Medium Pack',
    coins: 300,
    price: 24.99,
    currency: 'USD',
    bonusCoins: 25,
  },
  {
    id: 'coins-500',
    name: 'Large Pack',
    coins: 500,
    price: 39.99,
    currency: 'USD',
    bonusCoins: 50,
    isPopular: true,
  },
  {
    id: 'coins-1000',
    name: 'Mega Pack',
    coins: 1000,
    price: 74.99,
    currency: 'USD',
    bonusCoins: 150,
  },
];

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 4.99,
    currency: 'USD',
    benefits: [
      'No ads',
      'Access to basic exclusive content',
      '50 coins monthly',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 9.99,
    currency: 'USD',
    benefits: [
      'No ads',
      'Access to all exclusive content',
      '150 coins monthly',
      'Early access to new episodes (24h)',
    ],
    isPopular: true,
  },
  {
    id: 'ultimate',
    name: 'Ultimate Fan',
    price: 19.99,
    currency: 'USD',
    benefits: [
      'No ads',
      'Access to all exclusive content',
      '350 coins monthly',
      'Early access to new episodes (48h)',
      'Monthly special items',
      'Supporter badge on profile',
    ],
  },
];

// Mock user data
const mockUserPaymentMethods: Record<string, PaymentMethod[]> = {
  'user1': [
    {
      id: 'pm-1',
      type: 'credit_card',
      details: {
        lastFour: '4242',
        expiryDate: '04/25',
        cardType: 'Visa',
        nickname: 'My Visa Card',
      },
      isDefault: true,
      createdAt: '2023-12-01T10:00:00Z',
    },
    {
      id: 'pm-2',
      type: 'paypal',
      details: {
        accountEmail: 'user@example.com',
        nickname: 'My PayPal',
      },
      isDefault: false,
      createdAt: '2024-01-15T14:30:00Z',
    },
  ],
};

const mockUserTransactions: Record<string, Transaction[]> = {
  'user1': [
    {
      id: 'tx-1',
      userId: 'user1',
      amount: 9.99,
      currency: 'USD',
      status: 'completed',
      paymentMethodId: 'pm-1',
      description: 'Purchase of 100 coins',
      createdAt: '2024-03-10T09:15:00Z',
    },
    {
      id: 'tx-2',
      userId: 'user1',
      amount: 4.99,
      currency: 'USD',
      status: 'completed',
      paymentMethodId: 'pm-1',
      description: 'Monthly subscription - Basic Plan',
      createdAt: '2024-03-01T00:00:00Z',
    },
  ],
};

const mockUserSubscriptions: Record<string, Subscription[]> = {
  'user1': [
    {
      id: 'sub-1',
      userId: 'user1',
      planId: 'basic',
      planName: 'Basic Plan',
      amount: 4.99,
      currency: 'USD',
      status: 'active',
      currentPeriodStart: '2024-03-01T00:00:00Z',
      currentPeriodEnd: '2024-04-01T00:00:00Z',
      paymentMethodId: 'pm-1',
      cancelAtPeriodEnd: false,
      createdAt: '2024-01-01T00:00:00Z',
    },
  ],
};

export class PaymentService {
  // Get available coin packages
  static getCoinPackages(): CoinPackage[] {
    return COIN_PACKAGES;
  }

  // Get subscription plans
  static getSubscriptionPlans() {
    return SUBSCRIPTION_PLANS;
  }

  // Get user's payment methods
  static async getUserPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    // In a real app, this would fetch from a database or payment provider API
    return mockUserPaymentMethods[userId] || [];
  }

  // Get user's transaction history
  static async getUserTransactions(userId: string): Promise<Transaction[]> {
    // In a real app, this would fetch from a database
    return mockUserTransactions[userId] || [];
  }

  // Get user's active subscriptions
  static async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    // In a real app, this would fetch from a database or subscription provider API
    return mockUserSubscriptions[userId] || [];
  }

  // Add a new payment method
  static async addPaymentMethod(userId: string, method: Omit<PaymentMethod, 'id' | 'createdAt'>): Promise<PaymentMethod> {
    // In a real app, this would call a payment provider API and store in database
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    if (!mockUserPaymentMethods[userId]) {
      mockUserPaymentMethods[userId] = [];
    }

    // If this is the first payment method or is marked as default, make it default
    if (mockUserPaymentMethods[userId].length === 0 || newMethod.isDefault) {
      // Set all existing methods to non-default
      mockUserPaymentMethods[userId].forEach(m => m.isDefault = false);
    }

    mockUserPaymentMethods[userId].push(newMethod);
    return newMethod;
  }

  // Set a payment method as default
  static async setDefaultPaymentMethod(userId: string, paymentMethodId: string): Promise<PaymentMethod[]> {
    if (!mockUserPaymentMethods[userId]) {
      throw new Error('User has no payment methods');
    }

    const methods = mockUserPaymentMethods[userId];
    const methodIndex = methods.findIndex(m => m.id === paymentMethodId);

    if (methodIndex === -1) {
      throw new Error('Payment method not found');
    }

    // Set all to non-default, then set the selected one to default
    methods.forEach(m => m.isDefault = false);
    methods[methodIndex].isDefault = true;

    return methods;
  }

  // Delete a payment method
  static async deletePaymentMethod(userId: string, paymentMethodId: string): Promise<void> {
    if (!mockUserPaymentMethods[userId]) {
      throw new Error('User has no payment methods');
    }

    const methods = mockUserPaymentMethods[userId];
    const methodIndex = methods.findIndex(m => m.id === paymentMethodId);

    if (methodIndex === -1) {
      throw new Error('Payment method not found');
    }

    // If we're deleting the default method, make another one default
    const wasDefault = methods[methodIndex].isDefault;
    methods.splice(methodIndex, 1);

    if (wasDefault && methods.length > 0) {
      methods[0].isDefault = true;
    }
  }

  // Purchase coins
  static async purchaseCoins(
    userId: string, 
    packageId: string, 
    paymentMethodId: string,
    promoCode?: string
  ): Promise<Transaction> {
    const coinPackage = COIN_PACKAGES.find(p => p.id === packageId);
    if (!coinPackage) {
      throw new Error('Invalid coin package');
    }

    // Apply promo code if provided
    let finalPrice = coinPackage.price;
    if (promoCode) {
      // In a real app, this would validate the promo code and apply a discount
      if (promoCode === 'WELCOME10') {
        finalPrice = finalPrice * 0.9; // 10% discount
      }
    }

    // Create a transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      userId,
      amount: finalPrice,
      currency: coinPackage.currency,
      status: 'completed', // In a real app, this might start as 'pending'
      paymentMethodId,
      description: `Purchase of ${coinPackage.coins} coins${coinPackage.bonusCoins ? ` (+ ${coinPackage.bonusCoins} bonus)` : ''}`,
      metadata: {
        packageId,
        coins: coinPackage.coins,
        bonusCoins: coinPackage.bonusCoins || 0,
        promoCode,
      },
      createdAt: new Date().toISOString(),
    };

    // Store the transaction
    if (!mockUserTransactions[userId]) {
      mockUserTransactions[userId] = [];
    }
    mockUserTransactions[userId].push(transaction);

    // In a real app, this would also update the user's coin balance
    return transaction;
  }

  // Subscribe to a plan
  static async subscribeToPlan(
    userId: string, 
    planId: string, 
    paymentMethodId: string
  ): Promise<Subscription> {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid subscription plan');
    }

    // Check if user already has an active subscription
    const existingSubscriptions = mockUserSubscriptions[userId] || [];
    const activeSubscription = existingSubscriptions.find(s => s.status === 'active');
    
    if (activeSubscription) {
      // In a real app, this would handle upgrades/downgrades more gracefully
      throw new Error('User already has an active subscription');
    }

    // Create a subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const subscription: Subscription = {
      id: `sub-${Date.now()}`,
      userId,
      planId,
      planName: plan.name,
      amount: plan.price,
      currency: plan.currency,
      status: 'active',
      currentPeriodStart: startDate.toISOString(),
      currentPeriodEnd: endDate.toISOString(),
      paymentMethodId,
      cancelAtPeriodEnd: false,
      createdAt: new Date().toISOString(),
    };

    // Store the subscription
    if (!mockUserSubscriptions[userId]) {
      mockUserSubscriptions[userId] = [];
    }
    mockUserSubscriptions[userId].push(subscription);

    // Create the initial transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      userId,
      amount: plan.price,
      currency: plan.currency,
      status: 'completed',
      paymentMethodId,
      description: `Subscription - ${plan.name}`,
      metadata: {
        subscriptionId: subscription.id,
        planId,
      },
      createdAt: new Date().toISOString(),
    };

    if (!mockUserTransactions[userId]) {
      mockUserTransactions[userId] = [];
    }
    mockUserTransactions[userId].push(transaction);

    return subscription;
  }

  // Cancel a subscription
  static async cancelSubscription(userId: string, subscriptionId: string, cancelImmediately = false): Promise<Subscription> {
    if (!mockUserSubscriptions[userId]) {
      throw new Error('User has no subscriptions');
    }

    const subscriptions = mockUserSubscriptions[userId];
    const subIndex = subscriptions.findIndex(s => s.id === subscriptionId);

    if (subIndex === -1) {
      throw new Error('Subscription not found');
    }

    const subscription = subscriptions[subIndex];

    if (cancelImmediately) {
      // Immediate cancellation
      subscription.status = 'canceled';
    } else {
      // Cancel at end of billing period
      subscription.cancelAtPeriodEnd = true;
    }

    return subscription;
  }

  // Validate a promo code
  static async validatePromoCode(code: string): Promise<{ 
    valid: boolean; 
    discount?: number; 
    message?: string;
  }> {
    // In a real app, this would check a database of valid promo codes
    switch(code.toUpperCase()) {
      case 'WELCOME10':
        return { valid: true, discount: 0.1, message: '10% discount applied!' };
      case 'SUMMER2024':
        return { valid: true, discount: 0.15, message: '15% summer discount applied!' };
      default:
        return { valid: false, message: 'Invalid promo code' };
    }
  }
} 