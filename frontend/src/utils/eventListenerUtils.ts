export const dragAndDropMouseEventInstaller = (el: HTMLElement) => {
  el.onmousedown = function (event: MouseEvent) {
    const shiftX = event.clientX - el.getBoundingClientRect().left;
    const shiftY = event.clientY - el.getBoundingClientRect().top;

    el.style.position = 'absolute';
    // el.style.zIndex = '0';
    el.style.transform = 'none';

    moveAt(event.pageX, event.pageY);

    // moves the el at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX: number, pageY: number) {
      el.style.left = pageX - shiftX + 'px';
      el.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
    }

    // move the el on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the el, remove unneeded handlers
    el.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;
    };
  };

  el.ondragstart = function () {
    return false;
  };
};
