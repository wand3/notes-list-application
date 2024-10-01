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
        this.ul.className = 'sm:text-sm md:text-xl lg:text-2xl text-[#a1a0b3] dark:text-dark mt-2 bg-transparent'
    }

    render(fullList: FullList): void {
        this.clear()

        // looping through each item in fullList
        fullList.list.forEach(item => {
            // create li element and give it a classname 
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item dark:border p-[2%] flex w-fill mx-[5%] my-[4%] background-light dark:bg-black-600 dark:drop-shadow-sm rounded-md shadow-sm hover:background-dark-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

            // create checkbox element and its attributes and append to parent li
            const check = document.createElement("input") as HTMLInputElement
            check.className = "peer h-[1em] w-[1em] appearance-none rounded-sm border font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 checked:appearance-auto my-auto mx-2"
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
            label.className = "truncate text-wrap select-none peer-checked:text-slate-400 peer-checked:line-through pl-5 w-full"
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)


            // create button element for delete and also append to the parent li 
            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button my-auto bg-indigo-600 size-[26px] rounded-md ml-auto w-fit px-[1rem] py-[0] bg-[#4158D0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block peer-has-[:checked]:hidden"
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