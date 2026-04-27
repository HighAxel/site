"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Transition } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smooth: Transition = {
    type: "spring",
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  };

  const iosEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const fade: Transition = {
    duration: 0.25,
    ease: iosEase,
  };

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-50 px-2 sm:px-0">
      <motion.div
        layout
        layoutId="navbar"
        transition={smooth}
        style={{
          transformOrigin: "center top",
          willChange: "transform, width, height",
        }}
        className="relative flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden"
        animate={{
          width: scrolled ? 110 : 520,
          height: scrolled ? 42 : 56,
          borderRadius: 999,
        }}
      >
        {/* 🔷 LOGO */}
        <motion.div
          layoutId="logo"
          transition={{
            layout: smooth,
            scale: {
              duration: 0.15,
              ease: iosEase,
            },
          }}
          className="absolute flex items-center justify-center overflow-hidden rounded-full border border-white/10"
          animate={{
            left: scrolled ? "50%" : "1rem",
            x: scrolled ? "-50%" : "0%",
            scale: scrolled ? 0.72 : 1,
          }}
        >
          <Image
            src="/assets/site_logo.png"
            alt="logo"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </motion.div>

        {/* 🔹 MENU */}
        <motion.div
          layout
          animate={{
            opacity: scrolled ? 0 : 1,
            y: scrolled ? -10 : 0,
            pointerEvents: scrolled ? "none" : "auto",
          }}
          transition={fade}
          className="flex items-center gap-1 relative"
        >
          <NavItem href="/" label="Home" active={pathname === "/"} />
          <NavItem
            href="/commands"
            label="Commands"
            active={pathname === "/commands"}
          />
          <NavItem label="Embeds" disabled />
        </motion.div>

        {/* 🔹 INVITE BUTTON */}
        <motion.div
          layout
          animate={{
            opacity: scrolled ? 0 : 1,
            x: scrolled ? 20 : 0,
            pointerEvents: scrolled ? "none" : "auto",
          }}
          transition={fade}
          className="absolute right-2 hidden sm:block"
        >
          <Link
            href="https://discord.com/oauth2/authorize?client_id=1496901318592303276&permissions=8&integration_type=0&scope=bot"
            className="bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black text-sm px-4 h-9 flex items-center justify-center rounded-full hover:brightness-110 transition duration-300"
          >
            Invite
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------------- NAV ITEM ---------------- */

function NavItem({
  href,
  label,
  disabled,
  active,
}: {
  href?: string;
  label: string;
  disabled?: boolean;
  active?: boolean;
}) {
  if (disabled) {
    return (
      <div className="relative px-3 py-1.5 text-sm text-white/30 cursor-not-allowed">
        <div className="relative rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          {label}
        </div>

        <div className="absolute top-0 right-0 text-[10px] tracking-widest px-2 py-[2px] rounded-full bg-white/10 border border-white/10 text-white/60 backdrop-blur-md">
          SOON
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href!}
      className="relative px-3 py-1.5 text-sm text-white/70 hover:text-white transition duration-300 group"
    >
      {/* 🔥 ACTIVE SLIDING PILL */}
      {active && (
        <motion.div
          layoutId="active-pill"
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 20,
          }}
          className="absolute inset-0 rounded-full bg-white/10"
        />
      )}

      <span className="relative z-10">{label}</span>

      {/* hover glow */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition duration-300"
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </Link>
  );
}