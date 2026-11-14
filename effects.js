// ============================================================
//  PREMIUM EFFECTS
//  Turn an effect off: change true → false below.
// ============================================================
const FX = {
  cursor: false,        // custom circle cursor (computer only, not phones)
  textReveal: true,    // titles slide up word by word
  parallax: true,      // profile + about photos move slower when scrolling
  grain: true,         // light film-grain texture
  darkToggle: true,    // ☾ / ☀ button in the menu
  defaultTheme: "dark" // "light" | "dark" | "auto" (follows the visitor's phone/computer)
};

(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // ---------- DARK MODE ----------
  const sun = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/></svg>';
  function startDark() {
    const saved = store.get("fx-theme");
    if (saved) return saved === "dark";
    if (FX.defaultTheme === "dark") return true;
    if (FX.defaultTheme === "auto") return window.matchMedia("(prefers-color-scheme: dark)").matches;
    return false;
  }
  function setDark(on) {
    document.body.classList.toggle("dark", on);
    document.querySelectorAll(".fx-theme").forEach((b) => {
      b.innerHTML = on ? sun : moon;
      b.setAttribute("aria-label", on ? "Light mode" : "Dark mode");
    });
  }
  if (FX.darkToggle || FX.defaultTheme === "dark") {
    const nav = document.querySelector(".nav");
    if (nav && FX.darkToggle) {
      const btn = document.createElement("button");
      btn.className = "fx-theme";
      btn.onclick = () => { const on = !document.body.classList.contains("dark"); setDark(on); store.set("fx-theme", on ? "dark" : "light"); };
      // keep the button next to the right-side items
      const right = document.createElement("div");
      right.className = "fx-right";
      const tail = [...nav.children].filter((el) => !el.classList.contains("logo"));
      tail.forEach((el) => right.appendChild(el));
      right.appendChild(btn);
      nav.appendChild(right);
    }
    setDark(startDark());
  }

  // ---------- FILM GRAIN ----------
  if (FX.grain) {
    const g = document.createElement("div");
    g.className = "fx-grain";
    document.body.appendChild(g);
  }

  // ---------- TEXT REVEAL ----------
  if (FX.textReveal && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("fx-in"); io.unobserve(e.target); }
    }), { threshold: 0.2 });

    const split = (el) => {
      if (!el || el.dataset.fxDone) return;
      const words = el.textContent.trim().split(/\s+/);
      if (!words[0]) return;
      el.dataset.fxDone = "1";
      el.setAttribute("aria-label", el.textContent.trim());
      el.innerHTML = words.map((w, i) => `<span class="fx-w" aria-hidden="true"><span style="--i:${i}">${w.replace(/</g, "&lt;")}</span></span>`).join(" ");
      el.classList.add("fx-split");
      io.observe(el);
    };
    const fade = (el) => { if (el && !el.dataset.fxDone) { el.dataset.fxDone = "1"; el.classList.add("fx-fade"); io.observe(el); } };

    // wait one frame so script.js / work.js have filled the text in
    requestAnimationFrame(() => {
      document.querySelectorAll(".hero-text h1, .title, .work-head h1").forEach(split);
      document.querySelectorAll(".hero-text .small, .hero-text .role, .work-head p, p.small.center").forEach(fade);
    });
  }

  // ---------- PARALLAX ----------
  if (FX.parallax && !reduce) {
    const els = [...document.querySelectorAll(".hero-pic, .about-pic")];
    els.forEach((el) => el.classList.add("fx-par"));
    let ticking = false;
    const run = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
        el.style.transform = `translateY(${(p * -40).toFixed(1)}px)`;
      });
      ticking = false;
    };
    if (els.length) {
      window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
      run();
    }
  }

  // ---------- CUSTOM CURSOR ----------
  if (FX.cursor && finePointer && !reduce) {
    const ring = document.createElement("div"); ring.className = "fx-ring";
    const dot = document.createElement("div"); dot.className = "fx-dot";
    document.body.append(ring, dot);
    document.body.classList.add("fx-cursor-on");

    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    // dot uses left/top 0 + transform; ring uses left/top
    dot.style.left = "0"; dot.style.top = "0";

    const labelFor = (t) => {
      if (t.closest(".v-thumb, .tile[data-type=video], .tile[data-type=motion]")) return "Play";
      if (t.closest(".tile, .m-item:not(.missing)")) return "View";
      return "";
    };
    document.addEventListener("mouseover", (e) => {
      const lab = labelFor(e.target);
      ring.textContent = lab;
      ring.classList.toggle("label", !!lab);
      dot.classList.toggle("hide", !!lab);
      ring.classList.toggle("hover", !lab && !!e.target.closest("a, button, video, iframe"));
    });
    document.addEventListener("mousedown", () => ring.classList.add("down"));
    document.addEventListener("mouseup", () => ring.classList.remove("down"));
    document.addEventListener("mouseleave", () => { ring.style.opacity = dot.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { ring.style.opacity = dot.style.opacity = ""; });
    // photo viewer open → use the normal cursor
    const lb = document.getElementById("lb");
    const hideOn = () => {
      const open = lb && !lb.hidden;
      ring.style.display = dot.style.display = open ? "none" : "";
      document.body.classList.toggle("fx-cursor-on", !open);
    };
    if (lb) new MutationObserver(hideOn).observe(lb, { attributes: true, attributeFilter: ["hidden"] });
  }
})();
