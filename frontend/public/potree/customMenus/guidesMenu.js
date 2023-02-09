import { axleLinesToggle, groundPanelToggle } from "../editorConfig.js";

function initCheckBoxToggler(elementId, toggle) {
    const checkbox = document.getElementById(elementId);
    checkbox.checked = toggle.state;
    checkbox.onchange = () => {
        toggle.toggle();
    };
    toggle.addHandler((s) => {
        checkbox.checked = s;
    });
}

export default async () => {
    let section = await $.load('customMenus/guidesMenu.html');
    section.first().click(() => section.last().slideToggle());
    section.insertBefore($('#menu_appearance'));

    initCheckBoxToggler("axlesVisible", axleLinesToggle);
    initCheckBoxToggler("groundPanelVisible", groundPanelToggle);

    axleLinesToggle.toggle();
    groundPanelToggle.toggle();

    return section;
};