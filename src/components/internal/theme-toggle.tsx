'use client'

import { Moon, Sun } from 'lucide-react'
import { useCallback, useEffect, useSyncExternalStore } from 'react'

import { Button } from '@/components/internal/button'

type Theme = 'dark' | 'light'

const THEME_KEY = 'theme'

const listeners = new Set<() => void>()

function emitChange() {
	for (const listener of listeners) {
		listener()
	}
}

function getSnapshot(): Theme {
	return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
}

const getServerSnapshot = (): Theme => 'light'

function setTheme(theme: Theme) {
	localStorage.setItem(THEME_KEY, theme)
	document.documentElement.classList.toggle('dark', theme === 'dark')
	emitChange()
}

function subscribe(callback: () => void) {
	listeners.add(callback)
	window.addEventListener('storage', emitChange)

	return () => {
		listeners.delete(callback)
		window.removeEventListener('storage', emitChange)
	}
}

function ThemeToggle() {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

	const toggle = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}, [theme])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	return (
		<Button
			aria-label="Toggle theme"
			onClick={toggle}
			size="icon"
			variant="ghost">
			{theme === 'dark' ? <Sun /> : <Moon />}
		</Button>
	)
}

export { ThemeToggle }
