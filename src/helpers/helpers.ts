export function validateInput(input: any, type: any) {
  try {
    return type.parse(input);
  } catch (error: any) {
    throw {error, message: 'Campos recebidos inválidos!'};
  }
}
