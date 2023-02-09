import { transformPointCloud } from '../potreeUtils.js';
import { getPointCloudId, postPointCloudOffset, getPointCloudInit } from "../api.js";

function getNumberValue(elementId, defaultValue = 0) {
    const element = document.getElementById(elementId);
    const value = Number(element.value);
    return (isNaN(value) || element.value === '') ? defaultValue : value;
}

function getFormValue() {
    return {
        offsetX: getNumberValue('tOffsetX'),
        offsetY: getNumberValue('tOffsetY'),
        offsetZ: getNumberValue('tOffsetZ'),
        angle: (getNumberValue('tAngle') * Math.PI)/180,
        scale: getNumberValue('tScale', 1),
    }
}

function createTimerElement(seconds) {
    const timer = document.createElement('div');
    timer.className = 'timer';
    timer.innerText = seconds;
    let time = seconds;
    const interval = setInterval(() => {
        timer.innerText = (--time).toString();
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
    }, seconds * 1000)
    return timer;
}

function createLoadingScreenElement(seconds = 0) {
    const loader = document.createElement('div');
    loader.style.background = 'rgba(0,0,0,0.5)';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100vw';
    loader.style.height = '100vh';
    loader.style.zIndex = '10000';
    loader.style.display = 'flex';
    loader.style.flexDirection = 'column';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.color = 'white';
    loader.innerHTML = `<div>updating point cloud</div><div style="font-size: 2em">Please wait!</div>`;
    loader.appendChild(createTimerElement(seconds))
    return loader;
}

export default async () => {
    const section = await $.load('customMenus/transformMenu.html');

    section.first().click(() => section.last().slideToggle());
    section.insertBefore($('#menu_appearance'));

    const tryBtn = document.getElementById('tTryBtn');
    tryBtn.onclick = () => {
        const pc = viewer.scene.pointclouds[0];
        transformPointCloud(pc, getFormValue())
    }
    const submitBtn = document.getElementById('tSubmitBtn');
    submitBtn.onclick = () => {
        postPointCloudOffset(getPointCloudId(), getFormValue())
          .then(() => window.location.reload());
        document.body.appendChild(createLoadingScreenElement(6));
    }
    const resetBtn = document.getElementById('tResetBtn');
    resetBtn.onclick = () => {
        getPointCloudInit(getPointCloudId())
          .then(() => window.location.reload());
        document.body.appendChild(createLoadingScreenElement(30));
    }
    return section;
};