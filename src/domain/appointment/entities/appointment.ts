interface AppointmentProps {
  id?: string;
  title: string;
  startAt: Date | string;
  endAt: Date | string;
  status: string;
  backgroundColor?: string;
  textColor?: string;
  display?: string;
  professionalId: string;
  patientId: string;
  createdById?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const APPOINTMENT_STATUS = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  RESCHEDULED: 'RESCHEDULED',
} as const;

type AppointmentStatus =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export class Appointment {
  id!: string;
  title!: string;
  startAt!: Date;
  endAt!: Date;
  status!: string;
  backgroundColor?: string;
  textColor?: string;
  display?: string;
  professionalId!: string;
  patientId!: string;
  createdById?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(props: AppointmentProps) {
    Object.assign(this, props);
    this.startAt = new Date(props.startAt);
    this.endAt = new Date(props.endAt);

    if (Number.isNaN(this.startAt.getTime())) {
      throw new Error('Invalid startAt');
    }

    if (Number.isNaN(this.endAt.getTime())) {
      throw new Error('Invalid endAt');
    }

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  delete(utcNow: Date = new Date()): void {
    this.deletedAt = utcNow;
    this.updatedAt = utcNow;
  }

  updateStatus(
    status: AppointmentStatus,
    backgroundColor?: string,
    textColor?: string,
    display?: string,
  ): void {
    if (!this.canChangeStatusTo(status)) {
      throw new Error(
        `Cannot change appointment status from "${this.status}" to "${status}"`,
      );
    }

    this.status = status;

    if (backgroundColor !== undefined) {
      this.backgroundColor = backgroundColor;
    }

    if (textColor !== undefined) {
      this.textColor = textColor;
    }

    if (display !== undefined) {
      this.display = display;
    }

    this.updatedAt = new Date();
  }

  setVisualProperties(
    backgroundColor: string,
    textColor: string,
    display: string,
  ): void {
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.display = display;
    this.updatedAt = new Date();
  }

  updateUser(userId: string): void {
    this.createdById = userId;
    this.updatedAt = new Date();
  }

  updateTitle(title: string): void {
    this.title = title;
    this.updatedAt = new Date();
  }

  canChangeStatusTo(statusRequest: string): boolean {
    switch (statusRequest) {
      case APPOINTMENT_STATUS.CANCELED:
        return this.checkCanChangeStatusToCanceled();
      case APPOINTMENT_STATUS.CONFIRMED:
        return this.checkCanChangeStatusToConfirmed();
      case APPOINTMENT_STATUS.COMPLETED:
        return this.checkCanChangeStatusToCompleted();
      case APPOINTMENT_STATUS.RESCHEDULED:
        return this.checkCanChangeStatusToRescheduled();
      default:
        return true;
    }
  }

  private checkCanChangeStatusToCanceled(): boolean {
    return (
      this.status !== APPOINTMENT_STATUS.CANCELED &&
      this.status !== APPOINTMENT_STATUS.COMPLETED
    );
  }

  private checkCanChangeStatusToConfirmed(): boolean {
    return (
      this.status !== APPOINTMENT_STATUS.CANCELED &&
      this.status !== APPOINTMENT_STATUS.COMPLETED &&
      this.status !== APPOINTMENT_STATUS.CONFIRMED
    );
  }

  private checkCanChangeStatusToCompleted(): boolean {
    return (
      this.status !== APPOINTMENT_STATUS.CANCELED &&
      this.status !== APPOINTMENT_STATUS.COMPLETED &&
      this.status !== APPOINTMENT_STATUS.SCHEDULED
    );
  }

  private checkCanChangeStatusToRescheduled(): boolean {
    return (
      this.status !== APPOINTMENT_STATUS.CANCELED &&
      this.status !== APPOINTMENT_STATUS.COMPLETED
    );
  }
}
