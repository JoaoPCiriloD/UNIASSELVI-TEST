let currentURL = new URL(window.location.toString());

function toggleMenu() {
  document.querySelector(`nav`).classList.toggle(`active`);
}

function toggleSection(element) {
  let el = document.querySelector(`.toggle-section.active`);
  if (el) {
    el.classList.remove(`active`);

    if (el != element.parentElement) {
      element.parentElement.classList.toggle(`active`);
    }
  } else {
    element.parentElement.classList.toggle(`active`);
  }

  element.scrollIntoView();
  document.documentElement.scrollTop -= 100;
}

function toggleVideoHome(element) {
  let parent = element.parentElement;

  if (parent.firstElementChild.classList.toggle(`libras`)) {
    //agora esta no Libras
    element.innerHTML = `Assistir à versão sem Libras`;
    parent.querySelector("iframe").src =
      "https://www.youtube.com/embed/8ueRYQhIAxs?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1";
  } else {
    element.innerHTML = `Assistir à versão em Libras`;
    parent.querySelector("iframe").src =
      "https://www.youtube.com/embed/xNEi1uA5mqY?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1";
  }
}
function setActiveModelo(className) {
  document.querySelectorAll(`.active`).forEach((element) => {
    element.classList.remove(`active`);
  });

  let topbarHeight = document
    .querySelector(`.main-nav`)
    .getBoundingClientRect().height;

  document.querySelectorAll(`.${className}`).forEach((element, index) => {
    element.classList.add(`active`);

    if (index == 0) {
      let top =
        element.parentElement.getBoundingClientRect().top - topbarHeight;

      window.scrollTo(0, top + window.scrollY);
    }
  });
}

function redirect(target) {
  target ? window.open(`${target}`, "_blank") : "";
}

// realiza scroll para as etapas
function redirectEtapas(element) {
  let etapa = element.getAttribute("data-etapa-target");
  let target = document.querySelector(`[data-etapa-name="${etapa}"]`);
  window.history.replaceState(null, null, `?etapa=${etapa}`);
  if (target) {
    document.querySelector(`nav`).classList.remove("active");
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// listener etapas menu
function listenerEtapas() {
  const titulos = document.querySelectorAll("h2[data-etapa-name]");
  const linksMenu = document.querySelectorAll("li a[data-etapa-target]");
  const pageHeight = window.innerHeight;
  titulos.forEach((titulo) => {
    let h2Rect = parseInt(titulo.getBoundingClientRect().top);
    let etapa = titulo.getAttribute("data-etapa-name");
    if (h2Rect < pageHeight) {
      linksMenu.forEach((link) => {
        etapa == link.getAttribute("data-etapa-target")
          ? link.closest("li").classList.add("active")
          : link.closest("li").classList.remove("active");
      });
    }
  });
  if (titulos[0].getBoundingClientRect().top > pageHeight) {
    linksMenu.forEach((link) => {
      link.closest("li").classList.remove("active");
    });
  }
}

// verifica url para o scroll da etapa
function checkEtapaScroll() {
  if (currentURL.searchParams.has(`etapa`)) {
    let target = currentURL.searchParams.get(`etapa`);
    let element = document.querySelector(`[data-etapa-target=${target}]`);
    redirectEtapas(element);
  }
}

// barra de progresso
let progressBarT, progressBar;
function buildProgressBars() {
  if (document.querySelector(".topbar-progress"))
    progressBarT = new ProgressBar.Line(
      document.querySelector(".topbar-progress"),
      {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 800,
        color: "#ffdd00",
        trailColor: "rgba(0,0,0,0)",
        trailWidth: 6,
        text: {
          style: {
            color: "#ffffff",
            position: "absolute",
            left: "2px",
            top: "-3px",
            padding: 0,
            margin: 0,
            fontSize: "10px",
          },
          autoStyleContainer: false,
        },
        step: (state, bar) => {
          let perc = Math.round(bar.value() * 100);
          if (perc > 0 && perc < 97) {
            try {
              bar.text.style.transform =
                "translateX(" + bar.value() * window.innerWidth + "px)";
            } catch (e) {}
            bar.setText(perc + "%");
          } else {
            bar.setText("");
          }
        },
      }
    );
}
function updatePageLayoutOnScroll() {
  var _a, _b, _c, _d;
  let currentY = window.scrollY;
  let totalY = document.documentElement.scrollHeight - window.innerHeight;
  (_a = progressBar) === null || _a === void 0
    ? void 0
    : _a.animate((currentY / totalY).toFixed(2));
  (_b = progressBarT) === null || _b === void 0
    ? void 0
    : _b.animate((currentY / totalY).toFixed(2));
}
window.addEventListener("load", () => {
  buildProgressBars();
  listenerEtapas();
  checkEtapaScroll();
});
window.addEventListener("scroll", () => {
  updatePageLayoutOnScroll();
  setTimeout(listenerEtapas, 300);
});

//inicio -- clicar e rolar pra cima
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
//fim -- clicar e rolar pra cima

// "Atividades de extensão" -- Playlist
function loadVideo(e) {
  let parentPlaylist = e.parentElement;
  while (!parentPlaylist.classList.contains("playlist")) {
      parentPlaylist = parentPlaylist.parentElement;
  }
  parentPlaylist
      .querySelector(".video-item.selected")
      ?.classList.remove("selected");
  e.classList.add("selected");
  if (e.classList.contains("watched")) {
      parentPlaylist.querySelector(`.watched-toggle`)?.classList.add(`true`);
      parentPlaylist
          .querySelector(`.watched-toggle`)
          ?.classList.remove(`false`);
  } else {
      parentPlaylist.querySelector(`.watched-toggle`)?.classList.add(`false`);
      parentPlaylist
          .querySelector(`.watched-toggle`)
          ?.classList.remove(`true`);
  }
  let videoURL = e.getAttribute("data-videoid");
  parentPlaylist.querySelector(
      ".video iframe"
  ).src = `https://www.youtube.com/embed/${videoURL}?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1`;
  updateVideoTitle(parentPlaylist, videoURL);
}
function loadPreviousVideo(from) {
  let parentPlaylist = from.parentElement;
  while (!parentPlaylist.classList.contains("playlist")) {
      parentPlaylist = parentPlaylist.parentElement;
  }
  let selectedItem = parentPlaylist.querySelector(`.video-item.selected`);
  let allVideoItems = parentPlaylist.querySelectorAll(`.video-item`);
  let indexOfSelected = -1;
  allVideoItems.forEach((item, index) => {
      if (item == selectedItem) {
          indexOfSelected = index;
      }
  });
  if (indexOfSelected > 0) {
      selectedItem?.classList.remove(`selected`);
      loadVideo(allVideoItems.item(indexOfSelected - 1));
  }
}
function loadNextVideo(from) {
  let parentPlaylist = from.parentElement;
  while (!parentPlaylist.classList.contains("playlist")) {
      parentPlaylist = parentPlaylist.parentElement;
  }
  let selectedItem = parentPlaylist.querySelector(`.video-item.selected`);
  let allVideoItems = parentPlaylist.querySelectorAll(`.video-item`);
  let indexOfSelected = -1;
  allVideoItems.forEach((item, index) => {
      if (item == selectedItem) {
          indexOfSelected = index;
      }
  });
  if (indexOfSelected < allVideoItems.length - 1) {
      selectedItem?.classList.remove(`selected`);
      loadVideo(allVideoItems.item(indexOfSelected + 1));
  }
}
async function updateVideoTitle(playlist, videoID) {
  let response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoID}`
  );
  let oembedJson = await response.json();
  playlist.querySelector(`.video-title h2`).innerHTML = oembedJson.title;
}