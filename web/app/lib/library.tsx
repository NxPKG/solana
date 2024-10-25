import { atom, createStore } from "jotai"
import { IInit } from "~/types"

export const appProps = atom<IInit | undefined>(undefined)
