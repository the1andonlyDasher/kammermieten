import React, { forwardRef, ReactElement, useEffect } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { load, loc } from "@/ts/atoms";
import { InView, useInView } from "react-intersection-observer";
import { SelectField } from "@prismicio/client";

const variants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  enter: { y: 0, filter: "blur(0px)", opacity: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
  initial: { opacity: 1 },
  enter: {
    opacity: 1,
    display: "flex",
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.125,
      when: "beforeChildren",
      delay: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transitionEnd: { display: "none" },
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
};

interface sectionProps {
  sectionName?: any;
  ref?: any;
  id?: string;
  left: boolean;
  header?: string | number;
  subheader?: string | number;
  text?: string;
  children?: JSX.Element;
  single?: boolean;
  addClass?: string;
  autoHeight?: boolean;
}


function Section(props: sectionProps) {
  const [loaded, setLoaded] = useAtom(load);
  const margin = "0px";
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    rootMargin: margin,
    triggerOnce: false,
    onChange: (inView, entry) => {
      if (inView) {
        setApp(entry.target?.getAttribute("data-section-name") || "");
      }
    }
  });
  const [app, setApp] = useAtom(loc);

  useEffect(() => {
    console.log(app)
  }, [app]);

  return (

    <motion.section
      data-section-name={props.sectionName}
      initial="initial"
      whileInView="enter"
      exit="exit"
      ref={ref}
      id={props.id}
      variants={blurVariants}
      className={props.autoHeight ? "overflow-hidden h-auto" : "overflow-hidden" + ` ${props.addClass}`}
    >
      {props.single ? (
        <>
          {props.header ? (
            <motion.h2 className="font-bold" variants={variants}>
              {props.header}
            </motion.h2>
          ) : null}
          {props.subheader ? (
            <motion.h3 variants={variants}>{props.subheader}</motion.h3>
          ) : null}
          {props.text ? (
            <motion.p variants={variants}>{props.text}</motion.p>
          ) : null}
          <>{props.children}</>
        </>
      ) : (
        <motion.div variants={variants} className="lr__wrapper">
          {props.left ? (
            <>
              <motion.div variants={variants} className="left-wrapper">
                {props.header ? (
                  <motion.h2 className=" font-bold" variants={variants}>
                    {props.header}
                  </motion.h2>
                ) : null}
                {props.subheader ? (
                  <motion.h3 variants={variants}>{props.subheader}</motion.h3>
                ) : null}
                {props.text ? (
                  <motion.p variants={variants}>{props.text}</motion.p>
                ) : null}
                <>{props.children}</>
              </motion.div>
              <motion.div className="right-wrapper"></motion.div>
            </>
          ) : (
            <>
              <motion.div variants={variants} className="left-wrapper"></motion.div>
              <motion.div className="right-wrapper">
                {props.header ? (
                  <motion.h2 className=" font-bold" variants={variants}>
                    {props.header}
                  </motion.h2>
                ) : null}
                {props.subheader ? (
                  <motion.h3 variants={variants}>{props.subheader}</motion.h3>
                ) : null}
                {props.text ? (
                  <motion.p variants={variants}>{props.text}</motion.p>
                ) : null}
                <>{props.children}</>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </motion.section>

  );
}

const HSec = forwardRef<ReactElement, sectionProps>((props, ref) => (
  <Section {...props}></Section>
));
HSec.displayName = "Section";

export default HSec;
