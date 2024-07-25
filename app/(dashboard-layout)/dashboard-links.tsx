import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import {
  Flag,
  LayoutDashboard,
  ScrollText,
  Settings,
  User2,
} from "lucide-react";

export const DASHBOARD_LINKS: NavigationLinkGroups[] = [
  {
    links: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        url: "/dashboard",
      },
      {
        title: "Settings",
        icon: <Settings />,
        url: "/settings",
      },
    ],
  },
  {
    title: "Football data",
    links: [
      {
        title: "Standings",
        icon: <ScrollText />,
        url: "/standings",
      },
      {
        title: "Countries",
        icon: <Flag />,
        url: "/countries",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Users",
        icon: <User2 />,
        url: "/users",
      },
    ],
  },
];
