import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, MapPinOff } from "lucide-react";
import logoImg from "@/assets/logo.webp";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 – Page Not Found | H&A VIP Tours";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Decorative subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[60vh] w-[60vh] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.img
          src={logoImg}
          alt="H&A Tours"
          className="mb-8 h-16 w-16 object-contain md:h-20 md:w-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />

        {/* 404 code */}
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MapPinOff className="h-8 w-8 text-primary md:h-10 md:w-10" />
          <h1 className="font-display text-[5rem] font-bold leading-none tracking-tight text-primary md:text-[7rem]">
            404
          </h1>
          <MapPinOff className="h-8 w-8 text-primary md:h-10 md:w-10" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="mb-3 font-display text-2xl font-semibold text-foreground md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          The page you are looking for does not exist or has been moved. Let us take you back to luxury.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/80"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-border px-8 text-foreground hover:bg-secondary hover:text-foreground"
          >
            Go Back
          </Button>
        </motion.div>

        {/* URL display */}
        <motion.p
          className="mt-10 font-mono text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          Requested: {location.pathname}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
