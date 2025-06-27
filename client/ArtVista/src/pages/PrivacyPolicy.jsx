import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  User,
  Lock,
  Share2,
  UserCheck,
} from "lucide-react";

const policies = [
  {
    title: "Information Collection",
    content:
      "We collect your name, email, address, and purchase details to process orders and improve your experience.",
    icon: <User className="text-white w-6 h-6" />,
  },
  {
    title: "Use of Data",
    content:
      "Your data helps us deliver orders, provide support, and send optional updates or promotions.",
    icon: <ShieldCheck className="text-white w-6 h-6" />,
  },
  {
    title: "Data Security",
    content:
      "We implement strong encryption and limit data access to ensure your personal information stays protected.",
    icon: <Lock className="text-white w-6 h-6" />,
  },
  {
    title: "Third-Party Sharing",
    content:
      "We only share with trusted services for shipping or legal requirements. We do not sell your data.",
    icon: <Share2 className="text-white w-6 h-6" />,
  },
  {
    title: "Your Rights",
    content:
      "You can view, update, or delete your data anytime. Contact us at support@artvista.com for requests.",
    icon: <UserCheck className="text-white w-6 h-6" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 mt-16"
        >
          Privacy Policy
        </motion.h1>

        <div className="grid gap-10 sm:grid-cols-2">
          {policies.map((section, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-white/10 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 p-2 rounded-full">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300 text-sm">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-16">
          For questions, contact us at{" "}
          <span className="text-white">support@artvista.com</span>.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
