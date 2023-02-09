import Tracker from "../tracker/Tracker.js";
import Player from "../tracker/Player.js";
import ShadowVisualizer from "../tracker/visualizer/ShadowVisualizer.js";
import LastVisualizer from "../tracker/visualizer/LastVisualizer.js";
import TrackableObjects from "../tracker/objects/TrackableObjects.js";

const getTimeLabel = (milliseconds) => {
    const totalSec = Math.floor(milliseconds / 1000);
    const sec = totalSec % 60;
    const min = Math.floor(totalSec / 60);
    return `${min}:${String(sec).padStart(2, "0")}`;
}

export default async () => {
    const section = await $.load('customMenus/trackerMenu.html');
    section.first().click(() => section.last().slideToggle());
    section.insertBefore($('#menu_appearance'));

    // Todo: Replace with real endpoint data.
    const rawData = `TIMESTAMP; OBJECT_ID; X; Y; Z; BBX1; BBY1; BBZ1; BBX2; BBY2; BBZ2
1664352930096; 1; 1.23; 2.32; 2.54; 1.23; 2.32; 2.54; 1.53; 2.82; 2.94;
1664352930696; 1; 1.27; 2.32; 2.58; 1.29; 2.38; 2.59; 1.58; 2.82; 3.00;
1664352931396; 1; 1.33; 2.32; 2.64; 1.33; 2.42; 2.64; 1.63; 2.92; 3.04;
1664352933496; 2; 3.23; 5.32; 2.64; 3.23; 5.32; 2.54; 3.53; 4.82; 2.94;
1664352936696; 2; 3.23; 5.32; 2.54; 3.23; 5.32; 2.24; 3.53; 4.82; 2.64;
1664352937096; 2; 2.73; 4.72; 2.03; 2.73; 5.32; 1.74; 3.03; 4.22; 2.04;
1664352937496; 2; 2.23; 4.32; 1.54; 2.23; 4.32; 1.24; 2.53; 3.82; 1.64;
`;

    const tracker = new Tracker();
    const player = new Player();
    player.setFrequency(1);

    tracker.onUpdate = () => {
        const span = tracker.getMaxTime() - tracker.getMinTime();
        player.setTimeSpan(Math.ceil(span / 1000));
        player.setTime(player.getTime());

        const timeEl = document.getElementById('pTimeMax');
        timeEl.innerText = getTimeLabel(span + 1000);
    }
    tracker.loadCsv(rawData);

    const trackabeObjects = new TrackableObjects();
    viewer.scene.scene.add(trackabeObjects);

    const visualizers = {
        pModeShadowBtn: new ShadowVisualizer(trackabeObjects),
        pModeLastBtn: new LastVisualizer(trackabeObjects)
    }

    const visualize = (offset) =>
        visualizers[visualizers.active].visualize(tracker, tracker.getMinTime() + offset * 1000);

    player.onTick = (offset) => {
        const time = offset * 1000;
        visualize(offset);
        $('#pTimeBar').slider( "value", offset);

        const timeNow = document.getElementById('pTimeNow');
        timeNow.innerText = getTimeLabel(time);
    }

    $('#pTimeBar').slider({
        value: 0,
        min: 0,
        max: player.getTimeSpan(),
        step: 1 / player.getFrequency(),
        slide: (event, ui) => {
            player.setTime(ui.value);
        }
    });

    const frequencyInput = document.getElementById('pFrequency');
    frequencyInput.onchange = (e) => {
        if (!e.target.value && isNaN(e.target.value)) return;
        player.setFrequency(Number(e.target.value));

        $('#pTimeBar').slider({
            step: 1 / player.getFrequency()
        });
    }

    const selectVisualizer = (selected) => {
        for (const elId of Object.keys(visualizers)) {
            if (elId === 'active' || elId === selected) continue;
            const el = document.getElementById(elId);
            if (!el) return;
            el.classList.remove('ui-state-active');
        }
        document.getElementById(selected).classList.add('ui-state-active');
        visualizers.active = selected;
        player.tick();
    }
    selectVisualizer(Object.keys(visualizers)[0])
    visualize(0);

    const visualizerBtnClick = (e) => selectVisualizer(e.target.id);
    const shadowModeBtn = document.getElementById('pModeShadowBtn');
    shadowModeBtn.onclick = visualizerBtnClick;
    const lastModeBtn = document.getElementById('pModeLastBtn');
    lastModeBtn.onclick = visualizerBtnClick;

    const speedInput = document.getElementById('pSpeed');
    speedInput.onchange = (e) => {
        if (!e.target.value && isNaN(e.target.value)) return;
        player.setSpeed(Number(e.target.value));
    }

    const playBtn = document.getElementById('pPlayBtn');
    playBtn.onclick = () => {
        player.play();
    }
    const pauseBtn = document.getElementById('pPauseBtn');
    pauseBtn.onclick = () => {
        player.pause();
    }
    return section;
};


// const material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 5 } );
// const points = [];
// points.push( new THREE.Vector3( 0, 0, 0 ) );
// points.push( direction );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// new THREE.Line(geometry);

// return new THREE.Line( geometry, material );

