/* =====================================================================
   Facts told by the characters (speech bubbles), in the three site
   languages. A character is linked to a set by `say:'key'` in scenes.js.
   Click a character, or wait: they also speak up now and then.
   Facts about Savely come from this site's own pages; the rest are
   well-established facts. Keep each one short (one or two sentences).
   ===================================================================== */
const FACTS = {

  /* about Savely */
  hare: {
    en: [
      "Savely writes from Belgrade, but his students used to live far north, in Arkhangelsk on the White Sea.",
      "At NArFU he designed five courses from scratch and supervised three student research projects.",
      "His languages: English at C1, Russian as a native, Norwegian at B1. And the collection is still growing.",
      "Master's in pedagogy, bachelor's in linguistics, and a thesis on a thousand-year-old poem in which a tree tells the story."
    ],
    ru: [
      "Савелий пишет из Белграда, а его студенты когда-то жили далеко на севере: в Архангельске, у Белого моря.",
      "В САФУ он с нуля разработал пять учебных курсов и руководил тремя студенческими исследованиями.",
      "Его языки: английский на уровне C1, русский родной, норвежский на B1. И коллекция ещё пополняется.",
      "Магистр педагогики, бакалавр лингвистики и автор работы о тысячелетней поэме, где рассказ ведёт дерево."
    ],
    sr: [
      "Saveliy piše iz Beograda, a njegovi studenti su nekad živeli daleko na severu, u Arhangelsku na Belom moru.",
      "Na SAFU je od nule osmislio pet kurseva i vodio tri studentska istraživanja.",
      "Njegovi jezici: engleski na nivou C1, ruski kao maternji, norveški na B1. Zbirka se još popunjava.",
      "Master pedagogije, osnovne studije lingvistike i rad o hiljadu godina staroj pesmi u kojoj priču priča drvo."
    ]
  },

  /* history of English */
  snail: {
    en: [
      "The word 'English' comes from the Angles, a Germanic people who settled Britain about 1,500 years ago.",
      "After 1066 the Normans brought French: the farmer's 'cow' became the lord's 'beef', and 'pig' became 'pork'.",
      "Ye Olde Shoppe: that 'Y' was really the Old English letter þ ('th'), so 'ye' was just 'the'.",
      "English spelling is odd because the Great Vowel Shift (about 1400–1700) changed the pronunciation, but the spelling stayed put."
    ],
    ru: [
      "Слово «английский» происходит от англов, германского племени, которое поселилось в Британии около 1500 лет назад.",
      "После 1066 года норманны принесли французский: «cow» у крестьянина стала «beef» на столе лорда, а «pig» стал «pork».",
      "«Ye Olde Shoppe»: буква «Y» там на самом деле староанглийская þ («th»), так что «ye» — это просто «the».",
      "Английская орфография странная, потому что Великий сдвиг гласных (примерно 1400–1700) изменил произношение, а написание осталось."
    ],
    sr: [
      "Reč 'English' potiče od Angla, germanskog naroda koji se naselio u Britaniji pre oko 1500 godina.",
      "Posle 1066. Normani su doneli francuski: seljakova 'cow' postala je gospodarevo 'beef', a 'pig' je postao 'pork'.",
      "Ye Olde Shoppe: to 'Y' je zapravo staroengleško slovo þ ('th'), pa je 'ye' bilo prosto 'the'.",
      "Engleski pravopis je čudan jer je Veliko pomeranje samoglasnika (oko 1400–1700) promenilo izgovor, a pisanje je ostalo."
    ]
  },

  owl: {
    en: [
      "Beowulf, the great Old English epic, survives in a single manuscript from around the year 1000.",
      "Old English had grammatical cases and three genders, like Latin or modern German. Most of that melted away.",
      "'They', 'them' and 'their' are not originally English: they were borrowed from Old Norse.",
      "William Caxton opened his printing press in 1476, and spellings began to settle, even though pronunciation kept changing."
    ],
    ru: [
      "«Беовульф», великий староанглийский эпос, сохранился в единственной рукописи около 1000 года.",
      "В древнеанглийском были падежи и три рода, почти как в латыни или современном немецком. Почти всё это растаяло.",
      "«They», «them» и «their» не исконно английские слова: их заимствовали из древнескандинавского.",
      "Уильям Кэкстон открыл типографию в 1476 году, и написание слов стало закрепляться, хотя произношение продолжало меняться."
    ],
    sr: [
      "Beovulf, veliki staroengleski ep, sačuvan je u jednom jedinom rukopisu iz oko 1000. godine.",
      "Staroengleski je imao padeže i tri roda, kao latinski ili današnji nemački. Većina toga je nestala.",
      "'They', 'them' i 'their' nisu izvorno engleski: pozajmljeni su iz staronordijskog.",
      "Vilijam Kakston je 1476. otvorio štampariju i pravopis je počeo da se učvršćuje, iako se izgovor i dalje menjao."
    ]
  },

  /* Britain */
  hedgehogs: {
    en: [
      "The UK has four nations: England, Scotland, Wales and Northern Ireland. 'Britain' and 'the UK' are not quite the same thing.",
      "Big Ben is not the tower, it is the great bell inside the Elizabeth Tower.",
      "The Union Jack stacks the crosses of St George, St Andrew and St Patrick. Wales' red dragon is missing from it.",
      "Scotland's national animal is the unicorn."
    ],
    ru: [
      "В Соединённом Королевстве четыре страны: Англия, Шотландия, Уэльс и Северная Ирландия. «Британия» и «Соединённое Королевство» не совсем одно и то же.",
      "Биг-Бен не башня, а большой колокол внутри башни Елизаветы.",
      "Флаг Соединённого Королевства складывается из крестов святых Георгия, Андрея и Патрика. Красного дракона Уэльса на нём нет.",
      "Национальное животное Шотландии — единорог."
    ],
    sr: [
      "Ujedinjeno Kraljevstvo čine četiri zemlje: Engleska, Škotska, Vels i Severna Irska. 'Britanija' i 'UK' nisu sasvim isto.",
      "Big Ben nije toranj, već veliko zvono u Tornju Elizabete.",
      "Zastava Ujedinjenog Kraljevstva sklopljena je od krstova svetog Đorđa, Andrije i Patrika. Velškog crvenog zmaja na njoj nema.",
      "Nacionalna životinja Škotske je jednorog."
    ]
  },

  /* the Dream of the Rood, manuscripts */
  cat: {
    en: [
      "The Dream of the Rood is told by the cross itself. It survives in the Vercelli Book, copied about a thousand years ago.",
      "Some of its lines are carved in runes on the Ruthwell Cross in Scotland.",
      "Savely read the whole poem, analysed its rhetoric and translated it into Russian.",
      "The Exeter Book, from the 10th century, is full of Old English riddles. One of them is about an onion."
    ],
    ru: [
      "«Видение Креста» рассказывает сам крест. Поэма сохранилась в Верчелльской книге, переписанной около тысячи лет назад.",
      "Часть её строк высечена рунами на кресте Рутвелла в Шотландии.",
      "Савелий прочитал поэму целиком, разобрал её риторику и перевёл на русский.",
      "Эксетерская книга X века полна староанглийских загадок. Одна из них про лук."
    ],
    sr: [
      "The Dream of the Rood pripoveda sam krst. Pesma je sačuvana u Verčelijevoj knjizi, prepisanoj pre oko hiljadu godina.",
      "Deo njenih stihova uklesan je runama na Rutvelovom krstu u Škotskoj.",
      "Saveliy je pročitao celu pesmu, analizirao njenu retoriku i preveo je na ruski.",
      "Eksterska knjiga iz 10. veka puna je staroengleskih zagonetki. Jedna od njih je o luku."
    ]
  },

  /* Vikings and Anglo-Saxon England */
  fox: {
    en: [
      "The Viking Age is said to begin in 793, when raiders hit the monastery on Lindisfarne, a monks' island off England.",
      "Wednesday is Woden's day, Thursday is Thor's day, Friday is Frigg's day. The gods never left the calendar.",
      "In the Danelaw, in northern and eastern England, Norse and English lived side by side and swapped words: 'egg', 'sky', 'knife', 'window'.",
      "No Viking ever wore a horned helmet. That idea comes from 19th-century opera costumes."
    ],
    ru: [
      "Эпоху викингов отсчитывают от 793 года, когда налётчики напали на монастырь на острове Линдисфарн у берегов Англии.",
      "Среда — день Одина (Водена), четверг — день Тора, пятница — день Фригг. Боги так и остались в календаре.",
      "В Денло, на севере и востоке Англии, скандинавы жили рядом с англичанами и обменивались словами: «egg», «sky», «knife», «window».",
      "Рогатых шлемов у викингов не было. Эта идея пришла из оперных костюмов XIX века."
    ],
    sr: [
      "Doba Vikinga se računa od 793, kada su napadači opljačkali manastir na ostrvu Lindisfarn kraj Engleske.",
      "Sreda je Odinov (Vodenov) dan, četvrtak Torov, petak Frigin. Bogovi su ostali u kalendaru.",
      "U Danelagu, na severu i istoku Engleske, Skandinavci i Englezi su živeli zajedno i razmenjivali reči: 'egg', 'sky', 'knife', 'window'.",
      "Nijedan Viking nije nosio šlem s rogovima. Ta ideja potiče iz opernih kostima iz 19. veka."
    ]
  },

  /* the USA and more */
  goose: {
    en: [
      "Washington, D.C. is not in any state. It is a federal district, so it has no senators.",
      "The US flag has 13 stripes for the original colonies and 50 stars for the states.",
      "American and British English: 'sidewalk' and 'pavement', 'elevator' and 'lift', 'fall' and 'autumn'.",
      "Thanksgiving falls on the fourth Thursday of November in the USA. Canada celebrates it in October."
    ],
    ru: [
      "Вашингтон (округ Колумбия) не входит ни в один штат. Это федеральный округ, поэтому у него нет сенаторов.",
      "На флаге США 13 полос по числу первых колоний и 50 звёзд по числу штатов.",
      "Американский и британский английский: «sidewalk» и «pavement» (тротуар), «elevator» и «lift» (лифт), «fall» и «autumn» (осень).",
      "День благодарения в США приходится на четвёртый четверг ноября. В Канаде его отмечают в октябре."
    ],
    sr: [
      "Vašington (Distrikt Kolumbija) nije ni u jednoj saveznoj državi. To je federalni distrikt, pa nema senatore.",
      "Na zastavi SAD ima 13 pruga za prve kolonije i 50 zvezdica za savezne države.",
      "Američki i britanski engleski: 'sidewalk' i 'pavement' (trotoar), 'elevator' i 'lift' (lift), 'fall' i 'autumn' (jesen).",
      "Dan zahvalnosti u SAD je četvrtog četvrtka u novembru. U Kanadi se slavi u oktobru."
    ]
  },

  /* interpreting and translation */
  dragon: {
    en: [
      "Savely has interpreted between English and Russian since 2017: simultaneous, consecutive and accompanying.",
      "He worked in Arkhangelsk at the Arctic Open film festival in 2023 and at an international street theatre festival in 2024.",
      "An interpreter speaks aloud, a translator works with text. Savely does both.",
      "Simultaneous interpreters work in pairs and swap every 20–30 minutes: listening and speaking at once is exhausting."
    ],
    ru: [
      "Савелий переводит с английского на русский и обратно с 2017 года: синхронно, последовательно и сопровождающе.",
      "Он работал в Архангельске на кинофестивале «Arctic Open» в 2023 году и на международном фестивале уличных театров в 2024-м.",
      "Устный переводчик говорит вслух, письменный работает с текстом. Савелий занимается и тем, и другим.",
      "Синхронисты работают парами и меняются каждые 20–30 минут: одновременно слушать и говорить очень тяжело."
    ],
    sr: [
      "Saveliy prevodi između engleskog i ruskog od 2017: simultano, konsekutivno i u pratnji.",
      "Radio je u Arhangelsku na filmskom festivalu Arctic Open 2023. i na međunarodnom festivalu uličnih pozorišta 2024.",
      "Usmeni prevodilac govori naglas, pisani radi s tekstom. Saveliy radi i jedno i drugo.",
      "Simultani prevodioci rade u paru i smenjuju se na svakih 20–30 minuta: istovremeno slušati i govoriti je iscrpljujuće."
    ]
  },

  /* runes, ships, wood */
  beaver: {
    en: [
      "The Elder Futhark runic alphabet has 24 letters. Its name is just its first six letters: f-u-th-a-r-k.",
      "Viking longships sat so shallow in the water that raiders could sail far up the rivers.",
      "Restoring the wooden frame of a lighthouse means hauling timber, rebuilding stairs and mending rafters. Savely did it in the summer of 2025.",
      "Runes were carved, not written: their angular shapes are easy to cut into wood and stone."
    ],
    ru: [
      "Старший футарк, руническая азбука, состоит из 24 знаков. Название — просто первые шесть: f-u-þ-a-r-k.",
      "Драккары викингов сидели в воде так неглубоко, что налётчики могли подниматься далеко вверх по рекам.",
      "Восстановить деревянный каркас маяка значит таскать брёвна, чинить лестницы и стропила. Савелий делал это летом 2025 года.",
      "Руны вырезали, а не писали: их угловатые знаки легко резать по дереву и камню."
    ],
    sr: [
      "Stariji futhark ima 24 runska znaka. Ime mu je samo prvih šest: f-u-þ-a-r-k.",
      "Vikinški dugi brodovi gazili su tako plitko da su napadači mogli daleko uzvodno uz reke.",
      "Obnova drvenog okvira svetionika znači nošenje greda, popravku stepenica i rogova. Saveliy je to radio leta 2025.",
      "Rune su se urezivale, a ne pisale: njihovi oštri oblici lako se urezuju u drvo i kamen."
    ]
  },

  /* Nordic languages */
  badger: {
    en: [
      "Norwegian has two official written standards: Bokmål and Nynorsk. Savely's Norwegian is at B1.",
      "Icelandic has changed so little that Icelanders can read their medieval sagas almost as they are.",
      "Swedes have 'fika': a coffee-and-cake break that is almost a national institution.",
      "Russenorsk was the pidgin of the White Sea Pomors and Norwegian traders: words from both languages and almost no grammar."
    ],
    ru: [
      "В норвежском два официальных письменных стандарта: букмол и нюнорск. Норвежский Савелия на уровне B1.",
      "Исландский изменился так мало, что исландцы читают средневековые саги почти в оригинале.",
      "У шведов есть «фика»: перерыв на кофе с выпечкой, почти национальный институт.",
      "Руссенорск был языком поморов и норвежских торговцев: слова из обоих языков и почти никакой грамматики."
    ],
    sr: [
      "Norveški ima dva zvanična pisana standarda: bokmål i nynorsk. Saveliyev norveški je na nivou B1.",
      "Islandski se toliko malo promenio da Islanđani srednjovekovne sage čitaju skoro u originalu.",
      "Šveđani imaju 'fiku': pauzu za kafu i kolače koja je gotovo nacionalna ustanova.",
      "Rusenorsk je bio jezik Pomora i norveških trgovaca: reči iz oba jezika i skoro nikakve gramatike."
    ]
  },

  /* the lighthouse, the White Sea, Pomors */
  bear: {
    en: [
      "The Zimnegorsky lighthouse on the White Sea has shone since 1878, from 126 metres above the water.",
      "Savely spent two weeks there in the summer of 2025 with a small crew of volunteers.",
      "Arkhangelsk, on the White Sea, was Russia's main seaport until St Petersburg appeared in 1703.",
      "The Pomors, people of the White Sea coast, traded with Norway for centuries. 'Pomor' means 'one who lives by the sea'."
    ],
    ru: [
      "Зимнегорский маяк на Белом море светит с 1878 года, с высоты 126 метров над водой.",
      "Савелий провёл там две недели летом 2025 года с небольшой командой волонтёров.",
      "Архангельск на Белом море был главным морским портом России, пока в 1703 году не появился Санкт-Петербург.",
      "Поморы, жители берегов Белого моря, веками торговали с Норвегией. Слово «помор» значит «живущий по морю»."
    ],
    sr: [
      "Zimnegorski svetionik na Belom moru svetli od 1878, sa visine od 126 metara iznad vode.",
      "Saveliy je tamo proveo dve nedelje leta 2025. sa malom ekipom volontera.",
      "Arhangelsk na Belom moru bio je glavna ruska luka sve dok se 1703. nije pojavio Sankt Peterburg.",
      "Pomori, stanovnici obale Belog mora, vekovima su trgovali s Norveškom. Reč 'pomor' znači 'onaj koji živi uz more'."
    ]
  },

  /* Norse myths and the Viking world */
  goat: {
    en: [
      "Thor's chariot is pulled by two goats, Tanngrisnir and Tanngnjóstr: 'Tooth-barer' and 'Tooth-grinder'.",
      "In the myths Thor can eat his goats for supper and bring them back to life the next morning with his hammer.",
      "Leif Erikson reached North America around the year 1000, about five centuries before Columbus. Viking traces survive at L'Anse aux Meadows in Canada.",
      "Iceland's Althing, founded in 930, is one of the oldest parliaments in the world."
    ],
    ru: [
      "Колесницу Тора тянут два козла, Тангриснир и Тангниостр: «Скалящий зубы» и «Скрежещущий зубами».",
      "В мифах Тор может съесть своих козлов на ужин, а утром оживить их ударом молота.",
      "Лейф Эриксон добрался до Северной Америки около 1000 года, почти на пять веков раньше Колумба. Следы викингов сохранились в Л'Анс-о-Медоу в Канаде.",
      "Альтинг в Исландии, основанный в 930 году, один из старейших парламентов мира."
    ],
    sr: [
      "Torova kola vuku dva jarca, Tanngrisnir i Tanngnjóstr: 'Cerekač zubima' i 'Škrgutač zubima'.",
      "U mitovima Tor može da pojede svoje jarce za večeru, a ujutru ih čekićem vrati u život.",
      "Lejf Erikson stigao je u Severnu Ameriku oko 1000. godine, skoro pet vekova pre Kolumba. Vikinški tragovi sačuvani su u L'Anse aux Meadows u Kanadi.",
      "Alting na Islandu, osnovan 930, jedan je od najstarijih parlamenata na svetu."
    ]
  }
};
