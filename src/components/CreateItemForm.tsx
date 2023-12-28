import { ItemType } from "../types"
import { addItemDB } from "../indexedDB"
import { items, setItems } from "../state/store"

export const CreateItemForm = () => {
  let nameRef!: HTMLInputElement
  // let categoryRef!: HTMLInputElement
  let qtyListRef!: HTMLInputElement
  let qtyHomeRef!: HTMLInputElement
  // let locHomeRef!: HTMLInputElement
  // let locStoreRef!: HTMLInputElement
  // let shelfLifeRef!: HTMLInputElement
  
  const addItemHandler = (e: Event) => {
    e.preventDefault()
    const item: ItemType = {
      id: nameRef.value,
      name: nameRef.value,
      qtyList: parseFloat(qtyListRef.value),
      qtyHome: parseFloat(qtyHomeRef.value)
    }
    setItems([...items, item])
    addItemDB(item)

    nameRef.value = ""
    // categoryRef.value = ""
    qtyListRef.value = ""
    qtyHomeRef.value = "" 
    // locHomeRef.value = ""
    // locStoreRef.value = ""
    // shelfLifeRef.value = ""

    nameRef.focus()
    
  }

  return(
    <form onSubmit={addItemHandler}> 
      <input ref={nameRef} placeholder="name"/>
      <input ref={qtyListRef} placeholder="quantity list" type="number"/>
      <input ref={qtyHomeRef} placeholder="quantity home" type="number"/>
      <button type="submit">add</button>
    </form>
  )
}
