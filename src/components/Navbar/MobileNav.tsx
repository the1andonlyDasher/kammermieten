import React from "react";
import { motion } from "framer-motion";



const variants = {
  open: {
    clipPath: "circle(100% at 50% 50%)",
    transition: {
      when: "beforeChildren",
      type: "spring",
      damping: 20,
      stiffness: 100,
      staggerChildren: 0.07,

    }
  },
  closed: {
    clipPath: "circle(0% at 50% 50%)",
    transition: {
      when: "afterChildren",
      type: "spring",
      damping: 20,
      stiffness: 100,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};



const MobileNav = ({ children }: any) => {

  return (
    <>
      <motion.ul
        id="nav-items-mobile"
        className="nav-items-mobile"
        variants={variants}

      >
        {children}
      </motion.ul>

    </>
  );
};

export default MobileNav;
