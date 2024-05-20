import type { PlaneProps, Triplet } from "@react-three/cannon";
import {
    Debug,
    Physics,
    useBox,
    usePlane,
    useSphere,
} from "@react-three/cannon";
import {
    Canvas,
    InstancedMeshProps,
    useFrame,
    useThree,
} from "@react-three/fiber";
import { useAtom } from "jotai";
import { LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import type { InstancedMesh, Mesh, MeshStandardMaterial } from "three";
import { Color } from "three";
import { loc } from "./atoms";
import { Crate } from "@/Crate";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Addition, Base, Geometry } from "@react-three/csg";
import { motion as motion3d } from "framer-motion-3d";
import { useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { lerp } from "../ts/threeExport/math/MathUtils"

function Plane(props: PlaneProps) {
    const [app, setApp] = useAtom(loc);
    const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));
    return (
        <>
            {app === "card1" && (
                <mesh ref={ref} receiveShadow>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial color="#171717" />
                </mesh>
            )}
        </>
    );
}

type InstancedGeometryProps = {
    number: number;
    size: number;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube020: Mesh;
        Cube020_1: Mesh;
    };
    materials: {
        cardboard: MeshStandardMaterial;
        tape: MeshStandardMaterial;
    };
    animations: any[];
};

type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const Boxes = ({ number, size }: InstancedGeometryProps) => {
    const { nodes, materials } = useGLTF("/create.glb") as GLTFResult;
    const args: Triplet = [size, size, size];
    const [disposed, setDisposed] = useState(false);
    const [inPage, setInPage] = useState(false);
    const [app, setApp] = useAtom(loc);
    const router = useRouter();
    const controls = useAnimation();
    const { viewport } = useThree();
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const [ref, api] = useBox(
        () => ({
            args,
            mass: 1,
            position: [
                - viewport.width / 2 + Math.random() * 20,
                Math.random() * 40,
                Math.random() * 20,
            ],
        }),
        useRef<any>(null)
    );
    useEffect(() => {
        if (app === "card1" && router.pathname === "/") {
            setTimeout(() => {
                setDisposed(false), setInPage(true);
            }, 500);
        } else {
            setTimeout(() => {
                ref && controls.start({ scale: 0 }).then(() => {
                    ref.current.position.set(
                        -viewport.width / 2 + Math.random() * 20,
                        Math.random() * 40,
                        Math.random() * 20,
                    );
                    setDisposed(true), setInPage(false);
                });
            }, 500);
        }
    }, [app, router]);



    useEffect(() => {
        inPage === true && controls.start({ scale: 1 });
    }, [inPage]);

    useEffect(() => {
        console.log(disposed);
    }, [disposed]);

    return (
        <>
            <motion3d.instancedMesh
                initial={{ scale: 0 }}
                animate={controls}
                visible={!disposed}
                receiveShadow
                castShadow
                ref={ref}
                args={[undefined, undefined, number]}
            >
                <Geometry useGroups>
                    <Base
                        geometry={nodes.Cube020.geometry}
                        material={materials.cardboard}
                    />
                    <Addition
                        geometry={nodes.Cube020_1.geometry}
                        material={materials.tape}
                    />
                </Geometry>
            </motion3d.instancedMesh>
        </>
    );
};

export const Crates = () => {
    const [number] = useState(200);
    const [size] = useState(2);
    const [app, setApp] = useAtom(loc);
    const { viewport } = useThree();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        app === "card1" ? setVisible(true) : setTimeout(() => {
            setVisible(false)
        }, 1000)
    }, [app]);

    return (
        <>
            <hemisphereLight intensity={0.35 * Math.PI} />
            <spotLight
                angle={0.3}
                castShadow
                decay={0}
                intensity={2 * Math.PI}
                penumbra={1}
                position={[10, 10, 10]}
            />

            <Physics
                isPaused={!visible}
                gravity={[5, -10, 0]}
                broadphase="Naive">
                <Plane
                    rotation={[0, 0, 0]}
                    position={[0, -viewport.height / 2, 0]}
                />
                <Plane
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -viewport.height / 2, 0]}
                />
                {visible && <Boxes {...{ number, size }} />}
            </Physics>
        </>
    );
};
