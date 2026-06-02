export class Panel {

    constructor({id = null,name,panel_type,floor_id}) {
        this.id = id;
        this.name = name;
        this.panel_type = panel_type;
        this.floor_id = floor_id;
    }

}

export const panel_type = Object.freeze({
    entry : 'ENTRY' , 
    exit : 'EXIT'
});