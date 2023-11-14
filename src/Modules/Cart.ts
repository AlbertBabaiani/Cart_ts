import Product from "./Product";
import { HomeDelivery } from "./Delivery";
import { ShopDelivery } from "./Delivery";

type DeliveryType =  HomeDelivery | ShopDelivery

export default class Cartt{
    static instance: Cartt = new Cartt()

    private productes: Product[] = [];
    private deliveryType!: DeliveryType;

    constructor(){
        this.getLocalStorage()
    }

    private addToLocalStorage(): void{
        localStorage.setItem('cart', JSON.stringify([this.productes, this.deliveryType]))
    }


    private getLocalStorage(): void {
        const cartData = localStorage.getItem('cart');
        
        if (cartData !== null) {
            try {
                this.productes = JSON.parse(cartData)[0];
                this.deliveryLocalStorage()


                // if (!Array.isArray(this.productes)) {
                //     this.productes = [];
                // }
            } catch (error) {
                console.error('Error parsing localStorage data:', error);

                this.productes = [];
            }
        }
        else{
            this.productes = [];
        }
    }
    
    public deliveryLocalStorage(): boolean{
        const d_type = localStorage.getItem("cart")

        if(d_type !== null){
            if(JSON.parse(d_type)[1].type === 'Home'){
                this.deliveryType = JSON.parse(d_type)[1]
                return true
            }

            else{
                this.deliveryType = JSON.parse(d_type)[0]
                return false
            }
        }

        
        return false
    }


    public get getLength(){
        return this.productes.length
    }

    public get elements(): Product[]{
        return this.productes;
    }

    public reformId(){
        for(let i = 0; i < this.productes.length; i++){
            this.productes[i].id = i;
        }
    }

    public addProduct(product: Product): void{
        this.productes.push(product)
        this.addToLocalStorage()
    }

    public removeProduct(id: number): void{
        this.productes = this.productes.filter( (product: Product) => product.id !== id )
        this.reformId()
        this.addToLocalStorage()
    }

    public setDelivery(option: DeliveryType): void{
        this.deliveryType = option
        this.addToLocalStorage()
    }


    public get getSum(): number{
        let extra: number
        if(this.deliveryType.type === 'Home'){
            extra = 0.25
        }
        else{
            extra = 1.75
        }


        if(this.productes.length !== 0){
            return this.productes
            .map( (product: Product) => product.price)
            .reduce( (el1: number, el2: number) => {
                return el1 + el2
            }, extra)
        }
        else return 0
    }
}

