export class Rooms {
    id: number;
    type: string;
    price: number;
  
    /**
     * Creates a new instance of the Rooms class
     * @param id unique identifier of the room
     * @param name name of the room
     * @param price price of the room
     */
    constructor(id: number, type: string, price: number) {
      this.id = id;
      this.type = type;
      this.price = price;
    }
  }