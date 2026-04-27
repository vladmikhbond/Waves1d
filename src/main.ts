import Space from "./models/space";
import { show } from "./view/view";

const N = 100;
let space = new Space(N);
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
space.nodes[N / 2 ].z = 5
space.nodes[N / 2 - 1].z = 3
space.nodes[N / 2 + 1].z = 3
let timer = setInterval(() => {
    space.step();
    show(space, canvas!, 100);
}, 200);
