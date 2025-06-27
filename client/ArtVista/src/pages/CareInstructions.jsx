import React from "react";
import { motion } from "framer-motion";
import { Brush, Sun, ShieldCheck, Package, Wrench, Hand } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const careInstructions = [
  {
    title: "Handling",
    icon: <Hand className="w-6 h-6 text-pink-400" />,
    tips: [
      "Use clean hands or gloves when handling artwork.",
      "Support from both sides, never grab the frame or surface.",
    ],
  },
  {
    title: "Display",
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    tips: [
      "Avoid direct sunlight or humid areas.",
      "Keep away from fireplaces, kitchens, and moisture.",
    ],
  },
  {
    title: "Cleaning",
    icon: <Brush className="w-6 h-6 text-blue-400" />,
    tips: [
      "Dust gently with a soft dry cloth.",
      "Never use water, spray, or glass cleaner on artwork.",
    ],
  },
  {
    title: "Storage",
    icon: <Package className="w-6 h-6 text-green-400" />,
    tips: [
      "Store upright in a dry, stable place.",
      "Wrap with acid-free paper or bubble wrap (not directly on paint).",
    ],
  },
  {
    title: "Medium-Specific",
    icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
    tips: [
      "Canvas: avoid pressure or poking.",
      "Wood: keep dry. Acrylic: protect with UV glass.",
    ],
  },
  {
    title: "Restoration",
    icon: <Wrench className="w-6 h-6 text-red-400" />,
    tips: [
      "Consult a professional conservator for damaged or aged art.",
      "Avoid DIY cleaning or retouching.",
    ],
  },
];

const CareInstructions = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h1 className="text-4xl font-bold text-center mb-12 mt-16">Care Instructions</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {careInstructions.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                {section.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CareInstructions;
