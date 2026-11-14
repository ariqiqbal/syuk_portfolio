(function () {
  const S = window.SITE;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const LABEL = { photo: "Photography", video: "Videography", design: "Design" };

  // ---------- find the chosen category ----------
  const id = new URLSearchParams(location.search).get("id") || (location.hash || "").slice(1);
  const g = S.gallery.find((x, i) => String(x.id || i) === id) || S.gallery[0];

  $("#logo").textContent = S.name;
  document.title = `${g.title} | ${S.name}`;
  $("#w-tag").textContent = LABEL[g.type] || g.type || "";
  $("#w-tag").hidden = !g.type;
  $("#w-title").textContent = g.title;
  $("#w-caption").textContent = g.caption || "";
  $("#copy").textContent = `Copyright © ${new Date().getFullYear()} ${S.name}. ${S.footer}`;

  // links to the other categories
  $("#w-other").innerHTML = S.gallery
    .map((x, i) => `<a href="work.html?id=${encodeURIComponent(x.id || i)}" class="${x === g ? "active" : ""}">${esc(x.title)}</a>`).join("");

  // ---------- build the item list ----------
  let items = (g.items || []).map((it) => (typeof it === "string" ? { src: it } : it));
  if (g.folder && g.count) {
    const ext = g.ext || "jpg";
    for (let n = 1; n <= g.count; n++) items.push({ src: `${g.folder.replace(/\/$/, "")}/${n}.${ext}` });
  }
  const photos = items.filter((it) => it.src);
  const videos = items.filter((it) => !it.src);

  const total = items.length;
  $("#w-count").textContent = total ? `${total} ${total === 1 ? "item" : "items"}` : "";
  if (!total) { $("#w-empty").hidden = false; return; }

  // ---------- render ----------
  let html = "";
  if (videos.length) html += `<div class="vgrid">${videos.map(videoCard).join("")}</div>`;
  if (videos.length && photos.length) html += `<div style="height:2rem"></div>`;
  if (photos.length) html += `<div class="masonry">${photos.map((p, i) =>
    `<figure class="m-item" data-i="${i}"><img src="${esc(p.src)}" alt="${esc(p.caption || g.title)}" loading="lazy" />` +
    (p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : "") + `</figure>`).join("")}</div>`;
  $("#w-grid").innerHTML = html;

  // missing photo → grey placeholder with the expected file name
  document.querySelectorAll(".m-item img").forEach((img) => {
    img.onerror = () => {
      const f = img.closest(".m-item");
      f.classList.add("missing");
      f.innerHTML = `<div>Add photo<br><small>${esc(img.getAttribute("src"))}</small></div>`;
    };
  });

  function ytId(url) {
    const m = String(url).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function videoCard(v) {
    const cap = v.caption ? `<p>${esc(v.caption)}</p>` : "";
    if (v.youtube) {
      const yid = ytId(v.youtube);
      if (!yid) return `<div class="v-item"><div class="v-frame v-link">Add YouTube link in config.js</div>${cap}</div>`;
      // thumbnail first, real player loads on click (faster page)
      return `<div class="v-item"><div class="v-frame v-thumb" data-yt="${yid}">` +
        `<img src="https://i.ytimg.com/vi/${yid}/hqdefault.jpg" alt="" loading="lazy" /><span class="play">▶</span></div>${cap}</div>`;
    }
    if (v.video) {
      return `<div class="v-item"><div class="v-frame"><video src="${esc(v.video)}" ${v.poster ? `poster="${esc(v.poster)}"` : ""} controls preload="metadata" playsinline></video></div>${cap}</div>`;
    }
    if (v.link) {
      return `<div class="v-item"><a class="v-frame v-link" href="${esc(v.link)}" target="_blank" rel="noopener">` +
        `<span class="play" style="position:static">▶</span><span>Open video ↗</span></a>${cap}</div>`;
    }
    return "";
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".v-thumb");
    if (!t) return;
    t.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${t.dataset.yt}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    t.classList.remove("v-thumb");
  });

  // ---------- lightbox ----------
  const lb = $("#lb"), lbImg = $("#lb-img");
  let cur = 0;
  const visible = () => [...document.querySelectorAll(".m-item:not(.missing)")].map((f) => +f.dataset.i);
  function show(i) {
    const list = visible(); if (!list.length) return;
    cur = (i + list.length) % list.length;
    const p = photos[list[cur]];
    lbImg.src = p.src; lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    $("#lb-cap").textContent = p.caption || "";
    $("#lb-count").textContent = `${cur + 1} / ${list.length}`;
    lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function close() { lb.hidden = true; document.body.style.overflow = ""; }
  document.addEventListener("click", (e) => {
    const f = e.target.closest(".m-item:not(.missing)");
    if (f) show(visible().indexOf(+f.dataset.i));
  });
  $(".lb-close").onclick = close;
  $(".lb-prev").onclick = () => show(cur - 1);
  $(".lb-next").onclick = () => show(cur + 1);
  lb.onclick = (e) => { if (e.target === lb) close(); };
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  // swipe on phones
  let sx = null;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });
})();
