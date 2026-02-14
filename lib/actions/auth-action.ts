'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export async function handleLogin(loginData: LoginData) {
  try {
    console.log('handleLogin - Starting login process');
    
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
    
    console.log('handleLogin - Full response:', JSON.stringify(result, null, 2));
    console.log('handleLogin - Response success:', result.success);

    if (result.success && result.data?.token) {
      const cookieStore = await cookies();
      
      console.log('handleLogin - Setting auth_token cookie');
      cookieStore.set('auth_token', result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      console.log('handleLogin - Setting user_data cookie');
      cookieStore.set('user_data', JSON.stringify(result.data.user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      const tokenCheck = (await cookies()).get('auth_token')?.value;
      const userCheck = (await cookies()).get('user_data')?.value;
      console.log('handleLogin - Token saved:', !!tokenCheck);
      console.log('handleLogin - User saved:', !!userCheck);
      console.log('handleLogin - User data:', userCheck);

      return { 
        success: true, 
        message: 'Login successful', 
        data: result.data.user 
      };
    }

    return { 
      success: false, 
      message: result.message || 'Login failed' 
    };
  } catch (error: unknown) {
    console.error('handleLogin - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    return { 
      success: false, 
      message: errorMessage 
    };
  }
}

export async function handleRegister(registrationData: RegisterData) {
  try {
    console.log('handleRegister - Starting registration process');
    
    const payload = {
      username: registrationData.username || registrationData.username,
      email: registrationData.email,
      password: registrationData.password,
      confirmPassword: registrationData.confirmPassword || registrationData.password,
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
    
    console.log('handleRegister - Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      return { 
        success: true, 
        message: result.message || 'Registration successful', 
        data: result.data 
      };
    }
    
    // Handle validation errors
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
      return { 
        success: false, 
        message: errorMessages || 'Validation failed' 
      };
    }
    
    return { 
      success: false, 
      message: result.message || 'Registration failed' 
    };
  } catch (error: unknown) {
    console.error('handleRegister - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    return { 
      success: false, 
      message: errorMessage 
    };
  }
}

export async function handleLogout() {
  try {
    await clearAuthCookies();
    redirect("/login");
  } catch (error) {
    console.error('handleLogout - Error:', error);
    throw error;
  }
}

export async function handleWhoAmI() {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (result.success && result.data) {
      const cookieStore = await cookies();
      const userString = JSON.stringify(result.data);
      
      console.log('handleWhoAmI - Setting user_data cookie:', userString);
      
      cookieStore.set('user_data', userString, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return {
        success: true,
        message: "User data fetched successfully",
        user: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch user data",
    };
  } catch (error: unknown) {
    console.error('handleWhoAmI - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'WhoAmI action failed';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function handleUpdateProfile(profileData: FormData) {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: profileData,
      cache: 'no-store',
    });

    const result = await response.json();

    if (result.success && result.data) {
      const cookieStore = await cookies();
      const userString = JSON.stringify(result.data);
      
      console.log('handleUpdateProfile - Setting user_data cookie:', userString);
      
      cookieStore.set('user_data', userString, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      revalidatePath("/user/profile");
      revalidatePath("/profile");

      return {
        success: true,
        message: "Profile updated successfully",
        user: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update profile",
    };
  } catch (error: unknown) {
    console.error('handleUpdateProfile - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Update profile action failed';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function handleRequestPasswordReset(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    });

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        message: result.message || "Password reset email sent successfully",
      };
    }
    
    return {
      success: false,
      message: result.message || "Request password reset failed",
    };
  } catch (error: unknown) {
    console.error('handleRequestPasswordReset - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Request password reset action failed';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function handleResetPassword(token: string, newPassword: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token, 
        password: newPassword,
        confirmPassword: newPassword 
      }),
      cache: 'no-store',
    });

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        message: result.message || "Password has been reset successfully",
      };
    }
    
    return {
      success: false,
      message: result.message || "Reset password failed",
    };
  } catch (error: unknown) {
    console.error('handleResetPassword - Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Reset password action failed';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

// Helper functions
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

export async function isAuthenticated() {
  const token = await getAuthToken();
  return !!token;
}