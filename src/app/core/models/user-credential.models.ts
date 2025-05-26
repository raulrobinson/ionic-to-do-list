export interface UserCredential {
  user: User;
  providerId: string | null;
  operationType: (typeof OperationType)[keyof typeof OperationType];
}

export declare interface User extends UserInfo {
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly metadata: UserMetadata;
  readonly providerData: UserInfo[];
  readonly refreshToken: string;
  readonly tenantId: string | null;
  delete(): Promise<void>;
  getIdToken(forceRefresh?: boolean): Promise<string>;
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  reload(): Promise<void>;
  toJSON(): object;
}

export declare interface UserInfo {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
  readonly uid: string;
}

export declare interface IdTokenResult {
  authTime: string;
  expirationTime: string;
  issuedAtTime: string;
  signInProvider: string | null;
  signInSecondFactor: string | null;
  token: string;
  claims: ParsedToken;
}

export declare interface ParsedToken {
  'exp'?: string;
  'sub'?: string;
  'auth_time'?: string;
  'iat'?: string;
  'firebase'?: {
    'sign_in_provider'?: string;
    'sign_in_second_factor'?: string;
    'identities'?: Record<string, string>;
  };
  [key: string]: unknown;
}

export declare interface UserMetadata {
  readonly creationTime?: string;
  readonly lastSignInTime?: string;
}

declare class UserMetadata_2 implements UserMetadata {
  private createdAt?;
  private lastLoginAt?;
  creationTime?: string;
  lastSignInTime?: string;
  constructor(createdAt?: (string | number) | undefined, lastLoginAt?: (string | number) | undefined);
  private _initializeTime;
  _copy(metadata: UserMetadata_2): void;
  toJSON(): object;
}

export declare const OperationType: {
  readonly LINK: "link";
  readonly REAUTHENTICATE: "reauthenticate";
  readonly SIGN_IN: "signIn";
};
