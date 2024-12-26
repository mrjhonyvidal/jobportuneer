import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/jobs",
    label: "My Jobs",
    icon: <AppWindow />,
  },
  {
    href: "/add-job",
    label: "Add Job",
    icon: <Layers />,
  },
  {
    href: "/stats",
    label: "Stats",
    icon: <AreaChart size={24} />,
  },
];

export default links;
