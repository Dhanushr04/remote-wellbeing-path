
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/api';

class AuthService {
  async login(email: string, password: string): Promise<{ user: User }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Login failed');
    }

    // Get user profile from profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to get user profile');
    }

    const user: User = {
      id: profileData.id,
      email: profileData.email,
      name: profileData.name,
      role: profileData.role as 'patient' | 'doctor',
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
    };

    return { user };
  }

  async register(email: string, password: string, name: string, role: 'patient' | 'doctor' = 'patient'): Promise<{ user: User }> {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Registration failed');
    }

    const user: User = {
      id: data.user.id,
      email: email,
      name: name,
      role: role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { user };
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    // Get user profile from profiles table
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !profileData) {
      return null;
    }

    return {
      id: profileData.id,
      email: profileData.email,
      name: profileData.name,
      role: profileData.role as 'patient' | 'doctor',
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
    };
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  }
}

export const authService = new AuthService();
