const express = require('express');
const app = require('./src/app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 3000;

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
