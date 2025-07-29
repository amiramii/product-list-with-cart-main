import { useState,useEffect} from "react";
function AddBtn({onAdd,onIncrement,clicked,onShow,handleClick}:{onAdd:()=>void,onIncrement:()=>void,clicked:boolean,onShow:(quantity:number)=>void,handleClick:()=>void}){
   const [quantity,setQuantity]=useState(1);
       
       useEffect(() => {
        if (clicked) {
          onShow(quantity);
        }
      }, [quantity]);
       function handleAddQuantity(){
           setQuantity((q)=>q+1);
       }
       function handleIncrementQuantity(){
        if (quantity > 1) {
            setQuantity((q) => q - 1);
          } else {
            handleClick();
            onIncrement();
            setQuantity(1);
          }
       }
       const handleAddItems=(quantity:number)=>{
        handleClick();
        onAdd();
        onShow(quantity);
    }
    return(
        <>
         {clicked ? (
            <button className="bg-Red text-white flex py-3 px-3 justify-center gap-10  items-center w-max rounded-4xl  absolute left-1/2 -translate-x-1/2 bottom-[-1.5rem] ">
                <div className="border rounded-full flex items-center justify-center  size-5"  onClick={handleIncrementQuantity}>
                   <img src="/assets/images/icon-decrement-quantity.svg" alt="" className="w-3"/>
                </div>
                {quantity}
                <div className="border rounded-full flex items-center justify-center  size-5" onClick={handleAddQuantity} >
                  <img src="/assets/images/icon-increment-quantity.svg" alt="" className="w-3"/>
                </div>
            </button>
            
         ) : (
            <button className="group flex border-Rose-900 border  py-3 px-7 justify-center gap-2 items-center w-max rounded-4xl bg-white absolute left-1/2 -translate-x-1/2 bottom-[-1.5rem]  hover:border-Red hover:border-2 transition-all focus:outline-Red " onClick={()=>handleAddItems(quantity)}>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            <span className="text-Rose-900 font-medium text-xl md:text-[15px] xl:text-xl group-hover:text-Red transition-all">
                Add to Cart
            </span>
        </button>
         )}
        </>
    )
}
export default AddBtn;