import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import emailKeys from "../emailKeys";
import { styles } from "../styles";

const initialForm = { name: "", email: "", message: "" };
const initialErrors = { name: "", email: "", message: "" };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reachLinks = [
  {
    label: "Email",
    value: "broulayepro@gmail.com",
    href: "mailto:broulayepro@gmail.com",
    icon: FiMail,
  },
  {
    label: "GitHub",
    value: "github.com/broulaye",
    href: "https://github.com/broulaye",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/broulaye",
    href: "https://www.linkedin.com/in/broulaye/",
    icon: FiLinkedin,
  },
  {
    label: "Location",
    value: "Remote · US-Central",
    href: null,
    icon: FiMapPin,
  },
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState({ type: "idle", message: "" });
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
    "w-full bg-white/[0.03] py-3 px-4 placeholder:text-muted text-white rounded-md outline-none border text-[14px] transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>05 / Contact</p>
        <h2 className={styles.sectionHeadText}>Let&apos;s talk.</h2>
      </motion.div>

      <div className='mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8'>
        {/* Left — direct channels */}
        <motion.aside
          variants={fadeIn("right", "spring", 0.1, 0.7)}
          className='lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-7'
        >
          <p className='text-secondary text-[14px] leading-[24px]'>
            I&apos;m currently open to remote frontend and full-stack roles. Happy to chat about
            product work, engineering hires, or interesting side projects.
          </p>

          <ul className='mt-6 space-y-4'>
            {reachLinks.map(({ label, value, href, icon: Icon }) => {
              const Tag = href ? "a" : "div";
              const extraProps = href
                ? {
                    href,
                    target: href.startsWith("mailto:") ? undefined : "_blank",
                    rel: href.startsWith("mailto:") ? undefined : "noreferrer noopener",
                  }
                : {};
              return (
                <li key={label}>
                  <Tag
                    {...extraProps}
                    className={`flex items-center gap-3 text-[14px] ${
                      href ? "hover:text-white text-white/80" : "text-white/70"
                    }`}
                  >
                    <span className='w-9 h-9 rounded-md border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0'>
                      <Icon className='w-4 h-4' aria-hidden='true' />
                    </span>
                    <span className='flex flex-col'>
                      <span className='font-mono text-[10px] uppercase tracking-wider text-muted'>
                        {label}
                      </span>
                      <span>{value}</span>
                    </span>
                  </Tag>
                </li>
              );
            })}
          </ul>
        </motion.aside>

        {/* Right — form */}
        <motion.div
          variants={fadeIn("left", "spring", 0.2, 0.7)}
          className='lg:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8'
        >
          <form ref={formRef} onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
            <label className='absolute left-[-9999px]' aria-hidden='true'>
              Company
              <input
                type='text'
                tabIndex={-1}
                autoComplete='off'
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Your name
              </span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Your name'
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`${fieldBase} ${
                  errors.name ? "border-red-500" : "border-white/10"
                }`}
              />
              {errors.name && (
                <span id='name-error' className='text-red-400 text-[12px]'>
                  {errors.name}
                </span>
              )}
            </label>

            <label className='flex flex-col gap-2'>
              <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Email
              </span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='you@company.com'
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`${fieldBase} ${
                  errors.email ? "border-red-500" : "border-white/10"
                }`}
              />
              {errors.email && (
                <span id='email-error' className='text-red-400 text-[12px]'>
                  {errors.email}
                </span>
              )}
            </label>

            <label className='flex flex-col gap-2'>
              <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Message
              </span>
              <textarea
                rows={6}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${fieldBase} resize-y ${
                  errors.message ? "border-red-500" : "border-white/10"
                }`}
              />
              {errors.message && (
                <span id='message-error' className='text-red-400 text-[12px]'>
                  {errors.message}
                </span>
              )}
            </label>

            <div className='flex flex-wrap items-center gap-4 mt-2'>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed py-2.5 px-5 rounded-md text-primary text-[14px] font-medium transition-colors'
              >
                {loading ? "Sending..." : "Send message"}
                <span aria-hidden='true'>→</span>
              </button>

              {status.type === "success" && (
                <p
                  role='status'
                  aria-live='polite'
                  className='text-emerald-300 text-[13px] font-medium'
                >
                  {status.message}
                </p>
              )}
              {status.type === "error" && (
                <p
                  role='alert'
                  aria-live='assertive'
                  className='text-red-400 text-[13px] font-medium'
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
