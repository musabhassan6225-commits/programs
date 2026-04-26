export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  medicalHistory?: Record<string, any>;
  dentalHistory?: Record<string, any>;
  clinicalFindings?: Record<string, any>;
};

export type Appointment = {
  id: string;
  patientId: string;
  providerId: string;
  clinicId?: string;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
  notes?: Record<string, any>;
};
