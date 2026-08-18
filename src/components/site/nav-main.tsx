'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/internal'

import type { Route } from 'next'

type NavItem = {
	icon?: LucideIcon
	isActive?: boolean
	items?: Array<{ title: string; url: string }>
	title: string
	url: string
}

function NavMain({ items }: { items: NavItem[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						className="group/collapsible"
						defaultOpen={item.isActive}
						key={item.title}
						render={<SidebarMenuItem />}>
						<CollapsibleTrigger
							render={
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							}
						/>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title}>
										<SidebarMenuSubButton render={<Link href={subItem.url as Route} />}>
											<span>{subItem.title}</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

export { NavMain }
