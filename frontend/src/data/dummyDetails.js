export const dummyProjects = [
 
  {
    id: "TR-2024-115",
    title: "MSU Shuttle Service",
    subtitle: "Campus Transport",
    category: "Smart Mobility",
    shortDescription: "A smart shuttle booking system for the university, ensuring timely and predictable faculty transportation.",
    fullDescription: "To solve the massive distances between departments at MSU, this project builds a smart shuttle tracking network using open-source hardware and a robust mobile application. The backend efficiently routes shuttles during peak hours using real-time demand modeling.",
    tags: ["Mobile App" , "Dart", "Flutter",  "Node.js", "Express"],
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Reducing commute wait times across the 100-acre campus by predicting shuttle arrivals accurately.",
    mentor: {
      name: "Pritam Bhagat",
      role: "Project Guide",
      department: "CSE",
      image: "/mentors/ps.jpeg"
    },
    teamSize: 5,
    team: [
      { name: "Sujal Thapa", role: "Project Leader", image: "/members/sujal.jpeg" },
      { name: "Rejeol Bhutia", role: "App Developer", image: "/members/rejeol.jpeg" },
      { name: "Adarshan Rai", role: "Frontend Developer", image: "/members/ada.jpeg" },
      { name: "Abash Ansari", role: "Backend Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" },
      { name: "Bikas Prasad", role: "UI/UX Designer", image: "/members/bikas.jpeg" },
    ],
    gallery: [
      { 
        title: "App Prototype", 
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&auto=format&fit=crop",
        description: "User-friendly mobile interface showing real-time shuttle locations, estimated arrival times, and seat availability for students and faculty."
      },
      { 
        title: "GPS Module", 
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop",
        description: "Custom-built ESP32 GPS tracker installed in campus shuttles, transmitting location data every 3 seconds for accurate tracking."
      },
      { 
        title: "Shuttle Tracking", 
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=300&auto=format&fit=crop",
        description: "Live dashboard displaying all active shuttle routes with real-time positioning and traffic congestion updates."
      }
    ],
    methodology: [
      { id: 1, title: "Hardware Integration", desc: "Equipping 15 campus buses with custom-built ESP32 GPS trackers pinging data every 3 seconds." },
      { id: 2, title: "ETA Prediction Modeling", desc: "Using historical traffic data to adjust ETA in the mobile app during peak campus hours." }
    ],
    milestone: {
      phase: "Phase 3: Beta Testing",
      desc: "Live testing with 500 volunteer students on the main North Campus route."
    }
  },

 {
    id: "AL-2024-082",
    title: "Autonomous Campus Logistics Drone",
    subtitle: "Logistics Drone",
    category: "IoT & Smart Systems",
    shortDescription: "A fully autonomous drone delivery system designed for inter-departmental document transport across the MSU campus using edge computing.",
    fullDescription: "Revolutionizing last-mile delivery within academic ecosystems. This initiative integrates advanced swarm intelligence and edge computing to facilitate zero-emission transport of research materials across sprawling university terrains. It addresses the bottleneck of inter-departmental logistics through modular flight paths.",
    tags: ["Computer Vision", "AI", "IoT", "Robotics"],
    heroImage: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=600&auto=format&fit=crop",
    youtubeLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
    quote: "The project addresses the bottleneck of inter-departmental logistics through modular flight paths.",
    mentor: {
      name: "Dr. Aris Thorne",
      role: "Project Guide",
      department: "CSE",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    teamSize: 4,
    team: [
      { name: "Dr. Rajesh Kumar", role: "Principal Investigator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" },
      { name: "Ananya Sharma", role: "AI & Swarm Logic", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
      { name: "Vikram Mehta", role: "Hardware Architect", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
      { name: "Sana Qureshi", role: "Control Systems", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=100&auto=format&fit=crop" }
    ],
    gallery: [
      { 
        title: "Internal Logic", 
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop",
        description: "Edge computing module with custom CNN models for real-time obstacle detection and avoidance during autonomous flight."
      },
      { 
        title: "Field Test", 
        image: "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=300&auto=format&fit=crop",
        description: "Successful test flight across the main campus corridor, demonstrating stable navigation and package delivery capabilities."
      },
      { 
        title: "Assembly", 
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=300&auto=format&fit=crop",
        description: "Hardware assembly process showing the integration of motors, propellers, and flight controller components."
      },
      { 
        title: "CAD Model", 
        image: "https://images.unsplash.com/photo-1504930268766-d71549a36ce2?q=80&w=300&auto=format&fit=crop",
        description: "3D CAD rendering of the drone's aerodynamic frame designed for optimal payload capacity and flight stability."
      }
    ],
    methodology: [
      { id: 1, title: "Dynamic Mesh Networking", desc: "Drones communicate via a localized mesh network, ensuring zero-latency obstacle avoidance and efficient swarm pathing without relying on global GPS clusters in high-interference zones." },
      { id: 2, title: "Real-time Semantic Segmentation", desc: "Utilizing edge-deployed CNNs to distinguish between pedestrians, foliage, and structural obstacles in real-time." }
    ],
    milestone: {
      phase: "Phase 4: Multi-Agent Coordination",
      desc: "Transitioning from single-unit test flights to a coordinated group of 5 units."
    }
  },


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
    mentor: {
      name: "Dr. Laila Qureshi",
      role: "Project Guide",
      department: "CSE",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    teamSize: 3,
    team: [
      { name: "Diana Prince", role: "App Developer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
      { name: "Evan Wright", role: "Backend Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" },
      { name: "Fiona Clark", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
    ],
      
    gallery: [
      { 
        title: "Access Panel", 
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop",
        description: "RFID reader module installed at laboratory entrance, providing contactless access with visual and audio feedback."
      },
      { 
        title: "Server Logs", 
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&auto=format&fit=crop",
        description: "Central monitoring dashboard showing real-time access logs, user authentication history, and security alerts."
      },
      { 
        title: "RFID Tags", 
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=300&auto=format&fit=crop",
        description: "Custom-encoded RFID cards assigned to faculty and research scholars with encrypted access credentials."
      },
      { 
        title: "Deployment", 
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=300&auto=format&fit=crop",
        description: "Full deployment of the security system across 12 laboratories, serving over 1,200 users daily."
      }
    ],
    methodology: [
      { id: 1, title: "Edge Authentication", desc: "Local caching of authorized RFID signatures on edge readers to ensure operation during network downtime." },
      { id: 2, title: "Encrypted Payload", desc: "End-to-end encryption of access logs directly piped into the central campus ERP system." }
    ],
    milestone: {
      phase: "Completed",
      desc: "Deployed across 12 labs serving over 1,200 unique student access points daily."
    }
  },
  
];