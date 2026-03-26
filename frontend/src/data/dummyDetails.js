export const dummyProjects = [
  // ==================== SMART MOBILITY PROJECTS ====================
  {
    id: "TR-2024-115",
    title: "MSU Shuttle Service",
    subtitle: "Campus Transport",
    category: "Smart Mobility",
    shortDescription: "A smart shuttle booking system for the university, ensuring timely and predictable faculty transportation.",
    fullDescription: "To solve the massive distances between departments at MSU, this project builds a smart shuttle tracking network using open-source hardware and a robust mobile application. The backend efficiently routes shuttles during peak hours using real-time demand modeling.",
    tags: ["Mobile App", "Dart", "Flutter", "Node.js", "Express"],
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Reducing commute wait times across the 100-acre campus by predicting shuttle arrivals accurately.",
    mentor: { name: "Pritam Bhagat", role: "Project Guide", department: "CSE", image: "/mentors/ps.jpeg" },
    teamSize: 5,
    team: [
      { name: "Sujal Thapa", role: "Project Leader", image: "/members/Shuttle/sujal.jpeg" },
      { name: "Rejeol Bhutia", role: "App Developer", image: "/members/Shuttle/rejeol.jpeg" },
      { name: "Adarshan Rai", role: "Frontend Developer", image: "/members/Shuttle/ada.jpeg" },
      { name: "Abash Ansari", role: "Backend Developer", image: "/members/Shuttle/abash.jpeg" },
      { name: "Bikas Prasad", role: "UI/UX Designer", image: "/members/Shuttle/bikas.jpeg" },
    ],
    gallery: [
      { title: "App Prototype", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&auto=format&fit=crop", description: "User-friendly mobile interface showing real-time shuttle locations, estimated arrival times, and seat availability." },
      { title: "GPS Module", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop", description: "Custom-built ESP32 GPS tracker installed in campus shuttles, transmitting location data every 3 seconds." },
      { title: "Shuttle Tracking", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=300&auto=format&fit=crop", description: "Live dashboard displaying all active shuttle routes with real-time positioning." }
    ],
    methodology: [
      { id: 1, title: "Hardware Integration", desc: "Equipping 15 campus buses with custom-built ESP32 GPS trackers pinging data every 3 seconds." },
      { id: 2, title: "ETA Prediction Modeling", desc: "Using historical traffic data to adjust ETA in the mobile app during peak campus hours." }
    ],
    milestone: { phase: "Phase 3: Beta Testing", desc: "Live testing with 500 volunteer students on the main North Campus route." }
  },

  // ==================== AR/VR & DIGITAL TWINS ====================
  {
    id: "AL-2024-082",
    title: "Building Medhavi Skills University in 3D",
    subtitle: "Virtual Campus Tour",
    category: "AR/VR & Digital Twins",
    shortDescription: "An immersive 3D virtual campus experience allowing prospective students, faculty, and visitors to explore Medhavi Skills University from anywhere in the world.",
    fullDescription: "This project creates a fully interactive 3D digital twin of Medhavi Skills University's campuses in East Sikkim (Singtam) and West Sikkim (Bermiok). Using advanced photogrammetry and 3D modeling techniques, every building, pathway, and landmark has been meticulously recreated to provide an authentic virtual campus experience.\n\nKey features include 360-degree navigation, interactive information points about departments and facilities, virtual tours of laboratories and classrooms, and real-time integration with campus events. The model serves as an invaluable tool for recruitment, orientation, and showcasing the university's infrastructure to a global audience.\n\nBuilt using Unity and optimized for both web and mobile platforms, the virtual campus allows users to explore at their own pace, access detailed information about each facility, and even visualize future expansion plans.",
    tags: ["3D Modeling", "Unity", "Photogrammetry", "Virtual Tour", "WebGL"],
    heroImage: "/Pgallery/KiranP.png",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Bringing the campus to students, no matter where they are in the world.",
    mentor: { name: "Sachin Sharma", role: "Project Guide", department: "CSE", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", faculty: "Faculty of Computer Science & Engineering" },
    teamSize: 1,
    team: [{ name: "Kiran Kumar Dhakal", role: "3D Modeler", image: "/members/3d/kiran.jpg" }],
    gallery: [
      { title: "Main Campus Overview", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=300&auto=format&fit=crop", description: "Aerial view of the Singtam campus with all major buildings and pathways accurately modeled." },
      { title: "Academic Block Interior", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=300&auto=format&fit=crop", description: "Detailed interior modeling of classrooms, laboratories, and faculty offices." },
      { title: "Student Common Area", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=300&auto=format&fit=crop", description: "Virtual recreation of the student lounge, cafeteria, and recreational spaces." },
      { title: "Hostel Facilities", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=300&auto=format&fit=crop", description: "3D walkthrough of residential facilities with room layouts and common amenities." }
    ],
    methodology: [
      { id: 1, title: "Photogrammetry & Scanning", desc: "Using drone-captured imagery and ground-level photography to create accurate 3D mesh models." },
      { id: 2, title: "3D Modeling & Texturing", desc: "Detailed modeling in Blender with realistic textures and lighting." },
      { id: 3, title: "Unity Integration & Optimization", desc: "Importing models into Unity, optimizing for web performance, and adding interactive elements." },
      { id: 4, title: "WebGL Deployment", desc: "Exporting as WebGL for browser-based access across all devices." }
    ],
    milestone: { phase: "Phase 3: Beta Launch", desc: "Singtam campus model complete, currently testing navigation features." }
  },

  // ==================== IOT & SECURITY SYSTEMS ====================
  {
    id: "SC-2024-055",
    title: "RFID Security System",
    subtitle: "Campus Security",
    category: "IoT Edge",
    shortDescription: "An automated RFID-based access control and attendance mechanism implemented across 12 university laboratories.",
    fullDescription: "Enhancing the security framework of highly sensitive research laboratories. This integrated RFID ecosystem ensures seamless dual-factor authentication, robust logging of entries/exits, and automated attendance mapping for research scholars.",
    tags: ["RFID", "Security", "Hardware", "Database"],
    heroImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
    quote: "A low-latency security infrastructure operating independently of the central DNS.",
    mentor: { name: "Pappumoni Bordoloi", role: "Project Guide", department: "CSE", image: "/mentors/PappumoniSir.jpeg", faculty: "HOD of Cyber Security SoCSE" },
    teamSize: 3,
    team: [
      { name: "Seshant Limboo", role: "App Developer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
      { name: "Bikas Prasad", role: "UI/UX Designer", image: "/members/Shuttle/bikas.jpeg" },
      { name: "Rejeol Bhutia", role: "App Developer", image: "/members/Shuttle/rejeol.jpeg" },
    ],
    gallery: [
      { title: "Access Panel", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop", description: "RFID reader module providing contactless access with visual and audio feedback." },
      { title: "Server Logs", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&auto=format&fit=crop", description: "Central monitoring dashboard showing real-time access logs and security alerts." },
      { title: "RFID Tags", image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=300&auto=format&fit=crop", description: "Custom-encoded RFID cards with encrypted access credentials." },
      { title: "Deployment", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=300&auto=format&fit=crop", description: "Full deployment across 12 laboratories serving over 1,200 users daily." }
    ],
    methodology: [
      { id: 1, title: "Edge Authentication", desc: "Local caching of authorized RFID signatures to ensure operation during network downtime." },
      { id: 2, title: "Encrypted Payload", desc: "End-to-end encryption of access logs directly piped into the central campus ERP system." }
    ],
    milestone: { phase: "Completed", desc: "Deployed across 12 labs serving over 1,200 unique student access points daily." }
  },

  // ==================== WOMEN SAFETY SYSTEMS ====================
  {
    id: "SC-2024-056",
    title: "Suraksha Strap: Smart Women Safety System",
    subtitle: "Campus Security",
    category: "IoT Edge",
    shortDescription: "A smart IoT-based women's safety system integrated into a detachable bag strap with SOS grip, alarm, flashlight, GPS tracking, and BLE connectivity.",
    fullDescription: "Suraksha Strap is an innovative wearable safety device disguised as a stylish bag strap. It features an intuitive SOS grip that triggers an immediate emergency response when squeezed. The device activates a loud alarm, flashing flashlight, and sends real-time GPS location to pre-registered emergency contacts via BLE-connected mobile app. The detachable design allows users to transfer it between bags or wear it separately, ensuring safety is always within reach.",
    tags: ["IoT", "Wearable Tech", "Safety", "GPS Tracking", "BLE", "Emergency Response"],
    heroImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
    quote: "Safety that goes where you go - discreet, reliable, and always within reach.",
    mentor: { name: "Dr. Raghavendra Prasad", role: "Project Guide", department: "CSE", image: "/mentors/DeanSoCSE.jpeg", faculty: "Dean, School of Computer Science & Engineering" },
    teamSize: 1,
    team: [
      { name: "Angel Thami", role: "Project Lead", image: "/members/womens/AngelT.jpg" },
    ],
    gallery: [
      { title: "SOS Grip Mechanism", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&auto=format&fit=crop", description: "Intuitive squeeze-activated SOS grip that triggers emergency alerts instantly." },
      { title: "BLE Mobile Connectivity", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=300&auto=format&fit=crop", description: "Seamless Bluetooth connection to mobile app for sending alerts and location." },
      { title: "GPS Tracking Module", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=300&auto=format&fit=crop", description: "Real-time GPS tracking for accurate location sharing during emergencies." },
      { title: "Detachable Strap Design", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=300&auto=format&fit=crop", description: "Versatile detachable design that can be used with any bag or worn separately." }
    ],
    methodology: [
      { id: 1, title: "Hardware Integration", desc: "Integrating GPS module, BLE chip, alarm buzzer, and pressure sensor into a compact, wearable strap design." },
      { id: 2, title: "Emergency Response System", desc: "Squeeze-activated SOS triggers alarm, flashlight, and sends real-time location to pre-registered contacts via mobile app." }
    ],
    milestone: { phase: "Phase 2: Prototype Testing", desc: "Hardware prototype completed, currently testing BLE connectivity and alert system with 20 student volunteers." }
  },

  // ==================== CYBERSECURITY & DATA PROTECTION ====================
  {
    id: "VX-2025-001",
    title: "Vault - X: Next-Gen Secure File Storage",
    subtitle: "Cybersecurity",
    category: "Security & Encryption",
    shortDescription: "A secure vault with double authentication mechanism and AES-256 bit encryption to protect files, featuring a honeypot trap for unauthorized users.",
    fullDescription: "Vault - X is an advanced cybersecurity solution designed to protect sensitive files with military-grade AES-256 encryption. The system implements a double authentication mechanism requiring both password and biometric verification. A sophisticated honeypot trap deceives unauthorized intruders, logging their activities while preventing actual data access. This project addresses the growing need for robust data protection in academic and research environments.",
    tags: ["Cybersecurity", "AES-256", "Encryption", "Biometric Auth", "Honeypot", "Data Protection"],
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "When security matters most, trust is built on layers - not walls.",
    mentor: {
      name: "Dr. Raghvendra Prasad",
      role: "Project Guide",
      department: "CSE",
      image: "/mentors/DeanSoCSE.jpeg",
      faculty: "Dean, School of Computer Science & Engineering"
    },
    teamSize: 1,
    team: [
      { name: "Rohan Chettri", role: "Lead Developer", image: "/members/vault/RohanC.png" },
    ],
    gallery: [
      {
        title: "Double Authentication Interface",
        image: "/Pgallery/RhnSP.jpg",
        description: "Password and biometric verification combined for maximum security access."
      },
      {
        title: "AES-256 Encryption Dashboard",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&auto=format&fit=crop",
        description: "Real-time encryption monitoring and file protection status dashboard."
      },
      {
        title: "Honeypot Trap System",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
        description: "Deceptive system that logs unauthorized access attempts while protecting actual data."
      },
    ],
    methodology: [
      { id: 1, title: "AES-256 Encryption", desc: "Military-grade encryption for all stored files, ensuring data remains protected even if storage is compromised." },
      { id: 2, title: "Multi-Factor Authentication", desc: "Combination of password and biometric verification creating a double-layer security barrier." },
      { id: 3, title: "Honeypot Deployment", desc: "Decoy system that attracts and monitors unauthorized users, logging their activities while protecting real data." }
    ],
    milestone: {
      phase: "Phase 1: Core Development",
      desc: "AES-256 encryption module and authentication system completed. Honeypot integration in progress."
    }
  },


  // ==================== CULTURAL PRESERVATION & DIGITAL PRESENCE ====================
  {
    id: "CL-2025-002",
    title: "Sog Yungdrung Ling Bon Monastery Website",
    subtitle: "Cultural Digital Presence",
    category: "Digital Preservation",
    shortDescription: "A website created to share information about Sog Yungdrung Ling Bon Monastery and its mission to preserve the Bon tradition while supporting children in need.",
    fullDescription: "This website serves as a digital gateway to Sog Yungdrung Ling Bon Monastery (སོག་གཡུང་དྲུང་གླིང་བོན་པོ་དགོན་པ།།), showcasing its rich cultural heritage and ongoing humanitarian efforts. The platform highlights the monastery's mission to preserve the ancient Bon tradition while providing education and support to underprivileged children. Built using Wix, the website makes Buddhist philosophy and monastery activities accessible to a global audience.",
    tags: ["Website", "Wix", "Cultural Preservation", "Bon Tradition", "Non-Profit", "Education"],
    heroImage: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Preserving ancient wisdom while nurturing young minds - one click at a time.",
    mentor: {
      name: "Mr. Tek Bahadur",
      role: "Project Guide",
      department: "Cultural Studies",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
      faculty: "Faculty of Computer Science & Engineering"
    },
    teamSize: 1,
    team: [
      { name: "Sudarshan Sunar", role: "Web Developer", image: "/members/monas/Sudar.png" },
    ],
    gallery: [
      {
        title: "Monastery Homepage",
        image: "/Pgallery/SudarsP.png",
        description: "Welcoming homepage featuring the monastery's rich cultural heritage and mission statement."
      },
      {
        title: "Bon Tradition Information",
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=300&auto=format&fit=crop",
        description: "Educational section dedicated to preserving and sharing the ancient Bon tradition."
      },
      {
        title: "Children Support Program",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300&auto=format&fit=crop",
        description: "Showcasing initiatives that support underprivileged children through education and care."
      },

    ],
    methodology: [
      { id: 1, title: "Wix Platform Development", desc: "Utilizing Wix's drag-and-drop interface to create an accessible website without coding expertise." },
      { id: 2, title: "Cultural Content Curation", desc: "Documenting and presenting the Bon tradition, monastery history, and children support programs." },
      { id: 3, title: "Ongoing Improvements", desc: "Continuous updates to enhance user experience and expand content coverage." }
    ],
    milestone: {
      phase: "Ongoing Project",
      desc: "Website live with core content; currently working on expanding multimedia sections and language translations."
    }
  },

  // ==================== DISASTER MANAGEMENT & EARLY WARNING SYSTEMS ====================
  {
    id: "LAS-2025-003",
    title: "Landslide Alert System",
    subtitle: "Disaster Management",
    category: "Early Warning Systems",
    shortDescription: "A landslide monitoring system that detects early warning signs using satellite data and ground sensors to identify ground movement and rainfall patterns.",
    fullDescription: "The Landslide Alert System monitors landslide-prone areas using Sentinel-1 SAR satellite data and basic ground sensors. The satellite technology works in all weather conditions, tracking small changes in ground terrain over time. The system detects early warning signs including slight ground movement and prolonged rainfall patterns, providing critical alerts to help prevent disaster-related casualties and property damage.",
    tags: ["Disaster Management", "Satellite Monitoring", "Sentinel-1", "SAR", "Early Warning", "IoT Sensors"],
    heroImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "When the earth moves, we're already watching - protecting lives before the ground shifts.",
    mentor: {
      name: "Dr. Raghavendra Prasad",
      role: "Dean - School of Computer Science & Engineering",
      department: "CSE",
      image: "/mentors/DeanSoCSE.jpeg",
      faculty: "Dean, School of Computer Science & Engineering"
    },
    teamSize: 1,
    team: [
      { name: "Saranam Rai", role: "Lead Researcher & Developer", image: "/members/Landslide/saranam.jpg" },
    ],
    gallery: [
      {
        title: "Satellite Monitoring Dashboard",
        image: "/Pgallery/srSp.jpg",
        description: "Real-time monitoring interface displaying Sentinel-1 SAR satellite data and terrain deformation analysis."
      },
      {
        title: "Ground Sensor Network",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop",
        description: "Strategic placement of ground sensors to detect soil movement and moisture levels."
      },
      {
        title: "Rainfall Pattern Analysis",
        image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=300&auto=format&fit=crop",
        description: "Historical and real-time rainfall data analysis to identify landslide risk patterns."
      },

    ],
    methodology: [
      { id: 1, title: "Satellite Data Analysis", desc: "Processing Sentinel-1 SAR satellite imagery to detect terrain deformation and ground movement patterns using interferometric techniques." },
      { id: 2, title: "Ground Sensor Integration", desc: "Deploying basic sensors to monitor rainfall intensity and soil moisture levels in high-risk zones." },
      { id: 3, title: "Early Warning Algorithm", desc: "Combining satellite and ground data to trigger alerts when pre-defined risk thresholds are exceeded." }
    ],
    milestone: {
      phase: "Phase 2: Field Testing",
      desc: "Currently testing the system in identified landslide-prone zones across Sikkim, with 3 ground sensor stations deployed."
    }
  }





];