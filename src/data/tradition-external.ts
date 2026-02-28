export interface TraditionExternal {
  supportParagraph: string;
  primaryLink: { label: string; url: string };
  trustedSources: { label: string; url: string; description: string }[];
}

export const traditionExternal: Record<string, TraditionExternal> = {
  judaism: {
    supportParagraph: "Judaism is one of the world's oldest monotheistic religions, with a continuous textual tradition spanning over 3,500 years. From the Torah and Talmud to the mystical Zohar, Jewish literature represents one of the most commented and studied bodies of sacred text in human history — a living dialogue between God, scripture, and generations of scholars.",
    primaryLink: { label: "Explore the full Jewish library at Sefaria", url: "https://www.sefaria.org" },
    trustedSources: [
      { label: "Sefaria", url: "https://www.sefaria.org", description: "Free library of Jewish texts — Torah, Talmud, Midrash, Kabbalah" },
      { label: "My Jewish Learning", url: "https://www.myjewishlearning.com", description: "Comprehensive guide to Jewish holidays, texts, and traditions" },
      { label: "Jewish Virtual Library", url: "https://www.jewishvirtuallibrary.org", description: "Encyclopedia of Jewish history, religion, and culture" },
    ],
  },
  christianity: {
    supportParagraph: "Christianity is the world's largest religion, with over 2 billion adherents across Catholic, Orthodox, and Protestant traditions. Its sacred library — centered on the Bible's 66 books — contains some of the most translated, printed, and studied texts in human history, from the poetry of the Psalms to the visionary letters of Paul.",
    primaryLink: { label: "Read the full Bible at BibleGateway", url: "https://www.biblegateway.com" },
    trustedSources: [
      { label: "BibleGateway", url: "https://www.biblegateway.com", description: "Full Bible in 200+ translations and languages" },
      { label: "Christian Classics Ethereal Library", url: "https://www.ccel.org", description: "Classic Christian theology and early church writings" },
      { label: "Vatican Library", url: "https://www.vatican.va", description: "Official Catholic Church documents, papal writings, and liturgy" },
    ],
  },
  islam: {
    supportParagraph: "Islam is the world's second-largest religion, with 1.8 billion Muslims across every continent. The Quran — believed to be the direct word of God as revealed to the Prophet Muhammad — is among the most memorized and recited texts on earth. Alongside it, the Hadith literature preserves the sayings and actions of the Prophet that guide Islamic law and daily life.",
    primaryLink: { label: "Read the Quran with tafsir at Quran.com", url: "https://quran.com" },
    trustedSources: [
      { label: "Quran.com", url: "https://quran.com", description: "The Quran in Arabic with translations, tafsir, and audio" },
      { label: "IslamicFinder", url: "https://www.islamicfinder.org", description: "Prayer times, Islamic calendar, and religious guidance" },
      { label: "SeekersGuidance", url: "https://seekersguidance.org", description: "Scholarly Islamic learning from qualified scholars worldwide" },
    ],
  },
  buddhism: {
    supportParagraph: "Buddhism, founded by Siddhartha Gautama in the 5th century BCE, encompasses a vast body of sacred literature across Theravada, Mahayana, and Vajrayana traditions. The Pali Canon — the oldest complete Buddhist scripture — preserves the Buddha's teachings on suffering, liberation, and the nature of mind with remarkable depth and precision.",
    primaryLink: { label: "Read the Pali Canon at SuttaCentral", url: "https://suttacentral.net" },
    trustedSources: [
      { label: "SuttaCentral", url: "https://suttacentral.net", description: "Early Buddhist texts in Pali, Sanskrit, and translation" },
      { label: "Access to Insight", url: "https://www.accesstoinsight.org", description: "Theravada Buddhist texts, study guides, and translations" },
      { label: "Dharma Seed", url: "https://dharmaseed.org", description: "Talks from leading Buddhist teachers worldwide" },
    ],
  },
  hinduism: {
    supportParagraph: "Hinduism is the world's oldest living religion and one of its most textually rich — its sacred literature spans over 4,000 years, from the ancient Vedas and Upanishads to the epics of the Mahabharata and Ramayana. The Bhagavad Gita, a 700-verse dialogue between Krishna and Arjuna, remains one of the most widely read philosophical texts in world history.",
    primaryLink: { label: "Read the Gita and Vedas at Vedabase", url: "https://vedabase.io" },
    trustedSources: [
      { label: "Vedabase", url: "https://vedabase.io", description: "Bhagavad Gita, Srimad Bhagavatam, and Vedic literature" },
      { label: "Hinduism Today", url: "https://www.hinduismtoday.com", description: "Award-winning magazine on Hindu dharma and culture" },
      { label: "Sacred Texts — Hinduism", url: "https://www.sacred-texts.com/hin/index.htm", description: "Classical Hindu texts in public domain translation" },
    ],
  },
  sikhism: {
    supportParagraph: "Sikhism was founded in the Punjab region of South Asia in the 15th century by Guru Nanak Dev Ji. The Sri Guru Granth Sahib — the eternal, living Guru of the Sikhs — contains 1,430 pages of sacred hymns composed by the ten human Gurus and saints of other faiths, making it one of the most inclusive and ecumenical scriptures in world religion.",
    primaryLink: { label: "Read the Guru Granth Sahib at SikhNet", url: "https://www.sikhnet.com/gurbani" },
    trustedSources: [
      { label: "SikhNet", url: "https://www.sikhnet.com", description: "Gurbani, Sikh history, and community resources" },
      { label: "SikhiToTheMax", url: "https://www.sikhitothemax.org", description: "Full Sri Guru Granth Sahib with search and audio" },
      { label: "Sikh Research Institute", url: "https://www.sikhri.org", description: "Scholarly Sikh education and research" },
    ],
  },
  taoism: {
    supportParagraph: "Taoism is an ancient Chinese philosophical and religious tradition centered on the Tao — the fundamental, ineffable source and pattern of the universe. The Tao Te Ching, attributed to the sage Laozi in the 6th century BCE, is one of the most translated books in world history. Alongside it, the Zhuangzi offers one of antiquity's most creative explorations of freedom, nature, and the limits of language.",
    primaryLink: { label: "Explore classical Taoist texts at the Chinese Text Project", url: "https://ctext.org/taoism" },
    trustedSources: [
      { label: "Chinese Text Project", url: "https://ctext.org/taoism", description: "Classical Taoist texts in Chinese and English" },
      { label: "Sacred Texts — Taoism", url: "https://www.sacred-texts.com/tao/index.htm", description: "Tao Te Ching, I Ching, and other Taoist classics" },
      { label: "Terebess Asia Online", url: "https://terebess.hu/english/tao.html", description: "Over 100 translations of the Tao Te Ching compiled" },
    ],
  },
  confucianism: {
    supportParagraph: "Confucianism, founded by Kong Qiu (Confucius) in 6th century BCE China, is one of the most influential philosophical traditions in human history — shaping East Asian civilization, governance, education, and family life for over 2,500 years. The Analects preserve his teachings on virtue, ritual propriety, filial piety, and the cultivation of the ideal human being.",
    primaryLink: { label: "Read the Analects and Chinese classics at the Chinese Text Project", url: "https://ctext.org/confucianism" },
    trustedSources: [
      { label: "Chinese Text Project", url: "https://ctext.org/confucianism", description: "Analects, Mencius, and the Four Books in Chinese and English" },
      { label: "Sacred Texts — Confucianism", url: "https://www.sacred-texts.com/cfu/index.htm", description: "Legge translations of the Confucian classics" },
      { label: "Internet Encyclopedia of Philosophy", url: "https://iep.utm.edu/confucian/", description: "Scholarly overview of Confucian philosophy and history" },
    ],
  },
  zoroastrianism: {
    supportParagraph: "Zoroastrianism is one of the world's oldest revealed religions, founded by the Prophet Zarathustra in ancient Iran over 3,500 years ago. The Avesta — particularly the Gathas, Zarathustra's own hymns — represents some of the oldest religious poetry in any Indo-European language. Zoroastrian ideas about cosmic dualism, final judgment, and resurrection profoundly influenced the Abrahamic faiths.",
    primaryLink: { label: "Study the Avesta and Zoroastrian tradition at Avesta.org", url: "http://www.avesta.org" },
    trustedSources: [
      { label: "Avesta.org", url: "http://www.avesta.org", description: "Avestan texts, Pahlavi literature, and Zoroastrian resources" },
      { label: "FEZANA", url: "https://fezana.org", description: "Federation of Zoroastrian Associations of North America" },
      { label: "Sacred Texts — Zoroastrianism", url: "https://www.sacred-texts.com/zor/index.htm", description: "Avestan hymns and Zoroastrian texts in English translation" },
    ],
  },
  sufism: {
    supportParagraph: "Sufism is the mystical dimension of Islam — an inward path seeking direct experience of the Divine through love, devotion, and the dissolution of the ego (fana). Its literature, from Rumi's Masnavi to Ibn Arabi's Fusus al-Hikam, represents some of the most profound mystical writing in any tradition. The Sufi orders have transmitted this wisdom through chains of master-disciple relationships for over a thousand years.",
    primaryLink: { label: "Explore Sufi poetry and philosophy at The Threshold Society", url: "https://sufism.org" },
    trustedSources: [
      { label: "Sufism.org", url: "https://sufism.org", description: "The Threshold Society — Mevlevi and Sufi teachings" },
      { label: "Rumi Network", url: "https://www.rumi.org.uk", description: "Translations and commentary on Rumi's Masnavi and Divan" },
      { label: "Sacred Texts — Islam/Sufism", url: "https://www.sacred-texts.com/isl/index.htm", description: "Classical Sufi texts in English translation" },
    ],
  },
  jainism: {
    supportParagraph: "Jainism is one of the world's oldest living religions, emphasizing absolute non-violence (ahimsa), non-possessiveness, and the liberation of the soul through right faith, right knowledge, and right conduct. The Jain Agamas preserve 2,500 years of philosophical and ethical teaching that profoundly influenced Mahatma Gandhi's philosophy of nonviolent resistance.",
    primaryLink: { label: "Explore Jain philosophy and texts at Jainpedia", url: "https://www.jainpedia.org" },
    trustedSources: [
      { label: "Jainpedia", url: "https://www.jainpedia.org", description: "Encyclopedia of Jain texts, history, and philosophy" },
      { label: "Jainworld", url: "https://www.jainworld.com", description: "Comprehensive Jain religious resources and scripture" },
      { label: "Sacred Texts — Jainism", url: "https://www.sacred-texts.com/jai/index.htm", description: "Jain sutras and texts in English translation" },
    ],
  },
  bahai: {
    supportParagraph: "The Baha'i Faith, founded in 19th-century Persia, teaches the unity of God, the unity of religion, and the unity of humanity. Its sacred literature — written by Baha'u'llah, the Bab, and Abdu'l-Baha — addresses the spiritual and social principles needed for a unified world civilization, representing one of the most comprehensive modern religious revelations.",
    primaryLink: { label: "Read Baha'i writings at the official Baha'i Reference Library", url: "https://www.bahai.org/library" },
    trustedSources: [
      { label: "Baha'i Reference Library", url: "https://www.bahai.org/library", description: "Complete official Baha'i writings online — Baha'u'llah, the Bab, Abdu'l-Baha" },
      { label: "Baha'i Teachings", url: "https://bahaiteachings.org", description: "Articles and commentary on Baha'i scripture and principles" },
      { label: "Baha'i.us", url: "https://www.bahai.us", description: "US Baha'i community resources and study materials" },
    ],
  },
  shinto: {
    supportParagraph: "Shinto is the indigenous spirituality of Japan — a tradition of reverence for the kami (divine spirits) that dwell in natural phenomena, ancestral lineages, and sacred places. Unlike most world religions, Shinto has no single founder and no fixed creed. Its texts — the Kojiki, Nihon Shoki, and the ancient Norito prayers — preserve Japan's oldest cosmology and myths dating to the 8th century CE.",
    primaryLink: { label: "Learn about Shinto at the Kokugakuin Encyclopedia", url: "https://eos.kokugakuin.ac.jp/modules/xwords/" },
    trustedSources: [
      { label: "Kokugakuin Encyclopedia of Shinto", url: "https://eos.kokugakuin.ac.jp/modules/xwords/", description: "The most authoritative English-language Shinto reference" },
      { label: "Association of Shinto Shrines", url: "https://www.jinja.or.jp/english/", description: "Official organization of Shinto shrines in Japan" },
      { label: "Sacred Texts — Shinto", url: "https://www.sacred-texts.com/shi/index.htm", description: "Kojiki, Nihon Shoki, and Norito prayers in translation" },
    ],
  },
  african: {
    supportParagraph: "African spiritual traditions encompass thousands of distinct indigenous religions across the continent — from the Yoruba Ifa oracle system of West Africa and the Ubuntu philosophy of Southern Africa, to the ancestral ceremonies of the Igbo, Akan, and Ga peoples. These traditions represent sophisticated cosmologies, ethical systems, and oral literatures of extraordinary depth, preserved across millennia.",
    primaryLink: { label: "Explore African spiritual traditions at the Smithsonian National Museum of African Art", url: "https://africa.si.edu" },
    trustedSources: [
      { label: "Smithsonian African Art Museum", url: "https://africa.si.edu", description: "Art, culture, and spiritual traditions of Africa" },
      { label: "UNESCO Intangible Heritage", url: "https://ich.unesco.org", description: "African traditions recognized by UNESCO" },
      { label: "Sacred Texts — Africa", url: "https://www.sacred-texts.com/afr/index.htm", description: "African oral traditions and spiritual texts in translation" },
    ],
  },
  indigenous: {
    supportParagraph: "Indigenous spiritual traditions of the Americas, Australia, and the Pacific represent some of the oldest living wisdom systems on earth — oral traditions, ceremony, and relationship with land spanning tens of thousands of years. From the Lakota Sacred Pipe teachings and Navajo Blessingway ceremonies to the Hopi prophecies and Northwest Coast potlatch traditions, indigenous spirituality understands the world as a web of living relationships requiring ongoing reciprocity and respect.",
    primaryLink: { label: "Explore Native culture at the Smithsonian National Museum of the American Indian", url: "https://americanindian.si.edu" },
    trustedSources: [
      { label: "Smithsonian NMAI", url: "https://americanindian.si.edu", description: "Authoritative resource on Native American culture and spirituality" },
      { label: "Native Languages of the Americas", url: "http://www.native-languages.org", description: "Indigenous language preservation and cultural resources" },
      { label: "Sacred Land Film Project", url: "https://sacredland.org", description: "Indigenous sacred sites and spiritual traditions worldwide" },
    ],
  },
  fivepercent: {
    supportParagraph: "The Nation of Gods and Earths (Five Percenters) is a cultural movement founded in Harlem in 1964 by Clarence 13X (Father Allah). Built on the Supreme Mathematics and Supreme Alphabet, the NGE teaches self-knowledge, the divinity of the original Black man, and elevation of community through the power of understanding one's own nature — influencing generations of hip-hop artists and thinkers.",
    primaryLink: { label: "Learn about the Nation of Gods and Earths at AllahsNation.net", url: "https://allahsnation.net" },
    trustedSources: [
      { label: "Allah's Nation", url: "https://allahsnation.net", description: "Official NGE resource on Supreme Mathematics and Alphabet" },
      { label: "Five Percenter Newspaper", url: "https://www.5percentnewspaper.com", description: "The original newspaper of the Nation of Gods and Earths" },
    ],
  },
  ancient: {
    supportParagraph: "The ancient traditions — from the Epic of Gilgamesh (the world's oldest written narrative, c. 2100 BCE) to the Egyptian Book of the Dead and the Norse Havamal — preserve humanity's earliest recorded attempts to make sense of existence, death, and the divine. These texts reveal the universal human preoccupations that transcend time and geography: the quest for immortality, the nature of the gods, and the wisdom needed to live well.",
    primaryLink: { label: "Read ancient sacred texts in translation at Sacred-Texts.com", url: "https://www.sacred-texts.com" },
    trustedSources: [
      { label: "Sacred-Texts.com", url: "https://www.sacred-texts.com", description: "The largest free collection of ancient religious texts online" },
      { label: "World History Encyclopedia", url: "https://www.worldhistory.org", description: "Scholar-reviewed articles on ancient religious traditions" },
      { label: "Project Gutenberg — Religion", url: "https://www.gutenberg.org/browse/categories/7", description: "Public domain religious and philosophical texts" },
    ],
  },
};
