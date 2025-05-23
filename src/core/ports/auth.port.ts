import { User } from '../models/user.model';
import { InjectionToken } from "@angular/core";

export abstract class AuthPort {
  abstract register(user: User): Promise<any>;
  abstract login(user: User): Promise<any>;
  abstract logout(): Promise<void>;
}

export const AUTH_PORT = new InjectionToken<AuthPort>('AuthPort');
