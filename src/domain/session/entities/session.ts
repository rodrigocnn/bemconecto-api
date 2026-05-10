interface SessionProps {
  id?: string;
  patientId: string;
  sessionDate: Date | string;
  summary: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Session {
  id!: string;
  patientId!: string;
  sessionDate!: Date;
  summary!: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(props: SessionProps) {
    Object.assign(this, props);
    this.sessionDate = new Date(props.sessionDate);

    if (Number.isNaN(this.sessionDate.getTime())) {
      throw new Error('Invalid sessionDate');
    }

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
