import './style.scss'

import Cartt from './Modules/Cart';
import Show_class from './Modules/Show';

import addElement from './Modules/AddElement';
import changeDelivery from './Modules/ChangeDeliveryType';


function init(): void{
  const form = document.querySelector('form') as HTMLFormElement
  const input = form.querySelector('input[type="text"]') as HTMLInputElement
  const price_input = form.querySelector('input[type="number"]') as HTMLInputElement
  const btn = form.querySelector('#add-item') as HTMLButtonElement
  const deliveryType_1 = form.querySelector('#deliveryType_1') as HTMLInputElement
  const deliveryType_2 = form.querySelector('#deliveryType_2') as HTMLInputElement

  const ul = document.querySelector('.items') as HTMLUListElement

  const show = new Show_class(ul)
  show.render(Cartt.instance.elements)
  show.change_delivery_type(deliveryType_1, deliveryType_2)

  
  form.addEventListener('submit', (event: Event) =>{
    event.preventDefault()
    addElement(input, price_input, ul, deliveryType_1, Cartt.instance)
  })

  btn.addEventListener('click', () =>{
    addElement(input, price_input, ul, deliveryType_1, Cartt.instance)
  })

  form.addEventListener('change', ()=>{
    changeDelivery(ul, deliveryType_1)
  })

}

document.addEventListener('DOMContentLoaded', init)