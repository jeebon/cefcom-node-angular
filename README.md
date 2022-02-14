# CefCom- Beyond the eCommerce

A simple e-commerce website for the time being, in the future it will be expanded.

## Installation

```bash
docker-compose up
```

App Running URL: [http://localhost:4200](http://localhost:4200)

API Server Will Run 5000 PORT.
Ex: Products API: [http://localhost:5000/api/v1/products](http://localhost:5000/api/v1/products)

## Dummy product import

```bash
docker-compose exec backend sh
npm run import:products
```

To remove all products:

```bash
docker-compose exec backend sh
npm run delete:products
```
