!(function(e) {
  e.fn.visible = function(t) {
    var n = e(this),
      l = e(window),
      a = l.scrollTop(),
      r = a + l.height(),
      o = n.offset().top,
      i = o + n.height();
    return (!0 === t ? o : i) <= r && (!0 === t ? i : o) >= a;
  };
})(jQuery);
var win = $(window),
  allMods = $(".content-slide-in");
allMods.each(function(e, t) {
  (t = $(t)).visible(!0) && t.addClass("already-visible");
}),
  win.scroll(function(e) {
    allMods.each(function(e, t) {
      (t = $(t)).visible(!0) && t.addClass("come-in");
    });
  }),
  (function() {
    function e(e) {
      e = window.event || e;
      var t = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      (document.getElementById("hrPanel").scrollLeft -= 40 * t),
        e.preventDefault();
    }
    document.getElementById("hrPanel").addEventListener
      ? (document
          .getElementById("hrPanel")
          .addEventListener("mousewheel", e, !1),
        document
          .getElementById("hrPanel")
          .addEventListener("DOMMouseScroll", e, !1))
      : document.getElementById("hrPanel").attachEvent("onmousewheel", e);
  })();
var SETTINGS = {
    navBarTravelling: !1,
    navBarTravelDirection: "",
    navBarTravelDistance: 150
  },
  colours = {
    0: "#867100",
    1: "#7F4200",
    2: "#99813D",
    3: "#40FEFF",
    4: "#14CC99",
    5: "#00BAFF",
    6: "#0082B2",
    7: "#B25D7A",
    8: "#00FF17",
    9: "#006B49",
    10: "#00B27A",
    11: "#996B3D",
    12: "#CC7014",
    13: "#40FF8C",
    14: "#FF3400",
    15: "#ECBB5E",
    16: "#ECBB0C",
    17: "#B9D912",
    18: "#253A93",
    19: "#125FB9"
  };
document.documentElement.classList.remove("no-js"),
  document.documentElement.classList.add("js");
var hrPanelArrowLeft = document.getElementById("hrPanelArrowLeft"),
  hrPanelArrowRight = document.getElementById("hrPanelArrowRight"),
  hrPanelIndicator = document.getElementById("hrPanelIndicator"),
  hrPanel = document.getElementById("hrPanel"),
  hrPanelContent = document.getElementById("hrPanelContent");
hrPanel.setAttribute(
  "data-overflowing",
  determineOverflow(hrPanelContent, hrPanel)
),
  moveIndicator(hrPanel.querySelector('[aria-selected="true"]'), colours[0]);
var last_known_scroll_position = 0,
  ticking = !1;
function doSomething(e) {
  hrPanel.setAttribute(
    "data-overflowing",
    determineOverflow(hrPanelContent, hrPanel)
  );
}
function moveIndicator(e, t) {
  var n = e.getBoundingClientRect(),
    l = hrPanelContent.getBoundingClientRect().left,
    a = n.left - l,
    r = hrPanelContent.scrollLeft;
  (hrPanelIndicator.style.transform =
    "translateX(" + (a + r) + "px) scaleX(" + 0.01 * n.width + ")"),
    t && (hrPanelIndicator.style.backgroundColor = t);
}
function determineOverflow(e, t) {
  var n = t.getBoundingClientRect(),
    l = Math.floor(n.right),
    a = Math.floor(n.left),
    r = e.getBoundingClientRect(),
    o = Math.floor(r.right),
    i = Math.floor(r.left);
  return a > i && l < o ? "both" : i < a ? "left" : o > l ? "right" : "none";
}
function scrollFunction() {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (document.getElementById("topNav").classList.remove("nav-unscrolled"),
      document.getElementById("topNav").classList.add("nav-scrolled"),
      document.getElementById("topNavBar").classList.add("nav__container"))
    : (document.getElementById("topNav").classList.add("nav-unscrolled"),
      document.getElementById("topNav").classList.remove("nav-scrolled"),
      document.getElementById("topNavBar").classList.remove("nav__container"));
}
function toggleButton(e) {
  e.classList.toggle("toggle-btn--change");
}
hrPanel.addEventListener("scroll", function() {
  (last_known_scroll_position = window.scrollY),
    ticking ||
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position), (ticking = !1);
      }),
    (ticking = !0);
}),
  hrPanelArrowLeft.addEventListener("click", function() {
    if (!0 !== SETTINGS.navBarTravelling) {
      if (
        "left" === determineOverflow(hrPanelContent, hrPanel) ||
        "both" === determineOverflow(hrPanelContent, hrPanel)
      ) {
        var e = hrPanel.scrollLeft;
        e < 2 * SETTINGS.navBarTravelDistance
          ? (hrPanelContent.style.transform = "translateX(" + e + "px)")
          : (hrPanelContent.style.transform =
              "translateX(" + SETTINGS.navBarTravelDistance + "px)"),
          hrPanelContent.classList.remove("hr-panel__content-no-transition"),
          (SETTINGS.navBarTravelDirection = "left"),
          (SETTINGS.navBarTravelling = !0);
      }
      hrPanel.setAttribute(
        "data-overflowing",
        determineOverflow(hrPanelContent, hrPanel)
      );
    }
  }),
  hrPanelArrowRight.addEventListener("click", function() {
    if (!0 !== SETTINGS.navBarTravelling) {
      if (
        "right" === determineOverflow(hrPanelContent, hrPanel) ||
        "both" === determineOverflow(hrPanelContent, hrPanel)
      ) {
        var e = hrPanelContent.getBoundingClientRect().right,
          t = hrPanel.getBoundingClientRect().right,
          n = Math.floor(e - t);
        n < 2 * SETTINGS.navBarTravelDistance
          ? (hrPanelContent.style.transform = "translateX(-" + n + "px)")
          : (hrPanelContent.style.transform =
              "translateX(-" + SETTINGS.navBarTravelDistance + "px)"),
          hrPanelContent.classList.remove("hr-panel__content-no-transition"),
          (SETTINGS.navBarTravelDirection = "right"),
          (SETTINGS.navBarTravelling = !0);
      }
      hrPanel.setAttribute(
        "data-overflowing",
        determineOverflow(hrPanelContent, hrPanel)
      );
    }
  }),
  hrPanelContent.addEventListener(
    "transitionend",
    function() {
      var e = window.getComputedStyle(hrPanelContent, null),
        t =
          e.getPropertyValue("-webkit-transform") ||
          e.getPropertyValue("transform"),
        n = Math.abs(parseInt(t.split(",")[4]) || 0);
      (hrPanelContent.style.transform = "none"),
        hrPanelContent.classList.add("hr-panel__content-no-transition"),
        "left" === SETTINGS.navBarTravelDirection
          ? (hrPanel.scrollLeft = hrPanel.scrollLeft - n)
          : (hrPanel.scrollLeft = hrPanel.scrollLeft + n),
        (SETTINGS.navBarTravelling = !1);
    },
    !1
  ),
  hrPanelContent.addEventListener("click", function(e) {
    var t = [].slice.call(document.querySelectorAll(".hr-panel__item"));
    t.forEach(function(e) {
      e.setAttribute("aria-selected", "false");
    }),
      e.target.setAttribute("aria-selected", "true"),
      moveIndicator(e.target, colours[t.indexOf(e.target)]);
  }),
  (function(e, t) {
    "function" == typeof define && define.amd
      ? define(["exports"], t)
      : "undefined" != typeof exports
      ? t(exports)
      : t((e.dragscroll = {}));
  })(this, function(e) {
    var t,
      n,
      l = window,
      a = document,
      r = [],
      o = function(e, o) {
        for (e = 0; e < r.length; )
          (o = (o = r[e++]).container || o).removeEventListener(
            "mousedown",
            o.md,
            0
          ),
            l.removeEventListener("mouseup", o.mu, 0),
            l.removeEventListener("mousemove", o.mm, 0);
        for (
          r = [].slice.call(a.getElementsByClassName("dragscroll")), e = 0;
          e < r.length;

        )
          !(function(e, r, o, i, s, d) {
            (d = e.container || e).addEventListener(
              "mousedown",
              (d.md = function(t) {
                (e.hasAttribute("nochilddrag") &&
                  a.elementFromPoint(t.pageX, t.pageY) != d) ||
                  ((i = 1),
                  (r = t.clientX),
                  (o = t.clientY),
                  t.preventDefault());
              }),
              0
            ),
              l.addEventListener(
                "mouseup",
                (d.mu = function() {
                  i = 0;
                }),
                0
              ),
              l.addEventListener(
                "mousemove",
                (d.mm = function(l) {
                  i &&
                    (((s = e.scroller || e).scrollLeft -= t =
                      -r + (r = l.clientX)),
                    (s.scrollTop -= n = -o + (o = l.clientY)),
                    e == a.body &&
                      (((s = a.documentElement).scrollLeft -= t),
                      (s.scrollTop -= n)));
                }),
                0
              );
          })(r[e++]);
      };
    "complete" == a.readyState ? o() : l.addEventListener("load", o, 0),
      (e.reset = o);
  }),
  (window.onscroll = function() {
    scrollFunction();
  }),
  $("#toggleBtn").click(function() {
    $("#jsNavList").toggleClass("slidedown slideup");
  });
var sections = $("section"),
  nav = $("nav"),
  nav_height = nav.outerHeight();
$(window).on("scroll", function() {
  var e = $(this).scrollTop();
  sections.each(function() {
    var t = $(this).offset().top - nav_height,
      n = t + $(this).outerHeight();
    e >= t &&
      e <= n &&
      (nav.find("a.nav__items--i").removeClass("nav__items--active"),
      sections.removeClass("nav__items--active"),
      nav
        .find('a[href="#' + $(this).attr("id") + '"]')
        .addClass("nav__items--active"));
  });
});
var slides = $(".banner--i"),
  currentIndicatorIndex = 0,
  lastSlideIndex = slides.length - 1,
  currentSlideIndex = 0,
  defaultTiming = 1e3,
  defaultFadeInTime = 1e3,
  defaultFadeOutTime = 1e3;
function showSlide() {
  var e,
    t = slides.eq(currentSlideIndex),
    n = 1e3 * parseFloat(t.attr("data-timing"));
  isNaN(n) && (n = defaultTiming);
  var l = 1e3 * parseFloat(t.attr("data-fadein"));
  isNaN(l) && (l = defaultFadeInTime);
  var a = 1e3 * parseFloat(t.attr("data-fadeout"));
  for (isNaN(a) && (a = defaultFadeOutTime), e = 0; e < slides.length; e++)
    slides[e].style.display = "none";
  if (slides.eq(currentSlideIndex).find("video").length > 0) {
    $("video").each(function() {
      console.log("All video paused."), $(this)[0].pause();
    });
    var r = slides.eq(currentSlideIndex).find("video")[0];
    (r.currentTime = 0), console.log("Video playing."), r.play();
  }
  ++currentSlideIndex > slides.length && (currentSlideIndex = 1),
    (slides[currentSlideIndex - 1].style.display = "block"),
    currentSlideIndex > lastSlideIndex && (currentSlideIndex = 0),
    setTimeout(function() {
      var e = currentSlideIndex - 1;
      -1 == e && (e = lastSlideIndex),
        "true" == slides.eq(e).attr("data-videopause") &&
          (console.log("Video has been paused."),
          slides
            .eq(e)
            .find("video")[0]
            .pause()),
        showSlide();
    }, n);
}
showSlide(),
  $(document).ready(function() {
    $("a").on("click", function(e) {
      if ("" !== this.hash) {
        e.preventDefault();
        var t = this.hash;
        $("html, body").animate(
          { scrollTop: $(t).offset().top },
          800,
          function() {
            window.location.hash = t;
          }
        );
      }
    });
  });
