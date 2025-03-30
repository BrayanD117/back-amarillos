const { Usuario, Persona } = require('../models');
const bcrypt = require('bcrypt');

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
        usuario: usuario.toUpperCase(),
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
