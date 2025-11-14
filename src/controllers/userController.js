import * as userService from "../services/userService.js";

export const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = (req, res) => {
  try {
    const user = userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newUser = userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = (req, res) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = (req, res) => {
  try {
    const deleted = userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
