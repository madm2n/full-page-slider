const TRANSITION_TIME = 1000;
const ACTIVE_CLASS = 'active';

function init() {
  const $slides = document.getElementsByClassName('slide');
  const $main = document.getElementById('main');
  
  const slider = {
    index: 0,
    inProgress: null
  };

  function slide(where) {
    if (!slider.inProgress) {
      where();
      slider.inProgress = setTimeout(() => {
        clearTimeout(slider.inProgress);
        slider.inProgress = null;
      }, TRANSITION_TIME);
    }
  }

  function up() {
    if (slider.index > 0) {
      $slides[slider.index].classList.remove(ACTIVE_CLASS);
      slider.index--;
      $slides[slider.index].classList.add(ACTIVE_CLASS);
    }
  }

  function down() {
    if (slider.index < $slides.length - 1) {
      slider.index++;
      $slides[slider.index].classList.add(ACTIVE_CLASS);
    }
  }

  $main.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
      slide(up);
    } else if (event.deltaY > 0) {
      slide(down);
    }
  });

  const touch = {
    startY: 0,
    endY: 0
  };

  $main.addEventListener('touchstart', (event) => {
    touch.startY = event.changedTouches[0].screenY;
  });

  $main.addEventListener('touchend', (event) => {
    touch.endY = event.changedTouches[0].screenY;

    if (touch.endY < touch.startY) {
      slide(down);
    } else if (touch.endY > touch.startY) {
      slide(up);
    }
  });
}

window.addEventListener('load', init);