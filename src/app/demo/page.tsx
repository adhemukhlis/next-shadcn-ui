import { Suspense } from 'react'

import { Bar } from '@/components/charts/bar'
import { BarChart } from '@/components/charts/bar-chart'
import { BarXAxis } from '@/components/charts/bar-x-axis'
import { BarYAxis } from '@/components/charts/bar-y-axis'
import { Grid } from '@/components/charts/grid'
import { ChartTooltip } from '@/components/charts/tooltip/chart-tooltip'

import type { ReactNode } from 'react'

const SECTION_DELAY_MS = 180

const REVENUE_PROFIT_DATA: Array<Record<string, unknown>> = [
	{ month: 'Jan', profit: 16200, revenue: 42100 },
	{ month: 'Feb', profit: 14100, revenue: 38900 },
	{ month: 'Mar', profit: 18900, revenue: 45200 },
	{ month: 'Apr', profit: 21400, revenue: 49800 },
	{ month: 'May', profit: 24600, revenue: 53400 },
	{ month: 'Jun', profit: 27300, revenue: 58600 },
	{ month: 'Jul', profit: 26100, revenue: 57100 },
	{ month: 'Aug', profit: 29800, revenue: 62300 },
	{ month: 'Sep', profit: 31900, revenue: 64800 },
	{ month: 'Oct', profit: 34100, revenue: 68500 },
	{ month: 'Nov', profit: 32800, revenue: 66200 },
	{ month: 'Dec', profit: 36700, revenue: 71200 },
]

export default function Page(): ReactNode {
	return (
		<div className="flex flex-1 flex-col gap-4">
			<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
			<Suspense fallback={<SectionSkeleton />}>
				<StreamedSection title="Overview">
					<p>Revenue and expenses over the last two weeks.</p>
					<div className="mt-2 grid gap-3 sm:grid-cols-2">
						<StatCard
							label="Revenue"
							value="$24,340"
						/>
						<StatCard
							label="Expenses"
							value="$11,390"
						/>
					</div>
				</StreamedSection>
			</Suspense>
			<Suspense fallback={<SectionSkeleton />}>
				<StreamedSection title="Activity">
					<p>Orders and returns per day this week.</p>
					<div className="mt-2 grid gap-3 sm:grid-cols-2">
						<StatCard
							label="Orders"
							value="375"
						/>
						<StatCard
							label="Returns"
							value="60"
						/>
					</div>
				</StreamedSection>
			</Suspense>
			<Suspense fallback={<SectionSkeleton />}>
				<StreamedSection title="Revenue & Profit">
					<p>Monthly revenue and profit over the last twelve months.</p>
					<BarChart
						data={REVENUE_PROFIT_DATA}
						xDataKey="month">
						<Grid />
						<Bar
							dataKey="revenue"
							fill="var(--chart-1)"
							stroke="var(--chart-1)"
						/>
						<Bar
							dataKey="profit"
							fill="var(--chart-2)"
							stroke="var(--chart-2)"
						/>
						<BarXAxis />
						<BarYAxis
							numTicks={5}
							unit="IDR"
						/>
						<ChartTooltip />
					</BarChart>
				</StreamedSection>
			</Suspense>
			<Suspense fallback={<SectionSkeleton />}>
				<StreamedSection title="Analytics">
					<p>Share of traffic by acquisition channel.</p>
					<div className="mt-2 grid gap-3 sm:grid-cols-2">
						<StatCard
							label="Organic"
							value="38%"
						/>
						<StatCard
							label="Direct"
							value="26%"
						/>
					</div>
				</StreamedSection>
			</Suspense>
		</div>
	)
}

function SectionSkeleton() {
	return (
		<div
			aria-hidden="true"
			className="rounded-xl border bg-card p-6">
			<div className="h-5 w-40 animate-pulse rounded-sm bg-muted" />
			<div className="mt-3 space-y-2">
				<div className="h-3 w-full animate-pulse rounded-sm bg-muted" />
				<div className="h-3 w-11/12 animate-pulse rounded-sm bg-muted" />
				<div className="h-3 w-2/3 animate-pulse rounded-sm bg-muted" />
			</div>
		</div>
	)
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function StatCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border bg-background p-4">
			<p className="text-xs font-medium text-muted-foreground">{label}</p>
			<p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
		</div>
	)
}

async function StreamedSection({ children, title }: { children: ReactNode; title: string }) {
	await sleep(SECTION_DELAY_MS)

	return (
		<section className="rounded-xl border bg-card p-6">
			<h2 className="text-lg font-medium tracking-tight">{title}</h2>
			<div className="mt-2 space-y-3 text-sm text-muted-foreground">{children}</div>
		</section>
	)
}
