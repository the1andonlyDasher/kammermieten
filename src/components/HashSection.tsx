import React, { forwardRef, ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import { load, loc } from "@/ts/atoms";

const section_variants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.2 },
  },
};


interface sectionProps {
  sectionName?: string;
  ref?: any;
  id?: string;
  header?: string | number;
  subheader?: string | number;
  text?: string;
  children?: JSX.Element;
  single?: boolean;
  addClass?: string;
}

interface sProps {
  props: sectionProps;
}

function Section(props: sectionProps) {
  const [loaded, setLoaded] = useAtom(load);
  const [app, setApp] = useAtom(loc);
  const controls = useAnimation();
  return (
    <motion.section
      viewport={{ margin: "100px", amount: 0.375, once: false }}
      onViewportEnter={(entry) => {
        // controls.start("enter")
        entry?.isIntersecting
          ? setApp(`${entry.target?.getAttribute("data-section-name")}`)
          : null;
      }}
      data-section-name={props.sectionName}
      initial="initial"
      whileInView={"enter"}
      exit="exit"
      ref={props.ref}
      id={props.id}
      variants={section_variants}
      className={props.addClass && `${props.addClass}`}
    >
      {props.children}
    </motion.section>
  );
}

const HSec = forwardRef<ReactElement, sectionProps>((props, ref) => (
  <Section ref={ref} {...props}></Section>
));
HSec.displayName = "Section";

export default HSec;
