import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface ScrollingGalleryProps {

}



const ScrollingGallery: FunctionComponent<ScrollingGalleryProps> = () => {
    return (<motion.div className="relative w-full h-full border-2 border-red-950">
        <motion.div className="absolute flex flex-row w-60 h-full">

        </motion.div>
    </motion.div>);
}

export default ScrollingGallery;