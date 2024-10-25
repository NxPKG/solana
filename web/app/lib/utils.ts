import { RefObject, useEffect, useRef, useState } from "react"

export function useOutsideClick(
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener("mouseup", listener)
    return () => {
      document.removeEventListener("mouseup", listener)
    }
  }, [ref, handler])
}
