const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();



//create an department
router.post('/departments', async (req, res) => {
    try {
      const { name, description } = req.body;
    //   if (!name || !description) {
    //     res.status(400).json({ error: 'Both name and description are required' });
    //   } else {
      const department = await prisma.department.create({
        data: {
          name,
          description,
        },
      });
      console.log(department);
      res.json(department);
    // }
    } catch (error) {
      res.status(500).json({ error: 'Error creating department' });
    }
  });
  


  // Get all departments(read using -(findMany)
  router.get('/departments', async (req, res) => {
    try {
      const departments = await prisma.department.findMany();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving departments' });
    }
  });
  
  

  // Update a department
  router.put('/departments/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const department = await prisma.department.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
        },
      });
    //   if (!department) {
    //     res.status(404).json({ error: 'Department not found' });
    //   } else {
      res.json(department);
    //   }
    } catch (error) {
      res.status(500).json({ error: 'Error updating department' });
    }
  });
  

  
  // Delete a department
  router.delete('/departments/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedDepartment = await prisma.department.delete({
        where: { id: parseInt(id) },
      });
    //   if (!deletedDepartment) {
    //     res.status(404).json({ error: 'Department not found' });
    //   } else {
      res.json({ message: 'Department deleted successfully' });
    //   }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting department' });
    }
  });
  
  module.exports = router;