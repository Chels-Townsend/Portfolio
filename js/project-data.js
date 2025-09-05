/**
 * Project Data
 * Contains detailed information about each project
 */
const projectsData = [
  {
    id: "financial-literacy",
    title: "Ninth Grade Financial Literacy",
    shortDescription:
      "An interactive microcourse designed for teens to learn how to plan and meet their savings goals.",
    fullDescription: `
      <p>This comprehensive e-learning module helps ninth-grade students develop essential financial literacy skills. The course combines interactive activities, real-world scenarios, and gamified elements to engage students with practical financial concepts.</p>
      
      <p>Key learning objectives include:</p>
      <ul>
        <li>Understanding personal budgeting principles</li>
        <li>Setting achievable financial goals</li>
        <li>Differentiating between needs and wants</li>
        <li>Building basic investment knowledge</li>
      </ul>
      
      <p>The module incorporates adaptive learning paths that adjust to student choices, providing personalized feedback and guidance throughout the learning journey.</p>
    `,
    thumbnail: "images/growing money.jpg",
    fullImage: "images/growing money.jpg",
    tags: ["E-Learning", "Instructional Design"],
    tools: ["Articulate Storyline", "Adobe Illustrator"],
    duration: "4 weeks",
    role: "Instructional Designer & Developer",
    links: [
      {
        text: "View Course",
        url: "https://chels-townsend.github.io/Saving-and-Growing-your-Money/",
        primary: true,
      },
    ],
  },

  {
    id: "time-game",
    title: "Telling Time in Other Languages",
    shortDescription:
      "An interactive game that teaches users to tell time in Spanish, French, German, and Japanese.",
    fullDescription: `
      <p>This single-page application helps language learners practice and test their time-telling skills across multiple languages. The gameplay is straightforward: players select their target language, then receive time phrases in that language and must adjust a digital clock to match the given time. With no time pressure the focus remains on repetition and steady language acquisition.</p>
      
      <p>Key learning objectives include:</p>
      <ul>
        <li>Reading and interpreting time phrases in different languages</li>
        <li>Understanding various time-telling conventions and expressions</li>
        <li>Converting between 12-hour and 24-hour time formats</li>
      </ul>
      
      <p>The game provides immediate feedback and adapts to player choices, creating a personalized learning experience that reinforces comprehension through consistent practice.</p>
    `,
    thumbnail: "./images/Timegame2.jpg",
    fullImage: "./images/Timegame2.jpg",
    tags: ["Gamification", "E-Learning"],
    tools: ["Visual Studio Code", "Anthropic's Claude"],
    duration: "1 day",
    role: "Instructional Designer & Developer",
    links: [
      {
        text: "View Game",
        url: "https://chels-townsend.github.io/Time-Language-Game/",
        primary: true,
      },
    ],
  },
  {
    id: "sales-quest",
    title: "Sales Quest Job Aid",
    shortDescription:
      "A job aid designed to assist customer-facing sales roles identify metrics, decision criteria, and champions.",
    fullDescription: `
      <p>This comprehensive job aid supports sales professionals in navigating complex enterprise sales processes. It provides structured frameworks for identifying key stakeholders, documenting crucial decision factors, and tracking engagement metrics throughout the sales journey.</p>
      
      <p>The job aid includes:</p>
      <ul>
        <li>Stakeholder mapping templates</li>
        <li>Decision criteria assessment tools</li>
        <li>Competitor analysis frameworks</li>
        <li>Value proposition alignment guides</li>
      </ul>
      
      <p>Based on proven sales methodologies and enhanced with practical examples from real-world scenarios, this tool helps sales teams maintain consistency in their approach while adapting to each unique customer situation.</p>
    `,
    thumbnail: "images/office.jpg",
    fullImage: "images/office.jpg",
    tags: ["Instructional Design", "Gamification"],
    tools: ["Adobe InDesign", "Microsoft Excel"],
    duration: "3 weeks",
    role: "Content Designer & Researcher",
    links: [
      {
        text: "View Example",
        url: "pdf-works/Sales Quest Final.pdf",
        primary: true,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ],
  },
  {
    id: "engagement-patterns",
    title: "Engagement Patterns Research",
    shortDescription:
      "Comprehensive study analyzing student engagement patterns in online learning environments, with recommendations for improving retention and outcomes.",
    fullDescription: `
      <p>This research project investigated the relationship between different types of learner engagement and educational outcomes in online learning environments. By analyzing data from over 500 students across multiple course formats, the study identified key patterns and behaviors that correlate with successful learning experiences.</p>
      
      <p>The research methodology included:</p>
      <ul>
        <li>Quantitative analysis of learning management system data</li>
        <li>Qualitative interviews with students and instructors</li>
        <li>Comparative analysis of different course structures</li>
        <li>Longitudinal tracking of engagement metrics</li>
      </ul>
      
      <p>The findings have been used to develop a framework for designing more engaging online learning experiences, with specific recommendations for content structure, interaction design, and feedback mechanisms.</p>
    `,
    thumbnail: "images/placeholder-research.jpg",
    fullImage: "images/placeholder-research.jpg",
    tags: ["E-Learning", "Data Analysis"],
    tools: ["R Studio", "SPSS", "Tableau"],
    duration: "6 months",
    role: "Lead Researcher",
    links: [
      {
        text: "View Research Summary",
        url: "#",
        primary: true,
      },
      {
        text: "Download Whitepaper",
        url: "#",
        primary: false,
      },
    ],
  },
  {
    id: "microlearning",
    title: "Microlearning Series",
    shortDescription:
      "A series of bite-sized learning modules designed for mobile consumption, focusing on just-in-time training for professional development.",
    fullDescription: `
      <p>This microlearning series delivers concentrated knowledge in easily digestible formats optimized for mobile devices. Designed for busy professionals, each module can be completed in under 10 minutes while delivering practical, immediately applicable skills.</p>
      
      <p>The series features:</p>
      <ul>
        <li>15 self-contained modules on essential workplace skills</li>
        <li>Rich media content including animations and interactive scenarios</li>
        <li>Built-in spaced repetition reminders</li>
        <li>Quick knowledge checks and application challenges</li>
      </ul>
      
      <p>All content follows mobile-first design principles with adaptive layouts, offline functionality, and seamless progress synchronization across devices.</p>
    `,
    thumbnail: "images/placeholder-mobile.jpg",
    fullImage: "images/placeholder-mobile.jpg",
    tags: ["E-Learning", "Mobile Design"],
    tools: ["Adobe Captivate", "Articulate Rise", "Figma"],
    duration: "3 months",
    role: "Mobile Learning Designer",
    links: [
      {
        text: "Try Demo Module",
        url: "#",
        primary: true,
      },
    ],
  },
  {
    id: "adaptive-learning",
    title: "Adaptive Learning Platform",
    shortDescription:
      "A personalized learning system that adjusts content difficulty based on learner performance and preferences.",
    fullDescription: `
      <p>This adaptive learning platform uses AI-powered algorithms to create personalized learning paths for each user. By continuously analyzing performance data, the system dynamically adjusts content difficulty, presentation methods, and practice activities to optimize the learning experience.</p>
      
      <p>Key features include:</p>
      <ul>
        <li>Personalized skill gap analysis</li>
        <li>Dynamic content sequencing based on performance</li>
        <li>Multiple content formats to match learning preferences</li>
        <li>Intelligent knowledge assessment that adapts to user responses</li>
        <li>Detailed analytics dashboard for tracking progress</li>
      </ul>
      
      <p>The platform integrates with existing LMS environments while providing an enhanced learning experience that significantly improves knowledge retention and skill development compared to traditional approaches.</p>
    `,
    thumbnail: "images/placeholder-adaptive.jpg",
    fullImage: "images/placeholder-adaptive.jpg",
    tags: ["E-Learning", "Adaptive Learning"],
    tools: ["Python", "TensorFlow", "React.js", "Node.js"],
    duration: "8 months",
    role: "Learning Experience Designer & Technical Consultant",
    links: [
      {
        text: "Platform Overview",
        url: "#",
        primary: true,
      },
      {
        text: "Technical Documentation",
        url: "#",
        primary: false,
      },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents in Education",
    shortDescription:
      "Research on implementing large language models as learning assistants in educational environments with a focus on ethical considerations.",
    fullDescription: `
      <p>This research project explores the potential applications and ethical implications of deploying AI-powered conversational agents in educational settings. The study examines how large language models can serve as learning assistants, tutors, and feedback providers while addressing critical questions around privacy, bias, and appropriate implementation.</p>
      
      <p>The research scope includes:</p>
      <ul>
        <li>Comparative analysis of different AI assistant implementation models</li>
        <li>User experience studies with students and educators</li>
        <li>Development of ethical guidelines and best practices</li>
        <li>Exploration of hybrid human-AI teaching approaches</li>
      </ul>
      
      <p>The findings provide evidence-based recommendations for educational institutions considering AI integration, with particular emphasis on maintaining human connection in learning while leveraging technological capabilities to enhance educational experiences.</p>
    `,
    thumbnail: "images/information-data.jpg",
    fullImage: "images/information-data.jpg",
    tags: ["E-Learning", "Emerging Tech", "Research"],
    tools: ["LangChain", "OpenAI API", "Qualitative Analysis Software"],
    duration: "Ongoing",
    role: "Principal Investigator",
    links: [],
  },
  {
    id: "gamified-learning",
    title: "Gamified Learning Modules",
    shortDescription:
      "Interactive learning experiences that incorporate game mechanics to increase engagement and knowledge retention.",
    fullDescription: `
      <p>This suite of gamified learning modules transforms traditional training content into immersive, challenge-based experiences. By incorporating game elements like points, levels, achievements, and narrative, these modules significantly increase learner engagement and knowledge retention.</p>
      
      <p>The gamification framework includes:</p>
      <ul>
        <li>Progressive challenge system that adapts to learner skill</li>
        <li>Narrative-driven scenarios that contextualize learning objectives</li>
        <li>Reward mechanisms tied to demonstration of knowledge</li>
        <li>Social elements for team-based learning and healthy competition</li>
        <li>Performance analytics that visualize progress and mastery</li>
      </ul>
      
      <p>Each module maintains a careful balance between entertainment value and educational integrity, ensuring that game mechanics enhance rather than distract from the learning objectives.</p>
    `,
    thumbnail: "images/placeholder-gamification.jpg",
    fullImage: "images/placeholder-gamification.jpg",
    tags: ["E-Learning", "Gamification"],
    tools: ["Articulate Storyline", "Adobe Animate", "Construct 3"],
    duration: "5 months",
    role: "Gamification Designer",
    links: [
      {
        text: "Try Demo",
        url: "#",
        primary: true,
      },
      {
        text: "Implementation Guide",
        url: "#",
        primary: false,
      },
    ],
  },
];

