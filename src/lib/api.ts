
import { supabase } from '@/integrations/supabase/client';

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
  },

  put<T>(endpoint: string, data: any): Promise<T> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

// Supabase-based API client for appointments and consultations
export const supabaseApi = {
  appointments: {
    async getAll() {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctor_id(id, name, email, role),
          patient:patient_id(id, name, email, role)
        `)
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },

    async create(appointmentData: {
      doctor_id: string;
      scheduled_at: string;
      type: 'video' | 'phone' | 'in-person';
      notes?: string;
    }) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('appointments')
        .insert({
          ...appointmentData,
          patient_id: user.id
        })
        .select(`
          *,
          doctor:doctor_id(id, name, email, role),
          patient:patient_id(id, name, email, role)
        `)
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: any) {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          doctor:doctor_id(id, name, email, role),
          patient:patient_id(id, name, email, role)
        `)
        .single();
      
      if (error) throw error;
      return data;
    },

    async cancel(id: string) {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  consultations: {
    async start(appointmentId: string) {
      const { data, error } = await supabase
        .from('consultations')
        .insert({
          appointment_id: appointmentId,
          status: 'active'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async end(id: string, sessionNotes?: string, prescription?: string, diagnosis?: string) {
      const { data, error } = await supabase
        .from('consultations')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
          session_notes: sessionNotes,
          prescription,
          diagnosis
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async getByAppointment(appointmentId: string) {
      const { data, error } = await supabase
        .from('consultations')
        .select()
        .eq('appointment_id', appointmentId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  },

  profiles: {
    async getDoctors() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'doctor')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data;
    },

    async getDoctorById(id: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('role', 'doctor')
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateProfile(id: string, updates: any) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};
