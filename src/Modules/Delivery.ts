abstract class Delivery{
    constructor(
        public date: Date,
        public type: string
    ){}
}

export class HomeDelivery extends Delivery{
    constructor(date: Date, public address: string){
        super(date, "Home")
    }
}

export class ShopDelivery extends Delivery{
    constructor(public shopId: number){
        super(new Date(), "Shop")
    }
}