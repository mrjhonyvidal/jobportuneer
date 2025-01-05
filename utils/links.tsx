import {
  AreaChart,
  Layers,
  AppWindow,
  FileCheck,
  Rocket,
  Cog,
  CalendarCheck2,
  UserRoundSearch,
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
    label: "Insights",
    icon: <AreaChart size={24} />,
  },
  {
    href: "/win-win",
    label: "Feedback",
    icon: <Rocket size={24} />,
  },
];

export default links;
