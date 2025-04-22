require('dotenv').config()
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./docs/swagger')
const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('[:date] :method :url :status :response-time ms',))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api', routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}`)
})