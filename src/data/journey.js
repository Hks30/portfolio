// Transform the data structure to an array format that StoryMap.jsx expects
export const journeyData = [
  // Education entry
  {
    id: 1,
    title: "Temple University",
    subtitle: "Bachelor's in Computer Science",
    details: "GPA: 3.42",
    skills: ["Java", "Python", "OOP"],
    timeframe: "Graduated Fall 2024",
    position: { x: 0, y: 0 } // This will be overridden by the StoryMap component
  },
  // Projects
  {
    id: 2,
    title: "GaiNS.ai Project",
    subtitle: "AI-Powered Workout Assistant",
    details: "Integrated ChatGPT API",
    skills: ["Python", "Django", "REST API"],
    github: "https://github.com/cis3296s24/01-Gains-AI",
    position: { x: 0, y: 0 }
  },
  {
    id: 3,
    title: "Travel Tales",
    subtitle: "Full-Stack Travel Blog",
    details: "Responsive UI with React",
    skills: ["React", "Spring Boot", "MySQL"],
    github: "https://github.com/Hks30/Travel-Tales",
    position: { x: 0, y: 0 }
  },
  {
    id: 4,
    title: "InSync",
    subtitle: "Multilingual Communication App",
    details: "Real-time translation capabilities",
    skills: ["Node.js", "Python", "API Integ."],
    github: "https://github.com/capstone-projects-2024-fall/aldwairi-projects-insync-language-translator",
    position: { x: 0, y: 0 }
  },
  {
    id: 5,
    title: "Mobile Web Browser",
    subtitle: "Android Application",
    details: "Feature-rich browsing experience",
    skills: ["Kotlin", "Android"],
    github: "https://github.com/Hks30/MobileBrowser.git",
    position: { x: 0, y: 0 }
  }
];