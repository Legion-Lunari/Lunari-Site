/*
 * Ascenso: una pose por paso del quiz. Controla la cámara del Monte Targon y la
 * posición del texto en cada pregunta. Editor: /quiz-de-casas?tune=1.
 * camY/camZ = altura/distancia de la cámara (camZ menor = más zoom);
 * lookY = altura a la que mira; rotDeg = rotación del monte;
 * fov = campo de visión (menor = más telefoto); side + tx/ty = lado y offset del texto.
 */

export interface AscentPose {
  camY: number;
  camZ: number;
  lookY: number;
  rotDeg: number;
  fov: number;
  side: "left" | "right";
  tx: number;
  ty: number;
}

// Pose del intro (antes de empezar el quiz): no cuenta como pregunta.
export const introPose: AscentPose = {
  camY: -1.45,
  camZ: 5,
  lookY: 0.9,
  rotDeg: 0,
  fov: 52,
  side: "right",
  tx: 0,
  ty: 0,
};

export const ascentPoses: AscentPose[] = [
  {
    camY: -1.35,
    camZ: 4.3,
    lookY: 0.25,
    rotDeg: 0,
    fov: 50,
    side: "right",
    tx: 0,
    ty: 0,
  },
  {
    camY: -1.35,
    camZ: 2.7,
    lookY: -0.2,
    rotDeg: 322,
    fov: 60,
    side: "left",
    tx: 100,
    ty: 0,
  },
  {
    camY: -1.35,
    camZ: 2.4,
    lookY: -0.9,
    rotDeg: 39,
    fov: 44,
    side: "right",
    tx: -25,
    ty: 0,
  },
  {
    camY: -1.5,
    camZ: 2.4,
    lookY: -1,
    rotDeg: 287,
    fov: 25,
    side: "left",
    tx: 90,
    ty: 0,
  },
  {
    camY: -1.5,
    camZ: 2.4,
    lookY: -0.75,
    rotDeg: 37,
    fov: 20,
    side: "right",
    tx: -15,
    ty: 0,
  },
  {
    camY: -1.5,
    camZ: 2.4,
    lookY: -0.5,
    rotDeg: 340,
    fov: 20,
    side: "left",
    tx: 200,
    ty: 0,
  },
  {
    camY: -1.5,
    camZ: 2.4,
    lookY: -0.3,
    rotDeg: 19,
    fov: 18,
    side: "right",
    tx: 35,
    ty: 0,
  },
  {
    camY: -1.5,
    camZ: 2.4,
    lookY: -0.05,
    rotDeg: 336,
    fov: 22,
    side: "left",
    tx: 120,
    ty: 0,
  },
  {
    camY: -1.55,
    camZ: 2.4,
    lookY: 0.25,
    rotDeg: 19,
    fov: 17,
    side: "right",
    tx: -45,
    ty: 0,
  },
  {
    camY: -1.55,
    camZ: 2.4,
    lookY: 0.3,
    rotDeg: 333,
    fov: 22,
    side: "left",
    tx: 210,
    ty: 0,
  },
  {
    camY: -0.95,
    camZ: 2.4,
    lookY: 0.55,
    rotDeg: 26,
    fov: 22,
    side: "right",
    tx: -85,
    ty: 0,
  },
  {
    camY: -2.65,
    camZ: 8,
    lookY: 0.5,
    rotDeg: 360,
    fov: 17,
    side: "left",
    tx: 40,
    ty: 0,
  },
  {
    camY: -1.15,
    camZ: 8,
    lookY: 0.35,
    rotDeg: 360,
    fov: 29,
    side: "right",
    tx: 20,
    ty: 0,
  },
];
