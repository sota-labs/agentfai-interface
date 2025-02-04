const env = process.env.NEXT_PUBLIC_ENV || 'dev';
const PREFERENCES = `vyssjovybj_${env}`;
const PREFERENCES_WITH_SUB = `${PREFERENCES}_userSub_`;

export type StorageInterface = {
  zkpData?: any;
  zkLogin?: any;
  redirectAfterLogin?: string;
  expireTime?: number;
};
const defaultPreferences: StorageInterface = {};

export class Storage {
  static userSub: string | undefined | null;

  static save(value: StorageInterface) {
    Storage.setStorage(Storage.getStorageKey(), value);
  }

  static getGuestKey() {
    return `${PREFERENCES}_guest`;
  }

  static getStorageKey() {
    if (typeof window === "undefined") {
      return '';
    }
    if (!Storage.userSub) {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (
          key?.slice(0, PREFERENCES_WITH_SUB.length) === PREFERENCES_WITH_SUB
        ) {
          const userSub = key?.slice(PREFERENCES_WITH_SUB.length, key.length);
          if (userSub) {
            Storage.userSub = userSub;
            return PREFERENCES + `_userSub_${userSub}`;
          }
        }
      }

      return PREFERENCES;
    }
    return PREFERENCES + `_userSub_${Storage.userSub}`;
  }

  static resetStorage() {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.removeItem(Storage.getStorageKey());
    sessionStorage.removeItem(Storage.getGuestKey());
    Storage.userSub = null;
  }

  static getStorage(): StorageInterface {
    if (typeof window === "undefined") {
      return {};
    }
    const preferencesString = sessionStorage.getItem(
      Storage.getStorageKey(),
    );
    const preferences = JSON.parse(preferencesString || '{}');
    if (preferences?.expireTime <= Date.now()) {
      Storage.resetStorage();
      return {
        ...defaultPreferences,
      };
    }
    return {
      ...defaultPreferences,
      ...preferences,
    };
  }

  static getGuestStorage(): StorageInterface {
    if (typeof window === "undefined") {
      return {};
    }
    const preferencesString = sessionStorage.getItem(Storage.getGuestKey());
    const preferences = JSON.parse(preferencesString || '{}');
    return {
      ...defaultPreferences,
      ...preferences,
    };
  }

  static setStorage(type: string, value: StorageInterface) {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem(type, JSON.stringify(value));
  }

  static setGuestStorage(type: string, value: StorageInterface) {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem(type, JSON.stringify(value));
  }

  static init() {
    if (typeof window === "undefined") {
      return;
    }
    const preferences = Storage.getStorage();
    Storage.setStorage(Storage.getStorageKey(), preferences);
  }

  static updateReference(userSub: string) {
    if (typeof window === "undefined") {
      return;
    }
    const preferences = Storage.getStorage();
    Storage.userSub = userSub;

    sessionStorage.removeItem(PREFERENCES);
    let arr = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      if (
        sessionStorage.key(i)?.slice(0, PREFERENCES_WITH_SUB.length) ===
        PREFERENCES_WITH_SUB
      ) {
        arr.push(sessionStorage.key(i) || '');
      }
    }
    for (let i = 0; i < arr.length; i++) {
      sessionStorage.removeItem(arr[i]);
    }

    Storage.setStorage(Storage.getStorageKey(), {
      ...preferences,
      expireTime: Date.now() + 2 * 60 * 60 * 1000,
    });
  }

  static setZkpData(zkpData: any) {
    const preferences = Storage.getStorage();
    preferences.zkpData = zkpData;
    Storage.setStorage(Storage.getStorageKey(), preferences);
  }

  static setZkProof(zkpProof: any) {
    const preferences = Storage.getStorage();
    preferences.zkpData.zkProof = zkpProof;
    Storage.setStorage(Storage.getStorageKey(), preferences);
  }

  static getZkpData() {
    const { zkpData } = Storage.getStorage();
    return zkpData || {};
  }

  static setZkLoginForGuest(zkLogin: any) {
    const preferences = Storage.getGuestStorage();
    preferences.zkLogin = zkLogin;
    Storage.setGuestStorage(Storage.getGuestKey(), preferences);
  }

  static removeZkLoginForGuest() {
    window && window.sessionStorage.removeItem(Storage.getGuestKey());
  }

  static getZkLoginForGuest() {
    const { zkLogin } = Storage.getGuestStorage();
    return zkLogin || {};
  }

  static setRedirectAfterLogin(redirectAfterLogin: any) {
    const preferences = Storage.getStorage();
    preferences.redirectAfterLogin = redirectAfterLogin;
    Storage.setStorage(Storage.getStorageKey(), preferences);
  }

  static getRedirectAfterLogin() {
    const { redirectAfterLogin } = Storage.getStorage();
    return redirectAfterLogin;
  }

  static resetRedirectAfterLogin() {
    const preferences = Storage.getStorage();
    delete preferences.redirectAfterLogin;
    Storage.setStorage(Storage.getStorageKey(), preferences);
  }

  static logout() {
    Storage.resetRedirectAfterLogin();
    Storage.resetStorage();
  }
}
