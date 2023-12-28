import { Component } from "solid-js"
import { ItemType } from "../types"
import { items, setItems } from "../state/store"
import { deleteItemDB, updateItemDB } from "../indexedDB"

interface ItemRowProps {
  item: ItemType
}
const ItemRow : Component<ItemRowProps> = (props) => {
  const { id, name, qtyList, qtyHome } = props.item

  const changeHandler = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const fieldName = target.name as keyof ItemType
    const newValue = parseFloat(target.value)

    const newItem: ItemType = { ...props.item, [fieldName]: newValue }

    try {
      await updateItemDB(newItem)
      setItems((item) => item.id === id, fieldName, newValue)
    } catch (error) {
      console.error("failed to update database", error)
    }
    console.log(items)
  }

  const deleteHandler = async () => {
    try {
      await deleteItemDB(id)
      setItems(items => items.filter(i => i.id !== id))
    } catch (error) {
      console.error("failed to delete item from db", error)
    }

  }

  return(
    <tr>
      <td>{name}</td>
      <td><input value={qtyHome} name="qtyHome" onChange={changeHandler}/></td>
      <td><input value={qtyList} name="qtyList" onChange={changeHandler}/></td>
      <td><button onclick={deleteHandler}>x</button></td>
    </tr>
  )
}

export default ItemRow
