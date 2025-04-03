const { Usuario, Persona, TipoDocumento, GrupoSanguineo, CategoriaLicencias, Estado, Rol } = require('../models');
const bcrypt = require('bcrypt');
const { Op, fn, col, where } = require('sequelize');

exports.crearUsuario = async (req, res) => {
  try {
    const {
      primerApellido,
      segundoApellido,
      primerNombre,
      segundoNombre,
      idTipoDocumento,
      numeroDocumento,
      direccion,
      telefono,
      idGrupoSanguineo,
      rh,
      eps,
      arl,
      pension,
      licencia,
      idCategoriaLicencia,
      organismo,
      vigencia,
      foto,

      usuario,
      contrasenia,
      idRol,
      idEstado
    } = req.body;

    const salt = bcrypt.genSaltSync();
    const contraseniaHash = bcrypt.hashSync(contrasenia, salt);

    let nuevoUsuario;
    let persona;

    try {
      nuevoUsuario = await Usuario.create({
        usuario,
        contrasenia: contraseniaHash,
        idRol,
        idEstado
      });

      try {
        persona = await Persona.create({
          primerApellido: primerApellido.toUpperCase(),
          segundoApellido: segundoApellido?.toUpperCase(),
          primerNombre: primerNombre.toUpperCase(),
          segundoNombre: segundoNombre?.toUpperCase(),
          idTipoDocumento,
          numeroDocumento: numeroDocumento.toUpperCase(),
          direccion: direccion.toUpperCase(),
          telefono: telefono.toUpperCase(),
          idGrupoSanguineo,
          rh: rh.toUpperCase(),
          eps: eps.toUpperCase(),
          arl: arl.toUpperCase(),
          pension: pension.toUpperCase(),
          licencia: licencia.toUpperCase(),
          idCategoriaLicencia,
          organismo: organismo.toUpperCase(),
          vigencia,
          foto,
          idUsuario: nuevoUsuario.id
        });

      } catch (error) {
        await Usuario.destroy({ where: { id: nuevoUsuario.id } });
        throw error;
      }

    } catch (error) {
      throw error;
    }

    res.status(201).json({
      ok: true,
      usuario: {
        ...nuevoUsuario.dataValues,
        persona: persona.dataValues
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

exports.obtenerUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = String(req.query.search || '').trim().toUpperCase();;

    const wherePersona = search
      ? {
          [Op.or]: [
            where(fn('UPPER', col('Persona.numeroDocumento')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Persona.primerNombre')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Persona.primerApellido')), {
              [Op.like]: `%${search}%`
            })
          ]
        }
      : {};

    const { count, rows: usuarios } = await Usuario.findAndCountAll({
      offset,
      limit,
      include: [{
        model: Persona,
        where: wherePersona,
        include: [
          {
            model: TipoDocumento,
            attributes: ['nombre']
          },
          {
            model: GrupoSanguineo,
            attributes: ['nombre']
          },
          {
            model: CategoriaLicencias,
            attributes: ['nombre']
          }
        ]
      }]
    });

    res.json({
      ok: true,
      usuarios,
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

exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id, {
      include: [{
        model: Persona,
        include: [
          {
            model: TipoDocumento,
            attributes: ['nombre']
          },
          {
            model: GrupoSanguineo,
            attributes: ['nombre']
          },
          {
            model: CategoriaLicencias,
            attributes: ['nombre']
          }
        ]
      }]
    });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    res.json({
      ok: true,
      usuario
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener usuario. Por favor contacte al administrador'
    });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    primerApellido,
    segundoApellido,
    primerNombre,
    segundoNombre,
    idTipoDocumento,
    numeroDocumento,
    direccion,
    telefono,
    idGrupoSanguineo,
    rh,
    eps,
    arl,
    pension,
    licencia,
    idCategoriaLicencia,
    organismo,
    vigencia,
    foto,
    usuario: nombreUsuario,
    idRol,
    idEstado,
  } = req.body;

  try {
    const usuarioExistente = await Usuario.findByPk(id);

    if (!usuarioExistente) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    const datosUsuario = {
      ...(nombreUsuario && { usuario: nombreUsuario.toUpperCase() }),
      ...(idRol && { idRol }),
      ...(idEstado && { idEstado })
    };

    await usuarioExistente.update(datosUsuario);

    const personaExistente = await Persona.findOne({ where: { idUsuario: id } });

    if (!personaExistente) {
      return res.status(404).json({
        ok: false,
        msg: 'Datos de persona no encontrados'
      });
    }

    const datosPersona = {
      ...(primerApellido && { primerApellido: primerApellido.toUpperCase() }),
      ...(segundoApellido && { segundoApellido: segundoApellido?.toUpperCase() }),
      ...(primerNombre && { primerNombre: primerNombre.toUpperCase() }),
      ...(segundoNombre && { segundoNombre: segundoNombre?.toUpperCase() }),
      ...(idTipoDocumento && { idTipoDocumento }),
      ...(numeroDocumento && { numeroDocumento: numeroDocumento.toUpperCase() }),
      ...(direccion && { direccion: direccion.toUpperCase() }),
      ...(telefono && { telefono: telefono.toUpperCase() }),
      ...(idGrupoSanguineo && { idGrupoSanguineo }),
      ...(rh && { rh: rh.toUpperCase() }),
      ...(eps && { eps: eps.toUpperCase() }),
      ...(arl && { arl: arl.toUpperCase() }),
      ...(pension && { pension: pension.toUpperCase() }),
      ...(licencia && { licencia: licencia.toUpperCase() }),
      ...(idCategoriaLicencia && { idCategoriaLicencia }),
      ...(organismo && { organismo: organismo.toUpperCase() }),
      ...(vigencia && { vigencia }),
      ...(foto && { foto })
    };

    await personaExistente.update(datosPersona);

    const usuarioActualizado = await Usuario.findByPk(id, {
      include: [{
        model: Persona,
        include: [
          { model: TipoDocumento },
          { model: GrupoSanguineo },
          { model: CategoriaLicencias }
        ]
      }]
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar usuario. Por favor contacte al administrador'
    });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
    }

    await usuario.destroy();

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
    const [roles, estados, tiposDocumento, gruposSanguineos, categoriasLicencia] = await Promise.all([
      Rol.findAll({
        attributes: ['id', 'nombre'],
      }),
      Estado.findAll({
        attributes: ['id', 'nombre']
      }),
      TipoDocumento.findAll({
        attributes: ['id', 'nombre']
      }),
      GrupoSanguineo.findAll({
        attributes: ['id', 'nombre']
      }),
      CategoriaLicencias.findAll({
        attributes: ['id', 'nombre']
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        roles,
        estados,
        tiposDocumento,
        gruposSanguineos,
        categoriasLicencia
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