import type { IconName } from "../components/Icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface Person {
  name: string;
  image: string;
  bio: string;
}

export interface StoryItem {
  title: string;
  date: string;
  image: string;
  text: string;
  icon: IconName;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface WeddingEvent {
  title: string;
  when: [string, string];
  place: string;
  phone: string;
  mapUrl: string;
  image: string;
}

export interface Post {
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
}

export const wedding = {
  bride: "Батгэрэл",
  groom: "Цэнгүн",
  initials: ["Б", "Ц"],
  tagline: "Бид 2026 оны 8-р сарын 26-нд гэрлэнэ",
  countdownTo: "2026-08-26T13:00:00",
} as const;

export const navLinks: NavLink[] = [
  { label: "Нүүр", href: "#home" },
  { label: "Хосууд", href: "#couple" },
  { label: "Түүх", href: "#story" },
  { label: "Цомог", href: "#gallery" },
  { label: "Урилга", href: "#rsvp" },
  { label: "Ерөөл", href: "#greetings" },
  { label: "Хөтөлбөр", href: "#event" },
  { label: "Мэдээ", href: "#blog" },
];

export const sectionTitles = {
  story: "Бидний хайрын түүх",
  gallery: "Дурсамжит агшнууд",
  rsvp: "Та оролцох уу?",
  greetings: "Ерөөлийн үг",
  team: "Хуримын туслахууд",
  events: "Хэзээ, хаана",
  blog: "Хуримын бэлтгэлийн тэмдэглэл",
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
    image: "/images/couple/2.jpg",
    bio: "Инээмсэглэлээрээ эргэн тойрноо гэрэлтүүлдэг, урлаг болон аялалд дурлагч бүсгүй. Улаанбаатарт төрж өссөн бөгөөд өдгөө дизайнераар ажилладаг. Түүний хувьд хамгийн үнэ цэнэтэй зүйл бол дулаахан гэр бүл, чин сэтгэлийн нөхөрлөл юм.",
  },
  {
    name: "Цэнгүн",
    image: "/images/couple/3.jpg",
    bio: "Хөгжим, уулын аялалд дуртай, урам зоригоор дүүрэн залуу. Мэргэжлээрээ инженер бөгөөд шинэ зүйл сурах, бүтээхэд цагаа зориулдаг. Хайртай хүнийхээ хажууд байх нь амьдралын хамгийн том аз жаргал гэж боддог.",
  },
];

export const storyItems: StoryItem[] = [
  {
    title: "Анх уулзсан өдөр",
    date: "2018 оны 1-р сарын 19",
    image: "/images/story/1.jpg",
    text: "Найзынхаа төрсөн өдрийн үдэшлэг дээр бид анх танилцсан юм. Тэр орой ярианы завсар инээлдсээр цаг хугацаа өнгөрснийг ч анзаараагүй бөгөөд салах үедээ дахин уулзахаа амласан билээ.",
    icon: "balloon",
  },
  {
    title: "Анхны болзоо",
    date: "2021 оны 5-р сарын 22",
    image: "/images/story/2.jpg",
    text: "Хаврын нэгэн үдэш бид хотын төвөөр зугаалж, халуун кофе барин ирээдүйнхээ тухай ярилцсан. Тэр өдрөөс хойш бидний зам хэзээ ч салсангүй.",
    icon: "rings",
  },
  {
    title: "Тэр «Тийм» гэж хэлсэн!",
    date: "2022 оны 6-р сарын 15",
    image: "/images/story/3.jpg",
    text: "Тэрэлжийн нарлаг өглөө Цэнгүүн бөгжөө гаргаж ирэхэд Батгэрэл нулимстай инээмсэглэн зөвшөөрсөн. Ингээд бидний хамгийн сайхан аялал эхэлсэн юм.",
    icon: "dove",
  },
];

export const guestOptions = ["1 хүн", "2 хүн", "3 хүн", "4 хүн", "5 хүн"];

export const serviceOptions = [
  "Ёслолын ажиллагаа",
  "Хүлээн авалт",
  "Хуримын үдэшлэг",
  "Бүх хөтөлбөр",
];

export const mealOptions = [
  "Тахианы шөл",
  "Хонины кебаб",
  "Шарсан тахианы мах",
  "Холимог салат",
  "Үхрийн хавирга",
];

export const team: TeamMember[] = [
  {
    name: "Отгонбаяр",
    role: "Сүйт бүсгүйн ах",
    image: "/images/team/img-1.jpg",
  },
  {
    name: "Мөнхзул",
    role: "Сүйт бүсгүйн эгч",
    image: "/images/team/img-2.jpg",
  },
  { name: "Тэмүүлэн", role: "Хүргэний дүү", image: "/images/team/img-3.jpg" },
  { name: "Батмөнх", role: "Хүргэний ах", image: "/images/team/img-4.jpg" },
  { name: "Ануужин", role: "Хүргэний эгч", image: "/images/team/img-5.jpg" },
  {
    name: "Сарангэрэл",
    role: "Сүйт бүсгүйн туслах",
    image: "/images/team/img-6.jpg",
  },
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Ulaanbaatar+Mongolia";

export const events: WeddingEvent[] = [
  {
    title: "Ёслолын ажиллагаа",
    image: "/images/event/1.jpg",
    when: ["2026 оны 8-р сарын 26, Лхагва гараг", "13:00 – 14:30"],
    place: "Гэр бүлийн ордон, Сүхбаатар дүүрэг, Улаанбаатар",
    phone: "+976 9911-2233",
    mapUrl,
  },
  {
    title: "Хүлээн авалт",
    image: "/images/event/2.jpg",
    when: ["2026 оны 8-р сарын 26, Лхагва гараг", "15:00 – 18:00"],
    place: "Шангри-Ла зочид буудал, Их сургуулийн гудамж, Улаанбаатар",
    phone: "+976 9911-2244",
    mapUrl,
  },
  {
    title: "Хуримын үдэшлэг",
    image: "/images/event/3.jpg",
    when: ["2026 оны 8-р сарын 26, Лхагва гараг", "18:30 – 23:00"],
    place: "Шангри-Ла зочид буудлын том танхим, Улаанбаатар",
    phone: "+976 9911-2255",
    mapUrl,
  },
];

export const partners: string[] = [
  "/images/partners/1.png",
  "/images/partners/2.png",
  "/images/partners/3.png",
  "/images/partners/4.png",
  "/images/partners/5.png",
];

export const posts: Post[] = [
  {
    title: "Хуримын ширээний чимэглэл",
    category: "Чимэглэл",
    author: "Э. Номин",
    date: "2026 оны 9-р сарын 25",
    image: "/images/blog/img-1.jpg",
    excerpt:
      "Ширээний чимэглэлээ улирлын цэцэг, зөөлөн өнгөний хослолоор бүтээвэл зочдод тав тухтай, дулаахан мэдрэмж төрүүлнэ.",
  },
  {
    title: "Сүйт бүсгүйн баглаа сонгох нь",
    category: "Хурим",
    author: "Э. Номин",
    date: "2026 оны 9-р сарын 25",
    image: "/images/blog/img-2.jpg",
    excerpt:
      "Баглаагаа даашинзныхаа загвар, өнгөтэй уялдуулан сонгоорой. Хөнгөн, цэвэрхэн баглаа зурган дээр илүү дэгжин харагддаг.",
  },
  {
    title: "Хуримын гэрэл зургийн санаанууд",
    category: "Гэрэл зураг",
    author: "Э. Номин",
    date: "2026 оны 9-р сарын 25",
    image: "/images/blog/img-3.jpg",
    excerpt:
      "Байгалийн гэрэлтэй цагийг сонгож, жинхэнэ сэтгэл хөдлөлөө хуваалцаарай. Тохиолдлын агшнууд хамгийн дурсгалтай зураг болдог.",
  },
];

export const footer = {
  about:
    "Хайр гэдэг бол хоёр зүрхийг нэгтгэдэг хамгийн сайхан аялал. Бидний амьдралын онцгой өдрийг хамтдаа тэмдэглэхийг урьж байна.",
  links: [
    { label: "Бидний тухай", href: "#couple" },
    { label: "Сүүлийн мэдээ", href: "#blog" },
    { label: "Байрлах газар", href: "#event" },
    { label: "Бидний түүх", href: "#story" },
  ] satisfies NavLink[],
  email: "batgerel.tsenguun@gmail.com",
  phone: "+976 9911-2233",
  address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо",
};

export const ui = {
  attend: "Оролцох",
  openMenu: "Цэс нээх",
  closeMenu: "Цэс хаах",
  backToTop: "Дээш буцах",
  playVideo: "Хуримын бичлэг тоглуулах",
  closeVideo: "Бичлэг хаах",
  closeGallery: "Цомог хаах",
  photoAlt: "Дурсамжийн зураг",
  countdown: {
    days: "Хоног",
    hours: "Цаг",
    mins: "Минут",
    secs: "Секунд",
  },
  cta: {
    title: "Хайраа хамтдаа тэмдэглэе",
    button: "Бидэнтэй нэгдээрэй",
  },
  form: {
    name: "Нэр",
    phone: "Утасны дугаар",
    yes: "Тийм, би очно",
    no: "Уучлаарай, би очиж чадахгүй",
    guests: "Зочдын тоо",
    which: "Аль хөтөлбөрт оролцох вэ?",
    meal: "Хоолны сонголт",
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
  readMore: "Дэлгэрэнгүй...",
  by: "Нийтэлсэн",
  footerHeadings: {
    information: "Мэдээлэл",
    contact: "Холбоо барих",
    newsletter: "Мэдээ хүлээн авах",
  },
  subscribe: "Бүртгүүлэх",
  subscribed: "Баярлалаа, бүртгэгдлээ!",
  copyright: "Бүх эрх хуулиар хамгаалагдсан.",
};

/** Place your licensed copy at public/audio/so-easy.mp3 */
export const weddingMusic = {
  src: "/audio/so-easy.mp3",
  startAt: 30,
  title: "Olivia Dean — So Easy",
} as const;

export const videoUrl = "https://www.youtube.com/embed/G-rzE-9zHj8";
