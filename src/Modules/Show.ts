import Product from "./Product"
import Cartt from "./Cart"

abstract class IShow{
    protected _ul!: HTMLUListElement

    abstract render(productes: Product[]): void;
    abstract show_sum(sum: number): void;
    abstract change_delivery_type(deliveryType_1: HTMLInputElement, deliveryType_2: HTMLInputElement): void;

    protected clear(): void{
        if (this._ul) {
            this._ul.innerHTML = '';
        }
    }
}

export default class Show_class extends IShow{

    constructor(ul: HTMLUListElement){
        super()
        this._ul = ul
    }


    override render(productes: Product[]): void {
        this.clear()

        productes.forEach ( (product: Product, index: number) =>{
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-between', 'mb-3')

            const p = document.createElement('p')
            p.textContent = `${product.name} | ${product.price} Gel`

            const btn = document.createElement('button')
            btn.type = 'button'
            btn.textContent = 'Delete'
            btn.classList.add('btn', 'btn-danger')
            btn.addEventListener('click', ()=>{
                Cartt.instance.removeProduct(index)

                this.render(Cartt.instance.elements)
                // this.show_sum(Cartt.instance.getSum)

            })

            li.append(p, btn)
            this._ul?.append(li)
        } )


        if(Cartt.instance.getLength !== 0){
            this.show_sum(Cartt.instance.getSum)
        }

    }

    override show_sum(sum: number): void {
        const p = document.createElement('p')
        p.textContent = `Total: ${sum.toString()}` ;
        
        const hr = document.createElement('hr')
        this._ul?.append(hr, p)
    }

    override change_delivery_type(deliveryType_1: HTMLInputElement, deliveryType_2: HTMLInputElement) {
        if(Cartt.instance.deliveryLocalStorage()){
            deliveryType_1.checked = true
            deliveryType_2.checked = false
        }
        else{
            deliveryType_1.checked = false
            deliveryType_2.checked = true
        }
    }
}