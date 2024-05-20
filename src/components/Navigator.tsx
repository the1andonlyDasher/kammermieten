import { FunctionComponent } from "react";
import Image from "next/image"
import { motion } from "framer-motion";

interface NavigatorProps {

}

type RoomProps = {
    vacancy: boolean;
    index: number;
}

const Room = (props: RoomProps) => {
    return <div className={props.vacancy ? `room${props.index}` : `room${props.index} noV`} />
}

const leftRooms = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
}

const rightRooms = {
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
}

const variants4 = {
    initial: {
        x: -10,
        opacity: 0,
    },
    enter: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: 10,
        opacity: 0,
    },
    transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        restDelta: 0.1
    }
};

const RoomNavigator: FunctionComponent<NavigatorProps> = () => {
    return (<motion.section id="navigator" className="gap-12" data-section-name="room-section">
        <motion.h3 variants={variants4} initial="initial" whileInView="enter" className="font-extrabold">Räume</motion.h3>
        <motion.div className="w-full" variants={variants4} initial="initial" whileInView="enter" >
            <Image src="/images/km_grundriss.svg" alt={"Grundriss der Lagerräume"} className="mx-auto" width={600} height={200} />
        </motion.div>
        <motion.p variants={variants4} initial="initial" whileInView="enter" className="bg-red-400 rounded-xl shadow-sm p-4 text-red-950 font-bold">Momentan sind alle Lagerräume belegt, Sie können aber jederzeit eine Anfrage an uns richten, wir lassen Sie wissen sobald ein Raum frei wird.</motion.p>
    </motion.section>
    );
}

export default RoomNavigator;