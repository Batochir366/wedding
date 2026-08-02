export interface NavLink {
  label: string;
  href: string;
}

export interface Person {
  name: string;
  bio: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
}

export interface WeddingVenue {
  name: string;
  date: string;
  place: string;
  mapUrl: string;
  image: string;
  schedule: ScheduleItem[];
}

export const wedding = {
  bride: "Батгэрэл",
  groom: "Цэнгүн",
  initials: ["Б", "Ц"],
  tagline: "Бид 2026 оны 8-р сарын 26-нд гэрлэнэ",
  countdownTo: "2026-08-26T16:00:00",
} as const;

export const navLinks: NavLink[] = [
  { label: "Нүүр", href: "#home" },
  { label: "Хосууд", href: "#couple" },
  { label: "Цомог", href: "#gallery" },
  { label: "Урилга", href: "#rsvp" },
  { label: "Ерөөл", href: "#greetings" },
  { label: "Хөтөлбөр", href: "#event" },
];

export const sectionTitles = {
  gallery: "Дурсамжит агшнууд",
  rsvp: "Та оролцох уу?",
  greetings: "Ерөөлийн үг",
  events: "Хөтөлбөр",
};

/** Ready-made ерөөлийн үг guests can tap to fill the form. */
export const blessingTemplates: string[] = [
  `Өвгөдийн шийрлэсэн хасагт тулганд
Өөдөө цоролзсон галаа өрдөж
Өрхөн дээр цугласан
Долоон бурханд
Өлгийтэй үрийнхээ дууг сонсгохоор
Өнөр өтгөн сайхан айл болоорой.`,
  `Ургийн холбоо батжих болтугай
Удмын өлзий дэлгэрэх болтугай
Нарт хорвоогийн буяныг эдэлээрэй
Насан туршид хамтран жаргаарай.`,
  `Уйлах инээх хоёрт цугтаа байж
Унах босох хоёрт хамтдаа байж
Үрсийнхээ дуунд хайрын илч нэмэгдээд
Өргөө цагаан гэртээ төвшин жаргаарай.`,
];

export const couple: Person[] = [
  {
    name: "Батгэрэл",
    bio: "Хайр гэдэг бол хоёр зүрхийг нэгтгэдэг хамгийн сайхан аялал. Бидний амьдралын онцгой өдрийг хамтдаа тэмдэглэхийг урьж байна.",
  },
  {
    name: "Цэнгүн",
    bio: "Ингээд бид амьдралынхаа шинэ бүлгийг хамтдаа эхлүүлэхээр шийдлээ. Энэхүү аз жаргалтай мөчийн гэрч болж, баярыг минь хуваалцахаар хүрэлцэн ирэхийг хүндэтгэлтэйгээр урьж байна.",
  },
];

export const guestOptions = ["1 хүн", "2 хүн", "3 хүн", "4 хүн", "5 хүн"];

export const venue: WeddingVenue = {
  name: "Evento Ballroom",
  date: "2026 оны 8-р сарын 26, Лхагва гараг",
  place: "Evento Ballroom танхим, Баянгол дүүрэг, 18-р хороо",

  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Evento+Ballroom+Bayangol+Ulaanbaatar",
  image: "/images/event/1.jpg",
  schedule: [
    { time: "16:00", title: "Зочид угтаж авах" },
    { time: "16:30", title: "Дурсгалын зураг авхуулах" },
    { time: "17:00", title: "Нээлтийн үйл ажиллагаа" },
    { time: "19:00", title: "Хуримын 2-р хэсэг" },
    { time: "20:00", title: "Бэлэг гардуулах ёслол" },
    { time: "21:00", title: "Хуримын бялуу хүндэх" },
    { time: "22:00", title: "Үдэшлэг" },
  ],
};

export const footer = {
  about:
    "Хайр гэдэг бол хоёр зүрхийг нэгтгэдэг хамгийн сайхан аялал. Бидний амьдралын онцгой өдрийг хамтдаа тэмдэглэхийг урьж байна.",
  phone: "Батгэрэл +976 8807-7557, Цэнгүн +976 8907-6557",
  address: "Evento Ballroom танхим, Баянгол дүүрэг, 18-р хороо",
};

export const ui = {
  attend: "Оролцох",
  openMenu: "Цэс нээх",
  closeMenu: "Цэс хаах",
  backToTop: "Дээш буцах",
  intro: {
    tap: "Нээхийн тулд дарна уу",
    open: "Урилгыг нээх",
    skip: "Алгасах",
  },
  closeGallery: "Цомог хаах",
  playGallery: "Цомог тоглуулах",
  pauseGallery: "Цомог түр зогсоох",
  prevPhoto: "Өмнөх зураг",
  nextPhoto: "Дараагийн зураг",
  photoAlt: "Дурсамжийн зураг",
  countdown: {
    days: "Хоног",
    hours: "Цаг",
    mins: "Минут",
    secs: "Секунд",
  },
  form: {
    name: "Нэр",
    phone: "Утасны дугаар",
    guests: "Зочдын тоо",
    submit: "Илгээх",
    success: "Баярлалаа! Таны хариуг хүлээн авлаа.",
    error: "Алдаа гарлаа. Дахин оролдоно уу.",
    sending: "Илгээж байна...",
    photo: "Та зургаа үлдээнэ үү",
    greeting: "Ерөөлийн үгээ бичнэ үү",
    greetingTemplates: "Бэлэн ерөөл сонгох",
    greetingCustom: "Өөрөө бичих",
    greetingSuccess: "Баярлалаа! Таны ерөөлийг хүлээн авлаа.",
  },
  seeLocation: "Байршил харах",
  footerHeadings: {
    contact: "Холбоо барих",
  },
};

/** Place your licensed copy at public/audio/song.mp3 */
export const weddingMusic = {
  src: "/audio/song.mp3",
  startAt: 1,
  title: "So Easy",
} as const;

/** Full-screen invitation intro shown on first visit in a session. */
export const introVideo = {
  src: "/videos/intro.mp4",
  poster: "/videos/intro-poster.jpg",
} as const;
