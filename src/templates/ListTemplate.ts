import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList  {

    // type specified when constructor is not issued with parameters 
    ul : HTMLUListElement

    // singleton of the class 
    static instance: ListTemplate = new ListTemplate();

    private constructor ( ){
        // using assertion as HTMLUListElement 
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        // clears all the innerhtml of ul 
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        // looping through each item in fullList
        fullList.list.forEach(item => {
            // create li element and give it a classname 
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item flex justify-between"

            // create checkbox element and its attributes and append to parent li
            const check = document.createElement("input") as HTMLInputElement
            check.className = "peer h-auto w-[20px] appearance-none rounded-sm border border-slate-300 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 checked:appearance-auto"
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            // add event listener to listen for the change event
            check.addEventListener('change', () => {
                // when chenged the item.checked is equal to the opposite of item.checked 
                item.checked = !item.checked
                fullList.save()
            })

            // create the label Element
            const label = document.createElement("label") as HTMLLabelElement
            label.className = "select-none text-slate-700 peer-checked:text-slate-400 peer-checked:line-through"
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)


            // create button element for delete and also append to the parent li 
            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button size-[26px] rounded-md p-1 hover:bg-red-50 hover:text-red-500 block peer-has-[:checked]:hidden"
            button.textContent = "X"
            li.append(button)

            // event listener for the button
            button.addEventListener("click", () =>{
                fullList.removeItem(item.id)
                // render the fullList after an item is removed
                this.render(fullList)
            })
            // append to ul 
            this.ul.append(li)
        });        
        
    }
}