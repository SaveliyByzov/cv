/* =====================================================================
   Facts told by the characters (speech bubbles), in the three site
   languages. A character is linked to a set by `say:'key'` in scenes.js.
   Click a character, or wait: they also speak up now and then. Every fact
   you hear is written into the Bestiary page.

   Keep each fact short (one or two sentences) and keep the lists in the
   three languages the same length and in the same order: the Bestiary
   remembers facts by their number. Facts about Savely come from this
   site's own pages; the rest are well-established facts.
   ===================================================================== */
const FACTS = {

  /* about Savely */
  hare: {
    name: { en: "Hare the Scribe", ru: "Заяц-писарь", sr: "Zec pisar" },
    en: [
      "Savely writes from Belgrade, but his students used to live far north, in Arkhangelsk on the White Sea.",
      "At NArFU he designed five courses from scratch and supervised three student research projects.",
      "His languages: English at C1, Russian as a native, Norwegian at B1. And the collection is still growing.",
      "Master's in pedagogy, bachelor's in linguistics, and a thesis on a thousand-year-old poem in which a tree tells the story.",
      "In his free time Savely carves wood: he has made shields and built greenhouses with his own hands.",
      "Four papers and five conference talks so far, about teaching people to write together, and about a very old poem."
    ],
    ru: [
      "Савелий пишет из Белграда, а его студенты когда-то жили далеко на севере: в Архангельске, у Белого моря.",
      "В САФУ он с нуля разработал пять учебных курсов и руководил тремя студенческими исследованиями.",
      "Его языки: английский на уровне C1, русский родной, норвежский на B1. И коллекция ещё пополняется.",
      "Магистр педагогики, бакалавр лингвистики и автор работы о тысячелетней поэме, где рассказ ведёт дерево.",
      "В свободное время Савелий работает по дереву: своими руками делает щиты и строит теплицы.",
      "Пока четыре статьи и пять докладов: о том, как учить писать вместе, и об одной очень старой поэме."
    ],
    sr: [
      "Saveliy piše iz Beograda, a njegovi studenti su nekad živeli daleko na severu, u Arhangelsku na Belom moru.",
      "Na SAFU je od nule osmislio pet kurseva i vodio tri studentska istraživanja.",
      "Njegovi jezici: engleski na nivou C1, ruski kao maternji, norveški na B1. Zbirka se još popunjava.",
      "Master pedagogije, osnovne studije lingvistike i rad o hiljadu godina staroj pesmi u kojoj priču priča drvo.",
      "U slobodno vreme Saveliy radi sa drvetom: sopstvenim rukama pravi štitove i gradi staklenike.",
      "Za sada četiri rada i pet izlaganja: o tome kako učiti zajedničko pisanje i o jednoj veoma staroj pesmi."
    ]
  },

  /* history of English */
  snail: {
    name: { en: "Castle Snail", ru: "Улитка-замок", sr: "Puž s kulom" },
    en: [
      "The word 'English' comes from the Angles, a Germanic people who settled Britain about 1,500 years ago.",
      "After 1066 the Normans brought French: the farmer's 'cow' became the lord's 'beef', and 'pig' became 'pork'.",
      "Ye Olde Shoppe: that 'Y' was really the Old English letter þ ('th'), so 'ye' was just 'the'.",
      "English spelling is odd because the Great Vowel Shift (about 1400–1700) changed the pronunciation, but the spelling stayed put.",
      "Old English had a letter for 'w' called wynn, ƿ. Modern editors swap it for 'w', so you rarely see it.",
      "'Algebra', 'coffee' and 'sugar' all came into English through Arabic."
    ],
    ru: [
      "Слово «английский» происходит от англов, германского племени, которое поселилось в Британии около 1500 лет назад.",
      "После 1066 года норманны принесли французский: «cow» у крестьянина стала «beef» на столе лорда, а «pig» стал «pork».",
      "«Ye Olde Shoppe»: буква «Y» там на самом деле староанглийская þ («th»), так что «ye» — это просто «the».",
      "Английская орфография странная, потому что Великий сдвиг гласных (примерно 1400–1700) изменил произношение, а написание осталось.",
      "В древнеанглийском для «w» была отдельная буква ƿ (wynn). Современные издатели заменяют её на «w», поэтому её редко видно.",
      "«Algebra», «coffee» и «sugar» пришли в английский через арабский."
    ],
    sr: [
      "Reč 'English' potiče od Angla, germanskog naroda koji se naselio u Britaniji pre oko 1500 godina.",
      "Posle 1066. Normani su doneli francuski: seljakova 'cow' postala je gospodarevo 'beef', a 'pig' je postao 'pork'.",
      "Ye Olde Shoppe: to 'Y' je zapravo staroengleško slovo þ ('th'), pa je 'ye' bilo prosto 'the'.",
      "Engleski pravopis je čudan jer je Veliko pomeranje samoglasnika (oko 1400–1700) promenilo izgovor, a pisanje je ostalo.",
      "Staroengleski je imao posebno slovo za 'w', ƿ (wynn). Današnji urednici ga menjaju običnim 'w', pa se retko vidi.",
      "'Algebra', 'coffee' i 'sugar' ušli su u engleski preko arapskog."
    ]
  },

  owl: {
    name: { en: "Master Owl", ru: "Сова-магистр", sr: "Sova magistar" },
    en: [
      "Beowulf, the great Old English epic, survives in a single manuscript from around the year 1000.",
      "Old English had grammatical cases and three genders, like Latin or modern German. Most of that melted away.",
      "'They', 'them' and 'their' are not originally English: they were borrowed from Old Norse.",
      "William Caxton opened his printing press in 1476, and spellings began to settle, even though pronunciation kept changing.",
      "'Silly' once meant 'blessed' or 'happy': the Old English word was sælig.",
      "Chaucer's Canterbury Tales, from the late 14th century, is in Middle English, and a modern reader can still follow much of it."
    ],
    ru: [
      "«Беовульф», великий староанглийский эпос, сохранился в единственной рукописи около 1000 года.",
      "В древнеанглийском были падежи и три рода, почти как в латыни или современном немецком. Почти всё это растаяло.",
      "«They», «them» и «their» не исконно английские слова: их заимствовали из древнескандинавского.",
      "Уильям Кэкстон открыл типографию в 1476 году, и написание слов стало закрепляться, хотя произношение продолжало меняться.",
      "«Silly» когда-то значило «благословенный» или «счастливый»: староанглийское слово — sælig.",
      "«Кентерберийские рассказы» Чосера конца XIV века написаны на среднеанглийском, и современный читатель всё ещё многое в них понимает."
    ],
    sr: [
      "Beovulf, veliki staroengleski ep, sačuvan je u jednom jedinom rukopisu iz oko 1000. godine.",
      "Staroengleski je imao padeže i tri roda, kao latinski ili današnji nemački. Većina toga je nestala.",
      "'They', 'them' i 'their' nisu izvorno engleski: pozajmljeni su iz staronordijskog.",
      "Vilijam Kakston je 1476. otvorio štampariju i pravopis je počeo da se učvršćuje, iako se izgovor i dalje menjao.",
      "'Silly' je nekad značilo 'blagosloven' ili 'srećan': staroengleška reč bila je sælig.",
      "Čoserove 'Kenterberijske priče' s kraja 14. veka napisane su na srednjeengleskom, a savremeni čitalac i dalje razume veliki deo."
    ]
  },

  /* Britain */
  hedgehogs: {
    name: { en: "The Hedgehog Pupils", ru: "Ежи-школяры", sr: "Ježevi đaci" },
    en: [
      "The UK has four nations: England, Scotland, Wales and Northern Ireland. 'Britain' and 'the UK' are not quite the same thing.",
      "Big Ben is not the tower, it is the great bell inside the Elizabeth Tower.",
      "The Union Jack stacks the crosses of St George, St Andrew and St Patrick. Wales' red dragon is missing from it.",
      "Scotland's national animal is the unicorn.",
      "Britain has no single written constitution: it is made of laws, traditions and court decisions.",
      "A village in Wales has a name of 58 letters, usually shortened to Llanfair PG."
    ],
    ru: [
      "В Соединённом Королевстве четыре страны: Англия, Шотландия, Уэльс и Северная Ирландия. «Британия» и «Соединённое Королевство» не совсем одно и то же.",
      "Биг-Бен не башня, а большой колокол внутри башни Елизаветы.",
      "Флаг Соединённого Королевства складывается из крестов святых Георгия, Андрея и Патрика. Красного дракона Уэльса на нём нет.",
      "Национальное животное Шотландии — единорог.",
      "В Британии нет единого письменного текста конституции: она складывается из законов, традиций и судебных решений.",
      "У одной деревни в Уэльсе название из 58 букв, обычно его сокращают до Llanfair PG."
    ],
    sr: [
      "Ujedinjeno Kraljevstvo čine četiri zemlje: Engleska, Škotska, Vels i Severna Irska. 'Britanija' i 'UK' nisu sasvim isto.",
      "Big Ben nije toranj, već veliko zvono u Tornju Elizabete.",
      "Zastava Ujedinjenog Kraljevstva sklopljena je od krstova svetog Đorđa, Andrije i Patrika. Velškog crvenog zmaja na njoj nema.",
      "Nacionalna životinja Škotske je jednorog.",
      "Britanija nema jedan pisani ustav: čine ga zakoni, tradicije i sudske odluke.",
      "Jedno selo u Velsu ima ime od 58 slova, koje se obično skraćuje na Llanfair PG."
    ]
  },

  /* the Dream of the Rood, manuscripts */
  cat: {
    name: { en: "Astronomer Cat", ru: "Кот-звездочёт", sr: "Mačak zvezdoznanac" },
    en: [
      "The Dream of the Rood is told by the cross itself. It survives in the Vercelli Book, copied about a thousand years ago.",
      "Some of its lines are carved in runes on the Ruthwell Cross in Scotland.",
      "Savely read the whole poem, analysed its rhetoric and translated it into Russian.",
      "The Exeter Book, from the 10th century, is full of Old English riddles. One of them is about an onion.",
      "Old English verse does not rhyme at the end of lines; it holds together with alliteration, a repeated starting sound.",
      "The Vercelli Book is kept not in England but in Italy, in the city of Vercelli."
    ],
    ru: [
      "«Видение Креста» рассказывает сам крест. Поэма сохранилась в Верчелльской книге, переписанной около тысячи лет назад.",
      "Часть её строк высечена рунами на кресте Рутвелла в Шотландии.",
      "Савелий прочитал поэму целиком, разобрал её риторику и перевёл на русский.",
      "Эксетерская книга X века полна староанглийских загадок. Одна из них про лук.",
      "Староанглийский стих не рифмуется на концах строк: его держит аллитерация, повтор начального звука.",
      "Верчелльская книга хранится не в Англии, а в Италии, в городе Верчелли."
    ],
    sr: [
      "The Dream of the Rood pripoveda sam krst. Pesma je sačuvana u Verčelijevoj knjizi, prepisanoj pre oko hiljadu godina.",
      "Deo njenih stihova uklesan je runama na Rutvelovom krstu u Škotskoj.",
      "Saveliy je pročitao celu pesmu, analizirao njenu retoriku i preveo je na ruski.",
      "Eksterska knjiga iz 10. veka puna je staroengleskih zagonetki. Jedna od njih je o luku.",
      "Staroengleski stih se ne rimuje na kraju reda: drži ga aliteracija, ponavljanje početnog glasa.",
      "Verčelijeva knjiga se ne čuva u Engleskoj, već u Italiji, u gradu Verčeli."
    ]
  },

  /* Vikings and Anglo-Saxon England */
  fox: {
    name: { en: "Fox the Monk", ru: "Лис-монах", sr: "Lisac monah" },
    en: [
      "The Viking Age is said to begin in 793, when raiders hit the monastery on Lindisfarne, a monks' island off England.",
      "Wednesday is Woden's day, Thursday is Thor's day, Friday is Frigg's day. The gods never left the calendar.",
      "In the Danelaw, in northern and eastern England, Norse and English lived side by side and swapped words: 'egg', 'sky', 'knife', 'window'.",
      "No Viking ever wore a horned helmet. That idea comes from 19th-century opera costumes.",
      "Alfred the Great of Wessex stopped the Danes in the 9th century and pushed for important books to be put into English.",
      "Old Norse also gave English 'ransack', 'berserk' and 'saga'."
    ],
    ru: [
      "Эпоху викингов отсчитывают от 793 года, когда налётчики напали на монастырь на острове Линдисфарн у берегов Англии.",
      "Среда — день Одина (Водена), четверг — день Тора, пятница — день Фригг. Боги так и остались в календаре.",
      "В Денло, на севере и востоке Англии, скандинавы жили рядом с англичанами и обменивались словами: «egg», «sky», «knife», «window».",
      "Рогатых шлемов у викингов не было. Эта идея пришла из оперных костюмов XIX века.",
      "Альфред Великий, король Уэссекса, остановил датчан в IX веке и добивался, чтобы важные книги переводили на английский.",
      "Древнескандинавский подарил английскому ещё и «ransack», «berserk» и «saga»."
    ],
    sr: [
      "Doba Vikinga se računa od 793, kada su napadači opljačkali manastir na ostrvu Lindisfarn kraj Engleske.",
      "Sreda je Odinov (Vodenov) dan, četvrtak Torov, petak Frigin. Bogovi su ostali u kalendaru.",
      "U Danelagu, na severu i istoku Engleske, Skandinavci i Englezi su živeli zajedno i razmenjivali reči: 'egg', 'sky', 'knife', 'window'.",
      "Nijedan Viking nije nosio šlem s rogovima. Ta ideja potiče iz opernih kostima iz 19. veka.",
      "Alfred Veliki, kralj Vesksa, zaustavio je Dance u 9. veku i zalagao se da se važne knjige prevedu na engleski.",
      "Staronordijski je engleskom dao i 'ransack', 'berserk' i 'saga'."
    ]
  },

  /* the USA and more */
  goose: {
    name: { en: "Scholar Goose", ru: "Гусь-учёный", sr: "Guska učenjak" },
    en: [
      "Washington, D.C. is not in any state. It is a federal district, so it has no senators.",
      "The US flag has 13 stripes for the original colonies and 50 stars for the states.",
      "American and British English: 'sidewalk' and 'pavement', 'elevator' and 'lift', 'fall' and 'autumn'.",
      "Thanksgiving falls on the fourth Thursday of November in the USA. Canada celebrates it in October.",
      "Canada has two official languages, English and French.",
      "In Australian English 'arvo' means afternoon and 'brekkie' means breakfast."
    ],
    ru: [
      "Вашингтон (округ Колумбия) не входит ни в один штат. Это федеральный округ, поэтому у него нет сенаторов.",
      "На флаге США 13 полос по числу первых колоний и 50 звёзд по числу штатов.",
      "Американский и британский английский: «sidewalk» и «pavement» (тротуар), «elevator» и «lift» (лифт), «fall» и «autumn» (осень).",
      "День благодарения в США приходится на четвёртый четверг ноября. В Канаде его отмечают в октябре.",
      "В Канаде два официальных языка: английский и французский.",
      "В австралийском английском «arvo» значит «днём», а «brekkie» значит «завтрак»."
    ],
    sr: [
      "Vašington (Distrikt Kolumbija) nije ni u jednoj saveznoj državi. To je federalni distrikt, pa nema senatore.",
      "Na zastavi SAD ima 13 pruga za prve kolonije i 50 zvezdica za savezne države.",
      "Američki i britanski engleski: 'sidewalk' i 'pavement' (trotoar), 'elevator' i 'lift' (lift), 'fall' i 'autumn' (jesen).",
      "Dan zahvalnosti u SAD je četvrtog četvrtka u novembru. U Kanadi se slavi u oktobru.",
      "Kanada ima dva zvanična jezika, engleski i francuski.",
      "U australijskom engleskom 'arvo' znači popodne, a 'brekkie' doručak."
    ]
  },

  /* interpreting and translation */
  dragon: {
    name: { en: "Dragon Interpreter", ru: "Дракон-толмач", sr: "Zmaj tumač" },
    en: [
      "Savely has interpreted between English and Russian since 2017: simultaneous, consecutive and accompanying.",
      "He worked in Arkhangelsk at the Arctic Open film festival in 2023 and at an international street theatre festival in 2024.",
      "An interpreter speaks aloud, a translator works with text. Savely does both.",
      "Simultaneous interpreters work in pairs and swap every 20–30 minutes: listening and speaking at once is exhausting.",
      "The Rosetta Stone, found in 1799, had one text in three scripts. That is how Egyptian hieroglyphs were finally read.",
      "The English word 'translate' comes from Latin and means 'carry across'."
    ],
    ru: [
      "Савелий переводит с английского на русский и обратно с 2017 года: синхронно, последовательно и сопровождающе.",
      "Он работал в Архангельске на кинофестивале «Arctic Open» в 2023 году и на международном фестивале уличных театров в 2024-м.",
      "Устный переводчик говорит вслух, письменный работает с текстом. Савелий занимается и тем, и другим.",
      "Синхронисты работают парами и меняются каждые 20–30 минут: одновременно слушать и говорить очень тяжело.",
      "Розеттский камень, найденный в 1799 году, содержал один текст в трёх письменностях. Так наконец прочли египетские иероглифы.",
      "Английское слово «translate» происходит из латыни и значит «переносить через»."
    ],
    sr: [
      "Saveliy prevodi između engleskog i ruskog od 2017: simultano, konsekutivno i u pratnji.",
      "Radio je u Arhangelsku na filmskom festivalu Arctic Open 2023. i na međunarodnom festivalu uličnih pozorišta 2024.",
      "Usmeni prevodilac govori naglas, pisani radi s tekstom. Saveliy radi i jedno i drugo.",
      "Simultani prevodioci rade u paru i smenjuju se na svakih 20–30 minuta: istovremeno slušati i govoriti je iscrpljujuće.",
      "Rozetin kamen, pronađen 1799, nosi isti tekst u tri pisma. Tako su napokon pročitani egipatski hijeroglifi.",
      "Engleska reč 'translate' potiče iz latinskog i znači 'preneti preko'."
    ]
  },

  /* runes, ships, wood */
  beaver: {
    name: { en: "Beaver the Carver", ru: "Бобр-резчик", sr: "Dabar rezbar" },
    en: [
      "The Elder Futhark runic alphabet has 24 letters. Its name is just its first six letters: f-u-th-a-r-k.",
      "Viking longships sat so shallow in the water that raiders could sail far up the rivers.",
      "Restoring the wooden frame of a lighthouse means hauling timber, rebuilding stairs and mending rafters. Savely did it in the summer of 2025.",
      "Runes were carved, not written: their angular shapes are easy to cut into wood and stone.",
      "Viking ships were built clinker-style: overlapping planks held together with iron rivets.",
      "The Oseberg ship, found in a Norwegian burial mound, is about 1,200 years old and remarkably well preserved."
    ],
    ru: [
      "Старший футарк, руническая азбука, состоит из 24 знаков. Название — просто первые шесть: f-u-þ-a-r-k.",
      "Драккары викингов сидели в воде так неглубоко, что налётчики могли подниматься далеко вверх по рекам.",
      "Восстановить деревянный каркас маяка значит таскать брёвна, чинить лестницы и стропила. Савелий делал это летом 2025 года.",
      "Руны вырезали, а не писали: их угловатые знаки легко резать по дереву и камню.",
      "Корабли викингов строили внакрой: доски накладывали друг на друга и скрепляли железными заклёпками.",
      "Корабль из Осеберга, найденный в погребальном кургане в Норвегии, имеет около 1200 лет и удивительно хорошо сохранился."
    ],
    sr: [
      "Stariji futhark ima 24 runska znaka. Ime mu je samo prvih šest: f-u-þ-a-r-k.",
      "Vikinški dugi brodovi gazili su tako plitko da su napadači mogli daleko uzvodno uz reke.",
      "Obnova drvenog okvira svetionika znači nošenje greda, popravku stepenica i rogova. Saveliy je to radio leta 2025.",
      "Rune su se urezivale, a ne pisale: njihovi oštri oblici lako se urezuju u drvo i kamen.",
      "Vikinški brodovi građeni su preklopljenim daskama koje su spajane gvozdenim zakivcima.",
      "Brod iz Oseberga pronađen u grobnom humku u Norveškoj star je oko 1200 godina i neobično dobro očuvan."
    ]
  },

  /* Nordic languages */
  badger: {
    name: { en: "Lute Badger", ru: "Барсук с лютней", sr: "Jazavac s lutnjom" },
    en: [
      "Norwegian has two official written standards: Bokmål and Nynorsk. Savely's Norwegian is at B1.",
      "Icelandic has changed so little that Icelanders can read their medieval sagas almost as they are.",
      "Swedes have 'fika': a coffee-and-cake break that is almost a national institution.",
      "Russenorsk was the pidgin of the White Sea Pomors and Norwegian traders: words from both languages and almost no grammar.",
      "In Norway it is normal to say 'takk for maten', 'thanks for the food', after a meal at home.",
      "Finland has about three million saunas for five and a half million people."
    ],
    ru: [
      "В норвежском два официальных письменных стандарта: букмол и нюнорск. Норвежский Савелия на уровне B1.",
      "Исландский изменился так мало, что исландцы читают средневековые саги почти в оригинале.",
      "У шведов есть «фика»: перерыв на кофе с выпечкой, почти национальный институт.",
      "Руссенорск был языком поморов и норвежских торговцев: слова из обоих языков и почти никакой грамматики.",
      "В Норвегии принято после домашнего обеда говорить «takk for maten», «спасибо за еду».",
      "В Финляндии около трёх миллионов саун на пять с половиной миллионов человек."
    ],
    sr: [
      "Norveški ima dva zvanična pisana standarda: bokmål i nynorsk. Saveliyev norveški je na nivou B1.",
      "Islandski se toliko malo promenio da Islanđani srednjovekovne sage čitaju skoro u originalu.",
      "Šveđani imaju 'fiku': pauzu za kafu i kolače koja je gotovo nacionalna ustanova.",
      "Rusenorsk je bio jezik Pomora i norveških trgovaca: reči iz oba jezika i skoro nikakve gramatike.",
      "U Norveškoj je uobičajeno da se posle ručka kod kuće kaže 'takk for maten', 'hvala za hranu'.",
      "Finska ima oko tri miliona sauna na pet i po miliona stanovnika."
    ]
  },

  /* the lighthouse, the White Sea, Pomors */
  bear: {
    name: { en: "Stilt Bear", ru: "Медведь на ходулях", sr: "Medved na štulama" },
    en: [
      "The Zimnegorsky lighthouse on the White Sea has shone since 1878, from 126 metres above the water.",
      "Savely spent two weeks there in the summer of 2025 with a small crew of volunteers.",
      "Arkhangelsk, on the White Sea, was Russia's main seaport until St Petersburg appeared in 1703.",
      "The Pomors, people of the White Sea coast, traded with Norway for centuries. 'Pomor' means 'one who lives by the sea'.",
      "The Nevyansk Tower is 57.5 metres tall and leans almost two metres. Savely used to give tours there.",
      "Arkhangelsk stands on the Northern Dvina river, close to where it meets the White Sea."
    ],
    ru: [
      "Зимнегорский маяк на Белом море светит с 1878 года, с высоты 126 метров над водой.",
      "Савелий провёл там две недели летом 2025 года с небольшой командой волонтёров.",
      "Архангельск на Белом море был главным морским портом России, пока в 1703 году не появился Санкт-Петербург.",
      "Поморы, жители берегов Белого моря, веками торговали с Норвегией. Слово «помор» значит «живущий по морю».",
      "Невьянская башня высотой 57,5 метра отклонена почти на два метра. Савелий проводил там экскурсии.",
      "Архангельск стоит на реке Северная Двина, недалеко от места, где она впадает в Белое море."
    ],
    sr: [
      "Zimnegorski svetionik na Belom moru svetli od 1878, sa visine od 126 metara iznad vode.",
      "Saveliy je tamo proveo dve nedelje leta 2025. sa malom ekipom volontera.",
      "Arhangelsk na Belom moru bio je glavna ruska luka sve dok se 1703. nije pojavio Sankt Peterburg.",
      "Pomori, stanovnici obale Belog mora, vekovima su trgovali s Norveškom. Reč 'pomor' znači 'onaj koji živi uz more'.",
      "Nevjanska kula visoka je 57,5 metara i nagnuta skoro dva metra. Saveliy je tamo vodio razgledanja.",
      "Arhangelsk leži na reci Severnoj Dvini, blizu mesta gde se uliva u Belo more."
    ]
  },

  /* Norse myths and the Viking world */
  goat: {
    name: { en: "Goat Jester", ru: "Козёл-шут", sr: "Jarac šaljivdžija" },
    en: [
      "Thor's chariot is pulled by two goats, Tanngrisnir and Tanngnjóstr: 'Tooth-barer' and 'Tooth-grinder'.",
      "In the myths Thor can eat his goats for supper and bring them back to life the next morning with his hammer.",
      "Leif Erikson reached North America around the year 1000, about five centuries before Columbus. Viking traces survive at L'Anse aux Meadows in Canada.",
      "Iceland's Althing, founded in 930, is one of the oldest parliaments in the world.",
      "In Norse myth the world tree Yggdrasil, an ash, holds the nine worlds together.",
      "The Varangian Guard, made up largely of Scandinavians, protected the Byzantine emperor in Constantinople."
    ],
    ru: [
      "Колесницу Тора тянут два козла, Тангриснир и Тангниостр: «Скалящий зубы» и «Скрежещущий зубами».",
      "В мифах Тор может съесть своих козлов на ужин, а утром оживить их ударом молота.",
      "Лейф Эриксон добрался до Северной Америки около 1000 года, почти на пять веков раньше Колумба. Следы викингов сохранились в Л'Анс-о-Медоу в Канаде.",
      "Альтинг в Исландии, основанный в 930 году, один из старейших парламентов мира.",
      "В скандинавских мифах мировое древо Иггдрасиль, ясень, соединяет девять миров.",
      "Варяжская стража, состоявшая в основном из скандинавов, охраняла византийского императора в Константинополе."
    ],
    sr: [
      "Torova kola vuku dva jarca, Tanngrisnir i Tanngnjóstr: 'Cerekač zubima' i 'Škrgutač zubima'.",
      "U mitovima Tor može da pojede svoje jarce za večeru, a ujutru ih čekićem vrati u život.",
      "Lejf Erikson stigao je u Severnu Ameriku oko 1000. godine, skoro pet vekova pre Kolumba. Vikinški tragovi sačuvani su u L'Anse aux Meadows u Kanadi.",
      "Alting na Islandu, osnovan 930, jedan je od najstarijih parlamenata na svetu.",
      "U nordijskim mitovima svetsko drvo Yggdrasil, jasen, drži zajedno devet svetova.",
      "Varjaška garda, sastavljena uglavnom od Skandinavaca, čuvala je vizantijskog cara u Carigradu."
    ]
  }
};

/* Texts of the Bestiary page, the fact of the day and the little buttons */
const FACTS_UI = {
  en: {
    title: "Bestiary",
    intro: "Every creature on this site knows a few facts. Click on them, or wait: they also speak up on their own. Each new fact you hear is written down here.",
    found: "facts found", locked: "Not found yet", all: "You have found every fact. Splendid!",
    reset: "Forget my progress", day: "Fact of the day", more: "All facts in the Bestiary →",
    sound: "Sound", toNight: "Switch to night", toDay: "Switch to day"
  },
  ru: {
    title: "Бестиарий",
    intro: "Каждое существо на этом сайте знает несколько фактов. Нажимайте на них или подождите: они заговорят сами. Каждый новый услышанный факт записывается здесь.",
    found: "фактов найдено", locked: "Ещё не найден", all: "Вы нашли все факты. Великолепно!",
    reset: "Забыть мой прогресс", day: "Факт дня", more: "Все факты в Бестиарии →",
    sound: "Звук", toNight: "Включить ночь", toDay: "Включить день"
  },
  sr: {
    title: "Bestijarijum",
    intro: "Svako stvorenje na ovom sajtu zna nekoliko činjenica. Kliknite na njih ili sačekajte: oglasiće se i same. Svaka nova činjenica koju čujete upisuje se ovde.",
    found: "pronađenih činjenica", locked: "Još nije pronađena", all: "Pronašli ste sve činjenice. Sjajno!",
    reset: "Zaboravi moj napredak", day: "Činjenica dana", more: "Sve činjenice u Bestijarijumu →",
    sound: "Zvuk", toNight: "Uključi noć", toDay: "Uključi dan"
  }
};
