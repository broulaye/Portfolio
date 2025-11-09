const emailKeys = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
}

// Log configuration status (only in development)
// if (process.env.NODE_ENV === 'development') {
//   console.log('EmailJS Configuration:', {
//     hasServiceId: !!emailKeys.SERVICE_ID,
//     hasTemplateId: !!emailKeys.TEMPLATE_ID,
//     hasPublicKey: !!emailKeys.PUBLIC_KEY,
//   });
// }

export default emailKeys;