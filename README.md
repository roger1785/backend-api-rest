# Api Tienda

## Base URL

http://localhost:3000

## Endpoints

### GET /ping

Verifica que la API está funcionando.

#### Response 200

```json
{
  "message": "pong"
}
```

### GET /products

Devuelve la lista de productos.

#### Response 200

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200,
    "stock": 1
  }
]
```

### GET /products/:id

Devuelve un producto por id.

#### Response 200

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200,
  "stock": 1
}
```

#### Response 404

```json
{
  "error": "Producto no encontrado"
}
```

### POST /products

Crea un nuevo producto.

#### Body (JSON)

```json
{
  "name": "Keyboard",
  "price": 50,
  "stock": 1
}
```

#### Response 201

```json
{
  "id": 3,
  "name": "Keyboard",
  "price": 50
}
```

#### Response 422

```json
{
  "error": "name is required"
}
```

### PUT /products/:id

Actualizar un producto

#### Body (JSON)

```json
{
  "name": "Keyboard Nuevo",
  "price": 50,
  "stock": 1
}
```

#### Response 400

```json
{
  "error": "Invalid ID"
}
```

#### Response 404

```json
{
  "error": "Product no found"
}
```

#### Response 422

```json
{
  "error": "Invalid stock"
}
```

```json
{
  "error": "Invalid price"
}
```

#### Response 200

```json
{
  "name": "Keyboard Nuevo",
  "price": 50,
  "stock": 1
}
```

### DELETE /products/:id

Borra un producto

#### Response 400

```json
{
  "error": "Invalid ID"
}
```

#### Response 404

```json
{
  "error": "Product no found"
}
```

#### Response 204
