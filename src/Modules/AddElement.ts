import Product from './Product';

import Show_class from './Show';
import Cartt from './Cart';

import changeDelivery from './ChangeDeliveryType';

export default function addElement(input: HTMLInputElement, price: HTMLInputElement, ul: HTMLUListElement,
    deliveryType_1: HTMLInputElement, cart: Cartt): void{

    if(!input.value.trim()) return
    if(!price.valueAsNumber) return
    
    changeDelivery(ul, deliveryType_1)

    cart.addProduct(new Product(cart.getLength, input.value.trim(), Math.abs(price.valueAsNumber)))

    const show =  new Show_class(ul);
    show.render(cart.elements)

    input.value = ''
    price.value = ''

    input.blur()
    price.blur()
}