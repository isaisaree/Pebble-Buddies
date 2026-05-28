export type BodyShape = 'fluffy' | 'onigiri' | 'round' | 'sharp';
export type HairStyle = 'none' | 'curtain' | 'curly' | 'swoosh' | 'bangs' | 'loop' | 'wavy';
export type EyeStyle = 'dots' | 'lines' | 'closed' | 'angry';
export type MouthStyle = 'smile' | 'cat' | 'straight' | 'frown';

export interface Accessory {
  id: string;
  name: string;
  icon: string;
  price: number;
  type: 'hat' | 'glasses' | 'clothing' | 'facial';
  locked: boolean;
}

export interface PebbleBuddy {
  name: string;
  shape: BodyShape;
  hair: HairStyle;
  eyes: EyeStyle;
  mouth: MouthStyle;
  color: string;
  accessories: string[]; // IDs
}

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  buddy: PebbleBuddy;
  streak: number;
}

export interface FamilyGroup {
  id: string;
  name: string;
  members: UserProfile[];
}
