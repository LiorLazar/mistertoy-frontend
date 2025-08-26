import { useEffect, useState } from "react"



export function useConfirmTabClose() {

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {

        if (!hasUnsavedChanges) return

        function handleBeforeUnload(ev) {
            ev.returnValue = true
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [hasUnsavedChanges])

    return setHasUnsavedChanges
}