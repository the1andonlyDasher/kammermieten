/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/create.glb --types --I --output src/Crate.tsx 
Files: public/create.glb [10.47KB] > E:\Git\kammermieten\src\create-transformed.glb [3.9KB] (63%)
*/

import * as THREE from 'three'
import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube020: THREE.Mesh
    Cube020_1: THREE.Mesh
  }
  materials: {
    cardboard: THREE.MeshStandardMaterial
    tape: THREE.MeshStandardMaterial
  }
  animations: any[]
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

const context = createContext({} as ContextType)
export function Instances({ children, ...props }: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/create-transformed.glb') as GLTFResult
  const instances = useMemo(
    () => ({
      Cube: nodes.Cube020,
      Cube1: nodes.Cube020_1,
    }),
    [nodes],
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances: ContextType) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Crate(props: JSX.IntrinsicElements['group']) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group position={[0.042, 1.29, 0.091]}>
        <instances.Cube />
        <instances.Cube1 />
      </group>
    </group>
  )
}

useGLTF.preload('/create-transformed.glb')
