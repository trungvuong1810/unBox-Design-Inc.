(function () {
  document.documentElement.classList.remove("no-js");

  // Toronto clock in the header
  var clocks = document.querySelectorAll("[data-clock]");
  if (clocks.length) {
    var fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    var tick = function () {
      var t = fmt.format(new Date());
      clocks.forEach(function (el) { el.textContent = "Toronto " + t; });
    };
    tick();
    setInterval(tick, 15000);
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Cursor-following image preview for the project index
  var preview = document.querySelector(".cursor-preview");
  if (preview && window.matchMedia("(hover: hover)").matches) {
    var img = preview.querySelector("img");
    var x = 0, y = 0, cx = 0, cy = 0, raf = null;
    var loop = function () {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      preview.style.left = cx + "px";
      preview.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    document.querySelectorAll("[data-preview]").forEach(function (row) {
      row.addEventListener("mouseenter", function (ev) {
        img.src = row.getAttribute("data-preview");
        img.alt = "";
        if (!raf) { cx = x = ev.clientX; cy = y = ev.clientY; loop(); }
        preview.classList.add("on");
      });
      row.addEventListener("mouseleave", function () {
        preview.classList.remove("on");
      });
    });
    window.addEventListener("mousemove", function (ev) { x = ev.clientX; y = ev.clientY; });
  }

  // Work filters
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var cards = document.querySelectorAll("[data-cat]");
    filterBar.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (!btn) return;
      var f = btn.getAttribute("data-filter");
      filterBar.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      cards.forEach(function (c) {
        var cats = c.getAttribute("data-cat").split(" ");
        c.classList.toggle("is-hidden", f !== "all" && cats.indexOf(f) === -1);
      });
    });
  }

  // Contact form: compose an email (no backend needed)
  var form = document.querySelector("[data-mailto]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var needs = data.getAll("need").join(", ") || "Not specified";
      var body =
        "Name: " + (data.get("name") || "") + "\n" +
        "Company: " + (data.get("company") || "") + "\n" +
        "Email: " + (data.get("email") || "") + "\n" +
        "Looking for: " + needs + "\n" +
        "Stage: " + (data.get("stage") || "") + "\n\n" +
        (data.get("message") || "");
      var subject = "New project — " + (data.get("name") || "unBox enquiry");
      window.location.href =
        "mailto:" + form.getAttribute("data-mailto") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  // Page transition: a kraft flap closes over the page before navigating
  var fold = document.createElement("div");
  fold.className = "page-fold";
  document.body.appendChild(fold);
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest("a");
    if (!a || reduce) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto|tel):/.test(href)) return;
    if (a.origin !== window.location.origin) return;
    ev.preventDefault();
    fold.classList.add("out");
    setTimeout(function () { window.location.href = a.href; }, 420);
  });
  // Restore state when returning via back/forward cache
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) fold.classList.remove("out");
  });
})();
