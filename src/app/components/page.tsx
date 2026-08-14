'use client'

import { Check, ChevronDown, Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	Input,
	Label,
	Separator,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/internal'
import { Header } from '@/components/site/header'

import type { ReactNode } from 'react'

const notionistsAvatarSrc = 'https://api.dicebear.com/10.x/notionists/svg?seed=Ada'

export default function Page(): ReactNode {
	const [tab, setTab] = useState('overview')

	return (
		<div className="flex min-h-dvh flex-col">
			<Header />
			<main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
				<div className="mb-10 space-y-3">
					<h1 className="text-3xl font-semibold tracking-tight">Components</h1>
					<p className="max-w-prose text-balance text-muted-foreground">
						Every component in the baseline, imported from the internal tree. Upstream sources live in{' '}
						<code className="rounded-sm bg-muted px-1 py-0.5 text-xs">src/components/base</code>.
					</p>
				</div>

				<div className="flex flex-col gap-12">
					<Section
						id="button"
						title="Button">
						<div className="flex flex-wrap items-center gap-4">
							<Example label="variants">
								<div className="flex flex-wrap gap-2">
									<Button>Default</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
									<Button variant="link">Link</Button>
								</div>
							</Example>
							<Example label="custom (internal)">
								<Button variant="inverse">Inverse</Button>
							</Example>
							<Example label="sizes">
								<div className="flex flex-wrap items-center gap-2">
									<Button size="xs">Xs</Button>
									<Button size="sm">Sm</Button>
									<Button size="default">Default</Button>
									<Button size="lg">Lg</Button>
									<Button
										aria-label="Add"
										size="icon">
										<Plus />
									</Button>
								</div>
							</Example>
						</div>
					</Section>

					<Section
						id="badge"
						title="Badge">
						<div className="flex flex-wrap gap-2">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="outline">Outline</Badge>
							<Badge variant="destructive">Destructive</Badge>
						</div>
					</Section>

					<Section
						id="card"
						title="Card">
						<Card className="max-w-sm">
							<CardHeader>
								<CardTitle>next-shadcn-ui</CardTitle>
								<CardDescription>Lean starter on Base UI.</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Card composes header, content and footer slots for consistent surfaces across the baseline.</p>
							</CardContent>
							<CardFooter className="justify-between">
								<span className="text-sm text-muted-foreground">v0.1.0</span>
								<CardAction>
									<Button
										size="sm"
										variant="secondary">
										Read more
									</Button>
								</CardAction>
							</CardFooter>
						</Card>
					</Section>

					<Section
						id="form"
						title="Input · Label · Field">
						<form
							className="w-full max-w-sm space-y-4"
							onSubmit={(event) => event.preventDefault()}>
							<Field>
								<FieldLabel htmlFor="name">Full name</FieldLabel>
								<FieldContent>
									<Input
										id="name"
										placeholder="Ada Lovelace"
									/>
									<FieldDescription>Shown to your teammates.</FieldDescription>
								</FieldContent>
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<FieldContent>
									<Input
										aria-invalid
										id="email"
										placeholder="ada@example.com"
										type="email"
									/>
									<FieldError errors={[{ message: 'Please provide a valid email.' }]} />
								</FieldContent>
							</Field>
							<div className="flex items-center gap-2">
								<Label htmlFor="plan">Plan</Label>
								<Input
									id="plan"
									readOnly
									value="Team"
								/>
							</div>
							<Button type="submit">Save changes</Button>
						</form>
					</Section>

					<Section
						id="separator"
						title="Separator">
						<div className="w-full space-y-4">
							<p className="text-sm text-muted-foreground">Horizontal</p>
							<Separator />
							<p className="text-sm text-muted-foreground">Vertical</p>
							<div className="flex h-10 items-center gap-2">
								<span>One</span>
								<Separator orientation="vertical" />
								<span>Two</span>
							</div>
						</div>
					</Section>

					<Section
						id="avatar"
						title="Avatar">
						<div className="flex items-center gap-4">
							<Avatar>
								<AvatarImage
									render={
										<Image
											alt="Ada"
											height={96}
											src={notionistsAvatarSrc}
											width={96}
										/>
									}
									src={notionistsAvatarSrc}
								/>
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
							<Avatar>
								<AvatarFallback className="bg-primary text-primary-foreground">NX</AvatarFallback>
							</Avatar>
							<Avatar className="size-14">
								<AvatarFallback>Team</AvatarFallback>
							</Avatar>
						</div>
					</Section>

					<Section
						id="tabs"
						title="Tabs">
						<Tabs
							onValueChange={setTab}
							value={tab}>
							<TabsList>
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="settings">Settings</TabsTrigger>
								<TabsTrigger value="activity">Activity</TabsTrigger>
							</TabsList>
							<TabsContent
								className="pt-4 text-sm text-muted-foreground"
								value="overview">
								Overview panel — the default tab.
							</TabsContent>
							<TabsContent
								className="pt-4 text-sm text-muted-foreground"
								value="settings">
								Settings panel.
							</TabsContent>
							<TabsContent
								className="pt-4 text-sm text-muted-foreground"
								value="activity">
								Activity panel.
							</TabsContent>
						</Tabs>
					</Section>

					<Section
						id="dialog"
						title="Dialog">
						<Dialog>
							<DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
									<DialogDescription>This action cannot be undone. It will permanently delete this record.</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose render={<Button variant="ghost">Cancel</Button>} />
									<Button variant="destructive">Continue</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</Section>

					<Section
						id="dropdown"
						title="Dropdown Menu">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button variant="outline">
										Actions <ChevronDown />
									</Button>
								}
							/>
							<DropdownMenuContent
								align="start"
								className="w-48">
								<DropdownMenuGroup>
									<DropdownMenuLabel>My account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Settings /> Settings
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Check /> Mark as done
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</Section>
				</div>
			</main>
		</div>
	)
}

function Example({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="flex flex-col items-start gap-2">
			<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
			{children}
		</div>
	)
}

function Section({ children, id, title }: { children: ReactNode; id: string; title: string }) {
	return (
		<section
			className="scroll-mt-16"
			id={id}>
			<h2 className="text-lg font-medium tracking-tight">{title}</h2>
			<div className="mt-4 rounded-xl border bg-card p-6 shadow-xs">{children}</div>
		</section>
	)
}
