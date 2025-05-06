/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */







const linkTextContent = [
  "- Open House",
  "A Lecture with Dan Goleman",
  "A and D Handbook",
  "A boulder marks the location where Brister Freeman's house is thought to have stood in Walden Woods. (Courtesy of the Walden Woods Project)",
  "A crossroads with orange cones and a railroad crossing gate.",
  "A gallery visitor wearing a blue shirt seen from behind looking at art on the wall.",
  "A. Dean Irby",
  "A. Dean Irby, associate professor of acting",
  "A/way by Derek Shane Garcia '13",
  "ACE Purchase",
  "AJ Jordan '15",
  "ARTS TOURS",
  "ASK A COUNSELOR",
  "AUDELCO Awards 50 Logo",
  "AW25: Alumni Showcase",
  "About",
  "About Purchase College",
  "About Us",
  "About the Program",
  "Abrielle Scharff and her Band on stage",
  "Academic Calendar",
  "Academics Purchase College",
  "Accepted Students",
  "Accessibility Barrier form",
  "Accessibility Initiatives & Updates",
  "Accessibility Purchase College",
  "Account Activation / Password Reset",
  "Account Locked Out",
  "Accreditation",
  "Acting BFA",
  "Acting Network",
  "Acting Purchase College",
  "Acting majors Tachynel Merveille and Destiny Barbour won the Audience Favorite Award",
  "Actor Nicco Annan '98 as Uncle Clifford in Starz drama P-Valley",
  "Adam Birnbaum",
  "Adam Nagourney ’77",
  "Admissions Policies",
  "Admissions Purchase College",
  "Adon Cooper '09",
  "Adotei Akwei ’84",
  "Adriana Arguelles ’13",
  "Adult Noncredit Programs Purchase College",
  "Advising Center",
  "Advising Support",
  "Affinity Group",
  "Affirmative Action",
  "Affirmative Action Plan",
  "Alano Miller ’02",
  "Album Cover",
  "Alessandro Chillé",
  "Alfredo Garcia-Pardo",
  "Alice Selipanov '21",
  "Allison Loggins-Hull '05",
  "Alumni",
  "Alumni Association",
  "Alumni Ben Green '15",
  "Alumni Purchase College",
  "Alumni Showcase",
  "Alumni Weekend 2025 Postcard",
  "Alyce Gilbert",
  "Amanda Seales '03",
  "Amelia Ponirakis '23 at the Buffalo International Film Festival",
  "American Riad Project in Detroit.",
  "Anaïs Reno performs on September 11, 2021 at Citifield.",
  "Andrea Patterson '05",
  "Andrea Thome",
  "Andrew Pharmer '90",
  "Andrew Salomon at the Alumni Mixer for Journalism and Writing Majors",
  "Angela Galli ’19",
  "Angie Kim, sustainability coordinator",
  "Anita Yavich",
  "Anne Kern Awarded Chevalier of the Order of Arts and Letters",
  "Announcements",
  "Anonymous Workplace Violence Report",
  "Anthropology Professor Lorraine Plourde on The Urbanist podcast",
  "Anthropology Purchase College",
  "Application Details",
  "Apply",
  "Are there vending machines in the Library? Can I buy food in the Library?",
  "Argos Reports",
  "Art History (MA) Purchase College",
  "Art History Purchase College",
  "Art in Public Places / Quantum Leap by Isaiah Ship",
  "Art in Vacant Spaces window 2018, “A Woman",
  "Art+Design BFA / BS",
  "Art+Design Events",
  "Artist Janet Langsam working in her studio circa 1970. Photo courtesy of Janet Langsam.",
  "Artist Michael Rakowitz '95",
  "Artist in Residence Ignacio Iturria in the studio with students",
  "Artists and Hackers logo in text with drawing of hand on digital device",
  "Arts Abroad Program",
  "Arts Abroad Program Students",
  "Arts Management Purchase College",
  "Arts Open Access School of the Arts Purchase College",
  "Asian American woman in blue with elbow in the air",
  "Asian Studies Purchase College",
  "Assistant Professor of Communications Megan Rossman (Photo: Bri Elledge)",
  "Associate Professor of Chemistry Stephen Cooke",
  "Asst. Professor David DeJesus",
  "Athletic Information",
  "Athletics",
  "Audio Visual Equipment Loans",
  "Author Jiaming Tang ’18 Discusses Debut Novel",
  "Authors Hari Kunzru and Katie Kitamura on stage during the Durst Distinguished Lecture Series.",
  "Avant Projekts",
  "Awards",
  "Aya Keefe",
  "Azazel Jacobs ’94 visits to screen HIS THREE DAUGHTERS",
  "Bachelor of Music",
  "BalletX to Perform Work by Choreographer Nicolo Fonte ’87",
  "Banner Administrator",
  "Behind the Brick: Gen Bio I Lab",
  "Benefits Information",
  "Benefits and Perks",
  "Benjamin Chalson ’20",
  "Big Differences",
  "Bill Junor Email",
  "Bill Sage '88 in The New Group's The Seagull/Woodstock",
  "Biochemistry Purchase College",
  "Biology Purchase College",
  "Bioswale in the West 1 Parking Lot",
  "Blake Pfeil MA '19",
  "Blood Wedding",
  "Blue badge with yellow stripe and white globe",
  "Books on physical reserve at the Library",
  "Brian Kavanaugh '05 Earns Fulbright Award",
  "Brian MacDevitt '80",
  "Brian Otaño '11",
  "Brian Peterkin with Chief Tucker in front of new mural.",
  "Brianna Agront",
  "Brightspace",
  "Britney DiTocco '20",
  "Brittany Petronella '16 (photography, art history minor)",
  "Brittny Cooper '15",
  "Broadcast Email (BEM)",
  "Broadcast TV Studio Provides Professional Experience",
  "Broadview",
  "Broadway Technical Theatre History Project",
  "Bryan Korn",
  "Bubble P logo with Man Booker Prize logo",
  "Bus Service",
  "Buttons made at the library",
  "CAMPUS VISIT CALENDAR",
  "CASA Purchase",
  "COVID-19 Reporting Form",
  "COVID-19 Updates",
  "CTS Live Helpdesk Support",
  "CTS Video Chat Tech Support Helpdesk",
  "CTS/FMG Work Orders and Equipment Loans",
  "Cain Coleman",
  "Cain Coleman '09-'11",
  "Caleb Dowden '21 (dance)",
  "Caleb Eberhardt '12 in glasses and a blue button down shirt with arms crossed",
  "Calendar News Purchase College",
  "Camille Seaman '92 The Lemaire Channel off the off the west coast of the Antarctic Peninsula",
  "Camille Seaman '92 at the Oceti Sakowin Camp",
  "Campus Computer Labs",
  "Campus Directory",
  "Campus Life Purchase College",
  "Campus Map",
  "Campus Resources Guide",
  "Campus Smart Classrooms",
  "Campus in the Fall",
  "Can I use a business account for my Direct Deposit?",
  "Career Development Center",
  "Career Readiness",
  "Careers in Biology",
  "Carl Safina '77 (Photo: Kizza Vincent)",
  "Carlie Hoffman, Lecturer in Creative Writing",
  "Carter Hudson '09",
  "Cassidy Rose Hammond ’17",
  "Cast of ABC's Abbott Elementary",
  "Cecellia Koueth",
  "Celeste Arias as Eléna and Jay O. Sanders as Ványa in Uncle Vanya",
  "Cellist and Lecturer Thomas Mesa",
  "Center for Engagement, The",
  "Center for Production Services",
  "Chancellor King stands at a table chatting with EOP students.",
  "Chasing Coral documentary still",
  "Chelsea Spengemann, MA ’11",
  "Chemistry Purchase College",
  "Cheyenne Myrie ’17",
  "Children",
  "Chinese Purchase College",
  "Chosen Name Policy",
  "Chris Perfetti ’11",
  "Christian",
  "Christian Bailey",
  "Cinema Studies Students Attend Film Archiving Conference",
  "Cinema and Television Studies Purchase College",
  "Claire Giegerich '23",
  "Claribel Ortega '10",
  "Claribel Ortega ’10",
  "Claudia Logan '18",
  "Clint Ramos",
  "Closer Look: Biotech Concentration",
  "Clubs and Organizations",
  "Colby Hollman '19 (acting)",
  "Collections",
  "College Catalog",
  "College Policies",
  "College Services",
  "College and Expository Writing Program School of Humanities Purchase College",
  "Colm McCarthy ’09",
  "Comedy of Errors",
  "Commencement 2016",
  "Commencement Information",
  "Communication Options",
  "Communications Purchase College",
  "Community Assessment, Response and Education (CARE) Team",
  "Community Services",
  "Company 49 in Gint (Written by Romulus Linney",
  "Composition (Classical) Purchase College",
  "Concentrations Biology Purchase College",
  "Conceptual artist Fred Wilson '76",
  "Concert Hall, The Performing Arts Center",
  "Concrete house on a distant hillside surrounded by trees and greens with a blue sky",
  "ConnectiveCollective on view at the Neuberger Museum of Art through June 27",
  "Connie Tsang, Lecturer in Film",
  "Conservatory of Dance",
  "Conservatory of Dance students take part in a film to announce the launch of Mugler Creators to support talented contemporary dance and m...",
  "Conservatory of Music",
  "Conservatory of Theatre Arts",
  "Contact Our Team",
  "Contact Us",
  "Contact Us About Purchase College",
  "Contemplative Studies Purchase College",
  "Continuing Education Course Proposal Form",
  "Coral Reef Program",
  "Cornerstone Connect",
  "Coronation of Poppea",
  "Counseling and Behavioral Health Services",
  "Course Load and Overload",
  "Course Reserves Request Forms",
  "Course Scheduling",
  "Course Search",
  "Courses",
  "Courses and programs through online partners",
  "Cover of Dance Magazine January 2018 issue",
  "Cover of Dance magazine",
  "Creative Writing BA",
  "Creative Writing Purchase College",
  "Creator/star Quinta Brunson and Chris Perfetti on the ABC sitcom Abbott Elementary. (Photo: Christopher Willard/",
  "Cross Registration",
  "Curator Patrice Giasson; Engels the artist; Cindy Millin; Instructor Felix Matta-Fletcher; Alessandra Russo; Leonardo Giasson.",
  "Current Senior Acting Company",
  "Current Students Portals Purchase College",
  "Curtis Brodner '19",
  "Cyrille Aimée '08",
  "Da'Vine Joy Randolph poses with the Supporting Actress Award for 'The Holdovers' in the winners room during the EE BAFTA Film Awards 2024...",
  "Daffodils on campus",
  "Damali O'Keefe '22",
  "Damani Bissett '21",
  "Damani Pompey '12 (Photo: Conor McNamara)",
  "Dan Deacon '04",
  "Dan Romer",
  "Dan Romer '04",
  "Dana Freeman '25",
  "Dance BFA",
  "Dance Performance Purchase College",
  "Dance Performance: Ballet",
  "Dance Performance: Composition",
  "Dance Performance: Production",
  "Dancer Jojo Boykins '18 featured on PBS' new ALLARTS channel (dancing in the Dance Building lobby)",
  "Dancers perform on stage",
  "Dane Laffrey",
  "Daniela Gomez Paz",
  "Danniel Schoonebeek '08",
  "Darryl Rahn '15",
  "Dava Huesca '19",
  "Dave Grill",
  "Dave Grill '86",
  "David",
  "David Bassuk, Professor of Acting",
  "David Graeber, 2016",
  "David Grill '86",
  "David Grill '86 and student look at stage model",
  "David Handschuh stands on a bridge with belt straps attached to the railings",
  "David Rosenberg",
  "Debora Martinez '22",
  "Debut Novel by Emily Ruth Verona ’12 With Nods to Cinema",
  "Declan Moore '19 and Dave Grill '86 at Super Bowl 2019",
  "Desert owl sitting on a driftwood branch near the Ask a Librarian logo. Text reads wild about the library. Explore the research frontier wi",
  "Design Tech student Megan Seibel with her professor Dave Grill at the Super Bowl",
  "Device Assignment Tracking (DAT)",
  "Dining",
  "Dining Dollars",
  "Directions",
  "Directions and Parking",
  "Director",
  "Diversity",
  "Diversity and Compliance",
  "Do I have to submit a paper copy of my Student Project to the Library?",
  "Does the Library have graphic novels and comics? Where are they?",
  "Does the Library have popular fiction? Where is the popular reading collection?",
  "Doug Varone ’78",
  "Douglas Shindler and Michael Davis",
  "Dr. Kristina Johnson, incoming SUNY Chancellor",
  "Dr. Milagros Milly Peña",
  "Dr. Stephen Harris",
  "Drama Desk Awards in gold with a feather award between the words.",
  "Drama Desk Awards logo",
  "E-Portfolios",
  "EMERGENCY BLUE LIGHT PHONES",
  "Early Childhood Development",
  "Economics",
  "Edie Falco",
  "Editorial Style Guide",
  "Education Studies",
  "Educational Opportunity Program",
  "Edwidge Danticat",
  "Eight-Semester Graduation Plan",
  "Eight-Semester Graduation Plans",
  "Electronic / Digital Accessibility",
  "Electronic Information Technology Accessibility (EITA) Policy",
  "Elizabeth Bardwil-Lugones ’21",
  "Elizabeth Cook '20 (acting)",
  "Elliott Abrams, PhD",
  "Email",
  "Emergency Alerts Sign-up",
  "Emergency Guide",
  "Emily Carragher '06",
  "Emily Ruth Verona '12",
  "Emily Verona ’12",
  "Emma Caymares'12",
  "Emma Porter '18",
  "English",
  "English and Global Literatures",
  "Enrollment and Degree Verification",
  "Entrance to the Broadview complex",
  "Entrepreneurship in the Arts",
  "Entrepreneurship in the Arts major Shannon Dawson",
  "Environmental Health and Safety",
  "Environmental Studies",
  "Eric Gottesman",
  "Eric Hahn ’14",
  "Erik Spink '11",
  "Erik Spink, Meet Me in the Meadow, 2021",
  "Erika Ebbs",
  "Erika Ebbs, PhD",
  "Erin Sullivan '12 (Photo: Renee Hahnel)",
  "Erin Sullivan ’12",
  "Ernestine White-Mifetu '99 (Photo: Raphael Mifetu)",
  "Event Accessibility",
  "Events",
  "Explore Majors",
  "Expose",
  "F A Q about the TLTC",
  "FERPA",
  "FERPA Training",
  "FEUD: BETTE & JOAN Stanley Tucci '82 as Jack Warner",
  "Facilities",
  "Facts and Stats",
  "Faculty",
  "Faculty Handbook",
  "Faculty and Staff",
  "Faculty and Staff News Purchase College",
  "Fall and spring courses",
  "Family Day",
  "Fatoumata Fadiga",
  "Fellowships and Awards",
  "File a Report",
  "Film",
  "Film still from On The Ridge by Ruby Rose Makkena '23",
  "Film still from Princesa by Melanie Rosete",
  "Film/Video Production",
  "Filmmaker Mattson Tomlin '12",
  "Final Exam Schedule",
  "Financial Assistance Information",
  "Financial Literacy",
  "First Year",
  "Fiske Guide to Colleges",
  "Fiske Guide to Colleges 2019 Badge",
  "Fiske Guide to Colleges 2025: “Unique Within the SUNY System”",
  "Fiske Guide to Colleges Best Buy School",
  "Fiske Guide to Colleges book cover",
  "Five Oceans in a Teaspoon Front Cover",
  "Flowers in the Purchase Native Pollinator Garden",
  "Food Pantry sign",
  "Ford V Ferrari movie (Merrick Morton/20th Century Fox)",
  "Forms and Policies",
  "Foundations Program Purchase College",
  "Fred Wilson '76, Passionate Artist",
  "French",
  "Frequently Asked Questions",
  "From left",
  "Furniture artist Sophie Glenn '12",
  "GRAMMY Awards® logo (illustration of gold gramophone on a brown base)",
  "Gabriel Fridkis",
  "Gabriella Shery '21",
  "Gainful Employment Programs",
  "Garth Greenwell",
  "Garth Greenwell '01 (Photo: William J. Adams)",
  "Gender Studies",
  "General Education",
  "General Studies",
  "George Kraemer, PhD",
  "Get Involved",
  "Gianna Caranfa '15 Inside her new tattoo parlor Bee Inked. (Mark Vergari/The Journal News)",
  "Gilman Scholarship Spotlight: Frankie Bademci ’23",
  "Gina Belafonte ’83",
  "Give to Purchase Purchase College",
  "Global Black Studies",
  "Global Education, Office for",
  "Global Scholars",
  "Global Scholars students visit the UN",
  "Global Studies",
  "Glossary",
  "Glossary of Terms",
  "Graduate",
  "Graduate Programs",
  "Graduate Students",
  "Graduation and Diplomas",
  "Grammy Awards: Big Night for Jazz Studies",
  "Graphic Design",
  "Graphic Design: Illustration",
  "Graphic Novels",
  "Great Potential",
  "Gregory Spears",
  "Group of young people sit and look in same direction.",
  "Guides & Tools",
  "HR Employment Forms",
  "HRETS",
  "Hal Hartley '84 (Photo: Michael Koshkin)",
  "Halloween Edition of CINEMAROLL is now out",
  "Hand in blue latex glove holds a pill between thumb and index finger on a pink background",
  "Hands-On Learning",
  "Hannah Garner '15 (Credit: Mike Lindle)",
  "Harbor Center for Health Promotion",
  "Harley",
  "Health Forms",
  "Health and Safety",
  "Health and Wellness",
  "High School Counselors",
  "History",
  "Housing",
  "How and where do I update my home address?",
  "How can I obtain a Westchester Library System card?",
  "How do I access HRETS and upload documents to the Employee Data Sheet?",
  "How do I add the ThinkingStorm Online Tutoring connection to my Brightspace Moodle course?",
  "How do I add the ThinkingStorm Online Tutoring connection to my Brightspace course?",
  "How do I adjust/change my tax dependents, deductions, etc.?",
  "How do I change my direct deposit account information?",
  "How do I get help with D2L Brightspace?",
  "How do I notify my department of my intention to retire?",
  "How do I pay a fine at the Library?",
  "How do I set-up Direct Deposit?",
  "How do I start collecting my pension?",
  "How do I use Turnitin to check my own drafts for originality?",
  "How do I use Turnitin? How can I check my own drafts for originality?",
  "How do I view materials in Special Collections & Archives?",
  "How is the monthly lifetime credit calculated?",
  "How long does my Direct Deposit information stay active?",
  "How to Apply",
  "How will I pay for my retiree health insurance/prescription drug coverage if my monthly credit does not cover the full cost of the monthly premium?",
  "How will I pay for my retiree health insurance/prescription drug coverage?",
  "How will my covered spouse pay for the retiree health insurance coverage after my death?",
  "Human Resources Employee Tracking System (HRETS)",
  "Humanities Events",
  "Hunter Hollingsworth '22",
  "Hunter Hollingsworth-Harris '22",
  "Hunter Zimny '16",
  "IIN Graduate One of 7 Black Entrepreneurs Changing the Face of the Health and Wellness Industry",
  "INSIDE LOOK",
  "ITAC Learning Space Conditions Survey 2021",
  "Ian Antonio",
  "If I am using a joint account for my Direct Deposit",
  "If I predecease my covered spouse after retirement",
  "Imani Parker '20",
  "Impact Stories",
  "Information Privacy Campus Technology Services Purchase College",
  "Inside the Facilities",
  "Instagram Post from Issa Dance Look",
  "Institutional Learning Outcomes",
  "Institutional Research, Office of",
  "Institutional Review Board",
  "Instrumental Performance",
  "Instrumental Performance: Brass",
  "Instrumental Performance: Classical Guitar",
  "Instrumental Performance: Harp",
  "Instrumental Performance: Percussion",
  "Instrumental Performance: Piano",
  "Instrumental Performance: Strings",
  "Instrumental Performance: Woodwinds",
  "Interactive Map About Purchase College",
  "Interested in applying to Purchase College?",
  "Intergenerational Learning",
  "Interim President Dennis Craig and Chief Diversity Officer Jerima DeWese stand below the large clock on campus.",
  "Internal Control, Office of",
  "International Students",
  "Internships",
  "Iquail Shaheed MFA '12",
  "Is there wifi (wireless internet) ? How do I access the wifi network? Can guests use wifi?",
  "Isaac Zal ’04 Turns Artists’ Visions into Metal Masterworks",
  "Italian",
  "Ivan Forde '12",
  "Jaden Doret ’23",
  "Jai Perez ’23",
  "Jakob",
  "Jakub Ciupinski",
  "Jakub Ciupinski Headshot",
  "James G. Daly, PhD",
  "James Ortiz '10",
  "James Spione ’85",
  "Jan Robert Factor, PhD",
  "Jandon Lecture Series",
  "Janet Rollé '84",
  "Janette Yarwood '96",
  "Janette Yarwood ’96",
  "Jason Rodriguez '12 (Courtesy Santiago Felipe/RRR Creative)",
  "Jaya Mohanan Lakshmi ’99",
  "Jazz Studies",
  "Jazz vocalist Samara Joy '21 (Photo: Meredith Truax)",
  "Jeanne Markel '81 and Chris Wedge '81",
  "Jeff Croiter '93",
  "Jeffrey Arroyo",
  "Jen Schriever",
  "Jen Schriever '04",
  "Jenar Antar '18",
  "Jennifer Mogbock '13",
  "Jessica Levy",
  "Jessica Maffia MFA '24",
  "Jesus Christ Superstar Live in Concert / Ben Green '15 earned Emmy nomination for lighting direction.",
  "Jewish Studies",
  "Jiaming Tang '18",
  "Jiaming “Andy Tang '18",
  "Jill Bargonetti ’85",
  "Jodi Long '76 Holds Up her Daytime Emmy® Award",
  "Joe Matoske '10",
  "Joey Katz '18",
  "John Ambroseo ’83",
  "Join Our Mailing List",
  "Jon Faddis",
  "Jon Samson '03 wins a Grammy for Best Childrens Album",
  "Jonah Westerman",
  "Jonathan Harris '20",
  "Jordan Mclean ’06, MM ’20",
  "Jordan Shue",
  "Jordan Tetewsky '16 (film)",
  "Jordan Tetewsky '16 at Woodstock Film Festival",
  "Jorge Acuna ’20",
  "Joseph A. Skrivanek, PhD",
  "Joseph A. Skrivanek, professor of chemistry",
  "Joseph Skrivanek",
  "Josh Abess ’12",
  "Joshua Lutz",
  "Jostedalsbreen Glacier, Norway",
  "Journalism",
  "Jovan Dansberry in Bob Fosse's Dancin' (Photo: Julieta Cervantes)",
  "Joy-Marie Thompson ’18",
  "Julianne Waber '17",
  "Juneteenth We Breathe Black art exhibition logo",
  "Kamala Sankaram",
  "Kamala Sankaram Headshet",
  "Karen T. Beltran ’02",
  "Kate Gilmore",
  "Katie Kresek '98, '99",
  "Kayla Cashetta Headshot",
  "Keerati Jinakunwiphat choreographing her new ballet for New York City Ballet",
  "Kelly Hayes '19",
  "Kerry LeVielle '17 (cinema studies)",
  "Khlaif Tahir Thompson '18",
  "Kris Graves ’04",
  "Kris Graves' 04",
  "Kristen Galvin ’08",
  "Kunga Choephel '23",
  "Kyle Abraham '00",
  "Kyle Abraham '00 (Dear Lord by AIM)",
  "Kyle Abraham '00 (Photo: Tatiana Will)",
  "LA Dance Project (from preview performances of Benjamin Millepied's ROMEO & JULIET SUITE during the @nuitsdefourviere festival i...",
  "LEARN MORE",
  "LEARN MORE ABOUT APPLY TODAY MUSIC AT PURCHASE",
  "Laila Wilson '22, playwriting and screenwriting",
  "Lamesa Nashrat '21 (film)",
  "Language and Culture",
  "Large box holding several paint cans",
  "Latest News",
  "Latest Rankings and Ratings",
  "Latin American, Caribbean, and Latinx Studies",
  "Latinos Unidos Student Club / Club Fair 2022",
  "Latrice M. Walker ’01",
  "Laura Jobin-Acosta '20 MM",
  "Laura Kaminsky",
  "Laura Ricciardi",
  "Law and Justice Studies",
  "Leah Woods '18",
  "Learning Center",
  "Leaves and Withdrawal",
  "Lecturer Gregory Spears Premieres “Love Story”",
  "Lecturer and Soul Voices Choir Director Knoelle Higginson",
  "Lectures",
  "Lee Ehrman, PhD",
  "Lee Tusman",
  "Left to right: Sarah Yousef",
  "Left) Ruth-Ann Gordon & Mauro David Cortina (right) hold their awards accompanied by the rest of our bridges students",
  "Lei-Lei Bavoil ’15",
  "Liam Joynt",
  "Liberal Arts",
  "Liberal Arts and Sciences BA / BS",
  "Library Purchase College",
  "Lifelong Learning School of Continuing Education Purchase College",
  "Lily",
  "Lily Bruder-Zal harvesting flowers on Vanishing Point Farm.",
  "Lily Thrall ’14",
  "Linguistics",
  "Links to Other Resources",
  "Lip Critic band",
  "Lip Critic's Hex Dealer album cover",
  "Lisa Dawn Cave '83",
  "Lisa Eadicicco '12",
  "Lisa Jean Moore (stands at front of class)",
  "Literature professor Anthony Domestico speaks at the SUNY Chancellor's Inauguration",
  "Little Monsters Show Up for Lady Gaga Night",
  "Live Performance and Interactive Media Workshop screen shot",
  "Living on Campus",
  "Logs and Records",
  "Long-Term Equipment Loan Program",
  "Lorenzo Candelaria, Dean of the School of the Arts",
  "Lorraine Plourde",
  "Lost Library Materials",
  "Louise Bartolotta '16",
  "Lucy Kalantari '98",
  "Lucy Wijnands '20",
  "MOMIX: Alice",
  "Machinal",
  "Madeline Cramer '18",
  "Maggie Surovell",
  "Mailroom",
  "Majella Loughran '12 and the Diavolo Dance Company following their semi-final win on NBC's America's Got Talent",
  "Majors + Minors",
  "Make a gift",
  "Man in white t-shirt and black jacket smiles with water in background",
  "Mandatory Immunization Requirements",
  "Mara Keen MM '22",
  "Marcel Gbeffa during an artistic residency as a part of (T)HERE: Global Festival in 2019.",
  "Marcella Lewis '16",
  "Marco North '90",
  "Maria Guralnik",
  "Mariales Diaz '19 (film)",
  "Marin Kosut, Professor of Sociology",
  "Marissa LaRocca ’09",
  "Marjan Neshat '98",
  "Mark Jonas",
  "Mark Viniello ’92",
  "Maruti Evans",
  "Mary Kosut, associate professor of sociology",
  "Maryann McEnroe, PhD",
  "Master of Music",
  "Math & Comp Sci Club Visits IBM Research",
  "Mathematics/Computer Science",
  "Matt Wilson",
  "Matthew Immergut",
  "Maura VanderPutten (Environmental Sciences, Biology minor)",
  "Max Pearce '18 slam dunks in the gym",
  "Media Relations",
  "Media Studies",
  "Meet Our Alumni",
  "Meet Our Faculty",
  "Meet the Director",
  "Meet the Filmmakers",
  "Megan Rossman",
  "Mehdi Tavana Okasi",
  "Melanie Rosete '20",
  "Merce Cunningham teaching.",
  "Meryl Cates '08",
  "Meryl Cates ’08",
  "Micah Stock '11",
  "Micah Stock ’11",
  "Michael Rakowitz '95",
  "Michelle Friedman ’11",
  "Mindfulness In Action",
  "Minor in Arts Management",
  "Minor in Biology",
  "Minor of Music (Classical Composition)",
  "Mission, Vision, and Values",
  "Misty Yarnall ’22",
  "Mitski '13 (Photo: David Lee, Redmond, WA)",
  "Mitski '13 (Photo: Ebru Yildiz)",
  "Mitski '13 from The Only Heartbreaker video, 2021",
  "Mitski Miyawaki ’13",
  "Monica Ferrell, Associate Professor of Creative Writing",
  "Moodle",
  "More Card Office",
  "More Store",
  "Multicultural Center invites passers by to comment on the one thing they can do to build community and help end prejudice.",
  "Museum Studies",
  "Music Courses",
  "Music Industry Concentration Arts Management Purchase College",
  "Music Minor",
  "Music MusB",
  "My Heliotrope",
  "MyHeliotrope",
  "NEUBERGER MUSEUM OF ART",
  "Nancy Bowen",
  "Naoki Yogi '22",
  "Nathan Holmes",
  "Nationally Ranked for Graduates Who Earn PhDs",
  "Neil Gaiman and Michael Chabon spoke as part of the Durst Distinguished Lecture Series.",
  "Nelly van Bommel",
  "Neuberger Museum of Art Youth Education Program",
  "New Media",
  "New Media Photography Expanded at PC4",
  "New Standards Combo in the Jazz Studies program",
  "New Student Timeline",
  "New Students Frequently Asked Questions",
  "New York State Residency",
  "New York State University Police Purchase College",
  "New to Online Learning?",
  "News Archive",
  "News Purchase College",
  "News and Events",
  "Nicco Annan '98 Wins NAACP Image Award for Outstanding Actor in a Drama Series.",
  "Nicco Annan '98 at the NAACP Convention July 2022 holding the inaugural Trailblazer Award.",
  "Nicco Annan ’98",
  "Nick Bruno '15",
  "Nina Schatell '23",
  "Notable Authors in Conversation",
  "Notes from the Field",
  "Occupy Museums",
  "Office of Campus Events and Rentals",
  "Office of Disability Resources",
  "Office of Facilities Management",
  "Office of Human Resources Purchase College",
  "Office of the Registrar",
  "Offices and Services News Purchase College",
  "Older Adult Registration Information and Process",
  "Open Interior Design Courses",
  "Opeoluwa Obasa ’20",
  "Orientation",
  "Original illustration by Professor Stephen Cooke",
  "Orlagh Cassidy ’90",
  "Our Alumni",
  "Our Campus",
  "Our Team",
  "POV Fest Logo",
  "PURCHASE MAGAZINE",
  "PURCHASE ON THE ROAD",
  "PURCHASE magazine cover story",
  "Paige Gilbert '14",
  "Paige Gilbert ’14",
  "Painting and Drawing",
  "Paola Lázaro '09",
  "Parents",
  "Parents and Families Parents and Families Purchase College",
  "Parker Posey",
  "Parking",
  "Parking and Parking Tickets",
  "Parking and Transportation, Office of",
  "Participants in the annual Purchase Shark Tank-style competition for 2022.",
  "Participants walk on the The Yellow Walk performance created by Kate Gilmore",
  "Paul Drechsler-Martell ’07",
  "Paul Kaplan",
  "Pavani Srinivasan ’11",
  "Payroll",
  "Performances",
  "Performing Arts Concentration Arts Management Purchase College",
  "Person walks in distance with Welcome to Purchase College sign on brick building",
  "Personal Enrichment Courses",
  "Personal Safety Committee webpage",
  "Pete Malinverni",
  "Phakchok Rinpoche and Erric Solomon “Radically Happy”",
  "Phil Corso '11",
  "Philosophy and Critical Thought",
  "Photo of Caitly Dominici '24",
  "Photography",
  "Physical Accessibility",
  "Picture of yoga matts and light candles on the floor with screens behind it in a warmly lit Harbor Center room.",
  "Pilates Micro-Credential",
  "Playwriting",
  "Please submit this form",
  "Police officers gathered from around the region to learn about best practices in sexual assault investigations. Seen here: L to R: NYSP S...",
  "Policies",
  "Policies and Procedures",
  "Political Science",
  "Popular Collection",
  "Portrait of light skinned Black dancer with hand bent over head",
  "Post-Baccalaureate Premedical Studies",
  "Premed advising",
  "Premedical Studies",
  "President Emeritus Thomas J. Schwarz at the May 8 event celebrating his 17 year tenure at Purchase College. (Photo by Sean Zanni/PMC)",
  "President Schwarz helps plant a tree for Clean and Green Day 2018",
  "President Thomas J. Schwarz",
  "President, Office of the",
  "President’s Welcome",
  "Pride Flag",
  "Printmaking",
  "Priorities: What To Support",
  "Private Lessons",
  "Processed with Snapseed.",
  "Professional Certificates",
  "Professional Development",
  "Professor Dave Grill and intern Victoria Corbalis '18",
  "Professor Elizabeth Guffey Pens Article on “Active Exclusion”",
  "Professor Paul Siegel",
  "Professor Shaka McGlotten",
  "Professor Warren Lehrer awarded the 2019 Ladislav Sutnar Prize",
  "Professor of Anthropology and Media Studies Jason Pine (Photo: Annette Hornischer)",
  "Professor of Creative Writing Monica Ferrell",
  "Professor of Literature Elise Lemire",
  "Professor of Theatre and Performance Jordan Schildcrout",
  "Professors Emeriti Lee Ehrman and Peter Schwab",
  "Proxy Access",
  "Psychology",
  "Public Reports",
  "Purchase Cares Icon (Navy blue heart over lighter blue background)",
  "Purchase College Alumni Association (PCAA) Committee",
  "Purchase College Association Inc.",
  "Purchase College Biennial Review Alcohol and Other Drugs 2021 2023",
  "Purchase College Commencement at the Westchester Civic Center",
  "Purchase College Foundation",
  "Purchase College Leadership Institute 2021-2022",
  "Purchase College Library exterior",
  "Purchase College Non-Discrimination Policy",
  "Purchase College Startup Pitching Competition Winners Andres Hernandez-Rodriguez and Brian Farez.",
  "Purchase College sign at front with orange and gold mums.",
  "Purchase Dance Company",
  "Purchase Event Tracking (PETS)",
  "Purchase Experience",
  "Purchase Garden",
  "Purchase Jazz Orchestra at Blue Note",
  "Purchase JobScore",
  "Purchase Opera",
  "Purchase Opera production of Dialogues of the Carmelites in 2020-2021.",
  "Purchase Opera: The Crucible",
  "Purchase Outdoors Club Hikes Hook Mountain",
  "Purchase in Pictures",
  "Purchase is Princeton Review Top 200 Best Value Colleges (students on the Quad in Adirondack chairs)",
  "Purchasing and Accounts Payable, Office of",
  "Purple cloth background with 2025 Purchase Alumni Awards in gold text with gold starbursts and accents",
  "Quaba Ernest and Aleksandra Gologorskaya from the Conservatory of Dance at Purchase College in Robbins' Watermill.",
  "READ MORE ABOUT THEIR WORK",
  "RECENT EFFORTS",
  "REGISTER",
  "REQUEST INFORMATION",
  "RIOTUSA '22 and Ryan Press",
  "Rachael Pazdan ’12",
  "Rachel Weiss '16 holds her NY Emmy",
  "Raechelle Manalo '20",
  "Rakeem Hardy '20 (dance)",
  "Ray Wilcox",
  "Readmission",
  "Reasons to Work at Purchase",
  "Recent News",
  "Recent Press Coverage",
  "Recipe for a Loving Community by Madeline Friedman '18",
  "Refund Policy",
  "Regina Spektor '01",
  "Regina Spektor '01 performing Après Moi during a day of filming with the Poetry in America team.",
  "Register",
  "Register Now",
  "Register for the Open House",
  "Registration Procedures",
  "Registration User Guide",
  "Rena Butler '11 (Courtesy of Dance magazine)",
  "Reporting Workplace Violence Anonymously",
  "Request Information",
  "Requirements",
  "Requirements for Minor",
  "Resources and Support",
  "Riot USA ’22",
  "Rob Swainston, Assistant Professor Art+Design, Printmaking",
  "Romare Bearden",
  "Rosalynde LeBlanc '94 (Photo: Lee Gumbs)",
  "S U N Y Chancellor John King",
  "S U N Y Chancellor's Award for Excellence Recipients Laila Wilson and Corina Picon",
  "S U N Y Chancellors Award for Excellence Winner Ilias Fourati '20",
  "S U N Y Chief's Association Award",
  "S U N Y Esports Challenge Co-sponsored by Extreme Networks",
  "S U N Y Logo",
  "S U N Y Print Initiative Administrative Printing",
  "S U N Y logo and wordmark, white on blue background",
  "SAMMIES",
  "SCHEDULE OF EVENTS",
  "SEARCH CURRENT JOB OPENINGS",
  "SEE FULL GALLERY",
  "SEE IMAGES FROM THE OPENING",
  "SEE INSIDE",
  "SUNYWide Film Festival design",
  "Safety Tips",
  "Safety and Security",
  "Samara Joy '21 (jazz studies)",
  "Samara Joy McLendon '21 holds her Sarah Vaughan Jazz Vocal award.",
  "Samara Joy ’21",
  "Sara Richter ’24",
  "Sarah Catherine Hook '17 and Imani Lewis star in Netflix series First Kill.",
  "Sarah Catherine Hook '17 and Parker Posey in season three of HBO's The White Lotus.",
  "Satisfactory Academic Progress",
  "Scenic Art Studios founder Joseph B. Forbes",
  "Schedule an Admissions Visit",
  "Schedule one today",
  "Scholarships Inspire Confidence",
  "School of Art+Design",
  "School of Continuing Education",
  "School of Film and Media Studies",
  "School of Humanities",
  "School of Liberal Arts and Sciences",
  "School of Liberal Studies",
  "School of Natural and Social Sciences",
  "School of the Arts",
  "Screen shot from Madonna's video HerStory",
  "Sculpture",
  "Sean Dunne ’03",
  "Sean Kaufman ’22",
  "Search",
  "Search Process",
  "Secure Document Upload",
  "See if we answered them here",
  "Semester in France",
  "Semester in Hungary",
  "Senior Project",
  "Seniors Angela Galli and Kelly Hayes receive oversized check for winning the second annual Start Up Purchase Pitching Competition",
  "Seniors Hannah",
  "Sequoia Sellinger ’17",
  "Services",
  "Sexual Violence Prevention and Response",
  "Shaka McGlotten, Associate Professor of Media Studies",
  "Share your news",
  "Shared Governance",
  "Shayan Sobhian ’17",
  "Sherry Stringfield ’89",
  "Shilpi Chandra MA ’15 Has Solo Curatorial Debut",
  "Shota Miyoshi '22",
  "Show 2 more...",
  "Show 3 more...",
  "Show 4 more...",
  "Show 5 more...",
  "Showcasing the Sciences",
  "Showtime at the Apollo cover",
  "Sierra Bianco",
  "Silas Brown",
  "Silas Brown '10, assistant professor",
  "Sinkane We Belong Album Cover",
  "Slate",
  "Smalls Jazz Club",
  "SnapShot",
  "Snow Response Plan",
  "Social Media Accessibility",
  "Sociology",
  "Solangie Ledesma '20",
  "Sophia Hadeshian",
  "Spanish",
  "Special Collections & Archives",
  "Sponsored Programs, Office of",
  "Square illustration with many swirled colors in the background",
  "Square image with a dark blue background and the text announcing the May 2-3 dates for Alumni Weekend 2025",
  "Standing left to right: David Settanni '09",
  "Starfish Help",
  "Stay in Touch",
  "Stephanie LeBlanc",
  "Stephen E. Harris, PhD",
  "Stephen Ferri '13 (courtesy Westchester Magazine)",
  "Steven Spielberg's The Post film shoot on campus",
  "Stick Fly (BFA Junior Rep)",
  "Stone marker for site of Thoreau's cabin",
  "Stop by the library to relax and destress with fun activities.",
  "Student Activities",
  "Student Affairs and Enrollment Services, Office of",
  "Student BioBlitz participant",
  "Student Code of Conduct",
  "Student Data Form",
  "Student Data Form instructions",
  "Student Financial Services",
  "Student Information",
  "Student Involvement",
  "Student Journal: Italics Mine",
  "Student Project Portal",
  "Student Publications",
  "Student Science Symposium",
  "Student Success",
  "Student Support and Outreach (Starfish)",
  "Student Work and Accolades",
  "Student and professor outdoors looking at a small container.",
  "Student holds a container with a grasshopper.",
  "Student on campus viewing a cell phone",
  "Student presents senior project research at the annual Natural and Social Science Symposium.",
  "Students",
  "Students Attend National STEM Conference",
  "Students Conduct Research in Biology Lab",
  "Students and collaborators work on American Riad project in Detroit",
  "Students at Orientation 2018",
  "Students enjoy Fun Fair on the Great Lawn during Welcome Week.",
  "Students in Seminar Class",
  "Students in class",
  "Students on the main plaza to protest gun violence",
  "Students play music on the mall",
  "Students studying abroad in India granted an audience with the Dalai Lama",
  "Students talk at a table.",
  "Students use a comb knife to remove the caps from honey frames",
  "Students view the art on display in LaGuardia Airport Terminals B and C",
  "Studio Composition",
  "Studio Production",
  "Study Abroad",
  "Summer and Winter Sessions",
  "Sunflowers behind the Student Services Building",
  "Support Your New Student",
  "Surveys",
  "Susan Shopmaker accepts the Casting Award for The Holdovers on stage during the EE BAFTA Film Awards 2024 at The Royal Festival Hall on F...",
  "Susie Essman ’77",
  "Sydney Cole Alexander '15",
  "TJ Raphael '11",
  "Tamisha Guy '13",
  "Tanairi Vazquez '10 (dance performance)",
  "Tarantula (Photo: Pratik Jain)",
  "Tayler Montague ’19",
  "Teaching, Learning, and Technology Center",
  "Teal ribbon symbol to end sexual assault",
  "Technology Policies",
  "Telephone Billing System (TBS)",
  "Television Theory and Practice",
  "Terese Capucilli '78",
  "The 2023 Startup Competition Awards $5,000 in Prizes",
  "The Andrew W. Mellon Foundation logo",
  "The Center for Engagement",
  "The Chamber Music Society of Lincoln Center",
  "The Durst Distinguished Chair and the Durst Lecture Series",
  "The Honorable Karen T. Beltran",
  "The Out of the Depths company takes a bow",
  "The PAC logo projected on the PepsiCo Theatre's stage curtain.",
  "The President’s Award",
  "The Princeton Review Guide to Green Colleges logo",
  "The Purchase College Strategic Plan",
  "The Purchase Dance Company recently visited Taipei and Kaohsiung City for performances",
  "The Quad",
  "The Quad and Residence Halls",
  "The Seagull (BFA Junior Rep)",
  "The Warded Man illustration by Allen Williams for Grim Oak Press",
  "The band Cende",
  "The campus of Purchase College.",
  "The senior class of Summit Academy Charter School with Ellen DeGeneres. Photo Credit: Michael Rozman/Warner Bros.",
  "Theatre Design/Technology",
  "Theatre Design/Technology BFA",
  "Theatre Design/Technology: Costume Design",
  "Theatre Design/Technology: Costume Technology",
  "Theatre Design/Technology: Lighting Design",
  "Theatre Design/Technology: Scenic Design",
  "Theatre Design/Technology: Sound Design",
  "Theatre Design/Technology: Stage Management",
  "Theatre Design/Technology: Technical Direction",
  "Theatre and Performance",
  "Thom Jones and Nicole Kidman smile at the camera with arms around each others shoulders",
  "Thomas Warfield '88",
  "Thomas Warfield ’88",
  "Tim",
  "Title IX",
  "Tomashi Jackson, 2022 Roy R. Neuberger Prize Recipient",
  "Top row L to R: Tamisha Guy '13",
  "Training",
  "Training Opportunities",
  "Transfer Credit",
  "Transfers",
  "Transnational Filmmaking Project",
  "Transpire",
  "Transportation and Amenities",
  "Travel and Transportation",
  "Travis Sluss '07 (Photo: MacInspires Facebook)",
  "Trisha Murphy ’19",
  "Troy Peterson ’19",
  "Tuition and Aid",
  "Tuition and Fees",
  "Two Purchase photography students and an alumnus of the program discussed their work at a symposium honoring the work of Gordon Parks. L ...",
  "UN Sustainability Goals Logo (Color swatches in a circle)",
  "Undeclared",
  "Undergraduate Courses with Noncredit Seats",
  "University Police Officer Recognition",
  "Upcoming Events",
  "Update your contact information",
  "Uranium spectrum visible",
  "VIEW FULL GALLERY",
  "VOCES",
  "Various students participating in a previous Purchase Alternative Service Trip",
  "Veronica",
  "Veronica Ryzio ’21",
  "Veterans’ Services",
  "Veteran’s Services",
  "Victor",
  "Victor Cuoto '14",
  "Victoria deMartin '14",
  "Viktoriya Molchanova ’20",
  "Virtual Tour",
  "Visit Admissions Purchase College",
  "Visit the CTS help page for info",
  "Visit the Career Development Center",
  "Visit the Career Development Center to learn more",
  "Visiting Students Office of the Registrar Purchase College",
  "Visual Arts (BS)",
  "Visual Arts Alum Tom Cross '93",
  "Visual Arts Graduate Programs",
  "Visual Arts Minor",
  "Visual Arts, Interdisciplinary (BFA)",
  "Visual and Performing Arts Information Session & Tour",
  "Voice and Opera Studies",
  "Volunteers in the SUNY Stands with Puerto Rico initiative",
  "Vuk Lungulov-Klotz '16",
  "WHO’S ATTENDING",
  "WNYC logo",
  "Walt Whitman",
  "Wayne Tucker",
  "Ways to Give",
  "Web Page",
  "Website Help",
  "Welcome to Purchase College",
  "West Side Story logo",
  "What are the Library’s hours?",
  "What are the eligibility requirements for continuing health insurance/prescription drug coverage in retirement?",
  "What information should I put in my retirement letter to my department?",
  "What is the cost of health insurance/prescription drug coverage in retirement?",
  "What's Nearby",
  "When does the Benefits Office process my retiree benefits?",
  "Where We Are",
  "Where can I find information on senior projects / capstone papers / master’s theses?",
  "Where is the TLTC located?",
  "Who do I contact with questions about my health insurance/prescription drug coverage after I retire?",
  "Who will notify my retirement plan of my intention to retire?",
  "Why Purchase?",
  "Why have I suddenly been unenrolled/dropped from my courses on Brightspace?",
  "Will my dental and vision care benefits continue in retirement?",
  "Will my health insurance coverage continue in retirement?",
  "William Byram '20",
  "Winners of the inaugural Purchase College Excellence in High School Journalism Awards.",
  "Woodstock Film Festival",
  "Wordmark: The Hollywood Reporter in red",
  "Work Orders",
  "Work Study Online",
  "Working in Humanities",
  "Yancy Garcia",
  "Your First Year",
  "Your Right To Know Purchase College",
  "Youth and Precollege Programs Purchase College",
  "Zaire Anderson '19 and the Art Force 5",
  "Zoë Winters '07",
  "Zoë Winters '07 plays Kerry on HBO's Succession. (Photo: Macall B. Polay/HBO)",
  "academic-and-professional-integrity",
  "accessibility@purchase.edu",
  "acting.auditions@purchase.edu",
  "admissions@purchase.edu",
  "alumni@purchase.edu",
  "approval from Purchase College to register",
  "billboard-magazine-touts-studio-production-program",
  "college policies",
  "creating-unique-career-pathways-in-the-arts",
  "eight-semester plan",
  "email the department",
  "family@purchase.edu",
  "financialservices@purchase.edu",
  "fms@purchase.edu",
  "foam rollers and balls on a yoga matt",
  "food and drink",
  "guide-to-campus-resources",
  "heliotropecentral@purchase.edu",
  "helpdesk@purchase.edu",
  "hours",
  "hse@purchase.edu",
  "issadancelook Instagram account post",
  "kristin.brunobates@purchase.edu",
  "lib.circ@purchase.edu",
  "media@purchase.edu",
  "myHeliotrope",
  "official transcript",
  "other degree requirements",
  "political-theatre-in-prague",
  "precollege students",
  "pride-trivia",
  "proof Magazine",
  "purchase-earns-a-competitive-fulbright-hays-award",
  "purchase.edu/activate",
  "pwsw-shonnon-marshall-22",
  "rd Annual James Utter Natural and Social Sciences Research Symposium",
  "register for undergraduate courses",
  "registrar@purchase.edu",
  "robin.farrell@purchase.edu",
  "saf.commencement@purchase.edu",
  "screenshot of the Turnitin Self-Checker activity in Brightspace",
  "senior project",
  "studying abroad",
  "summer",
  "suny-sexual-violence-prevention-svp-survey",
  "sustainable campus",
  "the-2024-suny-chancellors-award-winners",
  "theatre and performance",
  "total",
  "visitors",
  "website",
  "westchester-medical-center-health-network",
  "winter",
  "youth"
];


const linkTextToUrlMap = {
  "Welcome to Purchase College": "https:
  "About Purchase College": "https:
  "Academics Purchase College": "https:
  "Admissions Purchase College": "https:
  "Campus Life Purchase College": "https:
  "Give to Purchase Purchase College": "https:
  "Calendar News Purchase College": "https:
  "Current Students Portals Purchase College": "https:
  "Faculty and Staff News Purchase College": "https:
  "Parents and Families Parents and Families Purchase College": "https:
  "Alumni Purchase College": "https:
  "Lifelong Learning School of Continuing Education Purchase College": "https:
  "Visiting Students Office of the Registrar Purchase College": "https:
  "Contact Us About Purchase College": "https:
  "Accessibility Purchase College": "https:
  "Interactive Map About Purchase College": "https:
  "Campus Directory": "https:
  "Offices and Services News Purchase College": "https:
  "New York State University Police Purchase College": "https:
  "Your Right To Know Purchase College": "https:
  "Information Privacy Campus Technology Services Purchase College": "https:
  "Office of Human Resources Purchase College": "https:
  "Visit Admissions Purchase College": "https:
  "Library Purchase College": "https:
  "News Purchase College": "https:
  "Youth and Precollege Programs Purchase College": "https:
  "Adult Noncredit Programs Purchase College": "https:
  "Acting Purchase College": "https:
  "Anthropology Purchase College": "https:
  "Art History Purchase College": "https:
  "Art History (MA) Purchase College": "https:
  "Foundations Program Purchase College": "https:
  "Arts Management Purchase College": "https:
  "Music Industry Concentration Arts Management Purchase College": "https:
  "Performing Arts Concentration Arts Management Purchase College": "https:
  "Arts Open Access School of the Arts Purchase College": "https:
  "Asian Studies Purchase College": "https:
  "Biochemistry Purchase College": "https:
  "Biology Purchase College": "https:
  "Concentrations Biology Purchase College": "https:
  "Chemistry Purchase College": "https:
  "Chinese Purchase College": "https:
  "Cinema and Television Studies Purchase College": "https:
  "College and Expository Writing Program School of Humanities Purchase College": "https:
  "Communications Purchase College": "https:
  "Composition (Classical) Purchase College": "https:
  "Contemplative Studies Purchase College": "https:
  "Creative Writing Purchase College": "https:
  "Dance Performance Purchase College": "https:
  "Dance Performance: Ballet": "https:
  "Dance Performance: Composition": "https:
  "Dance Performance: Production": "https:
  "Early Childhood Development": "https:
  "Economics": "https:
  "Education Studies": "https:
  "English and Global Literatures": "https:
  "Entrepreneurship in the Arts": "https:
  "Environmental Studies": "https:
  "Film": "https:
  "Film/Video Production": "https:
  "French": "https:
  "Gender Studies": "https:
  "General Studies": "https:
  "Global Black Studies": "https:
  "Global Studies": "https:
  "Graphic Design": "https:
  "Graphic Design: Illustration": "https:
  "History": "https:
  "Instrumental Performance": "https:
  "Instrumental Performance: Brass": "https:
  "Instrumental Performance: Classical Guitar": "https:
  "Instrumental Performance: Harp": "https:
  "Instrumental Performance: Percussion": "https:
  "Instrumental Performance: Piano": "https:
  "Instrumental Performance: Strings": "https:
  "Instrumental Performance: Woodwinds": "https:
  "Italian": "https:
  "Jazz Studies": "https:
  "Jewish Studies": "https:
  "Journalism": "https:
  "Language and Culture": "https:
  "Latin American, Caribbean, and Latinx Studies": "https:
  "Law and Justice Studies": "https:
  "Liberal Arts": "https:
  "Linguistics": "https:
  "Mathematics/Computer Science": "https:
  "Media Studies": "https:
  "Museum Studies": "https:
  "Music Minor": "https:
  "New Media": "https:
  "Painting and Drawing": "https:
  "Philosophy and Critical Thought": "https:
  "Photography": "https:
  "Playwriting": "https:
  "Political Science": "https:
  "Printmaking": "https:
  "Psychology": "https:
  "Sculpture": "https:
  "Sociology": "https:
  "Spanish": "https:
  "Studio Composition": "https:
  "Studio Production": "https:
  "Television Theory and Practice": "https:
  "Theatre and Performance": "https:
  "Theatre Design/Technology": "https:
  "Theatre Design/Technology: Costume Design": "https:
  "Theatre Design/Technology: Costume Technology": "https:
  "Theatre Design/Technology: Lighting Design": "https:
  "Theatre Design/Technology: Scenic Design": "https:
  "Theatre Design/Technology: Sound Design": "https:
  "Theatre Design/Technology: Stage Management": "https:
  "Theatre Design/Technology: Technical Direction": "https:
  "Undeclared": "https:
  "Visual Arts (BS)": "https:
  "Visual Arts Graduate Programs": "https:
  "Visual Arts Minor": "https:
  "Visual Arts, Interdisciplinary (BFA)": "https:
  "Voice and Opera Studies": "https:
  "Majors + Minors": "https:
  "Virtual Tour": "https:
  "Apply": "https:
  "RECENT EFFORTS": "https:
  "AW25: Alumni Showcase": "https:
  "The Chamber Music Society of Lincoln Center": "https:
  "MOMIX: Alice": "https:
  "NEUBERGER MUSEUM OF ART": "https:
  "Facts and Stats": "https:
  "Our Campus": "https:
  "Our Alumni": "https:
  "President’s Welcome": "https:
  "Diversity and Compliance": "https:
  "Institutional Learning Outcomes": "https:
  "Accreditation": "https:
  "The Purchase College Strategic Plan": "https:
  "sustainable campus": "https:
  "Mission, Vision, and Values": "https:
  "What's Nearby": "https:
  "Adotei Akwei ’84": "https:
  "James Spione ’85": "https:
  "Parker Posey": "https:
  "Jill Bargonetti ’85": "https:
  "Kris Graves ’04": "https:
  "Nationally Ranked for Graduates Who Earn PhDs": "https:
  "Latest Rankings and Ratings": "https:
  "Fiske Guide to Colleges 2025: “Unique Within the SUNY System”": "https:
  "Susie Essman ’77": "https:
  "Graduate Programs": "https:
  "Purchase Experience": "https:
  "Career Readiness": "https:
  "Faculty": "https:
  "Resources and Support": "https:
  "Conservatory of Dance": "https:
  "Conservatory of Music": "https:
  "Conservatory of Theatre Arts": "https:
  "School of Art+Design": "https:
  "School of Film and Media Studies": "https:
  "School of Humanities": "https:
  "School of Liberal Studies": "https:
  "School of Natural and Social Sciences": "https:
  "School of Continuing Education": "https:
  "Intergenerational Learning": "https:
  "Broadview": "https:
  "Summer and Winter Sessions": "https:
  "College Catalog": "https:
  "Your First Year": "https:
  "Hands-On Learning": "https:
  "LEARN MORE": "https:
  "INSIDE LOOK": "https:
  "Grammy Awards: Big Night for Jazz Studies": "https:
  "Adam Nagourney ’77": "https:
  "Latrice M. Walker ’01": "https:
  "Erin Sullivan ’12": "https:
  "Janette Yarwood ’96": "https:
  "Isaac Zal ’04 Turns Artists’ Visions into Metal Masterworks": "https:
  "Math & Comp Sci Club Visits IBM Research": "https:
  "Request Information": "https:
  "Tuition and Aid": "https:
  "Accepted Students": "https:
  "First Year": "https:
  "Transfers": "https:
  "International Students": "https:
  "Graduate Students": "https:
  "Parents": "https:
  "High School Counselors": "https:
  "Explore Majors": "https:
  "Why Purchase?": "https:
  "Contact Our Team": "https:
  "Liberal Arts and Sciences BA / BS": "https:
  "Acting BFA": "https:
  "Art+Design BFA / BS": "https:
  "Creative Writing BA": "https:
  "Dance BFA": "https:
  "Music MusB": "https:
  "Theatre Design/Technology BFA": "https:
  "Visual and Performing Arts Information Session & Tour": "https:
  "- Open House": "https:
  "ACE Purchase": "https:
  "Cornerstone Connect": "https:
  "Educational Opportunity Program": "https:
  "Global Scholars": "https:
  "Claribel Ortega ’10": "https:
  "Sara Richter ’24": "https:
  "Sean Kaufman ’22": "https:
  "Samara Joy ’21": "https:
  "Pavani Srinivasan ’11": "https:
  "Clubs and Organizations": "https:
  "Student Activities": "https:
  "Athletics": "https:
  "Housing": "https:
  "Dining": "https:
  "Transportation and Amenities": "https:
  "Health and Wellness": "https:
  "Safety and Security": "https:
  "Living on Campus": "https:
  "Student Involvement": "https:
  "SEE INSIDE": "https:
  "Shayan Sobhian ’17": "https:
  "Veronica Ryzio ’21": "https:
  "Mitski Miyawaki ’13": "https:
  "Little Monsters Show Up for Lady Gaga Night": "https:
  "Notable Authors in Conversation": "https:
  "Scholarships Inspire Confidence": "https:
  "Priorities: What To Support": "https:
  "Ways to Give": "https:
  "Impact Stories": "https:
  "Purchase College Foundation": "https:
  "Our Team": "https:
  "Victor": "https:
  "David": "https:
  "Tim": "https:
  "Harley": "https:
  "Christian": "https:
  "Veronica": "https:
  "Jakob": "https:
  "Lily": "https:
  "Meet the Filmmakers": "https:
  "suny-sexual-violence-prevention-svp-survey": "https:
  "guide-to-campus-resources": "https:
  "UN Sustainability Goals Logo (Color swatches in a circle)": "https:
  "foam rollers and balls on a yoga matt": "https:
  "creating-unique-career-pathways-in-the-arts": "https:
  "westchester-medical-center-health-network": "https:
  "Picture of yoga matts and light candles on the floor with screens behind it in a warmly lit Harbor Center room.": "https:
  "pride-trivia": "https:
  "Show 5 more...": "https:
  "total": "https:
  "VIEW FULL GALLERY": "https:
  "Academic Calendar": "https:
  "Account Activation / Password Reset": "https:
  "Brightspace": "https:
  "COVID-19 Updates": "https:
  "CTS Video Chat Tech Support Helpdesk": "https:
  "Moodle": "https:
  "MyHeliotrope": "https:
  "Purchase JobScore": "https:
  "Student Project Portal": "https:
  "Work Study Online": "https:
  "Health Forms": "https:
  "Orientation": "https:
  "Advising Center": "https:
  "Learning Center": "https:
  "Office of Disability Resources": "https:
  "Counseling and Behavioral Health Services": "https:
  "Financial Literacy": "https:
  "Eight-Semester Graduation Plans": "https:
  "Course Search": "https:
  "E-Portfolios": "https:
  "Final Exam Schedule": "https:
  "FERPA Training": "https:
  "Bus Service": "https:
  "CTS/FMG Work Orders and Equipment Loans": "https:
  "College Policies": "https:
  "Parking and Parking Tickets": "https:
  "Surveys": "https:
  "Dining Dollars": "https:
  "Visit the CTS help page for info": "https:
  "heliotropecentral@purchase.edu": "nullheliotropecentral@purchase.edu",
  "Banner Administrator": "https:
  "Broadcast Email (BEM)": "https:
  "Emergency Alerts Sign-up": "https:
  "Purchase Event Tracking (PETS)": "https:
  "Shared Governance": "https:
  "Slate": "https:
  "Training": "https:
  "Work Orders": "https:
  "Community Assessment, Response and Education (CARE) Team": "https:
  "Student Support and Outreach (Starfish)": "https:
  "Advising Support": "https:
  "Course Scheduling": "https:
  "SnapShot": "https:
  "Starfish Help": "https:
  "ITAC Learning Space Conditions Survey 2021": "https:
  "CTS Live Helpdesk Support": "https:
  "Device Assignment Tracking (DAT)": "https:
  "Website Help": "https:
  "COVID-19 Reporting Form": "https:
  "HRETS": "https:
  "Faculty Handbook": "https:
  "Telephone Billing System (TBS)": "https:
  "Expose": "https:
  "Editorial Style Guide": "https:
  "Anonymous Workplace Violence Report": "https:
  "Argos Reports": "https:
  "Environmental Health and Safety": "https:
  "Glossary of Terms": "https:
  "Lily Bruder-Zal harvesting flowers on Vanishing Point Farm.": "https:
  "Stephanie LeBlanc": "https:
  "Show 4 more...": "https:
  "Square image with a dark blue background and the text announcing the May 2-3 dates for Alumni Weekend 2025": "https:
  "rd Annual James Utter Natural and Social Sciences Research Symposium": "https:
  "Square illustration with many swirled colors in the background": "https:
  "Lisa Eadicicco '12": "https:
  "Show 3 more...": "https:
  "family@purchase.edu": "nullfamily@purchase.edu",
  "Get Involved": "https:
  "Family Day": "https:
  "Campus Resources Guide": "https:
  "Proxy Access": "https:
  "Glossary": "https:
  "New Student Timeline": "https:
  "Support Your New Student": "https:
  "Big Differences": "https:
  "Alumni Weekend 2025 Postcard": "https:
  "SCHEDULE OF EVENTS": "https:
  "REGISTER": "https:
  "WHO’S ATTENDING": "https:
  "Alumni Showcase": "https:
  "Update your contact information": "https:
  "Share your news": "https:
  "Purchase College Alumni Association (PCAA) Committee": "https:
  "Affinity Group": "https:
  "Make a gift": "https:
  "Stick Fly (BFA Junior Rep)": "https:
  "The Seagull (BFA Junior Rep)": "https:
  "Show 2 more...": "https:
  "Purple cloth background with 2025 Purchase Alumni Awards in gold text with gold starbursts and accents": "https:
  "alumni@purchase.edu": "nullalumni@purchase.edu",
  "Alumni Association": "https:
  "Benefits and Perks": "https:
  "College Services": "https:
  "Events": "https:
  "Stay in Touch": "https:
  "proof Magazine": "https:
  "Contact Us": "https:
  "Professional Certificates": "https:
  "Personal Enrichment Courses": "https:
  "Undergraduate Courses with Noncredit Seats": "https:
  "Courses and programs through online partners": "https:
  "youth": "https:
  "precollege students": "https:
  "Fall and spring courses": "https:
  "register for undergraduate courses": "https:
  "summer": "https:
  "winter": "https:
  "Registration Procedures": "https:
  "Older Adult Registration Information and Process": "https:
  "approval from Purchase College to register": "https:
  "Course Load and Overload": "https:
  "Tuition and Fees": "https:
  "academic-and-professional-integrity": "https:
  "Student Code of Conduct": "https:
  "Satisfactory Academic Progress": "https:
  "Premedical Studies": "https:
  "Campus Map": "https:
  "Veteran’s Services": "http:
  "Parking": "https:
  "Refund Policy": "https:
  "New York State Residency": "https:
  "Office of the Registrar": "https:
  "Forms and Policies": "https:
  "Veterans’ Services": "https:
  "Premed advising": "https:
  "admissions@purchase.edu": "nullpurchaseadmissions@purchase.edu",
  "Student Data Form": "https:
  "Student Data Form instructions": "https:
  "purchase.edu/activate": "https:
  "Registration User Guide": "https:
  "myHeliotrope": "https:
  "Student Financial Services": "https:
  "official transcript": "https:
  "More Card Office": "https:
  "helpdesk@purchase.edu": "nullhelpdesk@purchase.edu",
  "hse@purchase.edu": "nullhse@purchase.edu",
  "website": "https:
  "FERPA": "https:
  "Cross Registration": "https:
  "Chosen Name Policy": "https:
  "Leaves and Withdrawal": "https:
  "Readmission": "https:
  "Faculty and Staff": "https:
  "Enrollment and Degree Verification": "https:
  "Graduation and Diplomas": "https:
  "Transfer Credit": "https:
  "registrar@purchase.edu": "nullregistrar@purchase.edu",
  "Secure Document Upload": "https:
  "REQUEST INFORMATION": "https:
  "Commencement Information": "https:
  "saf.commencement@purchase.edu": "nullsaf.commencement@purchase.edu",
  "financialservices@purchase.edu": "nullfinancialservices@purchase.edu",
  "Office of Campus Events and Rentals": "https:
  "kristin.brunobates@purchase.edu": "nullkristin.brunobates@purchase.edu",
  "Schedule an Admissions Visit": "https:
  "Directions and Parking": "https:
  "Directions": "https:
  "Media Relations": "https:
  "Electronic / Digital Accessibility": "https:
  "Electronic Information Technology Accessibility (EITA) Policy": "https:
  "Physical Accessibility": "https:
  "Accessibility Barrier form": "https:
  "Snow Response Plan": "https:
  "About": "https:
  "Accessibility Initiatives & Updates": "https:
  "Event Accessibility": "https:
  "Social Media Accessibility": "https:
  "Training Opportunities": "https:
  "accessibility@purchase.edu": "nullaccessibility@purchase.edu",
  "Office of Facilities Management": "https:
  "Title IX": "https:
  "Diversity": "https:
  "Affirmative Action": "https:
  "Purchase College Non-Discrimination Policy": "https:
  "Human Resources Employee Tracking System (HRETS)": "https:
  "Web Page": "https:
  "Email": "nullNeuberger@purchase.edu",
  "Career Development Center": "https:
  "CASA Purchase": "https:
  "Center for Engagement, The": "https:
  "Center for Production Services": "https:
  "Global Education, Office for": "https:
  "Great Potential": "https:
  "Harbor Center for Health Promotion": "https:
  "Institutional Research, Office of": "https:
  "Institutional Review Board": "https:
  "Internal Control, Office of": "https:
  "Mailroom": "https:
  "More Store": "https:
  "Parking and Transportation, Office of": "https:
  "President, Office of the": "https:
  "Purchase College Association Inc.": "https:
  "Purchasing and Accounts Payable, Office of": "https:
  "School of Liberal Arts and Sciences": "https:
  "School of the Arts": "https:
  "Sexual Violence Prevention and Response": "https:
  "Sponsored Programs, Office of": "https:
  "Student Affairs and Enrollment Services, Office of": "https:
  "Student Success": "https:
  "Teaching, Learning, and Technology Center": "https:
  "EMERGENCY BLUE LIGHT PHONES": "https:
  "Personal Safety Committee webpage": "https:
  "S U N Y Chief's Association Award": "https:
  "University Police Officer Recognition": "https:
  "Brian Peterkin with Chief Tucker in front of new mural.": "https:
  "Police officers gathered from around the region to learn about best practices in sexual assault investigations. Seen here: L to R: NYSP S...": "https:
  "About Us": "https:
  "Logs and Records": "https:
  "File a Report": "https:
  "Community Services": "https:
  "Policies": "https:
  "Emergency Guide": "https:
  "Safety Tips": "https:
  "Public Reports": "https:
  "Student Information": "https:
  "Financial Assistance Information": "https:
  "Health and Safety": "https:
  "Gainful Employment Programs": "https:
  "Athletic Information": "https:
  "Bill Junor Email": "nullbill.junor@purchase.edu",
  "S U N Y Print Initiative Administrative Printing": "https:
  "Frequently Asked Questions": "https:
  "New Students Frequently Asked Questions": "https:
  "Audio Visual Equipment Loans": "https:
  "Long-Term Equipment Loan Program": "https:
  "Campus Computer Labs": "https:
  "Campus Smart Classrooms": "https:
  "Communication Options": "https:
  "Account Locked Out": "https:
  "Technology Policies": "https:
  "English": "https:
  "SEARCH CURRENT JOB OPENINGS": "https:
  "How will my covered spouse pay for the retiree health insurance coverage after my death?": "https:
  "How do I notify my department of my intention to retire?": "https:
  "Who do I contact with questions about my health insurance/prescription drug coverage after I retire?": "https:
  "How do I start collecting my pension?": "https:
  "What is the cost of health insurance/prescription drug coverage in retirement?": "https:
  "Will my dental and vision care benefits continue in retirement?": "https:
  "How will I pay for my retiree health insurance/prescription drug coverage if my monthly credit does not cover the full cost of the monthly premium?": "https:
  "What are the eligibility requirements for continuing health insurance/prescription drug coverage in retirement?": "https:
  "How will I pay for my retiree health insurance/prescription drug coverage?": "https:
  "How is the monthly lifetime credit calculated?": "https:
  "Will my health insurance coverage continue in retirement?": "https:
  "Who will notify my retirement plan of my intention to retire?": "https:
  "If I predecease my covered spouse after retirement": "https:
  "When does the Benefits Office process my retiree benefits?": "https:
  "What information should I put in my retirement letter to my department?": "https:
  "If I am using a joint account for my Direct Deposit": "https:
  "How do I adjust/change my tax dependents, deductions, etc.?": "https:
  "Can I use a business account for my Direct Deposit?": "https:
  "How long does my Direct Deposit information stay active?": "https:
  "How do I change my direct deposit account information?": "https:
  "How and where do I update my home address?": "https:
  "How do I set-up Direct Deposit?": "https:
  "How do I access HRETS and upload documents to the Employee Data Sheet?": "https:
  "robin.farrell@purchase.edu": "nullrobin.farrell@purchase.edu",
  "Reasons to Work at Purchase": "https:
  "Benefits Information": "https:
  "Professional Development": "https:
  "Payroll": "https:
  "Announcements": "https:
  "HR Employment Forms": "https:
  "Policies and Procedures": "https:
  "Links to Other Resources": "https:
  "Affirmative Action Plan": "https:
  "Search Process": "https:
  "Purchase College Biennial Review Alcohol and Other Drugs 2021 2023": "https:
  "Reporting Workplace Violence Anonymously": "https:
  "CAMPUS VISIT CALENDAR": "https:
  "ARTS TOURS": "https:
  "PURCHASE ON THE ROAD": "https:
  "ASK A COUNSELOR": "https:
  "Schedule one today": "https:
  "Please submit this form": "https:
  "Art+Design Events": "https:
  "Travel and Transportation": "https:
  "Admissions Policies": "https:
  "Where We Are": "https:
  "hours": "https:
  "food and drink": "https:
  "visitors": "https:
  "Stop by the library to relax and destress with fun activities.": "https:
  "Desert owl sitting on a driftwood branch near the Ask a Librarian logo. Text reads wild about the library. Explore the research frontier wi": "https:
  "Children": "https:
  "Books on physical reserve at the Library": "https:
  "Course Reserves Request Forms": "https:
  "Buttons made at the library": "https:
  "Search": "https:
  "Guides & Tools": "https:
  "Services": "https:
  "Collections": "https:
  "Latest News": "https:
  "Upcoming Events": "https:
  "How do I get help with D2L Brightspace?": "https:
  "What are the Library’s hours?": "https:
  "Is there wifi (wireless internet) ? How do I access the wifi network? Can guests use wifi?": "https:
  "Where is the TLTC located?": "https:
  "F A Q about the TLTC": "https:
  "Where can I find information on senior projects / capstone papers / master’s theses?": "https:
  "How can I obtain a Westchester Library System card?": "https:
  "e": "https:
  "How do I pay a fine at the Library?": "https:
  "My Heliotrope": "http:
  "lib.circ@purchase.edu": "nulllib.circ@purchase.edu",
  "Lost Library Materials": "https:
  "Are there vending machines in the Library? Can I buy food in the Library?": "https:
  "How do I view materials in Special Collections & Archives?": "https:
  "Special Collections & Archives": "https:
  "Why have I suddenly been unenrolled/dropped from my courses on Brightspace?": "https:
  "Mandatory Immunization Requirements": "https:
  "Does the Library have graphic novels and comics? Where are they?": "https:
  "Graphic Novels": "https:
  "Do I have to submit a paper copy of my Student Project to the Library?": "https:
  "Does the Library have popular fiction? Where is the popular reading collection?": "https:
  "Popular Collection": "https:
  "How do I use Turnitin? How can I check my own drafts for originality?": "https:
  "screenshot of the Turnitin Self-Checker activity in Brightspace": "https:
  "How do I use Turnitin to check my own drafts for originality?": "https:
  "How do I add the ThinkingStorm Online Tutoring connection to my Brightspace course?": "https:
  "How do I add the ThinkingStorm Online Tutoring connection to my Brightspace Moodle course?": "https:
  "Daniela Gomez Paz": "https:
  "Sydney Cole Alexander '15": "https:
  "Sarah Catherine Hook '17 and Parker Posey in season three of HBO's The White Lotus.": "https:
  "Original illustration by Professor Stephen Cooke": "https:
  "Damani Pompey '12 (Photo: Conor McNamara)": "https:
  "Dava Huesca '19": "https:
  "Emily Carragher '06": "https:
  "A/way by Derek Shane Garcia '13": "https:
  "Kyle Abraham '00 (Dear Lord by AIM)": "https:
  "Curtis Brodner '19": "https:
  "Tarantula (Photo: Pratik Jain)": "https:
  "Winners of the inaugural Purchase College Excellence in High School Journalism Awards.": "https:
  "Group of young people sit and look in same direction.": "https:
  "Jennifer Mogbock '13": "https:
  "A. Dean Irby": "https:
  "Professor Paul Siegel": "https:
  "Cain Coleman": "https:
  "Connie Tsang, Lecturer in Film": "https:
  "Sierra Bianco": "https:
  "Sinkane We Belong Album Cover": "https:
  "Kunga Choephel '23": "https:
  "the-2024-suny-chancellors-award-winners": "https:
  "Claudia Logan '18": "https:
  "Artists and Hackers logo in text with drawing of hand on digital device": "https:
  "Micah Stock '11": "https:
  "Carlie Hoffman, Lecturer in Creative Writing": "https:
  "David Handschuh stands on a bridge with belt straps attached to the railings": "https:
  "Maura VanderPutten (Environmental Sciences, Biology minor)": "https:
  "Zoë Winters '07 plays Kerry on HBO's Succession. (Photo: Macall B. Polay/HBO)": "https:
  "Susan Shopmaker accepts the Casting Award for The Holdovers on stage during the EE BAFTA Film Awards 2024 at The Royal Festival Hall on F...": "https:
  "Student and professor outdoors looking at a small container.": "https:
  "Thom Jones and Nicole Kidman smile at the camera with arms around each others shoulders": "https:
  "Amelia Ponirakis '23 at the Buffalo International Film Festival": "https:
  "Blue badge with yellow stripe and white globe": "https:
  "Student holds a container with a grasshopper.": "https:
  "RIOTUSA '22 and Ryan Press": "https:
  "political-theatre-in-prague": "https:
  "Hand in blue latex glove holds a pill between thumb and index finger on a pink background": "https:
  "Asian American woman in blue with elbow in the air": "https:
  "Flowers in the Purchase Native Pollinator Garden": "https:
  "Man in white t-shirt and black jacket smiles with water in background": "https:
  "Alessandro Chillé": "https:
  "Large box holding several paint cans": "https:
  "Standing left to right: David Settanni '09": "https:
  "Victoria deMartin '14": "https:
  "pwsw-shonnon-marshall-22": "https:
  "S U N Y Chancellor John King": "https:
  "Drama Desk Awards in gold with a feather award between the words.": "https:
  "Daffodils on campus": "https:
  "Jiaming Tang '18": "https:
  "Andrea Patterson '05": "https:
  "Bill Sage '88 in The New Group's The Seagull/Woodstock": "https:
  "Jordan Tetewsky '16 at Woodstock Film Festival": "https:
  "The Honorable Karen T. Beltran": "https:
  "Debora Martinez '22": "https:
  "Latinos Unidos Student Club / Club Fair 2022": "https:
  "Hal Hartley '84 (Photo: Michael Koshkin)": "https:
  "Participants in the annual Purchase Shark Tank-style competition for 2022.": "https:
  "Left) Ruth-Ann Gordon & Mauro David Cortina (right) hold their awards accompanied by the rest of our bridges students": "https:
  "Hunter Hollingsworth-Harris '22": "https:
  "The Princeton Review Guide to Green Colleges logo": "https:
  "Marcel Gbeffa during an artistic residency as a part of (T)HERE: Global Festival in 2019.": "https:
  "Woodstock Film Festival": "https:
  "Marco North '90": "https:
  "Professor of Theatre and Performance Jordan Schildcrout": "https:
  "Student presents senior project research at the annual Natural and Social Science Symposium.": "https:
  "Regina Spektor '01": "https:
  "Camille Seaman '92 at the Oceti Sakowin Camp": "https:
  "Iquail Shaheed MFA '12": "https:
  "Nicco Annan '98 at the NAACP Convention July 2022 holding the inaugural Trailblazer Award.": "https:
  "Douglas Shindler and Michael Davis": "https:
  "Dan Romer '04": "https:
  "Romare Bearden": "https:
  "Dan Deacon '04": "https:
  "Marjan Neshat '98": "https:
  "The Warded Man illustration by Allen Williams for Grim Oak Press": "https:
  "S U N Y Chancellor's Award for Excellence Recipients Laila Wilson and Corina Picon": "https:
  "Mara Keen MM '22": "https:
  "Merce Cunningham teaching.": "https:
  "Ernestine White-Mifetu '99 (Photo: Raphael Mifetu)": "https:
  "Visual Arts Alum Tom Cross '93": "https:
  "Zoë Winters '07": "https:
  "Nina Schatell '23": "https:
  "Erik Spink, Meet Me in the Meadow, 2021": "https:
  "Album Cover": "https:
  "Students talk at a table.": "https:
  "Amanda Seales '03": "https:
  "Rob Swainston, Assistant Professor Art+Design, Printmaking": "https:
  "Alice Selipanov '21": "https:
  "Mitski '13 from The Only Heartbreaker video, 2021": "https:
  "David Grill '86": "https:
  "Cast of ABC's Abbott Elementary": "https:
  "American Riad Project in Detroit.": "https:
  "Janet Rollé '84": "https:
  "Bioswale in the West 1 Parking Lot": "https:
  "Rena Butler '11 (Courtesy of Dance magazine)": "https:
  "Jonathan Harris '20": "https:
  "The President’s Award": "https:
  "Professor Shaka McGlotten": "https:
  "Professor of Literature Elise Lemire": "https:
  "Laila Wilson '22, playwriting and screenwriting": "https:
  "Anaïs Reno performs on September 11, 2021 at Citifield.": "https:
  "Meryl Cates '08": "https:
  "Jason Rodriguez '12 (Courtesy Santiago Felipe/RRR Creative)": "https:
  "Sophia Hadeshian": "https:
  "Damali O'Keefe '22": "https:
  "Andrea Thome": "https:
  "Fiske Guide to Colleges Best Buy School": "https:
  "Adon Cooper '09": "https:
  "Lucy Wijnands '20": "https:
  "Laura Ricciardi": "https:
  "Film still from Princesa by Melanie Rosete": "https:
  "Kyle Abraham '00 (Photo: Tatiana Will)": "https:
  "Silas Brown '10, assistant professor": "https:
  "Gabriella Shery '21": "https:
  "Laura Jobin-Acosta '20 MM": "https:
  "From left": "https:
  "Brianna Agront": "https:
  "Carl Safina '77 (Photo: Kizza Vincent)": "https:
  "Imani Parker '20": "https:
  "Anita Yavich": "https:
  "Neuberger Museum of Art Youth Education Program": "https:
  "Jen Schriever": "https:
  "Campus in the Fall": "https:
  "Processed with Snapseed.": "https:
  "Associate Professor of Chemistry Stephen Cooke": "https:
  "Solangie Ledesma '20": "https:
  "Live Performance and Interactive Media Workshop screen shot": "https:
  "Mariales Diaz '19 (film)": "https:
  "Fiske Guide to Colleges book cover": "https:
  "Pride Flag": "https:
  "Jostedalsbreen Glacier, Norway": "https:
  "Smalls Jazz Club": "https:
  "Professors Emeriti Lee Ehrman and Peter Schwab": "https:
  "S U N Y Chancellors Award for Excellence Winner Ilias Fourati '20": "https:
  "Filmmaker Mattson Tomlin '12": "https:
  "Rakeem Hardy '20 (dance)": "https:
  "Garth Greenwell '01 (Photo: William J. Adams)": "https:
  "Concert Hall, The Performing Arts Center": "https:
  "Purchase Cares Icon (Navy blue heart over lighter blue background)": "https:
  "Monica Ferrell, Associate Professor of Creative Writing": "https:
  "Erin Sullivan '12 (Photo: Renee Hahnel)": "https:
  "Art in Public Places / Quantum Leap by Isaiah Ship": "https:
  "Purchase College Startup Pitching Competition Winners Andres Hernandez-Rodriguez and Brian Farez.": "https:
  "Curator Patrice Giasson; Engels the artist; Cindy Millin; Instructor Felix Matta-Fletcher; Alessandra Russo; Leonardo Giasson.": "https:
  "Cyrille Aimée '08": "https:
  "Professor Warren Lehrer awarded the 2019 Ladislav Sutnar Prize": "https:
  "Edwidge Danticat": "https:
  "Paola Lázaro '09": "https:
  "President Emeritus Thomas J. Schwarz at the May 8 event celebrating his 17 year tenure at Purchase College. (Photo by Sean Zanni/PMC)": "https:
  "Purchase Garden": "https:
  "Instagram Post from Issa Dance Look": "https:
  "Michael Rakowitz '95": "https:
  "Colby Hollman '19 (acting)": "https:
  "Brian Kavanaugh '05 Earns Fulbright Award": "https:
  "Students in Seminar Class": "https:
  "The Andrew W. Mellon Foundation logo": "https:
  "Celeste Arias as Eléna and Jay O. Sanders as Ványa in Uncle Vanya": "https:
  "Dancers perform on stage": "https:
  "Dancer Jojo Boykins '18 featured on PBS' new ALLARTS channel (dancing in the Dance Building lobby)": "https:
  "Danniel Schoonebeek '08": "https:
  "David Rosenberg": "https:
  "Broadway Technical Theatre History Project": "https:
  "The Out of the Depths company takes a bow": "https:
  "Food Pantry sign": "https:
  "Ian Antonio": "https:
  "Janette Yarwood '96": "https:
  "Seniors Angela Galli and Kelly Hayes receive oversized check for winning the second annual Start Up Purchase Pitching Competition": "https:
  "Anne Kern Awarded Chevalier of the Order of Arts and Letters": "https:
  "Kerry LeVielle '17 (cinema studies)": "https:
  "Walt Whitman": "https:
  "The Quad": "https:
  "Literature professor Anthony Domestico speaks at the SUNY Chancellor's Inauguration": "https:
  "Students at Orientation 2018": "https:
  "Multicultural Center invites passers by to comment on the one thing they can do to build community and help end prejudice.": "https:
  "Purchase College Library exterior": "https:
  "Rachel Weiss '16 holds her NY Emmy": "https:
  "Kamala Sankaram Headshet": "https:
  "Kamala Sankaram": "https:
  "Jesus Christ Superstar Live in Concert / Ben Green '15 earned Emmy nomination for lighting direction.": "https:
  "Zaire Anderson '19 and the Art Force 5": "https:
  "Comedy of Errors": "https:
  "Brittny Cooper '15": "https:
  "Clint Ramos": "https:
  "Jiaming “Andy Tang '18": "https:
  "Regina Spektor '01 performing Après Moi during a day of filming with the Poetry in America team.": "https:
  "Teal ribbon symbol to end sexual assault": "https:
  "S U N Y Logo": "https:
  "Kate Gilmore": "https:
  "The PAC logo projected on the PepsiCo Theatre's stage curtain.": "https:
  "Max Pearce '18 slam dunks in the gym": "https:
  "Various students participating in a previous Purchase Alternative Service Trip": "https:
  "Kayla Cashetta Headshot": "https:
  "Neil Gaiman and Michael Chabon spoke as part of the Durst Distinguished Lecture Series.": "https:
  "Alyce Gilbert": "https:
  "Professor Dave Grill and intern Victoria Corbalis '18": "https:
  "Students and collaborators work on American Riad project in Detroit": "https:
  "Coronation of Poppea": "https:
  "Cover of Dance Magazine January 2018 issue": "https:
  "Ray Wilcox": "https:
  "Recipe for a Loving Community by Madeline Friedman '18": "https:
  "Wayne Tucker": "https:
  "Andrew Salomon at the Alumni Mixer for Journalism and Writing Majors": "https:
  "Artist in Residence Ignacio Iturria in the studio with students": "https:
  "Top row L to R: Tamisha Guy '13": "https:
  "The Purchase Dance Company recently visited Taipei and Kaohsiung City for performances": "https:
  "Bubble P logo with Man Booker Prize logo": "https:
  "A. Dean Irby, associate professor of acting": "https:
  "Arts Abroad Program Students": "https:
  "Arts Abroad Program": "https:
  "Majella Loughran '12 and the Diavolo Dance Company following their semi-final win on NBC's America's Got Talent": "https:
  "Dave Grill '86": "https:
  "Matt Wilson": "https:
  "Laura Kaminsky": "https:
  "Commencement 2016": "https:
  "Jon Faddis": "https:
  "Camille Seaman '92 The Lemaire Channel off the off the west coast of the Antarctic Peninsula": "https:
  "Dan Romer": "https:
  "Students studying abroad in India granted an audience with the Dalai Lama": "https:
  "Julianne Waber '17": "https:
  "Leah Woods '18": "https:
  "Ivan Forde '12": "https:
  "Occupy Museums": "https:
  "Screen shot from Madonna's video HerStory": "https:
  "Seniors Hannah": "https:
  "Artist Janet Langsam working in her studio circa 1970. Photo courtesy of Janet Langsam.": "https:
  "Carter Hudson '09": "https:
  "A crossroads with orange cones and a railroad crossing gate.": "https:
  "Joey Katz '18": "https:
  "Company 49 in Gint (Written by Romulus Linney": "https:
  "Marin Kosut, Professor of Sociology": "https:
  "Fred Wilson '76, Passionate Artist": "https:
  "Lip Critic's Hex Dealer album cover": "https:
  "Dana Freeman '25": "https:
  "Lucy Kalantari '98": "https:
  "Conservatory of Dance students take part in a film to announce the launch of Mugler Creators to support talented contemporary dance and m...": "https:
  "Student BioBlitz participant": "https:
  "Khlaif Tahir Thompson '18": "https:
  "A gallery visitor wearing a blue shirt seen from behind looking at art on the wall.": "https:
  "Film still from On The Ridge by Ruby Rose Makkena '23": "https:
  "Jessica Levy": "https:
  "Wordmark: The Hollywood Reporter in red": "https:
  "Brian MacDevitt '80": "https:
  "Concrete house on a distant hillside surrounded by trees and greens with a blue sky": "https:
  "Rosalynde LeBlanc '94 (Photo: Lee Gumbs)": "https:
  "Purchase Outdoors Club Hikes Hook Mountain": "https:
  "Paige Gilbert '14": "https:
  "Emily Ruth Verona '12": "https:
  "Lip Critic band": "https:
  "Students view the art on display in LaGuardia Airport Terminals B and C": "https:
  "Da'Vine Joy Randolph poses with the Supporting Actress Award for 'The Holdovers' in the winners room during the EE BAFTA Film Awards 2024...": "https:
  "Jessica Maffia MFA '24": "https:
  "The Quad and Residence Halls": "https:
  "Caleb Eberhardt '12 in glasses and a blue button down shirt with arms crossed": "https:
  "GRAMMY Awards® logo (illustration of gold gramophone on a brown base)": "https:
  "Hunter Hollingsworth '22": "https:
  "Acting majors Tachynel Merveille and Destiny Barbour won the Audience Favorite Award": "https:
  "Adam Birnbaum": "https:
  "billboard-magazine-touts-studio-production-program": "https:
  "Students enjoy Fun Fair on the Great Lawn during Welcome Week.": "https:
  "Assistant Professor of Communications Megan Rossman (Photo: Bri Elledge)": "https:
  "Portrait of light skinned Black dancer with hand bent over head": "https:
  "Shota Miyoshi '22": "https:
  "Vuk Lungulov-Klotz '16": "https:
  "Person walks in distance with Welcome to Purchase College sign on brick building": "https:
  "Chancellor King stands at a table chatting with EOP students.": "https:
  "Photo of Caitly Dominici '24": "https:
  "Edie Falco": "https:
  "Lisa Dawn Cave '83": "https:
  "Jen Schriever '04": "https:
  "James Ortiz '10": "https:
  "Jeff Croiter '93": "https:
  "David Bassuk, Professor of Acting": "https:
  "Nicco Annan '98 Wins NAACP Image Award for Outstanding Actor in a Drama Series.": "https:
  "Jovan Dansberry in Bob Fosse's Dancin' (Photo: Julieta Cervantes)": "https:
  "Thomas Warfield '88": "https:
  "Keerati Jinakunwiphat choreographing her new ballet for New York City Ballet": "https:
  "Jazz vocalist Samara Joy '21 (Photo: Meredith Truax)": "https:
  "Mitski '13 (Photo: Ebru Yildiz)": "https:
  "Darryl Rahn '15": "https:
  "Global Scholars students visit the UN": "https:
  "Creator/star Quinta Brunson and Chris Perfetti on the ABC sitcom Abbott Elementary. (Photo: Christopher Willard/": "https:
  "Blake Pfeil MA '19": "https:
  "Purchase Opera production of Dialogues of the Carmelites in 2020-2021.": "https:
  "AUDELCO Awards 50 Logo": "https:
  "Uranium spectrum visible": "https:
  "purchase-earns-a-competitive-fulbright-hays-award": "https:
  "Students use a comb knife to remove the caps from honey frames": "https:
  "LA Dance Project (from preview performances of Benjamin Millepied's ROMEO & JULIET SUITE during the @nuitsdefourviere festival i...": "https:
  "Furniture artist Sophie Glenn '12": "https:
  "Hunter Zimny '16": "https:
  "Erika Ebbs": "https:
  "Cellist and Lecturer Thomas Mesa": "https:
  "Fatoumata Fadiga": "https:
  "Lecturer and Soul Voices Choir Director Knoelle Higginson": "https:
  "Fiske Guide to Colleges": "https:
  "Kyle Abraham '00": "https:
  "Professor of Creative Writing Monica Ferrell": "https:
  "Sarah Catherine Hook '17 and Imani Lewis star in Netflix series First Kill.": "https:
  "Purchase College Leadership Institute 2021-2022": "https:
  "Naoki Yogi '22": "https:
  "Claire Giegerich '23": "https:
  "Allison Loggins-Hull '05": "https:
  "TJ Raphael '11": "https:
  "AJ Jordan '15": "https:
  "Jordan Tetewsky '16 (film)": "https:
  "Samara Joy '21 (jazz studies)": "https:
  "Tomashi Jackson, 2022 Roy R. Neuberger Prize Recipient": "https:
  "Phil Corso '11": "https:
  "Erik Spink '11": "https:
  "Aya Keefe": "https:
  "Entrepreneurship in the Arts major Shannon Dawson": "https:
  "West Side Story logo": "https:
  "Cecellia Koueth": "https:
  "A boulder marks the location where Brister Freeman's house is thought to have stood in Walden Woods. (Courtesy of the Walden Woods Project)": "https:
  "Lamesa Nashrat '21 (film)": "https:
  "Brittany Petronella '16 (photography, art history minor)": "https:
  "Raechelle Manalo '20": "https:
  "Katie Kresek '98, '99": "https:
  "Lee Tusman": "https:
  "Student on campus viewing a cell phone": "https:
  "Brian Otaño '11": "https:
  "Tamisha Guy '13": "https:
  "Gianna Caranfa '15 Inside her new tattoo parlor Bee Inked. (Mark Vergari/The Journal News)": "https:
  "Louise Bartolotta '16": "https:
  "Victor Cuoto '14": "https:
  "Bryan Korn": "https:
  "Jodi Long '76 Holds Up her Daytime Emmy® Award": "https:
  "Blood Wedding": "https:
  "ConnectiveCollective on view at the Neuberger Museum of Art through June 27": "https:
  "Caleb Dowden '21 (dance)": "https:
  "Purchase is Princeton Review Top 200 Best Value Colleges (students on the Quad in Adirondack chairs)": "https:
  "William Byram '20": "https:
  "POV Fest Logo": "https:
  "SUNYWide Film Festival design": "https:
  "Travis Sluss '07 (Photo: MacInspires Facebook)": "https:
  "Tanairi Vazquez '10 (dance performance)": "https:
  "Emma Caymares'12": "https:
  "Cover of Dance magazine": "https:
  "Entrance to the Broadview complex": "https:
  "Asst. Professor David DeJesus": "https:
  "Professor of Anthropology and Media Studies Jason Pine (Photo: Annette Hornischer)": "https:
  "Joe Matoske '10": "https:
  "Dave Grill": "https:
  "Purchase College sign at front with orange and gold mums.": "https:
  "David Graeber, 2016": "https:
  "Director": "https:
  "Interim President Dennis Craig and Chief Diversity Officer Jerima DeWese stand below the large clock on campus.": "https:
  "Actor Nicco Annan '98 as Uncle Clifford in Starz drama P-Valley": "https:
  "Britney DiTocco '20": "https:
  "S U N Y logo and wordmark, white on blue background": "https:
  "Juneteenth We Breathe Black art exhibition logo": "https:
  "Yancy Garcia": "https:
  "Dr. Milagros Milly Peña": "https:
  "Pete Malinverni": "https:
  "S U N Y Esports Challenge Co-sponsored by Extreme Networks": "https:
  "Elizabeth Cook '20 (acting)": "https:
  "Eric Gottesman": "https:
  "Claribel Ortega '10": "https:
  "Ford V Ferrari movie (Merrick Morton/20th Century Fox)": "https:
  "Purchase College Commencement at the Westchester Civic Center": "https:
  "Jon Samson '03 wins a Grammy for Best Childrens Album": "https:
  "Hannah Garner '15 (Credit: Mike Lindle)": "https:
  "Participants walk on the The Yellow Walk performance created by Kate Gilmore": "https:
  "Samara Joy McLendon '21 holds her Sarah Vaughan Jazz Vocal award.": "https:
  "Left to right: Sarah Yousef": "https:
  "Silas Brown": "https:
  "Damani Bissett '21": "https:
  "Melanie Rosete '20": "https:
  "Dr. Stephen Harris": "https:
  "Five Oceans in a Teaspoon Front Cover": "https:
  "Students play music on the mall": "https:
  "Purchase Jazz Orchestra at Blue Note": "https:
  "Mitski '13 (Photo: David Lee, Redmond, WA)": "https:
  "Students Conduct Research in Biology Lab": "https:
  "Lisa Jean Moore (stands at front of class)": "https:
  "Nick Bruno '15": "https:
  "The Center for Engagement": "https:
  "David Grill '86 and student look at stage model": "https:
  "Declan Moore '19 and Dave Grill '86 at Super Bowl 2019": "https:
  "Lorenzo Candelaria, Dean of the School of the Arts": "https:
  "Showtime at the Apollo cover": "https:
  "Mary Kosut, associate professor of sociology": "https:
  "Art in Vacant Spaces window 2018, “A Woman": "https:
  "Angie Kim, sustainability coordinator": "https:
  "Quaba Ernest and Aleksandra Gologorskaya from the Conservatory of Dance at Purchase College in Robbins' Watermill.": "https:
  "Artist Michael Rakowitz '95": "https:
  "Alumni Ben Green '15": "https:
  "Volunteers in the SUNY Stands with Puerto Rico initiative": "https:
  "Chasing Coral documentary still": "https:
  "Marcella Lewis '16": "https:
  "issadancelook Instagram account post": "https:
  "Gregory Spears": "https:
  "Fiske Guide to Colleges 2019 Badge": "https:
  "Stephen Ferri '13 (courtesy Westchester Magazine)": "https:
  "Madeline Cramer '18": "https:
  "Drama Desk Awards logo": "https:
  "Dane Laffrey": "https:
  "Maruti Evans": "https:
  "President Schwarz helps plant a tree for Clean and Green Day 2018": "https:
  "Andrew Pharmer '90": "https:
  "Jakub Ciupinski Headshot": "https:
  "Jakub Ciupinski": "https:
  "New Standards Combo in the Jazz Studies program": "https:
  "Joseph A. Skrivanek, professor of chemistry": "https:
  "President Thomas J. Schwarz": "https:
  "Students on the main plaza to protest gun violence": "https:
  "Abrielle Scharff and her Band on stage": "https:
  "Stone marker for site of Thoreau's cabin": "https:
  "Students in class": "https:
  "Steven Spielberg's The Post film shoot on campus": "https:
  "Jenar Antar '18": "https:
  "Jeanne Markel '81 and Chris Wedge '81": "https:
  "Shaka McGlotten, Associate Professor of Media Studies": "https:
  "Nancy Bowen": "https:
  "Students": "https:
  "Two Purchase photography students and an alumnus of the program discussed their work at a symposium honoring the work of Gordon Parks. L ...": "https:
  "Kelly Hayes '19": "https:
  "Cain Coleman '09-'11": "https:
  "WNYC logo": "https:
  "Conceptual artist Fred Wilson '76": "https:
  "Transpire": "https:
  "Authors Hari Kunzru and Katie Kitamura on stage during the Durst Distinguished Lecture Series.": "https:
  "Terese Capucilli '78": "https:
  "Kris Graves' 04": "https:
  "Avant Projekts": "https:
  "The campus of Purchase College.": "https:
  "Sunflowers behind the Student Services Building": "https:
  "FEUD: BETTE & JOAN Stanley Tucci '82 as Jack Warner": "https:
  "The band Cende": "https:
  "The senior class of Summit Academy Charter School with Ellen DeGeneres. Photo Credit: Michael Rozman/Warner Bros.": "https:
  "Gabriel Fridkis": "https:
  "Emma Porter '18": "https:
  "New Media Photography Expanded at PC4": "https:
  "Dr. Kristina Johnson, incoming SUNY Chancellor": "https:
  "Purchase Opera: The Crucible": "https:
  "Purchase Opera": "https:
  "Design Tech student Megan Seibel with her professor Dave Grill at the Super Bowl": "https:
  "Garth Greenwell": "https:
  "Scenic Art Studios founder Joseph B. Forbes": "https:
  "Recent Press Coverage": "https:
  "News Archive": "https:
  "PURCHASE MAGAZINE": "https:
  "media@purchase.edu": "nullmedia@purchase.edu",
  "Purchase in Pictures": "https:
  "Register": "https:
  "Meet the Director": "https:
  "Join Our Mailing List": "https:
  "Register for the Open House": "https:
  "Register Now": "https:
  "Continuing Education Course Proposal Form": "https:
  "Open Interior Design Courses": "https:
  "Post-Baccalaureate Premedical Studies": "https:
  "IIN Graduate One of 7 Black Entrepreneurs Changing the Face of the Health and Wellness Industry": "https:
  "New to Online Learning?": "https:
  "Interested in applying to Purchase College?": "https:
  "About the Program": "https:
  "Requirements": "https:
  "Courses": "https:
  "Meet Our Faculty": "https:
  "Meet Our Alumni": "https:
  "Current Senior Acting Company": "https:
  "Recent News": "https:
  "Acting Network": "https:
  "Performances": "https:
  "Facilities": "https:
  "Alumni": "https:
  "Liam Joynt": "https:
  "Maggie Surovell": "https:
  "acting.auditions@purchase.edu": "nullacting.auditions@purchase.edu",
  "Micah Stock ’11": "https:
  "Machinal": "https:
  "SEE FULL GALLERY": "https:
  "See if we answered them here": "https:
  "PURCHASE magazine cover story": "https:
  "Orlagh Cassidy ’90": "https:
  "Sherry Stringfield ’89": "https:
  "Alano Miller ’02": "https:
  "Nicco Annan ’98": "https:
  "Lei-Lei Bavoil ’15": "https:
  "Gina Belafonte ’83": "https:
  "Chris Perfetti ’11": "https:
  "Paige Gilbert ’14": "https:
  "News and Events": "https:
  "Lorraine Plourde": "https:
  "Visit the Career Development Center to learn more": "https:
  "Anthropology Professor Lorraine Plourde on The Urbanist podcast": "https:
  "Opeoluwa Obasa ’20": "https:
  "Cassidy Rose Hammond ’17": "https:
  "Karen T. Beltran ’02": "https:
  "Awards": "https:
  "Paul Kaplan": "https:
  "Gilman Scholarship Spotlight: Frankie Bademci ’23": "https:
  "Professor Elizabeth Guffey Pens Article on “Active Exclusion”": "https:
  "Michelle Friedman ’11": "https:
  "Fellowships and Awards": "https:
  "Jonah Westerman": "https:
  "Application Details": "https:
  "Kristen Galvin ’08": "https:
  "Shilpi Chandra MA ’15 Has Solo Curatorial Debut": "https:
  "Chelsea Spengemann, MA ’11": "https:
  "A and D Handbook": "https:
  "Minor in Arts Management": "https:
  "Internships": "https:
  "Jandon Lecture Series": "https:
  "Notes from the Field": "https:
  "SAMMIES": "https:
  "Semester in France": "https:
  "Semester in Hungary": "https:
  "Maria Guralnik": "nullmaria.guralnik@purchase.edu",
  "Jordan Shue": "https:
  "email the department": "nullAME.arts.management@purchase.edu",
  "Visit the Career Development Center": "https:
  "READ MORE ABOUT THEIR WORK": "https:
  "SEE IMAGES FROM THE OPENING": "https:
  "The 2023 Startup Competition Awards $5,000 in Prizes": "https:
  "Rachael Pazdan ’12": "https:
  "Lily Thrall ’14": "https:
  "Josh Abess ’12": "https:
  "Angela Galli ’19": "https:
  "Viktoriya Molchanova ’20": "https:
  "Cheyenne Myrie ’17": "https:
  "Adriana Arguelles ’13": "https:
  "General Education": "https:
  "other degree requirements": "https:
  "Eight-Semester Graduation Plan": "https:
  "theatre and performance": "https:
  "Requirements for Minor": "https:
  "Christian Bailey": "https:
  "Joseph Skrivanek": "https:
  "eight-semester plan": "https:
  "Students Attend National STEM Conference": "https:
  "Showcasing the Sciences": "https:
  "Coral Reef Program": "https:
  "Mark Jonas": "https:
  "Senior Project": "https:
  "Student Science Symposium": "https:
  "Elliott Abrams, PhD": "https:
  "James G. Daly, PhD": "https:
  "Erika Ebbs, PhD": "https:
  "Lee Ehrman, PhD": "https:
  "Jan Robert Factor, PhD": "https:
  "Stephen E. Harris, PhD": "https:
  "George Kraemer, PhD": "https:
  "Maryann McEnroe, PhD": "https:
  "Joseph A. Skrivanek, PhD": "https:
  "Behind the Brick: Gen Bio I Lab": "https:
  "Inside the Facilities": "https:
  "Closer Look: Biotech Concentration": "https:
  "Jeffrey Arroyo": "https:
  "Careers in Biology": "https:
  "Elizabeth Bardwil-Lugones ’21": "https:
  "Colm McCarthy ’09": "https:
  "Jorge Acuna ’20": "https:
  "Mark Viniello ’92": "https:
  "Minor in Biology": "https:
  "senior project": "https:
  "John Ambroseo ’83": "https:
  "Jaya Mohanan Lakshmi ’99": "https:
  "Alfredo Garcia-Pardo": "nullalfredo.garciapardo@purchase.edu",
  "Transnational Filmmaking Project": "https:
  "Student Work and Accolades": "https:
  "Nathan Holmes": "https:
  "fms@purchase.edu": "nullfms@purchase.edu",
  "Azazel Jacobs ’94 visits to screen HIS THREE DAUGHTERS": "https:
  "Cinema Studies Students Attend Film Archiving Conference": "https:
  "Halloween Edition of CINEMAROLL is now out": "https:
  "Sean Dunne ’03": "https:
  "Eric Hahn ’14": "https:
  "Troy Peterson ’19": "https:
  "Paul Drechsler-Martell ’07": "https:
  "college policies": "https:
  "VOCES": "https:
  "Lectures": "https:
  "Student Publications": "https:
  "Humanities Events": "https:
  "Working in Humanities": "https:
  "Megan Rossman": "https:
  "Benjamin Chalson ’20": "https:
  "Tayler Montague ’19": "https:
  "Riot USA ’22": "https:
  "Jaden Doret ’23": "https:
  "Broadcast TV Studio Provides Professional Experience": "https:
  "Bachelor of Music": "https:
  "Minor of Music (Classical Composition)": "https:
  "Master of Music": "https:
  "Private Lessons": "https:
  "Music Courses": "https:
  "Graduate": "https:
  "LEARN MORE ABOUT APPLY TODAY MUSIC AT PURCHASE": "https:
  "Lecturer Gregory Spears Premieres “Love Story”": "https:
  "Sequoia Sellinger ’17": "https:
  "Jordan Mclean ’06, MM ’20": "https:
  "Matthew Immergut": "https:
  "Joshua Lutz": "https:
  "Mindfulness In Action": "https:
  "A Lecture with Dan Goleman": "https:
  "Phakchok Rinpoche and Erric Solomon “Radically Happy”": "https:
  "Student Journal: Italics Mine": "https:
  "How to Apply": "https:
  "Mehdi Tavana Okasi": "https:
  "The Durst Distinguished Chair and the Durst Lecture Series": "https:
  "studying abroad": "https:
  "Misty Yarnall ’22": "https:
  "Trisha Murphy ’19": "https:
  "Emily Verona ’12": "https:
  "Marissa LaRocca ’09": "https:
  "Author Jiaming Tang ’18 Discusses Debut Novel": "https:
  "Debut Novel by Emily Ruth Verona ’12 With Nods to Cinema": "https:
  "Study Abroad": "https:
  "Pilates Micro-Credential": "https:
  "Purchase Dance Company": "https:
  "Nelly van Bommel": "https:
  "Doug Varone ’78": "https:
  "BalletX to Perform Work by Choreographer Nicolo Fonte ’87": "https:
  "Thomas Warfield ’88": "https:
  "Jai Perez ’23": "https:
  "Meryl Cates ’08": "https:
  "Joy-Marie Thompson ’18": "https:
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    linkTextContent,
    linkTextToUrlMap
  };
} else {
  
  window.linkTextContent = linkTextContent;
  window.linkTextToUrlMap = linkTextToUrlMap;
}
