// import { ItemProps } from "../types/itemProps";
import { Component, Show, createSignal } from 'solid-js'
import styles from '../Item.module.css'
import { ItemType } from '../types'
import { setItems } from '../state/store'
import { deleteItemDB } from '../indexedDB'

interface ItemProps {
  item: ItemType
}
export const Item : Component<ItemProps> = (props) => {
  const [ editMode, setEditMode ] = createSignal(false)
  const { item } = props

    const { id, name, qtyHome, qtyList, } = item
    const editHandler = () => {
      setEditMode(true)
  }

    const deleteHandler = () => {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      deleteItemDB(id)
    }

  const updateHandler = () => {

    setEditMode(false)
    // props.setItems()
  }

    return (
      <Show
        when={editMode()}
        fallback={
            <div onClick={editHandler} class={`${styles.item} ${styles.gridrow}`}>
              <p class={styles.name}>{name}</p>
              <p class={styles.qtyList}>{qtyList}</p>
              <p class={styles.qtyHome}>{qtyHome}</p>
              <button class={styles.button} onClick={deleteHandler}>x</button>
              <button class={styles.button} onClick={editHandler}>edit</button>
          </div>
        }>
      <form onSubmit={updateHandler}>
        <input class={styles.name} name="name" type="string" value={name}/>
        <input class={styles.qtyList} name="qtyList" type="number" value={qtyList}/>
        <input class={styles.qtyHome} name="qtyHome" type="number" value={qtyHome}/>
        <button type="submit">submit</button>
      </form>
      </Show>
    )
}
