"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, RefObject, FC } from "react";

// Hook: Tracks scrollY from a container
export function useScrollY(
  containerRef: RefObject<HTMLElement | null>
): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  return scrollY;
}

// Props for StickyHeader
interface StickyHeaderProps {
  containerRef: RefObject<HTMLElement | null>;
}

// StickyHeader component
export const StickyHeader: FC<StickyHeaderProps> = ({ containerRef }) => {
  const scrollY = useScrollY(containerRef);
  const stickyNavRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const [active, setActive] = useState<boolean>(false);

  const navLinks = useMemo(
    () => [
      { id: 1, label: "Home", link: "#" },
      { id: 2, label: "About", link: "#about" },
      { id: 3, label: "Services", link: "#services" },
      { id: 4, label: "Contact", link: "#contact" },
    ],
    []
  );

  return (
    <header ref={stickyNavRef} className="sticky top-0 z-50 px-10 py-7 xl:px-0">
      <nav className="relative mx-auto flex items-center justify-between max-w-2xl">
        <motion.img
          className="h-10 w-10"
          src="/android-chrome-512x512.png"
          alt="MagicUI Logo"
          animate={{
            y: scrollY >= 120 ? -50 : 0,
            opacity: scrollY >= 120 ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />

        <ul className="sticky left-4 right-4 top-4 z-[60] hidden items-center justify-center gap-x-5 md:flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{
              boxShadow:
                scrollY >= 120
                  ? theme === "dark"
                    ? "0 0 0 1px rgba(255,255,255,.08), 0 1px 2px -1px rgba(255,255,255,.08), 0 2px 4px rgba(255,255,255,.04)"
                    : "0 0 0 1px rgba(17,24,28,.08), 0 1px 2px -1px rgba(17,24,28,.08), 0 2px 4px rgba(17,24,28,.04)"
                  : "none",
            }}
            transition={{
              ease: "linear",
              duration: 0.05,
              delay: 0.05,
            }}
            className="flex h-12 w-auto items-center justify-center overflow-hidden rounded-full px-6 py-2.5 transition-all bg-background md:p-1.5 md:py-2"
          >
            <nav className="relative h-full items-center justify-between gap-x-3.5 md:flex">
              <ul className="flex h-full flex-col justify-center gap-6 md:flex-row md:justify-start md:gap-0 lg:gap-1">
                {navLinks.map((navItem) => (
                  <li
                    key={navItem.id}
                    className="flex items-center justify-center px-[0.75rem] py-[0.375rem]"
                  >
                    <a href={navItem.link}>{navItem.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: scrollY >= 120 ? "auto" : 0,
              }}
              transition={{
                ease: "linear",
                duration: 0.25,
                delay: 0.05,
              }}
              className="!hidden overflow-hidden rounded-full md:!block"
            >
              <AnimatePresence>
                {scrollY >= 120 && (
                  <motion.ul
                    initial={{ x: "125%" }}
                    animate={{ x: "0" }}
                    exit={{
                      x: "125%",
                      transition: { ease: "linear", duration: 1 },
                    }}
                    transition={{ ease: "linear", duration: 0.3 }}
                    className="shrink-0 whitespace-nowrap"
                  >
                    <li>
                      <a
                        href="#"
                        className="relative inline-flex w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-primary px-3 py-1.5 text-primary-foreground outline-none "
                      >
                        Get Started
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </ul>

        <motion.div
          className="z-[999] hidden items-center gap-x-5 md:flex"
          animate={{
            y: scrollY >= 120 ? -50 : 0,
            opacity: scrollY >= 120 ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <button>Get Started</button>
        </motion.div>

        <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
          <motion.button
            onClick={() => setActive((prev) => !prev)}
            animate={active ? "open" : "close"}
            className="relative flex h-8 w-8 items-center justify-center rounded-md md:hidden"
          >
            <motion.span
              style={{
                left: "50%",
                top: "35%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "45deg"],
                  top: ["35%", "50%", "50%"],
                },
                close: {
                  rotate: ["45deg", "0deg", "0deg"],
                  top: ["50%", "50%", "35%"],
                },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>

            <motion.span
              style={{
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: { opacity: 0 },
                close: { opacity: 1 },
              }}
            ></motion.span>

            <motion.span
              style={{
                left: "50%",
                bottom: "30%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "-45deg"],
                  top: ["65%", "50%", "50%"],
                },
                close: {
                  rotate: ["-45deg", "0deg", "0deg"],
                  top: ["50%", "50%", "65%"],
                },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.button>
        </MotionConfig>
      </nav>
    </header>
  );
};

// Main Header wrapper
export const Header: FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main ref={containerRef} className="h-[50vh] w-full overflow-y-auto">
      <StickyHeader containerRef={containerRef} />
      <div className="w-full">
        <div className="mx-auto flex h-[100vh] w-full max-w-3xl flex-col items-center justify-center gap-y-5">
          <Image
            height={80}
            width={80}
            className="h-20 w-20"
            src="/android-chrome-512x512.png"
            alt="MagicUI Logo"
          />
          <h1 className="text-balance text-center text-4xl font-bold">
            UI library for Design Engineers
          </h1>
          <p className="text-balance text-center">
            Nahid is a UI library for Design Engineers. It is a collection of
            components and utilities that can be used to build user interfaces
            for web applications. The library is designed to be easy to use and
            customizable, allowing developers to create beautiful and functional
            user interfaces with minimal effort. The library includes a wide
            range of components, including buttons, forms, modals, and more.
            Each component is designed to be responsive and accessible, ensuring
            that your application looks great on all devices and is usable by
            all
          </p>
        </div>
      </div>
    </main>
  );
};
