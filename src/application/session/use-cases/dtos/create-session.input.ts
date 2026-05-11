export type CreateSessionInput = {
  professionalId: string;
  patientId: string;
  sessionDate: Date;
  summary: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
};
