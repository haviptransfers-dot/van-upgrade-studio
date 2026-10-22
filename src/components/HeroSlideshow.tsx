import { AnimatePresence, motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

export default function HeroSlideshow({ index, src }: { index: number; src: string }) {
  return <AnimatePresence mode="sync">
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1.2 }}
      exit={{ opacity: 0, scale: 1.28 }}
      transition={{ opacity: { duration: 3, ease: "easeInOut" }, scale: { duration: 16, ease: "linear" } }}
      className="absolute inset-0 will-change-transform"
    >
      <OptimizedImage src={src} maxWidth={800} alt="" aria-hidden="true" loading="eager" sizes="100vw" className="w-full h-full object-cover" />
    </motion.div>
  </AnimatePresence>;
}