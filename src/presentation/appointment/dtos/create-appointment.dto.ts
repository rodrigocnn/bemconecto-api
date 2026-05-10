export class CreateAppointmentDto {
  startAt!: Date;
  endAt!: Date;
  professionalId!: string;
  patientId!: string;
}
