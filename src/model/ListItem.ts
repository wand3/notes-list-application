
// create and interface for the list item class
export interface Item {
    id : string,
    item : string,
    checked : boolean
}

// A default class that implements the interface Item 
export default class ListItem implements Item {

    // class constructor inistailized with default values using parameters
    constructor (
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false

    ){}

    // implement getters and setters for the constructor
    // getter
    get id(): string{
        return this._id
    }
    // setter
    set id( id: string){
        this._id = id
    }

    // getter and setter for item 
    get item(): string {
        return this._item
    }

    set item( item: string){
        this._item = item
    }

    // getter and setter for checked 
    get checked(): boolean{
        return this._checked
    }

    set checked( checked: boolean){
        this._checked = checked
    }

}
