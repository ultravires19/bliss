import { For } from "solid-js";
import { CreateItemForm } from "./CreateItemForm";
// import styles from "../ItemList.module.css";
import { items } from "../state/store";
import ItemRow from "./ItemRow";

const ItemList = () => {

  return(
    <>
      <CreateItemForm/>
      <br /> 
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>quantity home</th>
            <th>quantity list</th>
          </tr>
        </thead>
        <tbody>
          <For each={items}>
            {item => <ItemRow item={item} />}
          </For>
        </tbody>
      </table>
  </>
  )
}

export default ItemList
