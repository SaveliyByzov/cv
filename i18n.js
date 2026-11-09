/* Icon set: one consistent line-icon style (24x24, single stroke) shared
   across skills and interests. Icons are language-independent, referenced
   by key from each locale's skills/interests arrays. */
const ICONS = {
  teaching: '<path d="M2 9l10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><line x1="22" y1="9" x2="22" y2="15"/>',
  writing: '<path d="M4 20l1-5L16 4l4 4L9 19l-5 1Z"/><line x1="14" y1="6" x2="18" y2="10"/>',
  translate: '<path d="M3 7h12"/><path d="M11 3l4 4-4 4"/><path d="M21 17H9"/><path d="M13 21l-4-4 4-4"/>',
  edtech: '<rect x="3" y="4" width="18" height="13" rx="1.5"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  speaking: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/>',
  music: '<circle cx="6" cy="18" r="2.6"/><circle cx="17" cy="16" r="2.6"/><path d="M8.6 18V5l10-2v13"/>',
  reading: '<path d="M12 6c-2-1.3-5-1.3-8 0v13c3-1.3 6-1.3 8 0Z"/><path d="M12 6c2-1.3 5-1.3 8 0v13c-3-1.3-6-1.3-8 0Z"/><line x1="12" y1="6" x2="12" y2="19"/>',
  hiking: '<path d="M2 20 8 8l3.5 6L14 10l8 10Z"/><circle cx="8" cy="4" r="1.6"/>',
  travel: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z"/>',
  woodwork: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.4"/>',
  drawing: '<path d="M4 20l1.5-5.5L14 6l4 4-8.5 8.5L4 20Z"/><path d="M12.5 7.5l4 4"/><path d="M3 21h5"/>'
};

const T = {
  "en": {
    "topline": "Belgrade, Serbia // 44.7866°N 20.4489°E",
    "name": "Savely Byzov",
    "role": "Linguist // EFL Teacher // Researcher",
    "photoAlt": "Portrait of Savely Byzov",
    "plateCaption": "Fig. 1 — S. Byzov",
    "printLabel": "Print // Save as PDF",
    "readPdf": "Read the author’s manuscript (PDF, in Russian)",
    "viewSlides": "View the slides (PDF, in Russian)",
    "backToTop": "Back to top",
    "printNote": "This is a condensed summary — the full version, with publications, conference talks, festivals and volunteering, and more, is at saveliybyzov.github.io/cv",
    "intro": "I’m a linguist and university lecturer: I specialise in English language teaching, sociolinguistics, and the history of English, and I’m genuinely fascinated by Northern Europe — its languages, its history, and the way cultures collide and intertwine across a map. I’m calm, empathetic, and resilient under pressure by nature, and curious about pretty much everything: languages, cultures, and the history and geography of the places they come from. In two years at the university, I taught, built several courses, and supervised student research, while also spending years interpreting at international festivals. And one memorable summer, I dropped all of that to go and restore a lighthouse at the edge of the world — more on that below.",
    "labels": {
      "experience": "Experience",
      "education": "Education",
      "skillslang": "Skills, Languages &amp; Interests",
      "festivals": "Festivals &amp; Volunteering",
      "activity": "Academic Activity",
      "publications": "Publications",
      "talks": "Conference Talks",
      "training": "Additional Training",
      "languages": "Languages",
      "skills": "Skills",
      "interests": "Interests"
    },
    "campusAlt": "NArFU’s main building in Arkhangelsk",
    "campusCaption": "NArFU main building, Arkhangelsk — photo: Artem Kelarev, public domain, Wikimedia Commons",
    "exp1": {
      "title": "University Lecturer",
      "place": "Department of English Philology, Nordic Languages and Linguodidactics, Northern (Arctic) Federal University, Arkhangelsk",
      "date": "2024 – 2026",
      "imgAlt": "Giving a lecture to students",
      "blurb": "I worked at NArFU — one of the main universities of Russia’s Arctic zone and a base for Arctic research and education, from the Arctic Floating University expeditions to Northern-language studies. It has partner agreements with dozens of organisations abroad.",
      "li": [
        "Taught English Language, Sociolinguistics, and History of the English Language to dozens of undergraduates across several groups",
        "Designed five complete courses — spanning Practical English, Sociolinguistics, and the History of the English Language — with syllabi, materials, and assessment",
        "Supervised three student research projects in linguistics and regional geography"
      ]
    },
    "exp2": {
      "title": "Museum Guide // Tour Interpreter",
      "place": "Nevyansk State Historical and Architectural Museum, Nevyansk",
      "date": "2023",
      "blurb": "The museum where I worked is built around the Nevyansk Leaning Tower — a 57.5-metre tower built in the 1720s for the Demidov family of industrialists, tilted almost two metres off the vertical, and wrapped in legends of counterfeit coinage and a flooded cellar.",
      "li": [
        "Led guided tours and thematic excursions on regional history and architecture for Russian-speaking and international visitors"
      ]
    },
    "edu1": {
      "title": "Master&rsquo;s Degree in Pedagogy",
      "place": "Northern (Arctic) Federal University, Arkhangelsk",
      "date": "2024 – 2026",
      "pre": "Specialisation: Designing Educational Resources and Teaching English in a Digital Environment.",
      "programBlurb": "This is where I learned to design courses for blended and fully digital formats — everything from choosing EdTech platforms and building multimedia materials to formative assessment and running collaborative writing projects online.",
      "thesisLabel": "Dissertation:",
      "thesis": "Using digital tools to teach collaborative writing in English to university students of linguistics.",
      "abstract": "I examine how collaborative writing — co-authoring, peer review, and iterative editing in a shared document — can be taught alongside teamwork skills to second-year linguistics students, using the Russian platform Yandex Documents. I draw on sociocultural writing theory and genre-based pedagogy, and I ran a four-session pilot with three student working groups, analysing their document version histories and reflections."
    },
    "edu2": {
      "title": "Bachelor&rsquo;s Degree in Linguistics",
      "place": "Northern (Arctic) Federal University, Arkhangelsk",
      "date": "2020 – 2024",
      "pre": "Specialisation: Theory and Practice of Intercultural Communication. Languages of study: English and Norwegian.",
      "programBlurb": "Here I combined advanced English-language training with the theory of intercultural communication, translation practice, and a second foreign language — Norwegian, in my case — to prepare for work across languages and cultures.",
      "thesisLabel": "Thesis:",
      "thesis": "Communicative and speech tactics in an Old English text (based on the poem &ldquo;The Dream of the Rood&rdquo;).",
      "abstract": "Here I take a close look at “The Dream of the Rood” — an anonymous 8th-century Old English poem on the Crucifixion — analysing its communicative and speech tactics alongside its stylistic devices. I also translated the whole poem myself, line by line, from Old English into Russian."
    },
    "activity": [
      "Organised academic round tables and panel discussions on intercultural communication",
      "Delivered open lectures for students and the wider academic community",
      "Served on the university’s admissions committee"
    ],
    "training": [
      "Completed a course in inclusive education — working with people with disabilities",
      "Completed a first-aid course",
      "Trained for years at an art school and can still hold my own at academic drawing"
    ],
    "publications": [
      {
        "title": "The Place of Foreign-Language Writing in the System of Collaborative Learning at University",
        "meta": "Academic paper",
        "desc": "I look at where foreign-language writing fits within a university’s collaborative-learning system, drawing on the course syllabi and curriculum of our own linguistics programme. I walk through the stages of teaching writing and what really gets in students’ way when they write together — from missing team roles to gaps in language level — and what digital tools can do about it."
      },
      {
        "title": "Digital Support for Teaching Collaborative Writing in English at a University",
        "meta": "Academic paper",
        "desc": "I examine how cloud editors and wiki platforms can help linguistics students move from B1 to B2 in their English writing, and I offer concrete tasks and methodological techniques for running collaborative work digitally."
      },
      {
        "title": "The Intercultural Code in “The Dream of the Rood”: A Synthesis of Germanic and Christian Traditions",
        "meta": "Academic paper",
        "desc": "I show how the poem turns Christ into a hero of the Germanic heroic tradition while dressing Christian doctrine in the language of a warrior’s retinue — and argue that this blending of codes is organic rather than mechanical."
      },
      {
        "title": "A System for Assessing Collaborative Writing in Teaching Foreign-Language Writing to University Students",
        "meta": "Academic paper",
        "desc": "I propose a two-component model for assessing group writing tasks — the written product and the process of working together — set out the key criteria for judging the text and each student’s participation, and describe how a levelled rubric is built, so that marks reflect each participant’s contribution and not only the final text."
      }
    ],
    "talks": [
      {
        "title": "A Semantic Analysis of Power and Subordination Vocabulary in the Old English Poem “The Dream of the Rood”",
        "meta": "Arctic Readings",
        "desc": "I analyse two lexical-semantic fields in the poem — power and subordination — and show how the text achieves a genuine inversion of power: Christ triumphs through voluntary suffering, and the Cross, as a loyal retainer, triumphs through submission."
      },
      {
        "title": "Toponymic Subordination: The Norwegianisation of Sámi Place Names on Maps (19th–21st Centuries)",
        "meta": "Arctic Readings",
        "desc": "Using maps of Finnmark and Troms, I argue that the Norwegianisation of Sámi place names was not an accidental by-product of cartography but a systematic process with a recognisable set of tactics: calquing, phonetic adaptation, outright replacement, orthographic normalisation, and toponymic silence."
      },
      {
        "title": "Norwegian in the Germanic Language Family: Classification, History, and the Current Situation",
        "meta": "Lomonosov Readings",
        "desc": "I trace Norwegian’s place among the Germanic languages — its historical path and its present situation, including the two official written standards, Bokmål and Nynorsk."
      },
      {
        "title": "Realisation of the Communicative Tactic of Presentation in the Old English Poem “The Dream of the Rood”",
        "meta": "Language. Culture. Literature",
        "desc": "I place the poem within Old English literature and the history of its study, define communicative and speech tactics, and show, with passages from the text, how the tactic of presentation works in the poem."
      },
      {
        "title": "The 18th Century as a Transitional Period in Norwegian Visual Art",
        "meta": "Language. Culture. Literature",
        "desc": "I explore how urbanisation and the rise of new, wealthy urban elites turned 18th-century Norwegian art from carved and decorative work toward painting — above all portraiture, with landscape beginning to emerge as a subject — laying the groundwork for the later flowering of Norwegian painting."
      }
    ],
    "langs": [
      {
        "name": "English",
        "level": "C1 // Advanced"
      },
      {
        "name": "Russian",
        "level": "Native"
      },
      {
        "name": "Norwegian",
        "level": "B1 // Intermediate"
      }
    ],
    "skills": [
      { "icon": "teaching", "title": "University teaching &amp; curriculum development", "desc": "I built five courses from the ground up, spanning practical English and the history of the language — syllabi, materials, assessment, all of it." },
      { "icon": "writing", "title": "Academic writing &amp; research (EN / RU)", "desc": "I write academic papers and help students turn their own research into something publishable." },
      { "icon": "translate", "title": "Translation &amp; interpreting (EN–RU)", "desc": "I’ve spent years interpreting at festivals large and small, and for private events — everything from simultaneous interpreting on stage to whispered interpreting in the wings." },
      { "icon": "edtech", "title": "Digital learning &amp; EdTech tools", "desc": "I studied EdTech methodology at Master’s level, and I put it to work in my own classroom — and in my dissertation." },
      { "icon": "speaking", "title": "Public speaking", "desc": "I often give lectures and really enjoy the stage: festivals, conferences, open lectures — I’m not picky." }
    ],
    "festA": {
      "crew": [
        "To my left in the photo is ",
        {
          "a": "Mark",
          "href": "https://mkostarev.com/"
        },
        " — a very good GIS specialist; if you need one, get in touch. My fiancée ",
        {
          "a": "Sasha",
          "href": "https://toropova-edu.github.io/cv/#/education"
        },
        " was there too: she knows marine biology and whales, so feel free to write to her as well."
      ],
      "title": "Volunteer — Lighthouse Restoration",
      "place": "Zimnegorsky Lighthouse, White Sea coast",
      "date": "Summer 2025",
      "desc": "Spent two weeks with a small volunteer crew restoring the wooden frame of the Zimnegorsky Lighthouse on the Gorlo Strait of the White Sea — a lighthouse in service since 1878, whose light shines from 126 metres above the sea, and one of several volunteer expeditions to historic lighthouses and weather stations in Russia’s Arctic zone. Days were spent hauling timber, rebuilding stairs and rafters, and learning first-hand just how much carpentry an old lighthouse still needs.",
      "alt": "Volunteers restoring the wooden structure of the Zimnegorsky Lighthouse"
    },
    "festB": {
      "title": "Interpreter // Volunteer",
      "place": "International Street Theatre Festival, Arkhangelsk",
      "date": "2024",
      "desc": "Facilitated communication between foreign theatre companies and local volunteers, from rehearsals to late-night load-outs by the water, at Arkhangelsk’s International Street Theatre Festival — Russia’s oldest street-theatre festival, launched in 1990 on the initiative of Arkhangelsk Youth Theatre’s artistic director Viktor Panov and included in UNESCO’s World Decade for Cultural Development programme in 1992. It traditionally opens with a carnival procession and in recent years has closed on City Day.",
      "alt": "View from the festival stage over the harbour at sunset"
    },
    "festC": {
      "title": "Interpreter // Volunteer",
      "place": "Arctic Open International Film Festival, Arkhangelsk",
      "date": "2023",
      "desc": "Provided English–Russian interpretation for international guests and film directors at the Arctic Open International Film Festival — launched in 2017 and held with the Northern (Arctic) Federal University, my own university, as a partner. It brings together filmmakers from Russia, Canada, the Nordic countries, and the US, with screenings in Arkhangelsk, Severodvinsk, and Novodvinsk.",
      "alt": "Savely on stage at the Arctic Open festival"
    },
    "festD": {
      "title": "Volunteer — Anniversary Exhibition",
      "place": "Arkhangelsk Youth Theatre, Gostiny Dvor",
      "date": "Summer 2023",
      "desc": "Helped put together “Here Nothing Would Stand If It Weren’t for You” — a maze-like exhibition held ahead of the Arkhangelsk Youth Theatre’s 50th anniversary, built from six spaces divided across two halls at Gostiny Dvor. It traced founder Viktor Panov’s own path to the theatre — including his recovery from a broken back — through costumes, props, archive photographs, actors’ voices, and new work by young artists from Vladikavkaz, Yekaterinburg, Moscow, and St Petersburg, chosen through an open call.",
      "alt": "Poster for the exhibition “Here Nothing Would Stand If It Weren’t for You”"
    },
    "interests": [
      { "icon": "music", "title": "Music", "desc": "I love music of all kinds, but I’ve got a real soft spot for Johnny Cash and country." },
      { "icon": "reading", "title": "Reading", "desc": "My favourite author is F. Scott Fitzgerald." },
      { "icon": "drawing", "title": "Drawing", "desc": "Years of art-school training left their mark — I still like to sit down and draw when I get the chance." },
      { "icon": "hiking", "title": "Hiking &amp; trekking", "desc": "I spent my whole youth in a local hiking club, and I still head out on expeditions regularly." },
      { "icon": "travel", "title": "Travel", "desc": "I dream of seeing Scandinavia and Alaska next — Serbia used to be the dream before it became home." },
      { "icon": "woodwork", "title": "Woodworking &amp; carpentry", "desc": "In my spare time, I make shields and build greenhouses by hand." }
    ],
    "footer": "Savely Byzov // Belgrade, Serbia // "
  },
  "ru": {
    "topline": "Белград, Сербия // 44,7866° с. ш. 20,4489° в. д.",
    "name": "Савелий Бызов",
    "role": "Лингвист // Преподаватель английского // Исследователь",
    "photoAlt": "Портрет Савелия Бызова",
    "plateCaption": "Илл. 1 — С. Бызов",
    "printLabel": "Печать // Сохранить в PDF",
    "readPdf": "Читать авторскую рукопись (PDF)",
    "viewSlides": "Смотреть презентацию (PDF)",
    "backToTop": "Наверх",
    "printNote": "Это сокращённая версия — публикации, доклады на конференциях, фестивали, волонтёрство и многое другое — на saveliybyzov.github.io/cv",
    "intro": "Я лингвист и преподаватель университета: специализируюсь на преподавании английского языка, социолингвистике и истории английского языка и по-настоящему увлечён Северной Европой — её языками, историей и тем, как культуры сталкиваются и переплетаются на карте. По натуре я спокойный, эмпатичный и выдержанный, и мне искренне интересно почти всё: языки, культуры, история и география мест, откуда они родом. За два года в университете я преподавал, разработал несколько учебных программ и руководил студенческими исследованиями, а параллельно годами занимался устным переводом на международных фестивалях. А однажды летом я бросил всё и уехал на две недели восстанавливать маяк на краю света, — но об этом чуть ниже.",
    "labels": {
      "experience": "Опыт работы",
      "education": "Образование",
      "skillslang": "Навыки, языки и увлечения",
      "festivals": "Фестивали и волонтёрство",
      "activity": "Академическая деятельность",
      "publications": "Публикации",
      "talks": "Доклады на конференциях",
      "training": "Дополнительная подготовка",
      "languages": "Языки",
      "skills": "Навыки",
      "interests": "Увлечения"
    },
    "campusAlt": "Главный корпус САФУ в Архангельске",
    "campusCaption": "Главный корпус САФУ, Архангельск — фото: Артём Келарев, общественное достояние, Wikimedia Commons",
    "exp1": {
      "title": "Преподаватель университета",
      "place": "Кафедра английской филологии, языков северных стран и лингводидактики, Северный (Арктический) федеральный университет, Архангельск",
      "date": "2024 – 2026",
      "imgAlt": "Читаю лекцию студентам",
      "blurb": "Я работал в САФУ — одном из ведущих вузов арктической зоны России и опорной площадке для арктической науки и образования: от экспедиций Арктического плавучего университета до изучения языков Севера. У университета десятки соглашений с зарубежными партнёрами.",
      "li": [
        "Преподавал английский язык, социолингвистику и историю английского языка — через мои занятия прошли десятки студентов в нескольких группах",
        "С нуля разработал пять учебных программ — по практическому курсу английского языка, социолингвистике и истории английского языка — от структуры курса до системы оценивания",
        "Руководил тремя студенческими исследовательскими проектами по лингвистике, истории языка и региональной географии"
      ]
    },
    "exp2": {
      "title": "Экскурсовод // Переводчик",
      "place": "Невьянский государственный историко-архитектурный музей, Невьянск",
      "date": "2023",
      "blurb": "Музей, где я работал, построен вокруг Невьянской наклонной башни — 57,5-метровой башни, возведённой в 1720-х годах для промышленников Демидовых, отклонившейся от вертикали почти на два метра и окутанной легендами о фальшивой монете и затопленных подвалах.",
      "li": [
        "Проводил обзорные и тематические экскурсии по региональной истории и архитектуре для русскоязычных и иностранных посетителей"
      ]
    },
    "edu1": {
      "title": "Магистратура по педагогике",
      "place": "Северный (Арктический) федеральный университет, Архангельск",
      "date": "2024 – 2026",
      "pre": "Специализация: проектирование образовательных ресурсов и обучение английскому языку в цифровой среде.",
      "programBlurb": "Здесь я учился разрабатывать курсы для смешанного и полностью цифрового обучения — от выбора EdTech-платформ и создания мультимедийных материалов до формирующего оценивания и организации онлайн-проектов по совместному письму.",
      "thesisLabel": "Диссертация:",
      "thesis": "Обучение совместному письму на английском языке студентов-лингвистов с использованием цифровых инструментов.",
      "abstract": "В этой работе я разбираю, как коллаборативное письмо — соавторство, взаимное рецензирование и совместное редактирование — можно преподавать в связке с навыками командной работы студентам-лингвистам второго курса с использованием платформы «Яндекс Документы». Опираюсь на социокультурную теорию письма и жанровый подход к обучению; провёл пробное обучение в трёх рабочих группах (четыре занятия), проанализировав историю версий документов и рефлексию участников."
    },
    "edu2": {
      "title": "Бакалавриат по лингвистике",
      "place": "Северный (Арктический) федеральный университет, Архангельск",
      "date": "2020 – 2024",
      "pre": "Специализация: теория и практика межкультурной коммуникации. Изучаемые языки: английский и норвежский.",
      "programBlurb": "На бакалавриате я сочетал углублённое изучение английского языка с теорией межкультурной коммуникации, переводческой практикой и вторым иностранным языком — в моём случае норвежским.",
      "thesisLabel": "Дипломная работа:",
      "thesis": "Коммуникативные и речевые тактики в древнеанглийском тексте (на материале поэмы «Видение Креста»).",
      "abstract": "Здесь я разбираю «Видение Креста» — анонимную древнеанглийскую поэму VIII века о Распятии — анализируя коммуникативно-речевые тактики и стилистические приёмы текста. А ещё сам перевёл её с древнеанглийского на русский — целиком, строка за строкой."
    },
    "activity": [
      "Организовывал академические круглые столы и панельные дискуссии по межкультурной коммуникации",
      "Читал открытые лекции для студентов и широкой академической аудитории",
      "Участвовал в работе приёмной комиссии университета"
    ],
    "training": [
      "Прошёл курс по инклюзивному образованию и работе с людьми с ограниченными возможностями здоровья",
      "Прошёл курсы оказания первой медицинской помощи",
      "Много лет учился в художественной школе и до сих пор неплохо владею академическим рисунком"
    ],
    "publications": [
      {
        "title": "Место письма на иностранном языке в системе коллаборативного обучения в вузе",
        "meta": "Научная статья",
        "desc": "Разбираю, какое место занимает письмо на иностранном языке в системе коллаборативного обучения в вузе — на материале рабочих программ и учебного плана нашей лингвистической программы. Прохожусь по этапам обучения письму и по тому, что реально мешает студентам писать сообща: от отсутствия ролей в команде до разного уровня владения языком — и что с этим можно сделать в цифровой среде."
      },
      {
        "title": "Возможности организации цифровой поддержки обучения коллаборативному письму на английском языке в вузе",
        "meta": "Научная статья",
        "desc": "Рассматриваю, как облачные редакторы и вики-платформы могут помочь студентам-лингвистам подняться с уровня B1 до B2 в письме на английском — и предлагаю конкретные задания и методические приёмы для организации совместной работы в цифровой среде."
      },
      {
        "title": "Межкультурный код в «The Dream of the Rood»: синтез германской и христианской традиций",
        "meta": "Научная статья",
        "desc": "Показываю, как поэма превращает Христа в героя германской героической традиции, а христианское вероучение облекает в язык воинской дружины, и почему такое соединение кодов органично, а не механично."
      },
      {
        "title": "Система оценивания коллаборативного письма в обучении иноязычной письменной речи студентов вуза",
        "meta": "Научная статья",
        "desc": "Предлагаю двухкомпонентную модель оценивания групповых письменных заданий — по письменному продукту и по процессу совместной работы, — выделяю ключевые критерии оценки текста и участия в групповом взаимодействии и описываю логику построения уровневой рубрики, чтобы оценка учитывала не только итоговый текст, но и вклад каждого участника."
      }
    ],
    "talks": [
      {
        "title": "Семантический анализ лексики власти и подчинения в древнеанглийской поэме «The Dream of the Rood»",
        "meta": "Арктические чтения",
        "desc": "Разбираю два лексико-семантических поля поэмы — «власть» и «подчинение» — и показываю, как в тексте происходит настоящая инверсия власти: Христос побеждает через добровольное страдание, а Крест, верный дружинник, торжествует через покорность."
      },
      {
        "title": "Топонимическое подчинение: норвегизация саамских названий на картах (XIX–XXI вв.)",
        "meta": "Арктические чтения",
        "desc": "На материале карт Финнмарка и Тромса показываю, что норвегизация саамских топонимов — это не побочный эффект картографии, а системный процесс с узнаваемым набором приёмов: калька, фонетическая адаптация, замена, орфографическая нормализация и топонимическое умолчание."
      },
      {
        "title": "Норвежский язык в германской языковой семье: классификация, исторический путь и современная языковая ситуация",
        "meta": "Ломоносовские чтения",
        "desc": "Прослеживаю место норвежского среди германских языков — как он сложился исторически и какова его нынешняя ситуация, в том числе две официальные письменные нормы, букмол и нюнорск."
      },
      {
        "title": "Реализация коммуникативной тактики презентации в древнеанглийской поэме «The Dream of the Rood»",
        "meta": "Язык. Культура. Литература",
        "desc": "Помещаю поэму в контекст древнеанглийской литературы и истории её изучения, определяю коммуникативно-речевые тактики и на примерах из текста показываю, как в поэме реализуется тактика презентации."
      },
      {
        "title": "XVIII век как переходный период в норвежском изобразительном искусстве",
        "meta": "Язык. Культура. Литература",
        "desc": "Прослеживаю, как урбанизация и появление новых богатых городских элит направили норвежское искусство XVIII века от резьбы и декоративной росписи к живописи — прежде всего к портрету, — а природа и пейзаж стали выходить на первый план. Так закладывалась основа для более позднего расцвета норвежской живописи."
      }
    ],
    "langs": [
      {
        "name": "Английский",
        "level": "C1 // Продвинутый"
      },
      {
        "name": "Русский",
        "level": "Родной"
      },
      {
        "name": "Норвежский",
        "level": "B1 // Средний"
      }
    ],
    "skills": [
      { "icon": "teaching", "title": "Преподавание в вузе и разработка программ", "desc": "С нуля разработал пять учебных программ — по практическому английскому и истории языка — от структуры курса до системы оценивания." },
      { "icon": "writing", "title": "Академическое письмо и исследования (англ./рус.)", "desc": "Пишу научные статьи и помогаю студентам довести собственные исследования до публикации — от первого черновика до финальной правки." },
      { "icon": "translate", "title": "Письменный и устный перевод (англ.–рус.)", "desc": "Годами устно переводил на больших и маленьких фестивалях, а также на частных мероприятиях — от синхрона на сцене до шёпотного перевода в кулуарах." },
      { "icon": "edtech", "title": "Цифровое обучение и EdTech-инструменты", "desc": "Изучал методику цифрового обучения (EdTech) в магистратуре и применяю её в собственных курсах — а заодно в диссертации." },
      { "icon": "speaking", "title": "Публичные выступления", "desc": "Часто выступаю с лекциями и по-настоящему люблю сцену — открытая лекция, конференция или фестиваль, мне подойдёт любая площадка." }
    ],
    "festA": {
      "crew": [
        "Слева от меня на фото — ",
        {
          "a": "Марк",
          "href": "https://mkostarev.com/"
        },
        ", очень хороший специалист по ГИС; если понадобится, обращайтесь. Там же была моя невеста ",
        {
          "a": "Саша",
          "href": "https://toropova-edu.github.io/cv/#/education"
        },
        ": она разбирается в морской биологии и китах, так что можно обратиться и к ней."
      ],
      "title": "Волонтёр — реставрация маяка",
      "place": "Зимнегорский маяк, побережье Белого моря",
      "date": "Лето 2025",
      "desc": "Две недели провёл с небольшой командой волонтёров, восстанавливая деревянный каркас Зимнегорского маяка в Горле Белого моря — маяка, действующего с 1878 года, огонь которого расположен на высоте 126 метров. Это одна из волонтёрских экспедиций к историческим маякам и метеостанциям арктической зоны России. Таскал брёвна, перестраивал лестницы и стропила — и на собственном опыте убедился, сколько плотницкой работы ещё требует старый маяк.",
      "alt": "Я с другом восстанавливаю деревянную конструкцию Зимнегорского маяка"
    },
    "festB": {
      "title": "Переводчик // Волонтёр",
      "place": "Международный фестиваль уличных театров, Архангельск",
      "date": "2024",
      "desc": "Налаживал общение между иностранными театральными труппами и местными волонтёрами на Международном фестивале уличных театров в Архангельске — старейшем в России фестивале уличных театров, который проводится с 1990 года по инициативе художественного руководителя Архангельского молодёжного театра Виктора Панова и в 1992 году был включён в программу ЮНЕСКО «Всемирное десятилетие развития культуры». Традиционно он открывается карнавальным шествием, а в последние годы завершается в День города — от репетиций до позднего разбора декораций у воды.",
      "alt": "Вид со сцены фестиваля на гавань на закате"
    },
    "festC": {
      "title": "Переводчик // Волонтёр",
      "place": "Международный кинофестиваль «Arctic Open», Архангельск",
      "date": "2023",
      "desc": "Выполнял устный перевод с английского на русский для иностранных гостей и режиссёров на Международном кинофестивале «Arctic Open». Фестиваль основан в 2017 году, его партнёр — САФУ имени М. В. Ломоносова, мой университет; он объединяет кинематографистов России, Канады, скандинавских стран и США, а показы идут в Архангельске, Северодвинске и Новодвинске.",
      "alt": "Савелий на сцене фестиваля Arctic Open"
    },
    "festD": {
      "title": "Волонтёр — юбилейная выставка",
      "place": "Архангельский молодёжный театр, Гостиные дворы",
      "date": "Лето 2023",
      "desc": "Помогал собирать выставку-лабиринт «Здесь ничего бы не стояло, если бы не было тебя», приуроченную к предстоящему 50-летию Архангельского молодёжного театра и устроенную в шести пространствах двух залов Гостиных дворов. Экспозиция прослеживала путь основателя театра Виктора Панова (включая восстановление после перелома позвоночника) через костюмы, реквизит, архивные фотографии, голоса актёров и новые работы молодых художников из Владикавказа, Екатеринбурга, Москвы и Петербурга, отобранные по открытому конкурсу.",
      "alt": "Афиша выставки «Здесь ничего бы не стояло, если бы не было тебя»"
    },
    "interests": [
      { "icon": "music", "title": "Музыка", "desc": "Люблю музыку в целом, но если позвать на концерт кантри — приду одним из первых: особенно неравнодушен к Джонни Кэшу." },
      { "icon": "reading", "title": "Чтение", "desc": "Любимый писатель — Фрэнсис Скотт Фицджеральд." },
      { "icon": "drawing", "title": "Рисование", "desc": "Годы художественной школы не прошли даром — до сих пор люблю сесть и порисовать, когда выпадает случай." },
      { "icon": "hiking", "title": "Пешие походы и трекинг", "desc": "Всю юность провёл в туристическом кружке и до сих пор регулярно хожу в походы и экспедиции." },
      { "icon": "travel", "title": "Путешествия", "desc": "Дальше мечтаю о Скандинавии и Аляске — а Сербия была мечтой, пока не стала домом." },
      { "icon": "woodwork", "title": "Работа по дереву и плотницкое дело", "desc": "В свободное время своими руками делаю щиты и строю теплицы." }
    ],
    "footer": "Савелий Бызов // Белград, Сербия // "
  },
  "sr": {
    "topline": "Beograd, Srbija // 44.7866°N 20.4489°E",
    "name": "Saveliy Byzov",
    "role": "Lingvista // Nastavnik engleskog jezika // Istraživač",
    "photoAlt": "Portret Saveliya Byzova",
    "plateCaption": "Sl. 1 — S. Byzov",
    "printLabel": "Štampaj // Sačuvaj kao PDF",
    "readPdf": "Pročitaj autorski rukopis (PDF, na ruskom)",
    "viewSlides": "Pogledaj prezentaciju (PDF, na ruskom)",
    "backToTop": "Nazad na vrh",
    "printNote": "Ovo je skraćena verzija — publikacije, konferencijski nastupi, festivali i volontiranje i još mnogo toga na saveliybyzov.github.io/cv",
    "intro": "Ja sam lingvista i univerzitetski predavač — specijalizovan sam za nastavu engleskog jezika, sociolingvistiku i istoriju engleskog jezika, a istinski me fascinira Severna Evropa: njeni jezici, istorija, i način na koji se kulture sudaraju i prepliću na mapi. Po prirodi sam miran, empatičan i otporan na stres, i zanima me gotovo sve — jezici, kulture, istorija i geografija krajeva iz kojih potiču. Za dve godine na univerzitetu sam predavao, kreirao nekoliko nastavnih programa i mentorisao studentska istraživanja, a paralelno sam godinama prevodio na međunarodnim festivalima. A jednog leta sam sve to ostavio po strani da bih restaurirao svetionik na kraju sveta — više o tome ispod.",
    "labels": {
      "experience": "Iskustvo",
      "education": "Obrazovanje",
      "skillslang": "Veštine, jezici i interesovanja",
      "festivals": "Festivali i volontiranje",
      "activity": "Akademske aktivnosti",
      "publications": "Publikacije",
      "talks": "Konferencijski nastupi",
      "training": "Dodatna obuka",
      "languages": "Jezici",
      "skills": "Veštine",
      "interests": "Interesovanja"
    },
    "campusAlt": "Glavna zgrada SAFU-a u Arhangelsku",
    "campusCaption": "Glavna zgrada SAFU-a, Arhangelsk — foto: Artem Kelarev, javno vlasništvo, Wikimedia Commons",
    "exp1": {
      "title": "Univerzitetski predavač",
      "place": "Katedra za englesku filologiju, jezike severnih zemalja i lingvodidaktiku, Severni arktički federalni univerzitet, Arhangelsk",
      "date": "2024 – 2026",
      "imgAlt": "Držim predavanje studentima",
      "blurb": "Radio sam na SAFU-u — jednom od vodećih univerziteta ruske Arktike i uporištu za arktička istraživanja i obrazovanje: od ekspedicija Arktičkog plutajućeg univerziteta do proučavanja severnih jezika. Univerzitet ima sporazume sa desetinama stranih partnera.",
      "li": [
        "Predavao engleski jezik, sociolingvistiku i istoriju engleskog jezika — kroz moju nastavu prošlo je na desetine studenata u nekoliko grupa",
        "Od nule kreirao pet nastavnih programa — iz praktičnog engleskog jezika, sociolingvistike i istorije engleskog jezika — od strukture kursa do sistema ocenjivanja",
        "Mentorisao tri studentska istraživačka projekta iz lingvistike i regionalne geografije"
      ]
    },
    "exp2": {
      "title": "Muzejski vodič // Prevodilac",
      "place": "Nevjanski državni istorijsko-arhitektonski muzej, Nevjansk",
      "date": "2023",
      "blurb": "Muzej u kom sam radio izgrađen je oko Nevjanske nakošene kule — kule visine 57,5 metara podignute dvadesetih godina XVIII veka za industrijalce Demidove, nagnute skoro dva metra od vertikale, uz legende o lažnom novcu i potopljenim podrumima.",
      "li": [
        "Vodio ture i tematske obilaske o regionalnoj istoriji i arhitekturi za rusko govorne i strane posetioce"
      ]
    },
    "edu1": {
      "title": "Master studije pedagogije",
      "place": "Severni arktički federalni univerzitet, Arhangelsk",
      "date": "2024 – 2026",
      "pre": "Specijalizacija: projektovanje obrazovnih resursa i nastava engleskog jezika u digitalnom okruženju.",
      "programBlurb": "Ovde sam naučio da kreiram kurseve za hibridni i potpuno digitalni format nastave — od izbora EdTech platformi i multimedijalnih materijala do formativnog ocenjivanja i vođenja zajedničkih onlajn projekata.",
      "thesisLabel": "Master rad:",
      "thesis": "Podučavanje kolaborativnog pisanja na engleskom jeziku studentima lingvistike uz pomoć digitalnih alata.",
      "abstract": "U njemu istražujem kako se kolaborativno pisanje — koautorstvo, uzajamno recenziranje i zajedničko uređivanje teksta — može podučavati zajedno sa veštinama timskog rada studentima lingvistike druge godine, na platformi „Jandeks dokumenti“. Oslanjam se na sociokulturnu teoriju pisanja i žanrovski pristup nastavi; sproveo sam probnu nastavu od četiri časa u tri studentske radne grupe, koju sam analizirao kroz istoriju verzija dokumenata i refleksije učesnika."
    },
    "edu2": {
      "title": "Osnovne studije lingvistike",
      "place": "Severni arktički federalni univerzitet, Arhangelsk",
      "date": "2020 – 2024",
      "pre": "Specijalizacija: teorija i praksa interkulturalne komunikacije. Jezici studija: engleski i norveški.",
      "programBlurb": "Na osnovnim studijama sam kombinovao napredno učenje engleskog jezika sa teorijom interkulturalne komunikacije, prevodilačkom praksom i drugim stranim jezikom — u mom slučaju norveškim.",
      "thesisLabel": "Diplomski rad:",
      "thesis": "Komunikativne i govorne taktike u staroengleskom tekstu (na osnovu pesme „San o krstu&rdquo;).",
      "abstract": "Ovde detaljno analiziram pesmu „San o krstu“ — anonimnu staroenglesku pesmu iz VIII veka o raspeću — bavim se komunikativno-govornim taktikama i stilskim sredstvima teksta. Takođe sam sâm preveo celu pesmu, stih po stih, sa staroengleskog na ruski jezik."
    },
    "activity": [
      "Organizovao akademske okrugle stolove i panel diskusije o interkulturalnoj komunikaciji",
      "Držao otvorena predavanja za studente i širu akademsku zajednicu",
      "Učestvovao u radu prijemne komisije univerziteta"
    ],
    "training": [
      "Završio kurs inkluzivnog obrazovanja — rada sa osobama sa invaliditetom",
      "Završio kurs prve pomoći",
      "Godinama sam učio u umetničkoj školi i i dalje solidno vladam akademskim crtanjem"
    ],
    "publications": [
      {
        "title": "Mesto pisanja na stranom jeziku u sistemu kolaborativnog učenja na univerzitetu",
        "meta": "Naučni rad",
        "desc": "Istražujem gde pisanje na stranom jeziku zapravo pripada u sistemu kolaborativnog učenja na univerzitetu, na osnovu nastavnih planova i programa našeg smera Lingvistika. Prolazim kroz faze podučavanja pisanja i kroz ono što studentima zaista otežava zajedničko pisanje — od nedostatka podele uloga do razlika u nivou jezika — i šta se tim povodom može uraditi u digitalnom okruženju."
      },
      {
        "title": "Mogućnosti organizovanja digitalne podrške u nastavi kolaborativnog pisanja na engleskom jeziku na univerzitetu",
        "meta": "Naučni rad",
        "desc": "Istražujem kako cloud editori i wiki platforme pomažu studentima lingvistike da napreduju sa nivoa B1 na B2 u pisanju na engleskom, i predlažem konkretne zadatke i metodičke smernice za organizovanje zajedničkog rada u digitalnom okruženju."
      },
      {
        "title": "Interkulturalni kod u „The Dream of the Rood“: sinteza germanske i hrišćanske tradicije",
        "meta": "Naučni rad",
        "desc": "Pokazujem kako pesma pretvara Hrista u junaka germanske herojske tradicije, dok hrišćansko učenje oblači u jezik ratničke družine — i tvrdim da je to spajanje kodova organsko, a ne mehaničko."
      },
      {
        "title": "Sistem ocenjivanja kolaborativnog pisanja u nastavi pisanja na stranom jeziku kod studenata univerziteta",
        "meta": "Naučni rad",
        "desc": "Predlažem dvokomponentni model ocenjivanja grupnih pisanih zadataka — prema pisanom proizvodu i prema procesu zajedničkog rada — izdvajam ključne kriterijume za ocenu teksta i učešća u grupnoj saradnji i opisujem logiku izrade nivoske rubrike, tako da ocena odražava ne samo završni tekst nego i doprinos svakog učesnika."
      }
    ],
    "talks": [
      {
        "title": "Semantička analiza leksike moći i pokornosti u staroengleskoj pesmi „The Dream of the Rood“",
        "meta": "Arktička čitanja",
        "desc": "Analiziram dva leksičko-semantička polja u pesmi — moć i pokornost — i pokazujem kako tekst ostvaruje pravu inverziju moći: Hrist trijumfuje kroz dobrovoljno stradanje, a Krst, kao veran vazal, trijumfuje kroz pokornost."
      },
      {
        "title": "Toponimijska subordinacija: norveškizacija sami naziva na mapama (XIX–XXI vek)",
        "meta": "Arktička čitanja",
        "desc": "Na primeru mapa Finmarka i Tromsa, tvrdim da norveškizacija sami toponima nije bila slučajna posledica kartografije, već sistematski proces sa prepoznatljivim skupom taktika: kalkiranje, fonetska adaptacija, potpuna zamena, ortografska normalizacija i toponimijsko ćutanje."
      },
      {
        "title": "Norveški jezik u germanskoj jezičkoj porodici: klasifikacija, istorijski put i savremena jezička situacija",
        "meta": "Lomonosovska čitanja",
        "desc": "Pratim mesto norveškog među germanskim jezicima — njegov istorijski put i današnje stanje, uključujući dva zvanična pisana standarda, bukmol i ninorsk."
      },
      {
        "title": "Ostvarivanje komunikativne taktike prezentacije u staroengleskoj pesmi „The Dream of the Rood“",
        "meta": "Jezik. Kultura. Književnost",
        "desc": "Smeštam pesmu u kontekst staroengleske književnosti i istorije njenog proučavanja, definišem komunikativno-govorne taktike i na primerima iz teksta pokazujem kako se u pesmi ostvaruje taktika prezentacije."
      },
      {
        "title": "XVIII vek kao prelazni period u norveškoj likovnoj umetnosti",
        "meta": "Jezik. Kultura. Književnost",
        "desc": "Pratim kako su urbanizacija i pojava novih bogatih gradskih elita u XVIII veku usmerile norvešku umetnost od rezbarenja i dekorativnog rada ka slikarstvu — pre svega portretu, uz pejzaž koji počinje da izlazi u prvi plan — postavljajući temelj za kasniji procvat norveškog slikarstva."
      }
    ],
    "langs": [
      {
        "name": "Engleski",
        "level": "C1 // Napredni"
      },
      {
        "name": "Ruski",
        "level": "Maternji"
      },
      {
        "name": "Norveški",
        "level": "B1 // Srednji"
      }
    ],
    "skills": [
      { "icon": "teaching", "title": "Univerzitetska nastava i razvoj kurikuluma", "desc": "Od nule sam kreirao pet nastavnih programa — iz praktičnog engleskog i istorije jezika — od strukture kursa do sistema ocenjivanja." },
      { "icon": "writing", "title": "Akademsko pisanje i istraživanje (EN/RU)", "desc": "Pišem naučne radove, a pomažem i studentima da svoja istraživanja dovedu do publikacije — od prvog nacrta do finalne redakture." },
      { "icon": "translate", "title": "Pismeno i usmeno prevođenje (EN–RU)", "desc": "Godinama sam prevodio na velikim i malim festivalima, kao i na privatnim događajima — od simultanog prevoda na bini do šapatnog prevoda u kuloarima." },
      { "icon": "edtech", "title": "Digitalno učenje i EdTech alati", "desc": "Izučavao sam EdTech metodologiju na master studijama i primenjujem je u sopstvenoj nastavi — a i u svojoj disertaciji." },
      { "icon": "speaking", "title": "Javni nastup", "desc": "Često držim predavanja i istinski uživam u nastupu pred publikom — otvoreno predavanje, konferencija ili festival, svejedno mi je, samo da pričam." }
    ],
    "festA": {
      "crew": [
        "Levo od mene na fotografiji je ",
        {
          "a": "Mark",
          "href": "https://mkostarev.com/"
        },
        ", vrlo dobar stručnjak za GIS; ako vam zatreba, slobodno mu se javite. Tamo je bila i moja verenica ",
        {
          "a": "Saša",
          "href": "https://toropova-edu.github.io/cv/#/education"
        },
        ": razume se u morsku biologiju i kitove, pa se obratite i njoj."
      ],
      "title": "Volonter – restauracija svetionika",
      "place": "Zimnegorski svetionik, obala Belog mora",
      "date": "Leto 2025",
      "desc": "Proveo sam dve nedelje sa malom ekipom volontera restaurirajući drvenu konstrukciju Zimnegorskog svetionika u tesnacu Grlo Belog mora — svetionika koji radi od 1878. godine, čija svetlost sija sa visine od 126 metara iznad mora, i jedne od volonterskih ekspedicija ka istorijskim svetionicima i meteorološkim stanicama u ruskoj Arktici. Dani su prolazili u nošenju drvene građe i obnavljanju stepenica i krovnih greda, uz otkriće koliko stolarskih poslova još uvek traži stari svetionik.",
      "alt": "Volonteri obnavljaju drvenu konstrukciju Zimnegorskog svetionika"
    },
    "festB": {
      "title": "Prevodilac // Volonter",
      "place": "Međunarodni festival uličnog pozorišta, Arhangelsk",
      "date": "2024",
      "desc": "Omogućavao sam komunikaciju između stranih pozorišnih trupa i lokalnih volontera na Međunarodnom festivalu uličnog pozorišta u Arhangelsku — najstarijem festivalu uličnog pozorišta u Rusiji, koji se održava od 1990. godine na inicijativu umetničkog direktora Arhangelskog omladinskog pozorišta Viktora Panova, a 1992. godine je uključen u program UNESCO-a „Svetska decenija kulturnog razvoja“. Tradicionalno počinje karnevalskom povorkom, a poslednjih godina se završava na Dan grada — od proba do kasnonoćnog rastavljanja scenografije pored vode.",
      "alt": "Pogled sa festivalske bine na luku u sumrak"
    },
    "festC": {
      "title": "Prevodilac // Volonter",
      "place": "Međunarodni festival „Arctic Open”, Arhangelsk",
      "date": "2023",
      "desc": "Pružao sam usmeni prevod sa engleskog na ruski za strane goste i reditelje na Međunarodnom filmskom festivalu „Arctic Open” — pokrenutom 2017. godine, uz partnerstvo Severnog (Arktičkog) federalnog univerziteta, mog univerziteta; festival okuplja filmske stvaraoce iz Rusije, Kanade, skandinavskih zemalja i SAD, a prikazivanja se održavaju u Arhangelsku, Severodvinsku i Novodvinsku.",
      "alt": "Saveliy na bini festivala Arctic Open"
    },
    "festD": {
      "title": "Volonter — jubilarna izložba",
      "place": "Arhangelski omladinski pozorište, Gostini dvor",
      "date": "Leto 2023",
      "desc": "Pomagao sam u postavljanju izložbe-lavirinta „Ovde ne bi stajalo ništa da nije bilo tebe” — uoči 50 godina Arhangelskog omladinskog pozorišta, smeštene u šest prostora u dve dvorane Gostinog dvora. Postavka je pratila put osnivača pozorišta Viktora Panova — uključujući oporavak od preloma kičme — kroz kostime, rekvizite, arhivske fotografije, glasove glumaca i nova dela mladih umetnika iz Vladikavkaza, Jekaterinburga, Moskve i Peterburga, odabranih javnim konkursom.",
      "alt": "Plakat izložbe „Ovde ne bi stajalo ništa da nije bilo tebe”"
    },
    "interests": [
      { "icon": "music", "title": "Muzika", "desc": "Veliki sam ljubitelj muzike uopšte, ali imam posebnu slabost prema Džoniju Kešu i kantri žanru." },
      { "icon": "reading", "title": "Čitanje", "desc": "Omiljeni pisac mi je Frensis Skot Ficdžerald." },
      { "icon": "drawing", "title": "Crtanje", "desc": "Godine umetničke škole ostavile su trag — i dalje volim da sednem i crtam kad mi se ukaže prilika." },
      { "icon": "hiking", "title": "Planinarenje i pešačenje", "desc": "Čitavu mladost sam proveo u planinarskom klubu i i dalje redovno idem na ekspedicije." },
      { "icon": "travel", "title": "Putovanja", "desc": "Sledeće sanjam o Skandinaviji i Aljasci — Srbija je bila san, sve dok nije postala dom." },
      { "icon": "woodwork", "title": "Rezbarenje i stolarstvo", "desc": "U slobodno vreme sopstvenim rukama pravim štitove i gradim staklenike." }
    ],
    "footer": "Saveliy Byzov // Beograd, Srbija // "
  }
};

/* ---- Added for the multi-page layout. The strings below were agreed with the
   owner; they are merged into T so the rest of the site reads from one object. ---- */
const T_EXTRA = {
  en: {
    labels: {
      research: "Research",
      teaching: "Teaching",
      interpreting: "Interpreting",
      now: "Now",
      openTo: "Open to"
    },
    cvLabel: "Download CV (PDF)",
    homeLabel: "Home",
    now: "Belgrade. Looking for a lecturing or research position.",
    openTo: "university teaching; research and doctoral study; EN–RU interpreting; tutoring, editing and written translation.",
    research: "I study the history of the languages of Northern Europe: how they formed, changed and met other traditions. I began with Old English. In my bachelor’s thesis I analysed the communicative and rhetorical tactics of “The Dream of the Rood” and translated the whole poem into Russian; in a paper I argue that its blend of Germanic and Christian codes is a deliberate device, and in a talk I show how power and subordination trade places in it. I ask the same questions of other languages of the North: where Norwegian sits in the Germanic family, how Bokmål and Nynorsk vie with each other, and how Sámi place names on maps of Finnmark and Troms were Norwegianised between the 19th and 21st centuries. Next I want to work on the history of English: the vocabulary, dialect diversity and sociolinguistic landscape of Old English, and the dialect diversity of present-day English.",
    teaching: "My aim in class is that everyone speaks: I help students get past the language barrier, and I give them not only grammar, vocabulary and phonetics but also the history, culture and everyday life of English-speaking countries. I teach English, the history of English and sociolinguistics to Linguistics students, and I design entire courses, from structure and materials to assessment — five so far. Collaboration is the second pillar: my master’s dissertation and two papers are about teaching students to write, peer-review and edit a shared document in a digital environment. Outside class, I supervised three student research projects.",
    interpreting: "EN → RU and RU → EN interpreting since 2017: simultaneous, consecutive and escort. I have interpreted in Arkhangelsk at the Arctic Open International Film Festival (2023) and the International Street Theatre Festival (2024), and at private events.",
    cards: {
      experience: "University lecturer, museum guide, teaching approach",
      research: "Four papers, five conference talks, manuscripts to read",
      education: "Master’s in Pedagogy, Bachelor’s in Linguistics",
      skillslang: "Teaching, interpreting, languages and interests",
      festivals: "Interpreting at festivals, a lighthouse, an exhibition"
    }
  },
  ru: {
    labels: {
      research: "Исследования",
      teaching: "Преподавание",
      interpreting: "Устный перевод",
      now: "Сейчас",
      openTo: "Открыт к"
    },
    cvLabel: "Скачать резюме (PDF)",
    homeLabel: "Главная",
    now: "Белград. Ищу работу преподавателя или исследователя.",
    openTo: "преподаванию в вузе; исследованиям и аспирантуре; устному переводу (англ.–рус.); репетиторству, редактуре и письменному переводу.",
    research: "Я изучаю историю языков Северной Европы: как они складывались, менялись и сталкивались с чужими традициями. Начал с древнеанглийского. В дипломной работе я разобрал коммуникативные и речевые тактики поэмы «Видение Креста» и перевёл её на русский целиком; в статье показываю, что соединение германского и христианского кодов в тексте — осознанный приём, а в докладе — как в ней меняются местами власть и подчинение. Те же вопросы я задаю материалу других языков Севера: каково место норвежского в германской семье, как соперничают букмол и нюнорск и как шла норвегизация саамских названий на картах Финнмарка и Тромса в XIX–XXI веках. Дальше я хочу заняться историей английского языка: лексикой, диалектным разнообразием и социолингвистической картиной древнеанглийского, а также диалектным разнообразием современного английского.",
    teaching: "Моя цель на занятии — чтобы говорили все: я учу преодолевать языковой барьер и даю студентам не только грамматику, лексику и фонетику, но и историю, культуру и быт англоязычных стран. Я преподаю английский язык, историю английского языка и социолингвистику студентам-лингвистам и разрабатываю курсы целиком, от структуры и материалов до оценивания; так появились пять моих программ. Вторая опора — совместная работа: магистерская диссертация и две статьи посвящены тому, как учить студентов вместе писать, рецензировать и править общий документ в цифровой среде. Помимо занятий, я руководил тремя студенческими исследовательскими проектами.",
    interpreting: "Устный перевод с английского на русский и обратно с 2017 года: синхронный, последовательный, сопровождающий. Переводил в Архангельске на Международном кинофестивале «Arctic Open» (2023) и Международном фестивале уличных театров (2024), а также на частных мероприятиях.",
    cards: {
      experience: "Преподаватель вуза, экскурсовод, подход к преподаванию",
      research: "Четыре статьи, пять докладов, рукописи для чтения",
      education: "Магистратура по педагогике, бакалавриат по лингвистике",
      skillslang: "Преподавание, перевод, языки и интересы",
      festivals: "Перевод на фестивалях, маяк, выставка"
    }
  },
  sr: {
    labels: {
      research: "Istraživanja",
      teaching: "Nastava",
      interpreting: "Usmeno prevođenje",
      now: "Sada",
      openTo: "Otvoren za"
    },
    cvLabel: "Preuzmi CV (PDF)",
    homeLabel: "Početna",
    now: "Beograd. Tražim mesto predavača ili istraživača.",
    openTo: "nastavu na univerzitetu; istraživanje i doktorske studije; usmeno prevođenje EN–RU; privatne časove, redakturu i pismeno prevođenje.",
    research: "Istražujem istoriju jezika severne Evrope: kako su nastajali, menjali se i susretali sa tuđim tradicijama. Počeo sam od staroengleskog. U diplomskom radu analizirao sam komunikativne i govorne taktike pesme „San o krstu” i preveo sam je u celosti na ruski; u naučnom radu pokazujem da je spoj germanskog i hrišćanskog koda u tekstu svestan postupak, a u izlaganju kako moć i pokornost u njoj menjaju mesta. Ista pitanja postavljam i drugim jezicima Severa: kakvo je mesto norveškog u germanskoj porodici, kako se nadmeću bukmol i ninorsk i kako je tekla norveškizacija samskih naziva na kartama Finmarka i Tromsa od 19. do 21. veka. Dalje želim da se bavim istorijom engleskog jezika: leksikom, dijalekatskom raznovrsnošću i sociolingvističkim pejzažom staroengleskog, kao i dijalekatskom raznovrsnošću savremenog engleskog.",
    teaching: "Cilj mi je da na času govore svi: pomažem studentima da prevaziđu jezičku barijeru i dajem im ne samo gramatiku, leksiku i fonetiku nego i istoriju, kulturu i svakodnevicu zemalja engleskog govornog područja. Predajem engleski jezik, istoriju engleskog jezika i sociolingvistiku studentima lingvistike, a kurseve kreiram celovito, od strukture i materijala do ocenjivanja; do sada pet nastavnih programa. Drugi stub je saradnja: moj master rad i dva naučna rada posvećeni su tome kako podučavati studente da zajedno pišu, uzajamno recenziraju i uređuju zajednički dokument u digitalnom okruženju. Pored nastave, mentorisao sam tri studentska istraživačka projekta.",
    interpreting: "Usmeno prevođenje EN → RU i RU → EN od 2017. godine: simultano, konsekutivno i prevođenje u pratnji. Prevodio sam u Arhangelsku na Međunarodnom filmskom festivalu „Arctic Open” (2023) i Međunarodnom festivalu uličnog pozorišta (2024), kao i na privatnim događajima.",
    cards: {
      experience: "Predavač na univerzitetu, vodič u muzeju, pristup nastavi",
      research: "Četiri rada, pet izlaganja, rukopisi za čitanje",
      education: "Master iz pedagogije, osnovne studije lingvistike",
      skillslang: "Nastava, prevođenje, jezici i interesi",
      festivals: "Prevođenje na festivalima, svetionik, izložba"
    }
  }
};
Object.keys(T_EXTRA).forEach(function(l){
  const x = T_EXTRA[l];
  Object.assign(T[l].labels, x.labels);
  T[l].cvLabel = x.cvLabel; T[l].homeLabel = x.homeLabel;
  T[l].now = x.now; T[l].openTo = x.openTo;
  T[l].research = x.research; T[l].teaching = x.teaching; T[l].interpreting = x.interpreting;
  T[l].cards = x.cards;
});
