// ============================================================
//  EDIT THIS FILE TO CUSTOMIZE THE PORTFOLIO
//  1. Put photos in the /images folder.
//  2. Change the file names below to match the photos.
//  3. Change the text. Save. Push to GitHub → Vercel updates.
// ============================================================

window.SITE = {
  name: "Syukran Shalihin",
  greeting: "Salam Anyeong Sawadikap",
  role: "Photographer, Videographer & Media Designer",
  cvFile: "cv.pdf",                       // put cv.pdf in the root folder
  email: "syukran4110@gmail.com",
  instagram: "https://instagram.com/syukranshalihin_",
  tiktok: "https://www.tiktok.com/@tiamo1104",
  youtube: "https://youtube.com/@syukran1096",   // leave "" to hide
  behance: "",                                     // leave "" to hide
  linkedin: "",                                    // leave "" to hide

  // ---------- PHOTOS ----------
  photos: {
    profile: "images/profile.jpg",        // round photo at the top
    about: "images/about.jpg",            // photo in "About Me"
  },

  // ---------- ABOUT ----------
  about: {
    cards: [
      { title: "Experience", lines: ["X+ years Photography", "X+ years Videography"] },
      { title: "Education", lines: ["Bachelor in Video Design", "Hanyang University Erica Campus"] },
    ],
    text:
      "I'm a visual storyteller who works with photos, video and design. I shoot events, " +
      "products and everyday street moments, edit short films and vlogs, and design posters " +
      "and social media content. I love turning simple moments into images that people remember.",
  },

  // ---------- SKILLS ----------
  // level: "Basic" | "Intermediate" | "Experienced" | "Advanced"
  skills: [
    {
      title: "Photo & Video",
      items: [
        { name: "Photography", level: "Advanced" },
        { name: "Videography", level: "Experienced" },
        { name: "Lightroom", level: "Advanced" },
        { name: "Premiere Pro", level: "Experienced" },
        { name: "DaVinci Resolve", level: "Intermediate" },
        { name: "Color Grading", level: "Intermediate" },
      ],
    },
    {
      title: "Media Design",
      items: [
        { name: "Photoshop", level: "Experienced" },
        { name: "Illustrator", level: "Intermediate" },
        { name: "After Effects", level: "Basic" },
        { name: "Canva", level: "Advanced" },
        { name: "Poster Design", level: "Experienced" },
        { name: "Social Media Content", level: "Experienced" },
      ],
    },
  ],

  // ---------- GALLERY ----------
  // Each card opens its own page in a new tab with ALL its photos / videos.
  //
  //   id     : short name, used in the link (no spaces)
  //   type   : "photo" | "video" | "design"   (for the filter buttons)
  //   image  : cover photo on the card
  //
  // PHOTOS — easiest way: put numbered files in a folder
  //   folder: "images/street", count: 12   →  loads 1.jpg, 2.jpg … 12.jpg
  //   (all must be .jpg; or set ext: "png")
  //
  // OR list files one by one (any names, can add a caption):
  //   items: [ "images/street/tokyo.jpg", { src: "images/street/seoul.jpg", caption: "Seoul, 2025" } ]
  //
  // VIDEOS — list them in items:
  //   { youtube: "https://youtu.be/XXXXXXXXXXX", caption: "My vlog" }
  //   { video: "videos/film.mp4", poster: "images/film-cover.jpg", caption: "Short film" }
  //   { link: "https://instagram.com/reel/...", caption: "Reel" }   ← opens in a new tab
  gallery: [
    {
      id: "street", type: "photo",
      title: "Street Photography", caption: "Everyday moments",
      image: "images/work1.jpg",
      folder: "images/street", count: 9,
    },
    {
      id: "event", type: "photo",
      title: "Event Photography", caption: "Weddings & events",
      image: "images/work2.jpg",
      subs: [
        { id: "wedding",   name: "Wedding",   folder: "images/event/wedding",   count: 6 },
        { id: "concert",   name: "Concert",   folder: "images/event/concert",   count: 6, ext: "jpeg" },
        { id: "corporate", name: "Corporate", folder: "images/event/corporate", count: 6 },
        { id: "other",     name: "Other",     folder: "images/event/other",     count: 6 },
      ],
    },
    {
      id: "product", type: "photo",
      title: "Product Photography", caption: "Clean product shots",
      image: "images/work3.jpg",
      folder: "images/product", count: 6,
    },
    {
      id: "portrait", type: "photo",
      title: "Portrait Photography", caption: "People & personality",
      image: "images/portrait/1.jpeg",
      folder: "images/portrait", count: 57, ext: "jpeg",
    },
    {
      id: "vlog", type: "video",
      title: "Cinematic Vlog", caption: "Travel & daily life",
      image: "images/work4.jpg",
      items: [
        { youtube: "https://youtu.be/VIDEO_ID_1", caption: "Vlog 1" },
        { youtube: "https://youtu.be/VIDEO_ID_2", caption: "Vlog 2" },
      ],
    },
    {
      id: "film", type: "video",
      title: "Short Film", caption: "Story & editing",
      image: "images/work5.jpeg",
      items: [
        { youtube: "https://youtu.be/l15DBSmJp7k", caption: "Short film 1" },
      ],
    },
    {
      id: "poster", type: "design",
      title: "Poster Design", caption: "Events & social media",
      image: "images/work6.jpg",
      folder: "images/poster", count: 6,
    },
  ],

  footer: "All Rights Reserved.",
};