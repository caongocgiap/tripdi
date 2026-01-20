import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Home,
  Folder,
  BookOpen,
  Heart,
  ChartNoAxesCombined,
} from "lucide-react";
import { NavOthers } from "./nav-others";
import { NavMain } from "./nav-main";
import {
  PREFIX_ADMIN,
  PREFIX_ALBUM,
  PREFIX_STATISTICS,
} from "@/constants/url.constant";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Home",
      url: PREFIX_ADMIN,
      icon: Home,
    },
    {
      title: "Album",
      url: PREFIX_ALBUM,
      icon: Folder,
    },
  ],
  navOthers: [
    {
      title: "Statistics",
      url: PREFIX_STATISTICS,
      icon: ChartNoAxesCombined,
    },
    {
      title: "Favorite",
      url: PREFIX_ALBUM,
      icon: Heart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <BookOpen className="size-5!" />
                <span className="text-base font-semibold">Tripdi x NgocGiap</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOthers items={data.navOthers} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>To User Page</Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
