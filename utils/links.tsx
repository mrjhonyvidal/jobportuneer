import {
  AreaChart,
  Layers,
  AppWindow,
  FileCheck,
  Rocket,
  Cog,
} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/jobs",
    label: "Opportunities Hub",
    icon: <AppWindow size={24} />,
  },
  {
    href: "/stats",
    label: "Insights & Wins",
    icon: <AreaChart size={24} />,
  },
  {
    href: "/win-win",
    label: "Support & Feedback",
    icon: <Rocket size={24} />,
  },
];

export default links;
