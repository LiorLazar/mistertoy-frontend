import { useEffect } from "react"


export function useKeyListener(key, handler) {

    useEffect(() => {
        function handleKeyDown(ev) {
            if (key === ev.key) {
                handler(ev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [key])

}