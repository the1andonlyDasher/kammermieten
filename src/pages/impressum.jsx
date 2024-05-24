import { Teko } from "next/font/google";
import HSec from "@/components/HashSection";
import { AnimatePresence, MotionConfig, motion, wrap } from "framer-motion";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { landingHeaders, loc } from "@/ts/atoms";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faArrowsDownToPeople,
  faArrowsSplitUpAndLeft,
  faBroom,
  faCalendar,
  faCalendarWeek,
  faCameraRotate,
  faClock,
  faCube,
  faCubesStacked,
  faDice,
  faLock,
  faLockOpen,
  faPersonBooth,
  faStairs,
  faTruck,
  faTruckArrowRight,
  faVideoCamera,
  faWarehouse,
  faWheelchair,
  faWind,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import ContactForm from "@/components/ContactForm";

const ws = Teko({
  subsets: ["latin"],
  weight: ["600"],
});

const headers = [
  ["Zur Not:", "Immer was auf Lager"],
  ["Bei uns?", "Keine knappe Kiste."],
  ["In jedem Fall:", "Sicher und Diskret."],
  ["Lager' alles.", "Fast alles..."],
];

const variants = {
  initial: {
    y: -10,
    x: 0,
    scale: 0.3,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: -30,
    scale: 1.5,
    opacity: 1,
  },
  exit: {
    y: 10,
    x: 0,
    scale: 0.3,
    opacity: 0,
  },
};

const variants2 = {
  initial: {
    y: 50,
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    y: -50,
    scale: 0.8,
    opacity: 0,
  },
};

export default function Impressum() {
  return (
    <>
      <motion.section>
        <motion.div className="flex h-full w-full flex-col justify-start md:justify-center items-start gap-6">
          <h4>Impressum</h4>
          <p className="w-full">
            Geführt unter: H-C Gebäudereinigung <br />
            Mandy Männer <br />
            Ludwigsburger Str.23
            <br />
            71711 Steinheim an der Murr <br />
            Tel. +49 [0]7144 9985962
            <br />
            info@h-c-gebaeudereinigung.de <br />
            www.h-c-gebaeudereinigung.de <br />
            Sitz: Steinheim an der Murr <br />
            USt-Id-Nr.: DE 7140303156 <br />
            Inhaltlich Verantwortlich: Mandy Männer
          </p>
        </motion.div>
      </motion.section>
    </>
  );
}
