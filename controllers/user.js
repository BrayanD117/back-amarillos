const { User, Person, DocumentType, BloodType, LicenseCategory, Status, Role } = require('../models');
const bcrypt = require('bcrypt');
const { Op, fn, col, where } = require('sequelize');

exports.createUser = async (req, res) => {
  try {
    const {
      lastName,
      secondLastName,
      firstName,
      secondName,
      documentTypeId,
      documentNumber,
      address,
      phoneNumber,
      bloodTypeId,
      rhFactor,
      healthInsurance,
      workInsurance,
      pension,
      licenseNumber,
      licenseCategoryId,
      transportSecretaryId,
      expirationDate,
      photo,

      username,
      password,
      roleId,
      statusId
    } = req.body;

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    let newUser;
    let person;

    try {
      newUser = await User.create({
        username,
        password: passwordHash,
        roleId,
        statusId
      });

      try {
        person = await Person.create({
          lastName: lastName.toUpperCase(),
          secondLastName: secondLastName?.toUpperCase(),
          firstName: firstName.toUpperCase(),
          secondName: secondName?.toUpperCase(),
          documentTypeId,
          documentNumber: documentNumber.toUpperCase(),
          address: address.toUpperCase(),
          phoneNumber: phoneNumber.toUpperCase(),
          bloodTypeId,
          rhFactor: rhFactor.toUpperCase(),
          healthInsurance: healthInsurance.toUpperCase(),
          workInsurance: workInsurance.toUpperCase(),
          pension: pension.toUpperCase(),
          licenseNumber: licenseNumber.toUpperCase(),
          licenseCategoryId,
          transportSecretaryId,
          expirationDate,
          photo,
          userId: newUser.id
        });

      } catch (error) {
        await User.destroy({ where: { id: newUser.id } });
        throw error;
      }

    } catch (error) {
      throw error;
    }

    res.status(201).json({
      ok: true,
      user: {
        ...newUser.dataValues,
        person: person.dataValues
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear usuario. Por favor contacte al administrador'
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = String(req.query.search || '').trim().toUpperCase();

    const wherePerson = search
      ? {
          [Op.or]: [
            where(fn('UPPER', col('Person.documentNumber')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Person.firstName')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Person.lastName')), {
              [Op.like]: `%${search}%`
            })
          ]
        }
      : {};

    const { count, rows: users } = await User.findAndCountAll({
      offset,
      limit,
      include: [{
        model: Person,
        where: wherePerson,
        include: [
          {
            model: DocumentType,
            attributes: ['name']
          },
          {
            model: BloodType,
            attributes: ['name']
          },
          {
            model: LicenseCategory,
            attributes: ['name']
          }
        ]
      }]
    });

    res.json({
      ok: true,
      users,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener usuarios.'
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [{
        model: Person,
        include: [
          {
            model: DocumentType,
            attributes: ['name']
          },
          {
            model: BloodType,
            attributes: ['name']
          },
          {
            model: LicenseCategory,
            attributes: ['name']
          }
        ]
      }]
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    res.json({
      ok: true,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener usuario. Por favor contacte al administrador'
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    lastName,
    secondLastName,
    firstName,
    secondName,
    documentTypeId,
    documentNumber,
    address,
    phoneNumber,
    bloodTypeId,
    rhFactor,
    healthInsurance,
    workInsurance,
    pension,
    licenseNumber,
    licenseCategoryId,
    transportSecretaryId,
    expirationDate,
    photo,
    username,
    roleId,
    statusId
  } = req.body;

  try {
    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    const userData = {
      ...(username && { username: username.toUpperCase() }),
      ...(roleId && { roleId }),
      ...(statusId && { statusId })
    };

    await existingUser.update(userData);

    const existingPerson = await Person.findOne({ where: { userId: id } });

    if (!existingPerson) {
      return res.status(404).json({
        ok: false,
        msg: 'Datos de persona no encontrados'
      });
    }

    const personData = {
      ...(lastName && { lastName: lastName.toUpperCase() }),
      ...(secondLastName && { secondLastName: secondLastName?.toUpperCase() }),
      ...(firstName && { firstName: firstName.toUpperCase() }),
      ...(secondName && { secondName: secondName?.toUpperCase() }),
      ...(documentTypeId && { documentTypeId }),
      ...(documentNumber && { documentNumber: documentNumber.toUpperCase() }),
      ...(address && { address: address.toUpperCase() }),
      ...(phoneNumber && { phoneNumber: phoneNumber.toUpperCase() }),
      ...(bloodTypeId && { bloodTypeId }),
      ...(rhFactor && { rhFactor: rhFactor.toUpperCase() }),
      ...(healthInsurance && { healthInsurance: healthInsurance.toUpperCase() }),
      ...(workInsurance && { workInsurance: workInsurance.toUpperCase() }),
      ...(pension && { pension: pension.toUpperCase() }),
      ...(licenseNumber && { licenseNumber: licenseNumber.toUpperCase() }),
      ...(licenseCategoryId && { licenseCategoryId }),
      ...(transportSecretaryId && { transportSecretaryId }),
      ...(expirationDate && { expirationDate }),
      ...(photo && { photo })
    };

    await existingPerson.update(personData);

    const updatedUser = await User.findByPk(id, {
      include: [{
        model: Person,
        include: [
          { model: DocumentType },
          { model: BloodType },
          { model: LicenseCategory }
        ]
      }]
    });

    res.json({
      ok: true,
      user: updatedUser
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar usuario. Por favor contacte al administrador'
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    await user.destroy();

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar usuario. Por favor contacte al administrador'
    });
  }
};

exports.getUserOptions = async (req, res) => {
  try {
    const [roles, status, documentTypes, bloodTypes, licenseCategories] = await Promise.all([
      Role.findAll({
        attributes: ['id', 'name'],
      }),
      Status.findAll({
        attributes: ['id', 'name']
      }),
      DocumentType.findAll({
        attributes: ['id', 'name']
      }),
      BloodType.findAll({
        attributes: ['id', 'name']
      }),
      LicenseCategory.findAll({
        attributes: ['id', 'name']
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        roles,
        status,
        documentTypes,
        bloodTypes,
        licenseCategories
      },
      message: "Opciones obtenidas exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las opciones",
      error: error.message
    });
  }
};