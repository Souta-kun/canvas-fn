export class Board {
    id;
    name;
    columns = [];
    constructor(id, name, columns = []) {
        if (!name || name.trim() === "") {
            throw new Error("El name es requerido");
        }
        if (id && id.trim() === "") {
            throw new Error("El id no puede ser una cadena vacía");
        }
        if (id) {
            this.id = id;
        }
        this.columns = columns;
        this.name = name;
    }
}
