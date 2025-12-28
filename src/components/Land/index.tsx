import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Group } from 'three'
import { RoundedBox } from '@react-three/drei'

export interface LandObjectProps {
  position?: [number, number, number]
  scale?: number
}

export const COLORS = {
  table: '#ffffff',
  partision: '#b4caff',
  chair: '#919191',
} as const

export const LandObject = ({
  position = [0, 0, 0],
  scale = 1,
}: LandObjectProps) => {
  const groupRef = useRef<Group>(null)

  return (
    <group ref={groupRef}>
      <group position={position}>
        {/* 机 */}
        <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
          <RoundedBox
            position={[scale, 0.7 * scale, scale]}
            args={[2.5 * scale, 0.05 * scale, 13 * scale]}
            radius={0.02 * scale}
            smoothness={4}
            castShadow
          >
            <meshLambertMaterial color={COLORS.table} />
          </RoundedBox>
        </RigidBody>

        {/* パーティション */}
        <RoundedBox
          position={[scale, 0.95 * scale, scale]}
          args={[0.03 * scale, 0.5 * scale, 12.8 * scale]}
          radius={0.01 * scale}
          smoothness={8}
          castShadow
        >
          <meshLambertMaterial color={COLORS.partision} />
        </RoundedBox>
      </group>
    </group>
  )
}
