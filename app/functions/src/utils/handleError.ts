import { ERRORS } from '@constants/errors';

export const handleError = (error: any): string =>
  ERRORS[(error as any).code] || 'Error del servidor. Por favor, intenta de nuevo o contacta a sorporte técnico';
