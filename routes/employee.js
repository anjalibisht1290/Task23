const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


// Create an employee
router.post('/employees', async (req, res) => {
  try {
    const { name, email, deptId } = req.body;
    const employee = await prisma.employee.create({
      data: {
        name: req.body.name,
        // email,
        // deptId, 
        department: deptId !== undefined ?  {
          connect: {
            id: deptId
          }
        }: null
      },
    });
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating employee' });
  }
});


// Get all employees(Read)
router.get('/employees', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
//   sorting the employees by name(ascending order)
// const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving employees' });
  }
});


// Update an employee
router.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, deptId } = req.body;
  try {
    //    if (!employee) {
    //   res.status(404).json({ error: 'Employee not found' });
    // } else {
    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        deptId,
      },
    });
      //  }
      res.json(employee);

  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
});


// Delete an employee
router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    // if (!deletedEmployee) {
    //   res.status(404).json({ error: 'Employee not found' });
    // } else {
      res.json({ message: 'Employee deleted successfully' });
    // }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;