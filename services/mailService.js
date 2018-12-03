const nodemailer = require('nodemailer');

exports.enviarMail = function(resultats, cb) {
  try {
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yeeeeyaaaa@gmail.com',
        pass: 'farishteh84'
      }
    });

    // var smtpTransport = nodemailer.createTransport({
    //   host: config.config().relayCorreu.host,
    //   port: config.config().relayCorreu.port,
    //   tls: {
    //     rejectUnauthorized: false
    //   }
    // });
    // var textMail =
    //   "<p>Respecte a la teva petici&oacute; d'hores flexibles del dia " +
    //   moment(diaPeticio).format('DD/MM/YYYY HH:mm') +
    //   ' on ' +
    //   (hores < 0 ? 'demanaves ' : 'indiques la recuperaci&oacute; de ') +
    //   Math.abs(hores) +
    //   " hores, <br/> l'administrador ha fet el comentari seg&uuml;ent:</p><b>" +
    //   comentari +
    //   '</b>';

    let mailOptions = {
      from: 'yeeeeyaaaa@gmail.com',
      to: 'yeeeeyaaaa@gmail.com',
      subject: 'Novetats a wallapop de la teva cerca',
      text: resultats
      //   html: resultats
    };

    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('sendMail ' + error);
        return cb(error, null);
      }
      if (info.accepted.length > 0) {
        console.log('Message sent: %s', info.messageId);
        return cb(null, mailOptions.text);
      }
    });
  } catch (err) {
    console.log('sendMail ' + error);
    return cb(err, null);
  }
};
