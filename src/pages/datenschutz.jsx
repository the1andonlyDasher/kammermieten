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

export default function Datenschutz() {
  return (
    <>
      <motion.section className="flex flex-col gap-6">
        <h4>Haftung für Inhalte</h4>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8-10 TMG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte
          Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
          oder Sperrung der Nutzung von Informationen nach den allgemeinen
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
          jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Kenntnis
          möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
          werden wir diese Inhalte umgehend entfernen.
        </p>
        <h4>Urheberrecht</h4>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung und Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechende Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
          wir derartige Inhalte umgehend entfernen.
        </p>
        <h4>Haftung für Links</h4>
        <p>
          Unser Angebot enthält Links zu Webseiten Dritter, auf deren Inhalte
          wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
        <h4>Datenschutz</h4>
        <p>
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe
          personenbezogener Daten möglich. Soweit auf unseren Seiten
          personenbezogene Daten (beispielsweise Name, Anschrift oder
          eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
          auf freiwilliger Basis. Diese Daten werden nicht ohne Ihre
          ausdrückliche Zustimmung an Dritte weiter gegeben. Wir weisen darauf
          hin, dass die Datenübertragung im Internet (z.B. Bei der Kommunikation
          per Email). Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
          der Daten vor dem Zugriff durch Dritte ist nicht möglich. Die Nutzung
          von im Rahmen der Impressumpflicht veröffentlichten Kontaktdaten durch
          Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung
          und Informationsmaterialien wird hiermit ausdrücklich widersprochen.
          Die Betreiber der Seiten behalten sich ausdrücklich rechtliche
          Schritte im Falle der unverlangten Zusendung von Werbeinformationen,
          etwa durch Spam-Mails vor.
        </p>
      </motion.section>
    </>
  );
}
