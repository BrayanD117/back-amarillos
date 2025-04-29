// controllers/cardPdfController.js
const fs           = require('fs');
const path         = require('path');
const {
  PDFDocument,
  rgb,
  StandardFonts
} = require('pdf-lib');

const { Card, Vehicle, User, Fare, Person, Status, Service, Fuel, TransportSecretary, Requirement, Agreement } = require('../models');


const dateCol = d =>
  new Date(d).toLocaleDateString('es-CO');
const money = n =>
  Number(n).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

async function buildCardData (cardId) {
    const card = await Card.findByPk(cardId);
    if (!card) return null;
  
    const vehicle = await Vehicle.findByPk(card.vehicleId, {
      include: [
        { model: Status,            attributes: ['name'] },
        { model: Service,           attributes: ['name'] },
        { model: Fuel,              attributes: ['name'] },
        { model: TransportSecretary,attributes: ['name'] },
        { model: Requirement },
        { model: Person }
      ]
    });
    if (!vehicle) return null;
  
    const person = await Person.findByPk(card.personId);
    if (!person) return null;
  
    const user = await User.findByPk(person.userId, {
      include: [{ model: Person }]
    });
    if (!user) return null;
  
    const fares = await Fare.findAll();
    const agreements = await Agreement.findAll({
      where: { transportSecretaryId: vehicle.transportSecretaryId },
      include: [{ model: TransportSecretary, as: 'transportSecretary' }]
    });
  
    /* ---- devuelve el mismo objeto que ya generabas ---- */
    return {
      vehicleInfo: {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        internalNumber: vehicle.internalNumber,
        brand: vehicle.brand,
        line: vehicle.line,
        model: vehicle.model,
        color: vehicle.color,
        vehicleClass: vehicle.vehicleClass,
        bodyType: vehicle.bodyType,
        capacity: vehicle.capacity,
        engine: vehicle.engine,
        chassis: vehicle.chassis,
        doors: vehicle.doors,
        service:  vehicle.Service  ? vehicle.Service.name  : null,
        status:   vehicle.Status   ? vehicle.Status.name   : null,
        fuel:     vehicle.Fuel     ? vehicle.Fuel.name     : null,
        transportSecretary: vehicle.TransportSecretary
                        ? vehicle.TransportSecretary.name : null,
        registrationDate: vehicle.registrationDate,
        issueDate:        vehicle.issueDate,
        owner: vehicle.User && vehicle.User.Person
             ? `${vehicle.User.Person.firstName} ${vehicle.User.Person.lastName}`
             : null
      },
      driverInfo: {
        id: user.id,
        personInfo: {
          id: person.id,
          documentNumber: person.documentNumber,
          documentTypeId: person.documentTypeId,
          firstName: person.firstName,
          lastName:  person.lastName,
          bloodTypeId: person.bloodTypeId,
          address:   person.address,
          phoneNumber: person.phoneNumber,
          healthInsurance: person.healthInsurance,
          workInsurance:   person.workInsurance,
          pension:         person.pension,
          licenseNumber:   person.licenseNumber,
          fullName:  `${person.firstName} ${person.lastName}`
        }
      },
      requirementInfo: {
        requirements: vehicle.Requirements?.map(r => ({
          soat: r.soat, soatCompany: r.soatCompany,
          soatIssue: r.soatIssue, soatDue: r.soatDue,
          vehicleInspection: r.vehicleInspection,
          vehicleInspectionCompany: r.vehicleInspectionCompany,
          vehicleInspectionIssue: r.vehicleInspectionIssue,
          vehicleInspectionDue: r.vehicleInspectionDue,
          thirdParty: r.thirdParty,
          thirdPartyCompany: r.thirdPartyCompany,
          thirdPartyIssue: r.thirdPartyIssue,
          thirdPartyDue: r.thirdPartyDue
        })) ?? []
      },
      fareInfo: fares.map(f => ({
        id: f.id,
        minimum: f.minimum,
        flagDown: f.flagDown,
        drop70m: f.drop70m,
        drop35s: f.drop35s,
        hour: f.hour
      })),
      agreementInfo: agreements.map(a => ({
        id: a.id,
        name: a.name,
        kilometer: a.kilometer,
        transportSecretary: a.transportSecretary?.name ?? null
      })),
      cardInfo: {
        id: card.id,
        number: card.number,
        issueDate: card.issueDate,
        expirationDate: card.expirationDate,
        endorsement: card.endorsement
      }
    };
  }

exports.generateCardPdf = async (req, res) => {
  try {
    const { cardId } = req.params;
    if (!cardId) {
      return res.status(400).json({ ok: false, msg: 'Falta cardId' });
    }

    const cardData = await buildCardData(cardId);
    if (!cardData) {
      return res.status(404).json({ ok: false, msg: 'Tarjeta no encontrada' });
    }

    const templateBytes = fs.readFileSync(
      path.join(__dirname, '../templates/card.pdf')
    );
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page   = pdfDoc.getPage(0);
    const helv   = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const f      = 50;
    const txt = (t, x, y) =>
      page.drawText(String(t ?? ''), { x, y, size: f, font: helv, color: rgb(0, 0, 0) });

    txt(cardData.vehicleInfo.licensePlate,   250, 2620);
    txt(cardData.vehicleInfo.internalNumber, 1480, 2620);

    const p = cardData.driverInfo.personInfo;
    txt(`${p.firstName} ${p.lastName}`,       430, 2400);
    txt(p.documentNumber,                    1200, 2400);
    txt(p.address,                           370, 2500);
    txt(p.healthInsurance,                   112, 600);
    txt(p.workInsurance,                     112, 585);
    txt(p.pension,                           112, 570);
    txt(p.bloodTypeId ? `${p.bloodTypeId}` : '', 430, 2200);

    txt(cardData.cardInfo.number,            432, 615);
    txt(dateCol(cardData.cardInfo.expirationDate), 432, 585);
    txt(cardData.cardInfo.endorsement,       432, 570);

    const ssDate =
      cardData.requirementInfo.requirements[0]?.soatDue;
    txt(ssDate ? dateCol(ssDate) : '',       432, 555);

    txt(money(12000),                        112, 540);
    txt(money( 8000),                        262, 540);
    txt(money(18000),                        412, 540);

    const fare = cardData.fareInfo[0];
    txt(money(fare.minimum),                 112, 505);
    txt(money(fare.flagDown),                262, 505);
    txt(money(fare.drop70m),                 412, 505);
    txt(money(fare.drop35s),                 562, 505);

    const selloPath = path.join(__dirname, '../assets/firma_sello.png');
    if (fs.existsSync(selloPath)) {
    const logoBytes = fs.readFileSync(selloPath);
    const logo      = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logo, { x: 350, y: 500, width: 150, height: 60 });
    } else {
    page.drawText('FIRMA Y SELLO', {
        x: 360,
        y: 520,
        size: 10,
        font: helv,
        color: rgb(0.5, 0.5, 0.5),
    });
    }

    const bytes = await pdfDoc.save();
    res.set({
      'Content-Type':        'application/pdf',
      'Content-Disposition': `inline; filename=card-${cardId}.pdf`,
      'Content-Length':      bytes.length
    });
    return res.send(Buffer.from(bytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error al generar PDF' });
  }
};
