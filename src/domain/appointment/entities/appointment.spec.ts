import { Appointment } from './appointment';

describe('Appointment entity', () => {
  const makeAppointment = () =>
    new Appointment({
      title: 'Sessao inicial',
      startAt: '2026-05-08T10:00:00.000Z',
      endAt: '2026-05-08T11:00:00.000Z',
      status: 'SCHEDULED',
      professionalId: 'professional-1',
      patientId: 'patient-1',
    });

  it('should soft delete appointment with provided timestamp', () => {
    const appointment = makeAppointment();
    const now = new Date('2026-05-09T12:00:00.000Z');

    appointment.delete(now);

    expect(appointment.deletedAt).toEqual(now);
    expect(appointment.updatedAt).toEqual(now);
  });

  it('should update status and optional visual props', () => {
    const appointment = makeAppointment();

    appointment.updateStatus('CONFIRMED', '#fff', '#000', 'block');

    expect(appointment.status).toBe('CONFIRMED');
    expect(appointment.backgroundColor).toBe('#fff');
    expect(appointment.textColor).toBe('#000');
    expect(appointment.display).toBe('block');
  });

  it('should block invalid status transition', () => {
    const appointment = makeAppointment();

    expect(() => appointment.updateStatus('COMPLETED')).toThrow(
      'Cannot change appointment status from "SCHEDULED" to "COMPLETED"',
    );
  });

  it('should set visual properties', () => {
    const appointment = makeAppointment();

    appointment.setVisualProperties('#111', '#eee', 'list-item');

    expect(appointment.backgroundColor).toBe('#111');
    expect(appointment.textColor).toBe('#eee');
    expect(appointment.display).toBe('list-item');
  });

  it('should update user and title', () => {
    const appointment = makeAppointment();

    appointment.updateUser('user-1');
    appointment.updateTitle('Sessao de retorno');

    expect(appointment.createdById).toBe('user-1');
    expect(appointment.title).toBe('Sessao de retorno');
  });
});
