"use client"

import * as React from "react"
import {
  IconBookmark,
  IconBriefcase,
  IconCamera,
  IconChartBar,
  IconClock,
  IconDashboard,
  IconDatabase,
  IconDiamond,
  IconFileAi,
  IconFileDescription,
  IconFileText,
  IconFileWord,
  IconGift,
  IconHelp,
  IconListDetails,
  IconNote,
  IconPlus,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Add Application",
      url: "/dashboard/add-job-application",
      icon: IconPlus,
    },
    {
      title: "Job Postings",
      url : "/dashboard/job-postings",
      icon : IconBriefcase
    },
    {
      title: "Saved Jobs",
      url: "/dashboard/saved-jobs",
      icon: IconBookmark,
    },
    {
      title: "Resume & Cover Letters",
      url: "/dashboard/resume-and-coverletters",
      icon: IconFileText,
    },
    {
      title: "Reminders & Follow-Ups",
      url: "/dashboard/reminders",
      icon: IconClock,
    },
    {
      title: "Notes",
      url: "/dashboard/notes",
      icon: IconNote,
    },
    {
      title: "Recruiters",
      url: "/dashboard/recruiters",
      icon: IconUsers,
    },
    {
      title: "Referral Program",
      url: "/dashboard/referral",
      icon: IconGift,
    },
    {
      title: "Subscription & AI Credits",
      url: "/dashboard/subscription",
      icon: IconDiamond,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* APP LOGO HERE  */}
              <Link href="/dashboard">
                <Image src='/logo.png' alt="logo" width={100} height={40} />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        {/* TODO : WE CAN ADD THE RECENT APPLICATIONS BUTTONS ETC  */}
        {/* <NavDocuments items={data.documents} /> */}

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
