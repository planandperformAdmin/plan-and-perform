import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthError, Session, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private supabaseService: SupabaseService) { }

  async register(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: AuthError | null }> {
    const { data, error } = await this.supabaseService.client.auth.signUp({ email, password });
    return { user: data?.user || null, session: data?.session || null, error };
  }

  async login(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: AuthError | null }> {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({ email, password });
    return { user: data?.user || null, session: data?.session || null, error };
  }

  async logout(): Promise<{ error: AuthError | null }> {
    const { error } = await this.supabaseService.client.auth.signOut();
    return { error };
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabaseService.client.auth.getUser();
    return data.user;
  }

  async getProfile(userId: string) {
  const { data, error } = await this.supabaseService.client
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
}

async upsertProfile(profileData: any) {
  return this.supabaseService.client
    .from('profiles')
    .upsert(profileData, { onConflict: 'user_id' });
}

}
