export type QuestionType = 'mcq' | 'dragMatch' | 'fillBlank' | 'sortScenario';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface SortItem {
  id: string;
  text: string;
}

export interface MatchPair {
  leftId: string;
  leftText: string;
  rightId: string;
  rightText: string;
}

export interface LessonStep {
  title: string;
  content: string;
  questionType: QuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswers?: string[];
  sortItems?: SortItem[];
  matchPairs?: MatchPair[];
}

export interface Level {
  id: number;
  title: string;
  steps: LessonStep[];
}

export const mockLevels = [
  { id: 1, title: "Introduction to Networks", isUnlocked: true },
  { id: 2, title: "Network Protocols", isUnlocked: true },
  { id: 3, title: "IP Addressing", isUnlocked: false },
  { id: 4, title: "Routing & Switching", isUnlocked: false },
  { id: 5, title: "Network Security", isUnlocked: false },
];

export const levelContent: Level[] = [
  {
    id: 1,
    title: "Introduction to Networks",
    steps: [
      {
        title: "What is a Computer Network?",
        content: `A computer network is a collection of interconnected devices that can communicate and share resources with each other.\n\nKey components of a network include:\n• End devices (computers, phones)\n• Networking devices (routers, switches)\n• Transmission media (cables, wireless)\n• Network protocols (rules for communication)`,
        questionType: 'mcq',
        question: "What is the primary purpose of a computer network?",
        options: [
          { id: "a", text: "To make computers run faster", isCorrect: false },
          { id: "b", text: "To enable devices to communicate and share resources", isCorrect: true },
          { id: "c", text: "To store data permanently", isCorrect: false },
          { id: "d", text: "To protect computers from viruses", isCorrect: false },
        ],
      },
      {
        title: "Network Devices",
        content: `Common network devices include:\n\nRouter: Connects different networks together.\nSwitch: Connects devices within a single network.\nModem: Converts digital signals to analog.`,
        questionType: 'mcq',
        question: "Which device connects different networks together?",
        options: [
          { id: "a", text: "Hub", isCorrect: false },
          { id: "b", text: "Switch", isCorrect: false },
          { id: "c", text: "Router", isCorrect: true },
          { id: "d", text: "Modem", isCorrect: false },
        ],
      }
    ],
  },
  {
    id: 2,
    title: "Network Protocols",
    steps: [
      {
        title: "What are Protocols?",
        content: `Protocols are rules that govern how data is transmitted over a network.\nJust like human languages have grammar rules so people can understand each other, computers need protocols to ensure data is sent, received, and interpreted correctly.\n\nWithout protocols, a computer wouldn't know how to read the data sent by another device.`,
        questionType: 'fillBlank',
        question: "_____ are rules that govern data transmission over a network.",
        correctAnswers: ["Protocols", "Protocol", "Network Protocols"],
      },
      {
        title: "OSI Model Overview",
        content: `The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and standardize how different network protocols interact.\nIt consists of 7 layers:\n1. Physical\n2. Data Link\n3. Network\n4. Transport\n5. Session\n6. Presentation\n7. Application`,
        questionType: 'sortScenario',
        question: "Order the first 4 layers of the OSI model from bottom (Layer 1) to top (Layer 4).",
        sortItems: [
          { id: "1", text: "Physical" },
          { id: "2", text: "Data Link" },
          { id: "3", text: "Network" },
          { id: "4", text: "Transport" }
        ],
      },
      {
        title: "TCP vs UDP",
        content: `At the Transport layer, two main protocols are used: TCP and UDP.\n\nTCP (Transmission Control Protocol) is reliable. It guarantees delivery by checking if packets arrived and resending them if lost. It's used for web browsing and file transfers.\n\nUDP (User Datagram Protocol) is fast but unreliable. It doesn't check if packets arrive. It's used for live video streaming and gaming.`,
        questionType: 'dragMatch',
        question: "Match the protocol to its characteristic.",
        matchPairs: [
          { leftId: "l1", leftText: "TCP", rightId: "r1", rightText: "Reliable, guarantees delivery" },
          { leftId: "l2", leftText: "UDP", rightId: "r2", rightText: "Fast, no checks" },
          { leftId: "l3", leftText: "IP", rightId: "r3", rightText: "Routes packets" }
        ],
      },
      {
        title: "Application Layer Protocols",
        content: `The Application layer provides services directly to user applications. Common protocols include:\n\nHTTP/HTTPS: Used for web browsing.\nSMTP: Used for sending emails.\nDNS: Translates domain names to IP addresses.\nFTP: Used for file transfers.`,
        questionType: 'mcq',
        question: "Which protocol translates domain names to IP addresses?",
        options: [
          { id: "a", text: "HTTP", isCorrect: false },
          { id: "b", text: "DNS", isCorrect: true },
          { id: "c", text: "SMTP", isCorrect: false },
          { id: "d", text: "FTP", isCorrect: false },
        ],
      }
    ]
  },
  {
    id: 3,
    title: "IP Addressing",
    steps: [
      {
        title: "What is an IP Address?",
        content: "An IP (Internet Protocol) address is a unique identifier assigned to each device connected to a computer network. It acts much like a home address, allowing devices to find and communicate with one another across the internet.",
        questionType: 'fillBlank',
        question: "An _____ address is a unique identifier for a device on a network.",
        correctAnswers: ["IP", "Internet Protocol"],
      },
      {
        title: "IPv4 vs IPv6",
        content: "Because the internet grew so fast, we ran out of the original 32-bit addresses (IPv4). So, IPv6 was created using 128-bit addresses to provide a practically limitless supply of IP addresses.",
        questionType: 'dragMatch',
        question: "Match the IP version to its characteristic.",
        matchPairs: [
          { leftId: "v4", leftText: "IPv4", rightId: "r1", rightText: "32-bit address space" },
          { leftId: "v6", leftText: "IPv6", rightId: "r2", rightText: "128-bit address space" },
        ],
      },
      {
        title: "MAC vs IP Address",
        content: "A MAC (Media Access Control) address is permanently burned into a device's network card by the manufacturer. An IP address is assigned by the network you connect to. MAC is for local delivery, IP is for global delivery.",
        questionType: 'mcq',
        question: "Which address is permanently assigned by the manufacturer?",
        options: [
          { id: "a", text: "IP Address", isCorrect: false },
          { id: "b", text: "MAC Address", isCorrect: true },
          { id: "c", text: "URL", isCorrect: false },
          { id: "d", text: "Gateway Address", isCorrect: false },
        ],
      },
      {
        title: "Public vs Private IPs",
        content: "Private IP addresses are used inside your home or office network (like 192.168.1.5). They cannot be accessed directly from the internet. Public IP addresses are used on the internet, assigned to your router by your ISP.",
        questionType: 'mcq',
        question: "What type of IP address is 192.168.1.5 typically?",
        options: [
          { id: "a", text: "Public IP", isCorrect: false },
          { id: "b", text: "Private IP", isCorrect: true },
          { id: "c", text: "IPv6", isCorrect: false },
          { id: "d", text: "MAC Address", isCorrect: false },
        ],
      },
      {
        title: "Subnetting Basics",
        content: "Subnetting is the practice of dividing a single large network into multiple smaller, manageable networks called subnets. This improves security and performance by containing network traffic.",
        questionType: 'fillBlank',
        question: "_____ is the practice of dividing a large network into smaller ones.",
        correctAnswers: ["Subnetting", "Subnet", "subnetting"],
      }
    ]
  },
  {
    id: 4,
    title: "Routing & Switching",
    steps: [
      {
        title: "How Switches Work",
        content: "A switch operates within a single network (LAN). It learns which device is connected to which port by looking at MAC addresses and builds a MAC Address Table. It then forwards data only to the specific intended device.",
        questionType: 'fillBlank',
        question: "A switch builds a _____ Address Table to know where to send data.",
        correctAnswers: ["MAC", "mac", "Media Access Control"],
      },
      {
        title: "How Routers Work",
        content: "A router connects different networks together. It uses Routing Tables to determine the best path to send data packets toward their final destination using IP addresses.",
        questionType: 'mcq',
        question: "Which device connects different networks together using IP addresses?",
        options: [
          { id: "a", text: "Switch", isCorrect: false },
          { id: "b", text: "Hub", isCorrect: false },
          { id: "c", text: "Router", isCorrect: true },
          { id: "d", text: "Modem", isCorrect: false },
        ],
      },
      {
        title: "ARP Protocol",
        content: "ARP (Address Resolution Protocol) is used to find the MAC address of a device when only its IP address is known. The device shouts 'Who has this IP?' to the local network, and the owner replies with its MAC address.",
        questionType: 'mcq',
        question: "What is the purpose of ARP?",
        options: [
          { id: "a", text: "Find MAC address from IP address", isCorrect: true },
          { id: "b", text: "Find IP address from MAC address", isCorrect: false },
          { id: "c", text: "Secure the network", isCorrect: false },
          { id: "d", text: "Assign IP addresses automatically", isCorrect: false },
        ],
      },
      {
        title: "Default Gateway",
        content: "When a device wants to send data to a computer on a different network (like a website on the internet), it sends the data to its Default Gateway. The Default Gateway is usually your local router.",
        questionType: 'fillBlank',
        question: "Data destined for another network is sent to the Default _____.",
        correctAnswers: ["Gateway", "gateway"],
      },
      {
        title: "The Packet Journey",
        content: "When you request a website, the process happens in a specific order: 1) Your computer creates the request. 2) It sends it to the default gateway (router). 3) Routers pass it across the internet. 4) The destination server receives it.",
        questionType: 'sortScenario',
        question: "Order the steps of a packet's journey from your computer to a server.",
        sortItems: [
          { id: "1", text: "Computer creates the packet" },
          { id: "2", text: "Sent to default gateway" },
          { id: "3", text: "Passed across internet routers" },
          { id: "4", text: "Server receives the packet" }
        ],
      }
    ]
  },
  {
    id: 5,
    title: "Network Security",
    steps: [
      {
        title: "The Firewall",
        content: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. It acts as a barrier between a trusted internal network and an untrusted external network.",
        questionType: 'fillBlank',
        question: "A _____ filters incoming and outgoing network traffic.",
        correctAnswers: ["Firewall", "firewall"],
      },
      {
        title: "Malware Types",
        content: "Malware is malicious software. \n- Virus: Attaches to clean files and spreads.\n- Trojan: Disguises itself as legitimate software.\n- Worm: Spreads rapidly across networks without user action.",
        questionType: 'dragMatch',
        question: "Match the malware to its behavior.",
        matchPairs: [
          { leftId: "m1", leftText: "Virus", rightId: "r1", rightText: "Attaches to files to spread" },
          { leftId: "m2", leftText: "Trojan", rightId: "r2", rightText: "Disguises as legitimate software" },
          { leftId: "m3", leftText: "Worm", rightId: "r3", rightText: "Spreads rapidly without user action" }
        ],
      },
      {
        title: "Encryption",
        content: "Encryption scrambles data so that only authorized parties can understand it. Symmetric encryption uses the same key to lock and unlock the data. Asymmetric encryption uses a public key to lock and a private key to unlock.",
        questionType: 'mcq',
        question: "Which type of encryption uses a public key and a private key?",
        options: [
          { id: "a", text: "Symmetric Encryption", isCorrect: false },
          { id: "b", text: "Asymmetric Encryption", isCorrect: true },
          { id: "c", text: "Hash Encryption", isCorrect: false },
          { id: "d", text: "None of the above", isCorrect: false },
        ],
      },
      {
        title: "VPN (Virtual Private Network)",
        content: "A VPN establishes a secure, encrypted connection between your computer and the internet, providing a private tunnel for your data and communications while you use public networks.",
        questionType: 'mcq',
        question: "What is the primary benefit of a VPN?",
        options: [
          { id: "a", text: "It makes your internet faster", isCorrect: false },
          { id: "b", text: "It blocks all viruses", isCorrect: false },
          { id: "c", text: "It provides a secure, encrypted tunnel for data", isCorrect: true },
          { id: "d", text: "It creates free internet access", isCorrect: false },
        ],
      },
      {
        title: "Phishing",
        content: "Phishing is a cyber attack where the attacker masquerades as a trusted entity (like your bank) in an email or message to trick you into revealing sensitive information like passwords or credit card numbers.",
        questionType: 'fillBlank',
        question: "_____ is an attack that tricks users into revealing sensitive information via fake emails.",
        correctAnswers: ["Phishing", "phishing"],
      }
    ]
  }
];
