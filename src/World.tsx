import * as THREE from 'three'
import { useRef } from "react";
import { Mesh } from "three";
import { RoundedBox } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier";
import { useTexture } from '@react-three/drei'
import { useXRift } from '@xrift/world-components'

import { Skybox } from './components/Skybox'
import { WallObject } from './components/WallBase'
import { LandObject } from './components/Land'

import { COLORS, WORLD_CONFIG } from "./constants";

export interface WorldProps {
  position?: [number, number, number];
  scale?: number;
}

export const World: React.FC<WorldProps> = ({
  position = [0, 0, 0],
  scale = 0.8,
}) => {
  const { baseUrl } = useXRift()
  const groundRef = useRef<Mesh>(null);
  const pillarHeight = WORLD_CONFIG.pillarHeight * scale;
  const pillarSize = WORLD_CONFIG.pillarSize * scale;
  const pillarPos = WORLD_CONFIG.pillarHeight / 2 * scale;
  const worldSize = WORLD_CONFIG.size_x * scale
  const wallHeight = WORLD_CONFIG.wallHeight * scale
  const wallThickness = WORLD_CONFIG.wallThickness * scale
  const partisionHeight = WORLD_CONFIG.partisionHeight * scale

  const froorTexture = useTexture(`${baseUrl}textures/floor.png`)
  froorTexture.wrapS = THREE.RepeatWrapping
  froorTexture.wrapT = THREE.RepeatWrapping
  froorTexture.repeat.set(50, 30)

  const ceilingTexture = useTexture(`${baseUrl}textures/ceiling.png`)
  ceilingTexture.wrapS = THREE.RepeatWrapping
  ceilingTexture.wrapT = THREE.RepeatWrapping
  ceilingTexture.repeat.set(25, 15)

  return (
    <group position={position} scale={scale}>
      <Skybox radius={500} />

      {/* 照明設定 */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[-2, 20, -2]}
        intensity={1}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />

      {/* 地面 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 2.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[WORLD_CONFIG.size_x * scale, 25 * scale]} />
          <meshLambertMaterial color={COLORS.ground} map={froorTexture} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh
          ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10 * scale, 0, -12.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[25 * scale, 5 * scale]} />
          <meshLambertMaterial color={COLORS.ground} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh
          ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[17.5 * scale, 0, -12.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[10 * scale, 5 * scale]} />
          <meshLambertMaterial color={COLORS.ground} />
        </mesh>
      </RigidBody>

      {/* 天井（Ceiling） */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, wallHeight, 2.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[WORLD_CONFIG.size_x * scale, 25 * scale]} />
          <meshLambertMaterial color={COLORS.ground} side={1} map={ceilingTexture} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh
          ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10 * scale, wallHeight, -12.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[25 * scale, 5 * scale]} />
          <meshLambertMaterial color={COLORS.ground} side={1} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh
          ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[17.5 * scale, wallHeight, -12.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[10 * scale, 5 * scale]} />
          <meshLambertMaterial color={COLORS.ground} side={1} />
        </mesh>
      </RigidBody>

      {/* 壁 - 北（ガラス） */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, wallHeight / 2, -30 * scale / 2]}
        >
          <boxGeometry args={[45 * scale, 4 * scale, 0.1 * scale]} />
          {/* <meshLambertMaterial color={COLORS.pillar} /> */}
          <meshStandardMaterial transparent opacity={0.5} visible={false} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[7.5 * scale, wallHeight / 2, -10 * scale]}
        >
          <boxGeometry args={[10 * scale, 4 * scale, 0.1 * scale]} />
          {/* <meshLambertMaterial color={COLORS.pillar} /> */}
          <meshStandardMaterial transparent opacity={0.5} visible={false} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[2.5 * scale, wallHeight / 2, -12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, 4 * scale, 5 * scale]} />
          {/* <meshLambertMaterial color={COLORS.pillar} /> */}
          <meshStandardMaterial transparent opacity={0.5} visible={false} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[12.5 * scale, wallHeight / 2, -12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, 4 * scale, 5 * scale]} />
          {/* <meshLambertMaterial color={COLORS.pillar} /> */}
          <meshStandardMaterial transparent opacity={0.5} visible={false} />
        </mesh>
      </RigidBody>

      {/* 壁 - 西 */}
      <WallObject
        position={[-worldSize / 2, wallHeight / 2, 2.5 * scale]}
        size={[wallThickness, wallHeight, 25 * scale]}
      />
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-worldSize / 2, wallHeight / 2, -12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, 4 * scale, 5 * scale]} />
          {/* <meshLambertMaterial color={COLORS.wall} /> */}
          <meshStandardMaterial transparent opacity={0.5} visible={false} />
        </mesh>
      </RigidBody>

      {/* 壁 - 東 */}
      <WallObject
        position={[worldSize / 2, wallHeight / 2, 0]}
        size={[wallThickness, wallHeight, 30 * scale]}
      />

      {/* 壁 - 南 */}
      <WallObject
        position={[0, wallHeight / 2, 30 * scale / 2]}
        size={[worldSize, wallHeight, wallThickness]}
      />

      {/* 壁 - 南側 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[10 * scale, wallHeight / 2, 20 * scale / 2]}
        >
          <boxGeometry args={[25 * scale, wallHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-2.5 * scale, wallHeight / 2, 12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, wallHeight, 5 * scale]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-20.5 * scale, wallHeight / 2, 20 * scale / 2]}
        >
          <boxGeometry args={[4 * scale, wallHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-18.5 * scale, wallHeight / 2, 12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, wallHeight, 5 * scale]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>

      {/* 廊下 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh
          ref={groundRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[10 * scale, 0.2 * scale, 12.5 * scale]}
          receiveShadow
        >
          <planeGeometry args={[25 * scale, 5 * scale]} />
          <meshLambertMaterial color={COLORS.corridor} />
        </mesh>
      </RigidBody>

      {/* パーティション - 北 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-20.5 * scale, partisionHeight / 2, -16 * scale / 2]}
        >
          <boxGeometry args={[3.8 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-11 * scale, partisionHeight / 2, -16 * scale / 2]}
        >
          <boxGeometry args={[4 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-15 * scale, partisionHeight / 2, -11.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 7 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-8 * scale, partisionHeight / 2, -11.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 7 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* パーティション - 部長席 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-6.5 * scale, partisionHeight / 2, -20 * scale / 2]}
        >
          <boxGeometry args={[3 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-5 * scale, partisionHeight / 2, -9.2 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 1.8 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* パーティション - コピー機裏 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[5 * scale, partisionHeight / 2, -20 * scale / 2]}
        >
          <boxGeometry args={[15 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* パーティション - 来客席 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[2.5 * scale, partisionHeight / 2, -9.1 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 1.8 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[12.5 * scale, partisionHeight / 2, -9.1 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 1.8 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* パーティション - 右上 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[18.5 * scale, partisionHeight / 2, -16 * scale / 2]}
        >
          <boxGeometry args={[8 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* パーティション - 南 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-10.2 * scale, partisionHeight / 2, 20 * scale / 2]}
        >
          <boxGeometry args={[12 * scale, partisionHeight, 0.1 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-11 * scale, partisionHeight / 2, 12.5 * scale]}
        >
          <boxGeometry args={[0.1 * scale, partisionHeight, 5 * scale]} />
          <meshLambertMaterial color={COLORS.partision} />
        </mesh>
      </RigidBody>

      {/* 柱 */}
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-8.5 * scale, pillarPos, -15 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight * 4, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[2.5 * scale, pillarPos, -15 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight * 4, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[12.5 * scale, pillarPos, -15 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight * 4, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[22.5 * scale, pillarPos, -15 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight * 4, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-18.5 * scale, pillarPos, -8 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-8.5 * scale, pillarPos, -8 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[2.5 * scale, pillarPos, -8 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[12.5 * scale, pillarPos, -8 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[22.5 * scale, pillarPos, -8 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-18.5 * scale, pillarPos, 10 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-8.5 * scale, pillarPos, 10 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[2.5 * scale, pillarPos, 10 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[12.5 * scale, pillarPos, 10 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[22.5 * scale, pillarPos, 10 * scale]} castShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshLambertMaterial color={COLORS.pillar} />
        </mesh>
      </RigidBody>

      {/* 島 オブジェクト */}
      <LandObject position={[-20 * scale, 0, 0]} scale={scale} />
      <LandObject position={[-15 * scale, 0, 0]} scale={scale} />
      <LandObject position={[-10 * scale, 0, 0]} scale={scale} />
      <LandObject position={[-5 * scale, 0, 0]} scale={scale} />
      <LandObject position={[0.5 * scale, 0, 0]} scale={scale} />
      <LandObject position={[5 * scale, 0, 0]} scale={scale} />
      <LandObject position={[10 * scale, 0, 0]} scale={scale} />
      <LandObject position={[15 * scale, 0, 0]} scale={scale} />
      <LandObject position={[19 * scale, 0, 0]} scale={scale} />

      {/* 机 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <RoundedBox
          position={[-6.9 * scale, 0.7 * scale, -8 * scale]}
          args={[2 * scale, 0.05 * scale, 1 * scale]}
          radius={0.02 * scale}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color={COLORS.table} />
        </RoundedBox>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <RoundedBox
          position={[4 * scale, 0.7 * scale, -8 * scale]}
          args={[2 * scale, 0.05 * scale, 1 * scale]}
          radius={0.02 * scale}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color={COLORS.table} />
        </RoundedBox>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <RoundedBox
          position={[7.5 * scale, 0.7 * scale, -8 * scale]}
          args={[2 * scale, 0.05 * scale, 1 * scale]}
          radius={0.02 * scale}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color={COLORS.table} />
        </RoundedBox>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <RoundedBox
          position={[11 * scale, 0.7 * scale, -8 * scale]}
          args={[2 * scale, 0.05 * scale, 1 * scale]}
          radius={0.02 * scale}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color={COLORS.table} />
        </RoundedBox>
      </RigidBody>
    </group>
  );
};
