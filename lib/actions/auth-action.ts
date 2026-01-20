'use server';

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050';

export async function handleLogin(loginData: { email: string; password: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
      cache: 'no-store',
    });

    const result = await response.json();

    if (result.success && result.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('auth_token', result.data.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      cookieStore.set('user_data', JSON.stringify(result.data.user), {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return { success: true, message: 'Login successful', data: result.data.user };
    }
    return { success: false, message: result.message || 'Login failed' };
  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    return { success: false, message: errorMessage };
  }
}

export async function handleRegister(registrationData: { 
  fullName?: string; 
  name?: string; 
  email: string; 
  password: string; 
  confirmPassword?: string;
}) {
  try {
    const payload = {
      fullname: registrationData.fullName || registrationData.name,
      email: registrationData.email,
      password: registrationData.password,
      confirmPassword: registrationData.password,
    };

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    
    if (result.errors) {
      const errorMessages = Object.entries(result.errors)
        .map(([, error]: [string, unknown]) => {
          if (error && typeof error === 'object' && '_errors' in error) {
            const errorObj = error as Record<string, unknown>;
            const messages = Array.isArray(errorObj._errors) ? errorObj._errors : [];
            return messages.join(', ');
          }
          return '';
        })
        .filter(Boolean)
        .join(', ');
      return { success: false, message: errorMessages || 'Validation failed' };
    }
    
    return { success: false, message: result.message || 'Registration failed' };
  } catch (error: unknown) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    return { success: false, message: errorMessage };
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value || null;
}

export async function getUserData() {
  const cookieStore = await cookies();
  const userData = cookieStore.get('user_data')?.value;
  return userData ? JSON.parse(userData) : null;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('user_data');
}