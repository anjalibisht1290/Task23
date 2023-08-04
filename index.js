const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();


app.use(express.json());

const employeeRoutes = require('./routes/employee');
const departmentRoutes = require('./routes/department');

app.use(employeeRoutes);
app.use("/dept",departmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });