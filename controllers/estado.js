const { Estado } = require('../models');

exports.createStatus = async (req, res) => {
  try {
    const status = await Estado.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStatus = async (req, res) => {
  try {
    const status = await Estado.findAll();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStatusById = async (req, res) => {
  try {
    const status = await Estado.findByPk(req.params.id);
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const status = await Estado.findByPk(req.params.id);
    if (status) {
      await status.update(req.body);
      res.status(200).json(status);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const status = await Estado.findByPk(req.params.id);
    if (status) {
      await status.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};