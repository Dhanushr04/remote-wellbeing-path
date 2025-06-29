
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
  specialization?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor extends User {
  specialization: string;
  experience: number;
  rating: number;
  availability: string[];
  bio: string;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in-person';
  notes?: string;
  doctor: Doctor;
  patient: User;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  type: 'prescription' | 'lab-result' | 'diagnosis' | 'imaging';
  date: string;
  attachments?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'doctor';
}
