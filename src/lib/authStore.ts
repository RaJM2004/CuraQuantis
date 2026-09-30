import { PartnerStore } from './partnerStore';

export type UserRole = 'admin' | 'partner' | 'applicant';

export interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  associatedAppId?: string;
  token?: string;
}

const STORAGE_KEY_AUTH = 'curaquantis_auth_session_v1';

// Seed executive admin credentials
export const DEFAULT_ADMIN_CREDENTIALS = {
  email: 'admin@curaquantis.com',
  password: 'Admin@CuraQuantis2026',
  dharaniEmail: 'dharani@curaquantis.com',
  dharaniPassword: 'Dharani@CuraQuantis2026'
};

export const AuthStore = {
  getCurrentUser: (): AuthUser | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_AUTH);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading auth session', e);
    }
    return null;
  },

  setCurrentUser: (user: AuthUser | null): void => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
    // Dispatch custom event for reactive UI updates across components
    window.dispatchEvent(new Event('curaquantis_auth_changed'));
  },

  loginAsAdmin: (email: string, password: string): { success: boolean; message: string; user?: AuthUser } => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check executive credentials
    if (
      (cleanEmail === 'admin@curaquantis.com' && password === 'Admin@CuraQuantis2026') ||
      (cleanEmail === 'dharani@curaquantis.com' && password === 'Dharani@CuraQuantis2026') ||
      (cleanEmail === 'ashwin@genquantis.com' && password === 'Ashwin@2026') ||
      (cleanEmail === 'admin' && password === 'admin123')
    ) {
      const adminUser: AuthUser = {
        userId: `ADMIN-${cleanEmail.split('@')[0].toUpperCase()}`,
        email: cleanEmail,
        fullName: cleanEmail.includes('dharani') ? 'Dr. Dharani (Executive Chairman)' :
                  cleanEmail.includes('ashwin') ? 'Ashwin Kumaar T (Lead Architect)' :
                  'CuraQuantis Executive Board',
        role: 'admin',
        token: `JWT_CQ_ADMIN_${Date.now()}`
      };

      AuthStore.setCurrentUser(adminUser);
      return { success: true, message: 'Executive access granted.', user: adminUser };
    }

    return { 
      success: false, 
      message: 'Invalid executive credentials. Use admin@curaquantis.com (Password: Admin@CuraQuantis2026) or your authorized credentials.' 
    };
  },

  loginAsApplicant: (appId: string, mobileOrEmail: string): { success: boolean; message: string; user?: AuthUser } => {
    const cleanId = appId.trim().toUpperCase();
    const cleanCredential = mobileOrEmail.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPhoneDigits = cleanCredential.replace(/\D/g, '');

    const app = PartnerStore.getApplicationById(cleanId);
    if (!app) {
      return {
        success: false,
        message: `No application docket found for Reference ID "${appId}". Please verify your reference number.`
      };
    }

    // Verify ownership via Email OR Mobile number
    const appEmail = app.individual.email.toLowerCase();
    const appPhone = app.individual.mobile.replace(/\D/g, '');
    const appWhatsapp = app.individual.whatsapp?.replace(/\D/g, '');

    const isMatch = 
      appEmail === cleanCredential ||
      (cleanPhoneDigits.length >= 8 && appPhone.includes(cleanPhoneDigits)) ||
      (cleanPhoneDigits.length >= 8 && appWhatsapp?.includes(cleanPhoneDigits));

    if (!isMatch) {
      return {
        success: false,
        message: `Identity verification failed: Mobile/Email does not match application record for ${cleanId}.`
      };
    }

    const partnerUser: AuthUser = {
      userId: `USER-${app.id}`,
      email: app.individual.email,
      fullName: app.individual.fullName,
      role: app.status === 'partner_activated' ? 'partner' : 'applicant',
      associatedAppId: app.id,
      token: `JWT_CQ_PARTNER_${app.id}`
    };

    AuthStore.setCurrentUser(partnerUser);
    return { success: true, message: 'Identity verified. Accessing your secure docket.', user: partnerUser };
  },

  logout: (): void => {
    AuthStore.setCurrentUser(null);
  },

  isAuthenticated: (): boolean => {
    return AuthStore.getCurrentUser() !== null;
  },

  isAdmin: (): boolean => {
    const user = AuthStore.getCurrentUser();
    return user !== null && user.role === 'admin';
  },

  canAccessApp: (appId: string): boolean => {
    const user = AuthStore.getCurrentUser();
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.associatedAppId?.toUpperCase() === appId.toUpperCase();
  }
};
