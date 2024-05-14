import { Teko } from 'next/font/google';
import HSec from "@/components/HashSection";
import { AnimatePresence, MotionConfig, motion, wrap } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { landingHeaders, loc, productViewer } from "@/ts/atoms";
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirFreshener, faArrowsDownToPeople, faArrowsSplitUpAndLeft, faBroom, faCalendar, faCalendarWeek, faCameraRotate, faClock, faCube, faCubesStacked, faDice, faLock, faLockOpen, faPersonBooth, faStairs, faTruck, faTruckArrowRight, faVideoCamera, faWarehouse, faWheelchair, faWind, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "@/components/ContactForm";



const ws = Teko({
  subsets: ["latin"],
  weight: ["600"]
})

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
    x: 0,
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

export default function Home() {
  const [index, setIndex] = useState(0);
  const [header2, setHeader2] = useState("Kammer");
  const [header1, setHeader1] = useAtom(landingHeaders);
  const [app, setApp] = useAtom(loc)

  const [pvAtom, setPVAtom] = useAtom(productViewer);
  const lpViewer = useRef<any>(!null);

  const setCoords = () => {
    const { width, height, left, top } =
      lpViewer?.current.getBoundingClientRect();
    setPVAtom({ width, height, left, top });
  };

  useEffect(() => {
    setCoords();
  }, []);


  useEffect(() => {
    if (typeof window !== undefined) {
      document.body.childNodes[0].childNodes[1].addEventListener('scroll', setCoords, false);
    }
    return () => {
      document.body.childNodes[0].childNodes[1].removeEventListener('scroll', setCoords, false);
    };
  });

  useEffect(() => {
    window.addEventListener('resize', setCoords, false);
    return () => {
      window.removeEventListener('resize', setCoords, false);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % 4); // limit to 4
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeader1(headers[index][0]);
    setHeader2(headers[index][1]);
  }, [index]);

  useEffect(() => {
    console.log(app)
  }, [app]);

  return (
    <>
      <HSec sectionName="landing">

        <motion.div className="relative flex flex-col-reverse md:flex-row w-full h-full justify-center items-start">
          <motion.div className='flex flex-col justify-center w-full h-full'>
            <AnimatePresence mode="wait">
              <MotionConfig transition={{ type: "spring", damping: 10, stiffness: 40, restDelta: 0.001 }}>

                <motion.h1
                  key={header1}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  className="origin-left text-[#836a58] font-black"
                >
                  {header1}
                </motion.h1>


                <motion.h2
                  key={header2}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants2}
                  transition={{ delay: 0.5 }}
                  className="uppercase origin-left text-zinc-800 font-extrabold"
                >
                  {header2}
                </motion.h2>

              </MotionConfig>
            </AnimatePresence>
            <motion.p className="my-4">Kontaktiere uns jetzt und miete Deinen eigenen Lagerraum!</motion.p>
            <Link data-attribute-first="Jetzt" data-attribute-second="mieten" className="btn__primary" href="#kontakt">Jetzt mieten</Link>
          </motion.div>
          <motion.div ref={lpViewer} className='flex flex-col w-full h-full'></motion.div>
        </motion.div>

      </HSec>
      <HSec id='flexibilitaet' sectionName="card1" addClass="">

        <motion.div className="relative flex flex-col gap-6 w-full my-auto  rounded-xl py-10" >
          <motion.header className={` text-[#140d05] text-6xl text-center md:text-left font-black my-4 ${ws.className}`}>Flexibilität</motion.header>

          <motion.ul className=' py-16 w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-evenly items-start gap-12 text-1xl font-bold'>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faCalendar} />8 Wochen Mindestmietdauer</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faCube} />6,5 m² - 12 m²</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faTruckArrowRight} />Be-/Entladerampe</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faStairs} />Keine Stufen/Treppen im Lager</motion.li>
          </motion.ul>
          <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <motion.div className='flex flex-col gap-2 text-[#43403c]'>
              <motion.h4>Sei flexibel!</motion.h4>
              <motion.p className='text-[hsl(34,6%,30%)] card__text'>

                Mieten, wie du möchtest - kein Stress, keine Hektik! Unsere flexiblen Mietoptionen beginnen bei 8 Wochen und haben kein Verfallsdatum. Wähle deinen Raum ganz nach deinem Geschmack, von gemütlichen 6,5 m² bis hin zu geräumigen 12 m². </motion.p>

            </motion.div>
            <motion.div className='flex flex-col gap-2 text-[#43403c]'>
              <motion.h4>Einfach lagern!</motion.h4>
              <motion.p className='text-[hsl(34,6%,30%)] card__text'>
                Und keine Sorge wegen des Transports - wir haben sogar eine kleine Rampe, die das Be- und Entladen zum Kinderspiel macht. Keine Stufen, keine Hindernisse - nur reibungslose Lagerung ohne Kompromisse!
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </HSec>
      <HSec id='sicherheit' sectionName="card2" addClass="breakout">
        <motion.div className="relative flex flex-col gap-6 w-full my-auto  rounded-xl py-10" >
          <motion.header className={` text-[#140d05] text-6xl text-center md:text-left font-black my-4 ${ws.className}`}>Sicherheit</motion.header>

          <motion.ul className=' py-16 w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-evenly items-start gap-12 text-1xl font-bold'>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faCalendarWeek} />Täglicher Zugang</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faClock} />6:00 Uhr - 22:00 Uhr</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faLock} />Doppelte Sicherung</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faBroom} />Reinigungsdienst</motion.li>
          </motion.ul>
          <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <motion.div className='flex flex-col gap-2 text-[#43403c]'>
              <motion.h4>Rundum sicher!</motion.h4>
              <motion.p className='text-[hsl(34,6%,30%)] card__text'>
                Zugang zu den Lagerräumen an 7 Tagen die Woche von 06.00 - 22.00 Uhr. Zutritt zum Gebäude mittels Zahlen-Codeschloss. Jede Kammer hat ein individuelles Sicherheitsschloss. Ein Reinigungsdienst säubert regelmäßig die öffentlich zugängigen Flächen. </motion.p>

            </motion.div>
          </motion.div>
        </motion.div>
      </HSec>
      <HSec id='diskretion' sectionName="card3" addClass="breakout">
        <motion.div className="relative flex flex-col gap-6 w-full my-auto  rounded-xl py-10" >
          <motion.header className={` text-[#140d05] text-6xl text-center md:text-left font-black my-4 ${ws.className}`}>Diskretion</motion.header>

          <motion.ul className=' py-16 w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-evenly items-start gap-12 text-1xl font-bold'>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full text-[rgb(75,66,59)]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faWind} />Trocken, gelüftet & temperiert</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faVideoCamera} />Sicherheitssystem & Videoüberwachung</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faWarehouse} />Fensterlose Lagerräume</motion.li>
            <motion.li className='flex flex-col text-center leading-6 justify-center uppercase items-center w-full  text-[#4b423b]'><FontAwesomeIcon className='mb-6 drop-shadow-sm text-[#2a1f15] w-20 h-20 ' icon={faPersonBooth} />Privatsphere</motion.li>
          </motion.ul>
          <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <motion.div className='flex flex-col gap-2 text-[#43403c]'>
              <motion.h4>Rundum sicher!</motion.h4>
              <motion.p className='text-[hsl(34,6%,30%)] card__text'>
                Wissen Sie Ihr Hab und Gut sicher in gelüfteten, trockenen und temperierte Lagerräumen, zusammen mit einem Sicherheitssystem mit Videoüberwachung und Zutrittskontrolle. Die Kammern sind von außen nicht einsehbar, dadurch gewähren wir die Privatsphäre der Mieter.
              </motion.p>

            </motion.div>
          </motion.div>
        </motion.div>
      </HSec>
      <HSec id='kontakt'>
        <ContactForm props={{
          title: "Kontakt",
          subtitle: "Weil Brieftauben zu lange brauchen...",
          sectionName: undefined,
          id: undefined
        }} />
      </HSec>
    </>
  );
}
