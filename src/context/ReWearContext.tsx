import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReWearSubmission, ReWearTransaction } from '../types';

interface ReWearContextType {
  availablePoints: number;
  totalEarned: number;
  totalRedeemed: number;
  equivalentDiscountRupees: number;
  submissions: ReWearSubmission[];
  transactions: ReWearTransaction[];
  selectedRedemptionPoints: number;
  appliedDiscountRupees: number;
  setRedemptionPoints: (points: number) => boolean;
  submitReturn: (data: Omit<ReWearSubmission, 'id' | 'createdAt' | 'status' | 'estimatedPoints'>) => ReWearSubmission;
  approveSubmissionDemo: (id: string) => void;
  applyRedemptionAtCheckout: (orderId: string) => boolean;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'kora_rewear_state_v1';

// Initial clearly-labelled demo sample activity
const INITIAL_DEMO_SUBMISSIONS: ReWearSubmission[] = [
  {
    id: 'rewear-sub-demo-01',
    createdAt: '2026-10-10T10:30:00Z',
    customerName: 'Demo Customer (Pune)',
    phone: '+919876543210',
    garmentCount: 2,
    garmentType: 'kurta',
    conditions: ['worn_out', 'faded'],
    photoUrls: ['/assets/images/weaving_workshop_1792143682715.jpg'],
    returnMethod: 'collection',
    status: 'approved',
    estimatedPoints: 100,
    approvedPoints: 100,
    notes: 'Sample verified return: 2 cotton kurtas inspected for textile recycling.',
  },
  {
    id: 'rewear-sub-demo-02',
    createdAt: '2026-10-15T14:15:00Z',
    customerName: 'Demo Customer (Pune)',
    phone: '+919876543210',
    garmentCount: 1,
    garmentType: 'stole',
    conditions: ['torn'],
    photoUrls: ['/assets/images/cotton_yarn_texture_1792139120275.jpg'],
    returnMethod: 'drop_off',
    status: 'pending',
    estimatedPoints: 50,
    notes: 'Sample pending return awaiting team inspection.',
  },
];

const INITIAL_DEMO_TRANSACTIONS: ReWearTransaction[] = [
  {
    id: 'tx-01',
    date: '2026-10-11T12:00:00Z',
    type: 'earned',
    points: 100,
    equivalentDiscountRupees: 50,
    description: 'ReWear Points credited for approved return (#rewear-sub-demo-01)',
  },
];

const ReWearContext = createContext<ReWearContextType | undefined>(undefined);

export const ReWearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availablePoints, setAvailablePoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_points`);
      return saved !== null ? parseInt(saved, 10) : 150; // default 150 demo points
    } catch {
      return 150;
    }
  });

  const [submissions, setSubmissions] = useState<ReWearSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_submissions`);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_SUBMISSIONS;
    } catch {
      return INITIAL_DEMO_SUBMISSIONS;
    }
  });

  const [transactions, setTransactions] = useState<ReWearTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tx`);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_TRANSACTIONS;
    } catch {
      return INITIAL_DEMO_TRANSACTIONS;
    }
  });

  const [selectedRedemptionPoints, setSelectedRedemptionPoints] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_points`, availablePoints.toString());
    } catch {}
  }, [availablePoints]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_submissions`, JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_tx`, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  // Points conversion: 100 points = ₹50 discount (0.5 ₹ per point)
  const equivalentDiscountRupees = Math.floor(availablePoints / 2);
  const appliedDiscountRupees = Math.floor(selectedRedemptionPoints / 2);

  const totalEarned = transactions
    .filter((t) => t.type === 'earned')
    .reduce((acc, curr) => acc + curr.points, 0);

  const totalRedeemed = transactions
    .filter((t) => t.type === 'redeemed')
    .reduce((acc, curr) => acc + curr.points, 0);

  // Set redemption points with validation
  const setRedemptionPoints = (points: number): boolean => {
    if (points === 0) {
      setSelectedRedemptionPoints(0);
      return true;
    }
    // Minimum 100 points required
    if (points < 100) {
      return false;
    }
    // Cannot exceed available points
    if (points > availablePoints) {
      return false;
    }
    setSelectedRedemptionPoints(points);
    return true;
  };

  // Submit a new return
  const submitReturn = (
    data: Omit<ReWearSubmission, 'id' | 'createdAt' | 'status' | 'estimatedPoints'>
  ): ReWearSubmission => {
    const newSubmission: ReWearSubmission = {
      ...data,
      id: `rewear-sub-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      estimatedPoints: data.garmentCount * 50,
      notes: 'Submission received for prototype review.',
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    return newSubmission;
  };

  // Demo simulator to approve a pending submission
  const approveSubmissionDemo = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id && sub.status === 'pending') {
          const awarded = sub.estimatedPoints;
          setAvailablePoints((p) => p + awarded);
          const newTx: ReWearTransaction = {
            id: `tx-${Date.now().toString().slice(-6)}`,
            date: new Date().toISOString(),
            type: 'earned',
            points: awarded,
            equivalentDiscountRupees: Math.floor(awarded / 2),
            description: `ReWear Points credited for verified return (#${sub.id})`,
          };
          setTransactions((txs) => [newTx, ...txs]);
          return {
            ...sub,
            status: 'approved',
            approvedPoints: awarded,
            notes: 'Approved in prototype review. Points credited.',
          };
        }
        return sub;
      })
    );
  };

  // Apply redemption during checkout order placement
  const applyRedemptionAtCheckout = (orderId: string): boolean => {
    if (selectedRedemptionPoints < 100) return false;
    if (selectedRedemptionPoints > availablePoints) return false;

    const discount = Math.floor(selectedRedemptionPoints / 2);
    const newTx: ReWearTransaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      type: 'redeemed',
      points: selectedRedemptionPoints,
      equivalentDiscountRupees: discount,
      description: `Redeemed ${selectedRedemptionPoints} points for ₹${discount} off order #${orderId}`,
      orderId,
    };

    setAvailablePoints((prev) => prev - selectedRedemptionPoints);
    setTransactions((prev) => [newTx, ...prev]);
    setSelectedRedemptionPoints(0);
    return true;
  };

  const resetDemoData = () => {
    setAvailablePoints(150);
    setSubmissions(INITIAL_DEMO_SUBMISSIONS);
    setTransactions(INITIAL_DEMO_TRANSACTIONS);
    setSelectedRedemptionPoints(0);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_points`);
      localStorage.removeItem(`${STORAGE_KEY}_submissions`);
      localStorage.removeItem(`${STORAGE_KEY}_tx`);
    } catch {}
  };

  return (
    <ReWearContext.Provider
      value={{
        availablePoints,
        totalEarned,
        totalRedeemed,
        equivalentDiscountRupees,
        submissions,
        transactions,
        selectedRedemptionPoints,
        appliedDiscountRupees,
        setRedemptionPoints,
        submitReturn,
        approveSubmissionDemo,
        applyRedemptionAtCheckout,
        resetDemoData,
      }}
    >
      {children}
    </ReWearContext.Provider>
  );
};

export const useReWear = () => {
  const context = useContext(ReWearContext);
  if (!context) {
    throw new Error('useReWear must be used within a ReWearProvider');
  }
  return context;
};
