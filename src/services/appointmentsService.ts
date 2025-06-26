
import { apiClient } from '@/lib/api';
import { Appointment } from '@/types/api';

export interface CreateAppointmentRequest {
  doctorId: string;
  scheduledAt: string;
  type: 'video' | 'phone' | 'in-person';
  notes?: string;
}

class AppointmentsService {
  async getAppointments(): Promise<Appointment[]> {
    return apiClient.get<Appointment[]>('/appointments');
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    return apiClient.post<Appointment>('/appointments', appointmentData);
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    return apiClient.put<Appointment>(`/appointments/${id}`, data);
  }

  async cancelAppointment(id: string): Promise<void> {
    return apiClient.delete(`/appointments/${id}`);
  }

  async getUpcomingAppointments(): Promise<Appointment[]> {
    return apiClient.get<Appointment[]>('/appointments/upcoming');
  }
}

export const appointmentsService = new AppointmentsService();
