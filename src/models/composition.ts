import { Champion } from "./champion";
import { ActiveSynergy } from "@/models/type";
export interface Composition {
  id: number;
  name: string;
  comment: string;
  patch: Patch;
  synergy: ActiveSynergy[];
  championList: CompositionChampion[];
}

export type CompositionChampion = {
  champion: Champion;
  item: string[];
  location: number;
};

export type Patch = {
  create: string;
  valid: string;
};
