import React, { useEffect, useRef, useState } from "react";
import { useAnimationControls, motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser"
emailjs.init("91AJoyVNQz8EGKRjl");

type props = {
  title?: string,
  subtitle?: string,
  sectionName?: string,
  id?: string
}

interface contactProps {
  props: props
}



const ContactForm = ({ props }: contactProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [firstName, setFirstName] = useState("");
  const [formReady, setFormReady] = useState(true);
  const controlsForm = useAnimationControls();
  const messageControls = useAnimationControls();
  const inView = useInView(form, { once: true, margin: "100px 0px 100px 0px" });

  const variants = {
    initial: { opacity: 0, x: -10 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeIn", duration: 0.5 },
    },
    exit: {
      x: 10, opacity: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  }

  const formVariants = {
    initial: { opacity: 0, },
    enter: {
      opacity: 1,
      transition: { ease: "easeIn", duration: 0.5, staggerChildren: 0.25 },
    },
    exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.25 } },
  };
  const messageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, display: "flex" },
    exit: { opacity: 0, transitionEnd: { display: "none" } },
  };
  const sequence = async () => {
    await controlsForm.start("exit");
    return await messageControls.start("enter");
  };

  const [status, setStatus] = useState("Abschicken");

  const bringBackform = async (e: any) => {
    e.preventDefault();
    await messageControls.start("exit").then(() => { setFormReady(true) });
    return await controlsForm.start("enter");
  };

  const testMail = (e: any) => {
    e.preventDefault();
    setStatus("Mail geht raus...");
    setTimeout(() => {
      setStatus("Mail ist raus!");
      setTimeout(() => {
        setStatus("Abschicken");
      }, 1000);
      setFirstName("");
      setEmail("")
      setMessage("")
      sequence();
    }, 1000);
  };
  const sendEmail = (e: any) => {
    e.preventDefault();
    if (form.current == null) return;
    setStatus("Mail geht raus...");
    emailjs
      .sendForm(
        "service_tbjg2tg",
        "template_00jt7zw",
        form.current,
        "91AJoyVNQz8EGKRjl"
      )
      .then(
        (result: any) => {
          setStatus("Mail ist raus!");
          setFormReady(false)
          setTimeout(() => {
            setStatus("Abschicken");
          }, 1000);
          sequence();
          setFirstName("");
          setEmail("")
          setMessage("")
        },
        (error: any) => {
          setStatus("Ups...");
          alert("Mail konnte nicht gesendet werden...");
        }
      );
  };

  useEffect(() => {

    inView && formReady ? controlsForm.start("enter") :
      controlsForm.start("exit")

  }, [inView]);

  return (
    <>
      <section className="form-section">
        <div className="form-wrapper">
          <h3 data-before={props.title} className="font-extrabold">{props.title}</h3>
          <p>{props.subtitle}</p>
          <motion.div
            className="thanks__message"
            variants={messageVariants}
            initial="initial"
            animate={messageControls}
            exit="exit"

          >
            <h4>Danke</h4>
            <p>Wir werden Deine Anfrage schnellstmöglich bearbeiten!.</p>
            <button className="btn__outline py-2" onClick={bringBackform}>
              Was vergessen?
            </button>
          </motion.div>
          <motion.form
            ref={form}
            onSubmit={testMail}
            variants={formVariants}
            initial="initial"
            animate={controlsForm}
            exit="exit"

          >
            <input type="hidden" name="contact_number"></input>
            <motion.div variants={variants}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="user_name"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                value={firstName}
                placeholder={"Name"} // ...force the input's value to match the state variable...
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={variants}>
              <label htmlFor="email">E-Mail:</label>
              <input
                type="email"
                id="email"
                name="user_email"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                value={email}
                placeholder="E-Mail"
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="emailHelp"
              />
            </motion.div>
            <motion.div variants={variants}>
              <label htmlFor="message">Deine Nachricht</label>
              <textarea
                value={message}
                placeholder={"Deine Nachricht"}
                onChange={e => setMessage(e.target.value)}
                name="message"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                id="message"
                required
                rows={5}
              />
            </motion.div>
            <motion.button variants={variants} className="btn__alt " type="submit">
              {status}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
