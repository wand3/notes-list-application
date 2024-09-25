import ListItem from "./ListItem";

// create an interface for out list that also holds methods for operations on the List
interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearlist(): void,
    addItem( itemObj: ListItem): void,
    removeItem( id: string): void,
}

// full list class that implements List
export default class FullList implements List {

    // instantiation of class using static method since only one instance of the class will exist
    static instance: FullList = new FullList(); 

    // private constructor for the list so that only one instance of list (Singleton)
    private constructor ( private _list: ListItem[] = [] ){}

    // getter and setter for the list  
    get list(): ListItem[] {
        return this._list
    }

    set list( list: ListItem[]){
        this._list = list
    }

    // this method populates the FullList with the ListItem stored in the localStorage
    load(): void {
        // user getItem to get list myList from localstorage 
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        // parse JSON myList that was stringified sticking to class ListItem private constructors 
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        // loop the results of parsed list 
        parsedList.forEach(itemObj => {
            const newListItems = new ListItem (itemObj._id, itemObj._item, itemObj._checked)
            // adds list items of the instance
            FullList.instance.addItem(newListItems)
        })
    }

    save(): void {
        // saves to localStorage so it returns even if the page is refreshed
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearlist(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        // filters the list so any item in list with id not equal to id is returned 
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
    
}