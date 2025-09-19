"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Hola", "Bonjour", "Namaste", "Ciao", "Konnichiwa", "Guten Tag"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showLoader, setShowLoader] = useState(true); // <-- start true

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      // Already loaded, hide loader immediately
      setIsVisible(false);
      setShowLoader(false);
    } else {
      // First time
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, []);

  // Cycle words every 800ms
  useEffect(() => {
    if (showLoader && index < words.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [index, showLoader]);

  // Hide loader after 4 sec
  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white text-4xl font-serif"
          >
            {words[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
