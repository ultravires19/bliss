import { onMount, type Component } from 'solid-js';

import styles from './App.module.css';
import ItemList from './components/ItemList';
import { getItemsDB, initDB } from './indexedDB';
import { setItems } from './state/store';
import { ItemType } from './types';

const App: Component = () => {
  onMount(async () => {
    try {
      await initDB()
      console.log('db initialized')
      const items: ItemType[] = await getItemsDB() as ItemType[]
      console.log('items fetched:', items)
      setItems(items)
    } catch (error) {
      console.error("error init")
    }

  })
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>
          &#x1F957
          👨‍🌾
          Grocery Bliss
          👩‍🌾
          &#129367
        </p>
      </header>
      <ItemList /> 
    </div>
  );
};

export default App;
