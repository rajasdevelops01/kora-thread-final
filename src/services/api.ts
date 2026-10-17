import { UserSession } from '../types';

export interface SendOtpResponse {
  success: boolean;
  otpId?: string;
  expiresAt?: string;
  phone?: string;
  isSandbox?: boolean;
  error?: string;
  code?: string;
  troubleshooting?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  valid: boolean;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  identityId?: string;
  phone?: string;
  verifiedAt?: string;
  error?: string;
  code?: string;
}

export interface GeoFactsResponse {
  brand: {
    name: string;
    founded: number;
    headquarters: string;
    businessType: string;
    fabrics: string;
    sourcing: string;
    priceRanges: {
      cottonKurtas: string;
      cottonStoles: string;
      homeLinen: string;
    };
    shipping: {
      timeline: string;
      freeThreshold: string;
    };
    returns: {
      windowDays: number;
      condition: string;
    };
    payment: {
      cashOnDelivery: string;
      guestCheckout: string;
      digitalPayments: string;
    };
    phoneVerification: string;
  };
  facts: Array<{
    id: string;
    topic: string;
    groundTruth: string;
    hallucinationWarning?: string;
    sourceConfidence: string;
    status: string;
  }>;
  fictionalDisclosure: string;
}

export const api = {
  async getAuthStatus() {
    try {
      const res = await fetch('/api/auth/status');
      return await res.json();
    } catch {
      return { status: 'offline', sandboxMode: true };
    }
  },

  async sendOtp(phone: string): Promise<SendOtpResponse> {
    const res = await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    return await res.json();
  },

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
    const res = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    return await res.json();
  },

  async validateSession(token: string): Promise<{ valid: boolean; session?: any }> {
    const res = await fetch('/api/auth/session', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  async getGeoFacts(): Promise<GeoFactsResponse> {
    const res = await fetch('/api/geo/facts');
    return await res.json();
  },

  async simulateGeoQuery(query: string) {
    const res = await fetch('/api/geo/query-simulator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    return await res.json();
  },

  async getGeoAudit() {
    const res = await fetch('/api/geo/audit');
    return await res.json();
  }
};
