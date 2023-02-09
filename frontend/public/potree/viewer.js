import guidesMenu from "./customMenus/guidesMenu.js";
import transformMenu from "./customMenus/transformMenu.js";
import trackerMenu from "./customMenus/trackerMenu.js";

$.load = async function (url) {
  return new Promise((resolve) => {
    $('<div></div>').load(url, (sectionHtml, status) => {
      if (status !== "success") resolve(null)
      else resolve($(sectionHtml));
    });
  });
}

window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));

viewer.setFOV(60);
viewer.setBackground("skybox");
viewer.setDescription("Room: [name] (0M points)");

viewer.loadGUI(() => {
  viewer.setLanguage('en');
  guidesMenu();
  transformMenu();
  trackerMenu();

  document.getElementById("menu_about").style.display = 'none';
  document.getElementById("menu_filters").style.display = 'none';
});
