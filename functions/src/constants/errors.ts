export const ERRORS: Record<string, string> = {
  'auth/invalid-phone-number': 'Número de teléfono inválido',
  'auth/claims-too-large':
    'La carga útil de la reclamación que se entregó a setCustomUserClaims() supera el tamaño máximo de 1,000 bytes.',
  'auth/email-already-exists': 'Este email ya está registrado.',
  'auth/id-token-expired': 'El token de ID de Firebase que se proporcionó está vencido.',
  'auth/id-token-revoked': 'Se revocó el token de ID de Firebase.',
  'auth/insufficient-permission': 'No tienes permisos suficientes.',
  'auth/internal-error': 'Error inesperado.',
  'auth/invalid-argument': 'Argumentos no válidos para la autenticación.',
  'auth/invalid-claims':
    'Los atributos personalizados del reclamo que se entregaron a setCustomUserClaims() no son válidos.',
  'auth/invalid-email	': 'Email inválido.',
  'auth/invalid-password': 'Contraseña inválida.',
  'auth/phone-number-already-exists':
    'Otro usuario ya registró este número de teléfono. Si es un error, por favor contacta al soporte técnico.',
  'auth/user-not-found': 'Este usuario no existe.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
};
