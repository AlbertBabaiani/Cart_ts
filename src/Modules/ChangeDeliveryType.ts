import Show_class from "./Show";
import Cartt from "./Cart";

import { HomeDelivery } from "./Delivery";
import { ShopDelivery } from "./Delivery";

export default function changeDelivery(ul: HTMLUListElement, deliveryType_1: HTMLInputElement): void{
    const show = new Show_class(ul)
  
    if(deliveryType_1.checked){
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 10);

      Cartt.instance.setDelivery(new HomeDelivery(futureDate, "Tbilisi"))
    }
    else{
      Cartt.instance.setDelivery(new ShopDelivery(4))
    }

  
    show.render(Cartt.instance.elements)
  }