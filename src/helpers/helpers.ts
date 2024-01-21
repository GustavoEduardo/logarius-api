export function validateInput(input: any, type: any) {
  try {
    return type.parse(input);
  } catch (error: any) {
    throw { error, message: "Campos recebidos inválidos!" };
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/;
  return email.match(emailRegex);
}
