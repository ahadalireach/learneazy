import {
  MdWeb,
  MdQuiz,
  MdPeople,
  MdGroups,
  MdPayment,
  MdCategory,
  MdBarChart,
  MdDashboard,
  MdAnalytics,
  MdVideoCall,
  MdOndemandVideo,
  MdManageHistory,
} from "react-icons/md";
import {
  FaLock,
  FaUserShield,
  FaClipboardList,
  FaRegAddressBook,
} from "react-icons/fa";

export const features = [
  {
    icon: "FaChalkboardTeacher",
    title: "Expert Instructors",
    desc: "Learn from passionate mentors and industry professionals who care about your growth.",
  },
  {
    icon: "FaWallet",
    title: "Affordable Access",
    desc: "Unlock high-quality programming courses and resources at prices everyone can afford.",
  },
  {
    icon: "FaUsers",
    title: "Community Support",
    desc: "Join a friendly, supportive network of learners and experts ready to help you succeed.",
  },
];

export const options = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Preview",
];

export const menuSections = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: MdDashboard,
        path: "/admin",
      },
    ],
  },
  {
    title: "Data",
    items: [
      {
        title: "Users",
        icon: MdGroups,
        path: "/admin/users",
      },
      {
        title: "Invoices",
        icon: MdPayment,
        path: "/admin/invoices",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Create Course",
        icon: MdVideoCall,
        path: "/admin/create-course",
      },
      {
        title: "Live Courses",
        icon: MdOndemandVideo,
        path: "/admin/courses",
      },
    ],
  },
  {
    title: "Customization",
    items: [
      {
        title: "Hero",
        icon: MdWeb,
        path: "/admin/hero",
      },
      {
        title: "FAQ",
        icon: MdQuiz,
        path: "/admin/faq",
      },
      {
        title: "Categories",
        icon: MdCategory,
        path: "/admin/categories",
      },
    ],
  },
  {
    title: "Controllers",
    items: [
      {
        title: "Manage Team",
        icon: MdPeople,
        path: "/admin/team",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Courses Analytics",
        icon: MdBarChart,
        path: "/admin/courses-analytics",
      },
      {
        title: "Orders Analytics",
        icon: MdAnalytics,
        path: "/admin/orders-analytics",
      },
      {
        title: "Users Analytics",
        icon: MdManageHistory,
        path: "/admin/users-analytics",
      },
    ],
  },
];

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Privacy",
    url: "/privacy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export const tabList = ["Overview", "Resources", "Q&A", "Reviews"];

export const reviews = [
  {
    name: "Gene Bates",
    profession: "Student | Cambridge University",
    comment:
      "Learneazy offers a wide range of tech courses for every level. The structure, depth, and clarity make it one of the best learning platforms I’ve used. Highly recommended for anyone serious about tech.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Verna Santos",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Absolutely love the tutorials on Learneazy! Complex topics are broken down so well, and the real-world examples make everything click. This platform truly stands out in the programming education space.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jay Gibbs",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "Learneazy has completely changed the way I learn programming. The balance between theory and hands-on practice is perfect. It's like having a personal mentor guiding you through every concept.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Mina Davidson",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I explored Learneazy and was impressed by the course quality and variety. Whether you're just starting or upskilling, it's a great place to learn and grow.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rosemary Smith",
    profession: "Full Stack Web Developer | Algeria",
    comment:
      "What I love about Learneazy is the depth. The long-form tutorials cover everything in detail, making it beginner-friendly yet comprehensive. Looking forward to more content!",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Laura Mckenzie",
    profession: "Full Stack Web Developer | Canada",
    comment:
      "Learneazy focuses on real-world application. I built a complete web marketplace using React, step by step. It’s a game-changer if you want to build projects, not just watch theory.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export const privacyCards = [
  {
    icon: FaUserShield,
    title: "What We Collect",
    items: [
      "Personal details (name, email, etc.)",
      "Course progress and feedback",
      "Internet Protocol (IP) info",
    ],
  },
  {
    icon: FaClipboardList,
    title: "How We Use It",
    items: [
      "To deliver and improve your learning experience",
      "To personalize content and recommendations",
      "To keep you informed and supported",
    ],
  },
  {
    icon: FaLock,
    title: "Your Data, Protected",
    items: [
      "Secure storage, never sold to third parties",
      "Industry-standard security measures",
    ],
  },
  {
    icon: FaRegAddressBook,
    title: "Your Rights",
    items: [
      "Access, update, or delete your info anytime",
      "Contact us for privacy questions",
    ],
  },
];
