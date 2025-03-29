const { Estado } = require('../models');

exports.createStatus = async (req, res) => {
  try {
    const estado = await Estado.create(req.body);
    res.status(201).json(estado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStatus = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStatusById = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      await estado.update(req.body);
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      await estado.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};