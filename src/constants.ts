export const WORLD_CONFIG = {
  size_x: 45,
  size_z: 30,
  wallHeight: 3.0,
  wallThickness: 0.2,
  pillarHeight: 3.4,
  pillarSize: 1.25,
  partisionHeight: 2,
} as const

export const COLORS = {
  ground: '#acacacff',
  wall: '#8B4513',
  pillar: '#584d4dff',
  corridor:'#618fd4ff',
  partision: '#b4caff',
  table: '#ffffff',
  decorations: {
    box: '#FFFF00',
    cylinder: '#4169E1',
    sphere: '#FFD700',
  },
  lightPost: '#696969',
} as const
