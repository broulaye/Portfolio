// EmailJS public credentials are safe to expose in the browser bundle —
// they're designed for client-side use and rate-limited per key.
const emailKeys = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

export default emailKeys;
