export type CreateAppointmentInput = {
  startAt: Date;
  endAt: Date;
  patientId: string;
  professionalId: string;
};
