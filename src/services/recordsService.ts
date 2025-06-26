
import { apiClient } from '@/lib/api';
import { MedicalRecord } from '@/types/api';

class RecordsService {
  async getRecords(): Promise<MedicalRecord[]> {
    return apiClient.get<MedicalRecord[]>('/records');
  }

  async getRecordById(id: string): Promise<MedicalRecord> {
    return apiClient.get<MedicalRecord>(`/records/${id}`);
  }

  async getRecordsByType(type: string): Promise<MedicalRecord[]> {
    return apiClient.get<MedicalRecord[]>(`/records?type=${type}`);
  }

  async downloadRecord(id: string): Promise<Blob> {
    const response = await fetch(`/api/records/${id}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to download record');
    }
    
    return response.blob();
  }
}

export const recordsService = new RecordsService();
