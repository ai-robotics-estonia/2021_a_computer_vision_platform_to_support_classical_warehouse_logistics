import Toggle from './helpers/Toggle.js';
import GroundPanel from "./tracker/objects/GroundPanel.js";
import {CenterAxleLines} from "./tracker/objects/CenterAxleLines.js";

const planeTop = new GroundPanel();
const planeBot = new GroundPanel();
planeBot.rotation.set(Math.PI, 0, 0);

function showGroundPanel() {
    viewer.scene.scene.add(planeTop);
    viewer.scene.scene.add(planeBot);
}
function hideGroundPanel() {
    viewer.scene.scene.remove(planeTop);
    viewer.scene.scene.remove(planeBot);
}

export const groundPanelToggle = new Toggle(showGroundPanel, hideGroundPanel);

const center = new CenterAxleLines(2);
function showAxles() {
    viewer.scene.scene.add(center);
}
function hideAxles() {
    viewer.scene.scene.remove(center);
}
export const axleLinesToggle = new Toggle(showAxles, hideAxles);
