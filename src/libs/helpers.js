import bcrypt from "bcryptjs";

// -- Encripta la contraseña
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// -- Desencripta la contraseña
export const matchPassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};
