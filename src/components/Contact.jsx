import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { EarthCanvas, LazyCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import emailKeys from '../emailKeys';
import { styles } from "../styles";

const initialForm = { name: "", email: "", message: "" };
const initialErrors = { name: "", email: "", message: "" };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  // Honeypot — real users should never fill this field.
  const [honeypot, setHoneypot] = useState("");

  const loading = status.type === "loading";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const next = { ...initialErrors };
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!emailRegex.test(form.email)) {
      next.email = "That email doesn't look right.";
    }
    if (!form.message.trim()) next.message = "Please write a short message.";
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check — bots typically fill every field.
    if (honeypot) {
      setStatus({ type: "success", message: "Thanks! I'll get back to you soon." });
      setForm(initialForm);
      return;
    }

    if (!validate()) {
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    if (!emailKeys.SERVICE_ID || !emailKeys.TEMPLATE_ID || !emailKeys.PUBLIC_KEY) {
      setStatus({
        type: "error",
        message:
          "Email isn't configured right now. Please reach me directly at broulayepro@gmail.com.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending..." });

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_name: "Broulaye",
    };

    emailjs
      .send(emailKeys.SERVICE_ID, emailKeys.TEMPLATE_ID, templateParams, emailKeys.PUBLIC_KEY)
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Thanks for reaching out — I'll get back to you within a couple of days.",
          });
          setForm(initialForm);
          setErrors(initialErrors);
        },
        (error) => {
          setStatus({
            type: "error",
            message: `Something went wrong: ${error?.text || error?.message || "unknown error"}. Please email me directly at broulayepro@gmail.com.`,
          });
        }
      );
  };

  const fieldBase =
    'bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border font-medium transition-colors focus:border-[#915EFF] focus-visible:ring-2 focus-visible:ring-[#915EFF]';

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className='mt-12 flex flex-col gap-8'
        >
          {/* Honeypot — hidden from humans, visible to bots */}
          <label
            className='absolute left-[-9999px]'
            aria-hidden='true'
          >
            Company
            <input
              type='text'
              tabIndex={-1}
              autoComplete='off'
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${fieldBase} ${errors.name ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.name && (
              <span id="name-error" className='mt-2 text-red-400 text-[13px]'>
                {errors.name}
              </span>
            )}
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${fieldBase} ${errors.email ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.email && (
              <span id="email-error" className='mt-2 text-red-400 text-[13px]'>
                {errors.email}
              </span>
            )}
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldBase} ${errors.message ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.message && (
              <span id="message-error" className='mt-2 text-red-400 text-[13px]'>
                {errors.message}
              </span>
            )}
          </label>

          <div className='flex flex-wrap items-center gap-4'>
            <button
              type='submit'
              disabled={loading}
              className='bg-[#915EFF] hover:bg-[#7d4cea] disabled:opacity-60 disabled:cursor-not-allowed py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black-100'
            >
              {loading ? "Sending..." : "Send message"}
            </button>

            {status.type === "success" && (
              <p
                role='status'
                aria-live='polite'
                className='text-emerald-300 text-[14px] font-medium'
              >
                {status.message}
              </p>
            )}
            {status.type === "error" && (
              <p
                role='alert'
                aria-live='assertive'
                className='text-red-400 text-[14px] font-medium'
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <LazyCanvas
          className='w-full h-full'
          fallback={
            <div className='w-full h-full rounded-2xl bg-black-100/40 border border-white/5' aria-hidden='true' />
          }
        >
          <EarthCanvas />
        </LazyCanvas>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
