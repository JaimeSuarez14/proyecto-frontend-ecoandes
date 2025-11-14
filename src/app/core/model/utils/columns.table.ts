export interface KeyColumns<Anidado> {
  key: keyof Anidado;
  label: string;
}

interface Anidado<G> {
  key: keyof G;
  label: string;
}
