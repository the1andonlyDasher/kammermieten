import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { NavItem } from "@/components/Navbar/NavItemDesktop";
import Navigation from "@/components/Navbar/Navigation";
import MobileNav from "@/components/Navbar/MobileNav";
import { NavItem as Mnav } from "@/components/Navbar/NavItemMobile";
import NavbarToggle from "./NavbarToggle";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Navbar = ({ logo, alt, navbar, legals }: any) => {

  const navbarMain = useRef<any>(!null);
  const [isShrunk, setShrunk] = useState(false);
  const [click, setClick] = useState(false)
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);


  const variants = {
    closed: {},
    open: {}
  };

  const image_variants = {
    initial: { scale: 0, opacity: 0 },
    enter: { scale: [0, 1.2, 1], opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  }

  const [isOpen, toggleOpen] = useCycle(false, true);
  const hrefs = ["/", "#flexibilitaet", "#sicherheit", "#diskretion", "#kontakt"];
  const legal_hrefs = ["/datenschutz", "/impressum"]

  const desc_variants = {
    closed: { gridTemplateRows: "0fr", opacity: 0, marginTop: 0, paddingTop: 0 },
    open: { gridTemplateRows: "1fr", opacity: 1, marginTop: "0.75rem", paddingTop: "0.75rem" }
  }

  const arrow_variants = {
    closed: { rotate: "0deg" },
    open: { rotate: "180deg" },
  };


  return (
    <motion.nav
      // className={isShrunk ? "navbar shrunk" : "navbar"}
      className={`navbar`}
      variants={variants}
      ref={navbarMain}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="navbar__container" aria-haspopup="menu" >
        <motion.div className="flex justify-center items-start flex-col h-full" variants={image_variants} initial="hidden" animate="enter" exit="exit">
          <Link
            aria-label="Home"
            aria-current="page"
            className="navbar__logo active"
            href="/"

          >
            <Image priority src={"images/logo.svg"} width={300} height={300} alt={"website logo"} />
          </Link>
        </motion.div>
        <Navigation>

          <NavItem clickLink={null} name={"Home"} href={"/#landing"} />
          <motion.li onMouseEnter={() => { setClick(!click) }} onMouseLeave={() => { setClick(!click) }}

            className="nav-link text-md">Vorteile            <motion.div
              className="origin-center w-4"
              variants={arrow_variants}
              animate={click ? "open" : "closed"}>

              <FontAwesomeIcon className=" text-xl origin-center w-4" icon={faChevronDown} scale={5} />

            </motion.div>
            <div className="after w-full h-full top-0 left-0 absolute overflow-hidden" />

            <motion.ul className="dropdown p-4 bg-[#c7b2a5]  rounded-xl shadow-md absolute z-10 grid  grid-rows-3 w-full" animate={click ? "open" : "closed"} variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}>
              <motion.li
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}><Link href="/#flexibilitaet">Flexibilität</Link></motion.li>
              <motion.li
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}><Link href="/#sicherheit">Sicherheit</Link></motion.li>
              <motion.li
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}><Link href="/#diskretion">Diskretion</Link></motion.li>
            </motion.ul>

          </motion.li>
          <NavItem clickLink={null} name={"Räume"} href={"/#raeume"} />
          <NavItem clickLink={null} name={"Kontakt"} href={"/#kontakt"} />

        </Navigation>
        <MobileNav>
          <Mnav toggle={() => toggleOpen()} name={"Home"} href={"/#landing"} />
          <Mnav toggle={() => toggleOpen()} name={"Vorteile"} href={undefined} />
          <Mnav toggle={() => toggleOpen()} name={"Kontakt"} href={"/#kontakt"} />
          <Mnav secondary toggle={() => toggleOpen()} name={"Datenschutz"} href={"/datenschutz"} />
          <Mnav secondary toggle={() => toggleOpen()} name={"Impressum"} href={"/impressum"} />
        </MobileNav>
        <NavbarToggle toggle={() => toggleOpen()} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
