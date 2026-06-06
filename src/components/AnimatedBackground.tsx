import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import img1 from "@/assets/tour-acropolis.webp";
import img2 from "@/assets/tour-sounio.webp";
import img3 from "@/assets/tour-meteora.webp";
import img4 from "@/assets/tour-delphi.webp";
import img5 from "@/assets/tour-nafplio.webp";
import img6 from "@/assets/showcase-1.webp";
import heroSunsetCar from "@/assets/hero-sunset-car.webp";
import fleetTrio from "@/assets/fleet-trio.webp";

const images = [heroSunsetCar, img1, img2, fleetTrio, img3, img4, img5, img6];

const AnimatedBackground = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 18000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 0.16, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1.12 }}
          transition={{ opacity: { duration: 5, ease: "easeInOut" }, scale: { duration: 22, ease: "linear" } }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-background/80" />

      {/* Floating gold orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-[32rem] h-[32rem] rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedBackground;
