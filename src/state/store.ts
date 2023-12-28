import { createStore } from 'solid-js/store'
import { ItemType } from "../types"

export const [ items, setItems ] = createStore<ItemType[]>([])

