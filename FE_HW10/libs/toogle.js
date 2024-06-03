function toogleMenu(menuCssSelector, className, parent) {
    document.querySelector(menuCssSelector).classList.toggle(className);
    document.querySelector(parent).style.height = `${18 - (document.querySelector(parent).clientHeight / 16)}em`;
  }