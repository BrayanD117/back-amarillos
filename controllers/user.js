const { User, Person, DocumentType, BloodType, LicenseCategory, Status, Role, TransportSecretary, Company, City, Department } = require('../models');
const bcrypt = require('bcrypt');
const { Op, fn, col, where } = require('sequelize');

exports.createUser = async (req, res) => {
  try {
    const {
      transportSecretaryId,
      lastName,
      secondLastName,
      firstName,
      middleName,
      documentTypeId,
      documentNumber,
      username,
      password,
      roleId,
      statusId,
      companyId
    } = req.body;

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    let newUser;

    try {
      newUser = await User.create({
        username: username.toUpperCase(),
        password: passwordHash,
        roleId,
        statusId,
        lastName: lastName.toUpperCase(),
        secondLastName: secondLastName?.toUpperCase(),
        firstName: firstName.toUpperCase(),
        middleName: middleName?.toUpperCase(),
        documentTypeId,
        documentNumber: documentNumber.toUpperCase(),
        companyId,
        transportSecretaryId
      });
    } catch (error) {
      throw error;
    }

    res.status(201).json({
      ok: true,
      user: newUser
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

    const whereUser = search
      ? {
          [Op.or]: [
            where(fn('UPPER', col('User.documentNumber')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('User.firstName')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('User.lastName')), {
              [Op.like]: `%${search}%`
            })
          ]
        }
      : {};

    const { count, rows: users } = await User.findAndCountAll({
      offset,
      limit,
      where: whereUser,
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Status, attributes: ['id', 'name'] },
        { model: TransportSecretary, attributes: ['id', 'name'] },
        { model: Company, attributes: ['id', 'name'] },
        { model: DocumentType, attributes: ['id', 'name'] }
      ]
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
    middleName,
    documentTypeId,
    documentNumber,
    transportSecretaryId,
    username,
    roleId,
    statusId,
    companyId
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
      ...(statusId && { statusId }),
      ...(lastName && { lastName: lastName.toUpperCase() }),
      ...(secondLastName && { secondLastName: secondLastName?.toUpperCase() }),
      ...(firstName && { firstName: firstName.toUpperCase() }),
      ...(middleName && { middleName: middleName?.toUpperCase() }),
      ...(documentTypeId && { documentTypeId }),
      ...(documentNumber && { documentNumber: documentNumber.toUpperCase() }),
      ...(transportSecretaryId && { transportSecretaryId }),
      ...(companyId && { companyId })
    };

    await existingUser.update(userData);

    const updatedUser = await User.findByPk(id);

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
    const [roles, status, documentTypes, bloodTypes, licenseCategories, transportSecretaries] = await Promise.all([
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
      }),
      TransportSecretary.findAll({
        attributes: ['id', 'name'],
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        roles,
        status,
        documentTypes,
        bloodTypes,
        licenseCategories,
        transportSecretaries,
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