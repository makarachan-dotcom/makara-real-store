/**
 * Khmer language translations for the application
 */
export const km = {
  // Navigation
  home: "ទំព័រដើម",
  products: "ផលិតផល",
  profile: "ប្រូហ្វាល់",
  referrals: "ការបញ្ចូនមិត្ភ",
  support: "ជំនួយបច្ចេកទេស",
  terms: "លក្ខខណ្ឌប្រើប្រាស់",
  admin: "ផ្ទាំងគ្រប់គ្រង",
  wallet: "កាបូប",

  // Buttons
  activateGithub: "បើកដំណើរការ GitHub",
  activateGemini: "បើកដំណើរការ Gemini",
  technicalSupport: "ជំនួយបច្ចេកទេស",
  languageToggle: "ភាសាអង់គ្លេស/អារ៉ាប់",
  termsOfUse: "លក្ខខណ្ឌប្រើប្រាស់",
  buyNow: "ទិញឥឡូវនេះ",
  close: "បិទ",
  submit: "ដាក់ស្នើ",
  save: "រក្សាទុក",
  cancel: "បោះបង់",
  loading: "កំពុងផ្ទុក...",
  error: "កំហុស",
  success: "ជោគជ័យ",

  // Modal titles
  enterGithubAccount: "បញ្ចូលគណនី GitHub",
  enterGeminiAccount: "បញ្ចូលគណនី Gemini",
  topupWithBakong: "បញ្ចូលថវិការតាម Bakong KHQR",
  scanQrCode: "សូមស្កេន QR code ដើម្បីបញ្ចូលថវិការ",

  // Form labels
  email: "អ៊ីមែល",
  password: "លេខសម្ងាត់",
  twoFactorCode: "លេខកូដ 2FA",
  enterConnectionCode: "បញ្ចូលលេខកូដតភ្ជាប់",

  // Warnings
  passwordWarning: "សូមប្តូរលេខសម្ងាត់ និង 2FA ភ្លាមៗបន្ទាប់ពីអ្នកគ្រប់គ្រងបើកដំណើរការ",

  // Placeholders
  connectionCodePlaceholder: "conn_eyJrIjoic2tf...",

  // Product page
  productCatalog: "បញ្ជីផលិតផល",
  noProducts: "គ្មានផលិតផល",
  price: "តម្លៃ",

  // Orders
  orderHistory: "ប្រវត្តិការទិញ",
  status: "ស្ថានភាព",
  date: "កាលបរិច្ឆេទ",

  // Admin
  adminPanel: "ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង",
  totalConnections: "ការតភ្ជាប់សរុប",
  activeConnections: "ការតភ្ជាប់សកម្ម",
  totalOrders: "ការទិញសរុប",
  successfulOrders: "ការទិញជោគជ័យ",
  failedOrders: "ការទិញបរាជ័យ",
  cachedProducts: "ផលិតផលដែលបានរក្សាទុក",
  noConnection: "មិនទាន់មានការតភ្ជាប់",
  connectionSaved: "បានរក្សាទុកការតភ្ជាប់ដោយជោគជ័យ",
  connectionSaveError: "មិនអាចរក្សាទុកការតភ្ជាប់បាន",

  // Auth
  login: "ចូលប្រើប្រាស់",
  logout: "ចាកចេញ",
  welcome: "សូមស្វាគមន៍",
} as const;

export type KhmerTranslations = typeof km;
