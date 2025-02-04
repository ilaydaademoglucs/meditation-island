import React from 'react'
import { useGLTF } from '@react-three/drei'

export function SlavicCottage(props) {
  const { nodes, materials } = useGLTF('./models/slavic_cottage.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 36, 0, 0.8]} scale={1.6} position={[-8.18, 4.2, 18.0]} >
        <mesh geometry={nodes.model_tex_u1_v1_0.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_1.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_2.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_3.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_4.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_5.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_6.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_7.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_8.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_9.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_10.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_11.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_12.geometry} material={materials.tex_u1_v1} />
        <mesh geometry={nodes.model_tex_u1_v1_0_13.geometry} material={materials.tex_u1_v1} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/slavic_cottage.glb')
