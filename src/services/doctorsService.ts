
import { apiClient } from '@/lib/api';
import { Doctor } from '@/types/api';

export interface DoctorsFilters {
  specialization?: string;
  minRating?: number;
  availability?: string[];
  search?: string;
}

class DoctorsService {
  async getDoctors(filters?: DoctorsFilters): Promise<Doctor[]> {
    const queryParams = new URLSearchParams();
    
    if (filters?.specialization) {
      queryParams.append('specialization', filters.specialization);
    }
    if (filters?.minRating) {
      queryParams.append('minRating', filters.minRating.toString());
    }
    if (filters?.search) {
      queryParams.append('search', filters.search);
    }
    
    const endpoint = `/doctors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<Doctor[]>(endpoint);
  }

  async getDoctorById(id: string): Promise<Doctor> {
    return apiClient.get<Doctor>(`/doctors/${id}`);
  }

  async getDoctorAvailability(doctorId: string, date: string): Promise<string[]> {
    return apiClient.get<string[]>(`/doctors/${doctorId}/availability?date=${date}`);
  }
}

export const doctorsService = new DoctorsService();
