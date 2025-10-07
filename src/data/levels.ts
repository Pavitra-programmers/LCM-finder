export type LevelConfig = {
  id: number;
  name: string;
  numbers: [number, number];
};

export const LEVELS: LevelConfig[] = [
  { id: 1, name: "Level 1", numbers: [2, 3] },
  { id: 2, name: "Level 2", numbers: [4, 6] },
  { id: 3, name: "Level 3", numbers: [12, 15] },
];

