import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/core/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/core/sidebar'
import { IconRegularAtomSimple } from '@/components/icons'

const items = [
	{
		key: 'dashboard',
		url: '/dashboard',
		label: 'Dashboard',
		icon: <IconRegularAtomSimple className="!size-4" />
	},
	{
		key: 'master',
		url: '/master',
		label: 'Master',
		icon: <IconRegularAtomSimple className="!size-4" />,
		children: [
			{
				key: 'master-vehicle-brand',
				url: '/master/vehicle-brand',
				label: 'Vehicle Brand',
				icon: <IconRegularAtomSimple className="!size-4" />
			},
			{
				key: 'master-vehicle-model',
				url: '/master/vehicle-model',
				label: 'Vehicle Model',
				icon: <IconRegularAtomSimple className="!size-4" />
			}
		]
	}
]

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>System</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const itemHasChildren = 'children' in item

					if (itemHasChildren) {
						return (
							<Collapsible
								key={item.label}
								asChild
								defaultOpen={true}
								className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.label}>
											{item.icon}
											<span>{item.label}</span>
											<IconRegularAtomSimple className="!size-3 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.children?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.label}>
													<SidebarMenuSubButton asChild>
														<a href={subItem.url}>
															<span>{subItem.label}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)
					} else {
						return (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										{item.icon}
										<span>{item.label}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					}
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
