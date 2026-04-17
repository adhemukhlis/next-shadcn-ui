import Link from 'next/link'
import { Suspense } from 'react'

import { NavMain } from '@/components/core/nav-main'
import NavUser from '@/components/core/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/core/sidebar'
import { Skeleton } from '@/components/core/skeleton'
import { IconRegularAtomSimple } from '@/components/icons'

import type { ComponentProps } from 'react'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="icon"
			{...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild>
							<Link href="/dashboard">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<IconRegularAtomSimple className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Altatrack Admin</span>
									<span className="truncate text-xs">Internal Backoffice</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<Suspense fallback={<Skeleton className="h-10 w-full rounded-lg" />}>
					<NavUser />
				</Suspense>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
