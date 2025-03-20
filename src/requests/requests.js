
// Leer todos los productos
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => console.log("Productos:", data))
  .catch(error => console.error("Error obteniendo productos:", error));


// Leer un producto por id
const productId = 1; // Cambia por el ID del producto que quieras obtener

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(data => console.log("Producto obtenido:", data))
  .catch(error => console.error("Error obteniendo producto:", error));


// Añadir un producto
const newProduct = {
    name: "Monitor",
    price: 300
  };
  
  fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  })
    .then(response => response.json())
    .then(data => console.log("Producto creado:", data))
    .catch(error => console.error("Error creando producto:", error));
  

// Actualizar un producto
const productIdToUpdate = 1; // ID del producto a actualizar
const updatedProduct = {
  price: 1200
};

fetch(`http://localhost:3000/api/products/${productIdToUpdate}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updatedProduct)
})
  .then(response => response.json())
  .then(data => console.log("Producto actualizado:", data))
  .catch(error => console.error("Error actualizando producto:", error));
    

// Eliminar un producto
const productIdToDelete = 2; // ID del producto a eliminar

fetch(`http://localhost:3000/api/products/${productIdToDelete}`, {
  method: "DELETE"
})
  .then(response => response.json())
  .then(data => console.log("Producto eliminado:", data))
  .catch(error => console.error("Error eliminando producto:", error));

