import { AreaChart, Layers, AppWindow, FileCheck, Rocket } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/stats",
    label: "Stats",
    icon: <AreaChart size={24} />,
  },
  {
    href: "/jobs",
    label: "My Jobs",
    icon: <AppWindow size={24} />,
  },
  {
    href: "/add-job",
    label: "Add Job",
    icon: <Layers size={24} />,
  },
  {
    href: "/win-win",
    label: "Coming Soon",
    icon: <Rocket size={24} />,
  },
];

export default links;
