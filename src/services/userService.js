import User from '../models/User.js';

export const getAllUsers = () => User.findAll();

export const getUserById = (id) => User.findById(id);

export const createUser = ({ name, email }) => {
  if (email && User.emailExists(email)) {
    throw new Error('Email already exists');
  }
  return User.create({ name, email });
};

export const updateUser = (id, data) => {
  const existing = User.findById(id);
  if (!existing) return null;

  if (data.email && data.email !== existing.email && User.emailExists(data.email, id)) {
    throw new Error('Email already exists');
  }

  return User.update(id, data);
};

export const deleteUser = (id) => User.delete(id);
