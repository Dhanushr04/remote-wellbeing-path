
import { apiClient } from '@/lib/api';
import { MedicalRecord } from '@/types/api';

class RecordsService {
  async getRecords(): Promise<MedicalRecord[]> {
    return apiClient.get('/records');
  }

  async getRecordById(id: string): Promise<MedicalRecord> {
    return apiClient.get(`/records/${id}`);
  }

  async createRecord(recordData: Omit<MedicalRecord, 'id' | 'date'>): Promise<MedicalRecord> {
    return apiClient.post('/records', recordData);
  }

  async updateRecord(id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord> {
    return apiClient.put(`/records/${id}`, data);
  }

  async deleteRecord(id: string): Promise<void> {
    return apiClient.delete(`/records/${id}`);
  }
}

export const recordsService = new RecordsService();
