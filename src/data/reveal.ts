/*
 * Revelado de la casa: una pose por paso del scroll del resultado. Controla la
 * cámara del modelo (Targon Peak Inclined) y la posición del texto; el último
 * paso transiciona al Peak Targon con el logo de la casa flotando.
 * Editor: /quiz-de-casas?tune=reveal (tras responder).
 * slot = qué texto se muestra: name | lema | desc0-2 | final.
 * En peakPose, tx/ty desplazan el logo (no el texto).
 */

export interface RevealPose {
  camY: number;
  camZ: number;
  lookY: number;
  rotDeg: number;
  fov: number;
  side: "left" | "right";
  tx: number;
  ty: number;
  slot: "name" | "lema" | "desc0" | "desc1" | "desc2" | "final";
}

export const revealPoses: RevealPose[] = [
  {
    camY: -0.5,
    camZ: 8,
    lookY: 0.75,
    rotDeg: 0,
    fov: 19,
    side: "right",
    tx: -170,
    ty: 0,
    slot: "name",
  },
  {
    camY: 0.6,
    camZ: 5.5,
    lookY: 0.6,
    rotDeg: 40,
    fov: 36,
    side: "left",
    tx: 385,
    ty: 0,
    slot: "lema",
  },
  {
    camY: 0.2,
    camZ: 5,
    lookY: 0.7,
    rotDeg: 89,
    fov: 44,
    side: "right",
    tx: -15,
    ty: 0,
    slot: "desc0",
  },
  {
    camY: -0.25,
    camZ: 5,
    lookY: -0.25,
    rotDeg: 161,
    fov: 34,
    side: "left",
    tx: -50,
    ty: 0,
    slot: "desc1",
  },
  {
    camY: 0.3,
    camZ: 5.2,
    lookY: 1.15,
    rotDeg: 220,
    fov: 31,
    side: "right",
    tx: -260,
    ty: 0,
    slot: "desc2",
  },
  {
    camY: 0.4,
    camZ: 7,
    lookY: 1,
    rotDeg: 214,
    fov: 33,
    side: "left",
    tx: 350,
    ty: 0,
    slot: "final",
  },
];

// Pose del modelo final (Peak Targon); tx/ty desplazan el logo en px.
export const peakPose: RevealPose = {
  camY: -0.6,
  camZ: 4.9,
  lookY: 0.05,
  rotDeg: 358,
  fov: 32,
  side: "right",
  tx: 10,
  ty: 110,
  slot: "final",
};
