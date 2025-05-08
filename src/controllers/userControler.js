import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración para poder usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../../data/users.json");

// Función auxiliar para leer el archivo JSON
const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// Obtener todos los users
export const getUsers = (req, res) => {
  const users = readData();
  res.json(users);
};

// Obtener un user por ID
export const getUserById = (req, res) => {
  const users = readData();
  const user = users.find(p => p.id === parseInt(req.params.id));
  
  if (!user) return res.status(404).json({ message: "user no encontrado" });
  
  res.json(user);
};

// Crear un nuevo user
export const createUser = (req, res) => {
  const users = readData();
  const newUser = { id: users.length + 1, ...req.body };
  
  users.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  
  res.status(201).json(newUser);
};

// Actualizar un user
export const updateUser = (req, res) => {
  let users = readData();
  const index = users.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) return res.status(404).json({ message: "user no encontrado" });
  
  users[index] = { ...users[index], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  
  res.json(users[index]);
};

// Eliminar un user
export const deleteUser = (req, res) => {
  let users = readData();
  const filteredUser = users.filter(p => p.id !== parseInt(req.params.id));
  
  if (users.length === filteredUser.length) return res.status(404).json({ message: "user no encontrado" });
  
  fs.writeFileSync(dataPath, JSON.stringify(filteredUser, null, 2));
  res.json({ message: "user eliminado" });
};
