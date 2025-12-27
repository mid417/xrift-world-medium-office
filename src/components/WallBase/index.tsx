import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useXRift } from '@xrift/world-components'
import { useTexture } from '@react-three/drei'

export interface WallObjectProps {
  position?: [number, number, number],
  size?: [number, number, number],
  repeat?: number,
}

export const WallObject = ({
  position = [0, 2, 0],
  size = [20, 4, 0.2],
  repeat = 10,
}: WallObjectProps) => {
  const { baseUrl } = useXRift()

  const wallTexture = useTexture(`${baseUrl}textures/wall.png`)
  wallTexture.wrapS = THREE.RepeatWrapping
  wallTexture.wrapT = THREE.RepeatWrapping
  wallTexture.repeat.set(repeat, 1)
  
  return (
    <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
      <mesh  position={position} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#ffffff" map={wallTexture} />
      </mesh>
    </RigidBody>
  )
}
