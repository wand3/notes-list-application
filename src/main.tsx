import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Test from "./components/test";
import './index.css'
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';



// initailize application function
const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

    // add event listenter to the form 
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        // added so the form dosent reload the page which is the default behaviour
        event.preventDefault()

        const input = document.getElementById("newItem") as HTMLInputElement

        // trim to remove any whitespaces
        const newEntryText: string = input.value.trim()
        // do nothing if its empty 
        if (!newEntryText.length) return

        
    })

    // clear items
    const clearItem = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItem.addEventListener('click', (): void => {
        fullList.clearlist()
        fullList.save()
        template.clear()
    
    })

    // what happens right away
    fullList.load()
    template.render(fullList)
}


// ensures elemets exist before we can interact with them
addEventListener("DOMContentLoaded", initApp)
