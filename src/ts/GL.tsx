import {
    CameraControls,
    Environment,
    GradientTexture,
    Stats,
} from "@react-three/drei";
import {
    Canvas,
    extend,
    ReactThreeFiber,
} from "@react-three/fiber";
import { forwardRef, useEffect, useRef } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import { motion as motion3d } from "framer-motion-3d"
import { Model } from "@/Room3D";
import { Crates } from "./Boxes";






declare global {
    namespace JSX {
        interface IntrinsicElements {
            roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
                RoundedPlaneGeometry,
                typeof RoundedPlaneGeometry
            >;
        }
    }
}

extend(geometry);

interface glProps {
    eventSource?: any;
}

const GL = (props: glProps) => {
    return (
        <div className="canvas__wrapper">
            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client"
            >
                <Stats />
                <Model />
                <Crates />
                <Environment blur={10} preset="city" />
                <GradientTexture
                    stops={[0, 1]}
                    colors={["#f6fff0", "#e5fcfc"]}
                    attach="background"
                    size={1024}
                />
                {/* <motion3d.mesh whileTap={{ scale: 2 }}>
                    <motion3d.meshStandardMaterial initial={{ opacity: 1, color: "#123123" }} />
                    <boxGeometry args={[1, 1, 1]} />
                </motion3d.mesh> */}

            </Canvas>
        </div>
    );
};

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;
