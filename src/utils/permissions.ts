import { TextConstants } from '../constants';

export const MANAGER = (value: string) =>
  value.toLowerCase() === TextConstants.MANAGER;

export const ADMIN = (value: string) =>
  MANAGER(value) || value.toLowerCase() === TextConstants.ADMIN;

export const SUPERVISOR = (value: string) =>
  ADMIN(value) || value.toLowerCase() === TextConstants.SUPERVISOR;

export const REVIEWER = (value: string) =>
  SUPERVISOR(value) || value.toLowerCase() === TextConstants.REVIEWER;

export const EXCLUDE_REVIEWER = (value: string) =>
  SUPERVISOR(value) || value.toLowerCase() === TextConstants.ADVISER;

export const ONLY_ADVISER = (value: string) =>
  value.toLowerCase() === TextConstants.ADVISER;
