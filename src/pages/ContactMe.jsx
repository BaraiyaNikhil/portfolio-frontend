// src/ContactMe.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "motion/react";
import { useData } from "../context/DataContext";

function Label({ children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

const FormField = React.forwardRef(
  ({ label, placeholder, type, error, ...rest }, ref) => (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className={`mt-1 block w-full rounded-xl shadow-inner shadow-slate-500 ${
          error ? "border-red-500" : "border-slate-300"
        } bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 ${
          error
            ? "focus:ring-red-300 focus:border-red-500"
            : "focus:ring-slate-300 focus:border-slate-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
);

function InfoCard({ icon, title, text, link, name }) {

  const [copied, setCopied] = useState(false);
  const email = "baraiyanikhil593@gmail.com";
  const phoneNo = 8866482775;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(name == "email" ? email : phoneNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative rounded-2xl bg-slate-200 border border-slate-300 p-6 shadow-inner shadow-slate-500 mb-3"
    >
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-4 py-2 rounded-4xl bg-slate-800 font-semibold text-white hover:bg-slate-600"
      >
        {copied ? "✅ Copied!" : "📋 Copy"}
      </button>
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mb-2">{text}</p>
      <a
        href={link.href}
        className="text-slate-800 font-medium underline underline-offset-4"
      >
        {link.label}
      </a>
    </motion.div>
  );
}

export default function ContactMe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [submitStatus, setSubmitStatus] = React.useState({
    type: "",
    message: "",
  });
  const { isMobile } = useData();
  const prefersReduced = useReducedMotion();
  const paraY = prefersReduced || isMobile ? 8 : 20;
  const viewport = { once: false, amount: 0.2 };

  const onSubmit = async (data) => {
  try {
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully ✅",
      });
    } else {
      setSubmitStatus({
        type: "error",
        message: result.message || "Something went wrong ❌",
      });
    }
  } catch (error) {
    setSubmitStatus({
      type: "error",
      message: "Server not responding 🚨",
    });
  }
  reset();
  // clear status after 3 seconds
  setTimeout(() => setSubmitStatus({ type: "", message: "" }), 3000);
};


  return (
    <div
      id="contact-me"
      className="w-full bg-slate-300 h-full flex flex-col md:flex-col overflow-x-hidden p-6 sm:p-10"
    >
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
        className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-6 leading-tight pt-3"
      >
        Contact Me
      </motion.h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 rounded-2xl bg-slate-200 border border-slate-300 p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900 mb-6">
            Let's Connect
          </h2>

          {submitStatus.message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                placeholder="Name"
                type="text"
                error={errors.firstName}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Enter at least 3 characters" },
                })}
              />
              <FormField
                label="Last Name"
                placeholder="Surname"
                type="text"
                error={errors.lastName}
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: { value: 3, message: "Enter at least 3 characters" },
                 })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="Your Email"
                placeholder="you@example.com"
                type="email"
                error={errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <FormField
                label="Phone Number"
                placeholder="+91 98XXX XXX10"
                type="tel"
                error={errors.phone}
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: { value: 10, message: "Enter at least 10 digits" },
                })}
              />
            </div>

            <div>
              <Label>Your Message</Label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                rows={5}
                placeholder="Write your message…"
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:border-slate-500 shadow-inner shadow-slate-500"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg shadow-lg"
            >
              Send message
            </motion.button>
          </form>
        </motion.div>

        <div className="flex flex-col justify-around">
          <InfoCard
            icon="📧"
            title="Email"
            text="For general queries, collaborations and opportunities."
            link={{
              href: "mailto:baraiyanikhil593@gmail.com",
              label: "baraiyanikhil593@gmail.com",
            }}
            name="email"
          />
          <InfoCard
            icon="📞"
            title="Call"
            text="Happy to discuss your idea and opportunities or projects."
            link={{ href: "tel:+918866482775", label: "+91 88664 82775" }}
            name = "phoneNo"
          />
        </div>
      </div>
    </div>
  );
}
