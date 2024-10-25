export const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    role: { type: 'string' }
  }
}

export const ErrorResponse = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    code: { type: 'number' }
  }
}