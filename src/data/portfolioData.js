// ============================================================
// PORTFOLIO DATA — Edit this file to update all content
// ============================================================

export const personalInfo = {
  name: "Rohan Cherkar",
  title: ["Web Developer", "MERN Stack Developer", "Full-Stack Developer", "React Developer"],
  headline: "Building Modern Web Experiences with Clean & Scalable Code.",
  shortIntro:
    "Entry-level MERN Stack Developer passionate about crafting performant, scalable web applications. I break down complex problems, write clean maintainable code, and iterate fast.",
  location: "Mumbai, India",
  email: "cherkarrohan@gmail.com",
  github: "https://github.com/Rohan-cherkar",
  linkedin: "https://linkedin.com/in/rohan-cherkar",
  githubUsername: "Rohan-cherkar",
  resumeUrl: "/resume.pdf",
  photo: "/images/Rohan.png",
  availability: "Open to Work – Fresher / Entry-Level Roles",
};

export const aboutMe = {
  bio: "I'm a B.E. Information Technology graduate from Konkan Gyanpeeth College of Engineering, Karjat, with a CGPA of 8.56 — ranked 1st in the IT department. My passion lies in building secure, scalable web applications as a Full-Stack, Backend, or Frontend developer. I approach every project by breaking problems down into manageable pieces, writing clean and maintainable code, then testing and iterating until the solution is robust and ready to scale.",
  stats: [
    { label: "CGPA", value: 8.56, suffix: "", decimals: 2, icon: "🎓" },
    { label: "Projects Built", value: 3, suffix: "+", decimals: 0, icon: "🚀" },
    { label: "IT Dept. Rank", value: 1, suffix: "st", decimals: 0, prefix: "#", icon: "🏆" },
  ],
};

export const skills = [
  {
    category: "Frontend Development",
    icon: "FaCode",
    color: "#7C3AED",
    items: [
      { name: "HTML5", icon: "FaHtml5" },
      { name: "CSS3", icon: "FaCss3Alt" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "React.js", icon: "FaReact" },
      { name: "Bootstrap", icon: "SiBootstrap" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
    ],
  },
  {
    category: "Backend Development",
    icon: "FaServer",
    color: "#A855F7",
    items: [
      { name: "Node.js", icon: "FaNodeJs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "REST APIs", icon: "FaCode" },
      { name: "Passport.js", icon: "SiPassport" },
      { name: "JWT", icon: "SiJsonwebtokens" },
    ],
  },
  {
    category: "Databases",
    icon: "FaDatabase",
    color: "#8B5CF6",
    items: [
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "Mongoose", icon: "SiMongoose" },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "FaTools",
    color: "#C4B5FD",
    items: [
      { name: "Git", icon: "FaGit" },
      { name: "GitHub", icon: "FaGithub" },
      { name: "VS Code", icon: "SiVisualstudiocode" },
      { name: "Postman", icon: "SiPostman" },
      { name: "AWS", icon: "FaAws" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Roamly",
    subtitle: "Travel Listing Platform",
    description:
      "A full-stack travel listing platform featuring Passport.js authentication, full CRUD operations, Joi validation, and Cloudinary image uploads. Users can list, browse, and manage travel destinations.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Joi",
    ],
    liveUrl: "https://roamly-full-stack-project.onrender.com/listings/",
    githubUrl: "https://github.com/Rohan-cherkar/PROJECT",
    // Replace with actual screenshot: public/images/roamly.png
    image: "/images/roamly.png",
    color: "#7C3AED",
  },
  {
    id: 2,
    title: "Tradeza",
    subtitle: "Zerodha-style Trading Platform",
    description:
      "A MERN Stack trading platform clone with JWT authentication, holdings/positions/orders/watchlist dashboard, real-time-style charts, and a buy-order API. Built with React + Vite and Material UI.",
    tech: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Material UI",
      "Chart.js",
    ],
    liveUrl: " https://zerodha-clone-full-stack.vercel.app/",
    githubUrl: "https://github.com/Rohan-cherkar/Tradeza-Full-Stack",
    // Replace with actual screenshot: public/images/tradeza.png
    image: "/images/tradeza.png",
    color: "#A855F7",
  },
  {
    id: 3,
    title: "Digital Voice",
    subtitle: "Gesture Voice AI — Speech Assistance for Speech-Impaired People",
    description:
      "A Python-based gesture recognition system that converts hand gestures into real-time speech output using OpenCV and deep learning. Aimed at assisting speech-impaired individuals.",
    tech: ["Python", "OpenCV", "TensorFlow", "Keras", "NumPy"],
    liveUrl: "", // No live demo — button is hidden when empty
    githubUrl: "https://github.com/Rohan-cherkar", // Update with actual repo URL
    // Replace with actual screenshot: public/images/digital-voice.png
    image: "/images/digital-voice.png",
    color: "#8B5CF6",
  },
];

export const experience = [
  {
    id: 1,
    company: "Walmart Global Tech",
    role: "Advanced Software Engineering",
    type: "Virtual Experience",
    platform: "Forage",
    period: "September 2026",
    description:
      "Completed Walmart Global Tech's Advanced Software Engineering Job Simulation on Forage. Gained hands-on exposure to advanced data structures, software architecture patterns, relational database design, and data munging techniques used at enterprise scale.",
    tasks: [
      "Advanced Data Structures",
      "Software Architecture",
      "Relational Database Design",
      "Data Munging",
    ],
    badge: "Virtual",
    color: "#7C3AED",
  },
];

export const education = [
  {
    id: 1,
    degree: "B.E. Information Technology",
    institution: "Konkan Gyanpeeth College of Engineering",
    location: "Karjat, Maharashtra",
    period: "2022 – 2026",
    grade: "CGPA: 8.56",
    highlight: "Ranked 1st in IT Department",
    icon: "🎓",
    color: "#7C3AED",
  },
  {
    id: 2,
    degree: "HSC (Science)",
    institution: "KES Nanda Deshmukh English Medium Secondary College",
    location: "Alibag, Maharashtra",
    period: "2020 – 2022",
    grade: "75.83%",
    highlight: "",
    icon: "📚",
    color: "#A855F7",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Ranked 1st in IT Department",
    issuer: "Konkan Gyanpeeth College of Engineering",
    year: "2026",
    icon: "🏆",
    type: "achievement",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms with Java",
    issuer: "Apna College",
    year: "2024",
    icon: "📜",
    type: "certification",
  },
  {
    id: 3,
    title: "AWS Cloud Assessment Test",
    issuer: "LearnTube.ai",
    year: "2024",
    icon: "☁️",
    type: "certification",
  },
  {
    id: 4,
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart Global Tech – Forage",
    year: "2026",
    icon: "🛒",
    type: "simulation",
  },
  // Add more achievements/hackathons here easily:
  // { id: 5, title: "Hackathon Winner", issuer: "...", year: "...", icon: "🥇", type: "hackathon" },
];

export const languages = [
  { name: "JavaScript", percent: 80, color: "#F7DF1E" },
  { name: "Java", percent: 75, color: "#ED8B00" },
  { name: "Python", percent: 50, color: "#3776AB" },
  // { name: "C", percent: 40, color: "#A8B9CC" },
];

export const featuredRepos = [
  {
    name: "Tradeza-Full-Stack",
    description: "MERN Stack Zerodha-style trading platform",
    language: "JavaScript",
    url: "https://github.com/Rohan-cherkar/Tradeza-Full-Stack",
    color: "#F7DF1E",
  },
  {
    name: "PROJECT (Roamly)",
    description: "Full-stack travel listing platform with Node/Express/MongoDB",
    language: "JavaScript",
    url: "https://github.com/Rohan-cherkar/PROJECT",
    color: "#F7DF1E",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  // { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
