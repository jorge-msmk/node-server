import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración para poder usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../../data/products.json");

// Función auxiliar para leer el archivo JSON
const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// Obtener todos los productos
export const getProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

// Obtener un producto por ID
export const getProductById = (req, res) => {
  const products = readData();
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  
  res.json(product);
};

// Crear un nuevo producto
export const createProduct = (req, res) => {
  const products = readData();
  const newProduct = { id: products.length + 1, ...req.body };
  
  products.push(newProduct);
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  
  res.status(201).json(newProduct);
};

// Actualizar un producto
export const updateProduct = (req, res) => {
  let products = readData();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });
  
  products[index] = { ...products[index], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  
  res.json(products[index]);
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
  let products = readData();
  const filteredProducts = products.filter(p => p.id !== parseInt(req.params.id));
  
  if (products.length === filteredProducts.length) return res.status(404).json({ message: "Producto no encontrado" });
  
  fs.writeFileSync(dataPath, JSON.stringify(filteredProducts, null, 2));
  res.json({ message: "Producto eliminado" });
};
