
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
    return apiClient.get('/appointments');
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    return apiClient.get(`/appointments/${id}`);
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    return apiClient.post('/appointments', appointmentData);
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    return apiClient.put(`/appointments/${id}`, data);
  }

  async cancelAppointment(id: string): Promise<void> {
    return apiClient.delete(`/appointments/${id}`);
  }

  async getUpcomingAppointments(): Promise<Appointment[]> {
    return apiClient.get('/appointments/upcoming');
  }
}

export const appointmentsService = new AppointmentsService();
