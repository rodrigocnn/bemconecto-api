export const DEFAULT_APPOINTMENT_DISPLAY = 'block';
export const DEFAULT_APPOINTMENT_STATUS = 'SCHEDULED';

const STATUS_COLORS: Record<string, { backgroundColor: string; textColor: string }> = {
  SCHEDULED: { backgroundColor: '#E0F2FE', textColor: '#0C4A6E' },
  CONFIRMED: { backgroundColor: '#DCFCE7', textColor: '#14532D' },
  COMPLETED: { backgroundColor: '#E5E7EB', textColor: '#111827' },
  CANCELED: { backgroundColor: '#FEE2E2', textColor: '#7F1D1D' },
  RESCHEDULED: { backgroundColor: '#FEF3C7', textColor: '#78350F' },
};

export function getAppointmentColors(status: string): {
  backgroundColor: string;
  textColor: string;
} {
  return STATUS_COLORS[status] ?? STATUS_COLORS[DEFAULT_APPOINTMENT_STATUS];
}
