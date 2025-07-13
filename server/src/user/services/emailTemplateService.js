import { findHtmlTemplate } from '../helpers/findHtmlTemplate.js';

// crea una clase y la exporta. Esta clase devuelve en su metodo getEmailContent el html o texto plano, segun correspoonda 
// codigo de purecode
export class EmailTemplateService {
  static getEmailContent(verificationCode, useHtml = true) {
    // Intentar obtener el template HTML
    const currentDate = new Date().toLocaleString();
    const htmlTemplate = useHtml ? findHtmlTemplate() : null;

    // Si hay template HTML y se requiere HTML, usar el template
    if (htmlTemplate && useHtml) {
      return {
        isHtml: true,
        content: htmlTemplate
          .replace('{{verificationCode}}', verificationCode)
          .replace('{{fecha}}', currentDate)
      };
    }

    // Si no hay template HTML o no se requiere HTML, usar texto plano
    return {
      isHtml: false,
      content: this.getPlainTextContent(verificationCode)
    };
  }
// texto plano a usar en caso de que decida esta opcion
  static getPlainTextContent(verificationCode) {
    return `
DTH Hogar
==========

Código de verificación de correo
-------------------------------

El número de verificación es: ${verificationCode}
                     ${currentDate}
Francisco Lopez 2096 - Ituzaingo - Corrientes - TE: 03786 -420975
    `.trim();
  }
};
