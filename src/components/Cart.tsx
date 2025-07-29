import { useState } from 'react';
import ConfirmBtn from './ConfirmBtn'
import {Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
type obj={
    index:number,
    price:number,
    name:string,
    quantity:number,
    img:string
}
function Cart({itemsSlected,itemsObj,handleCart,handleItemsSelected,handleClick,handleReset}:{itemsSlected:number,itemsObj:obj[],handleCart:(obj:obj[])=>void,handleItemsSelected:()=>void,handleClick:(index: number)=>void,handleReset:()=>void}){
    let prices=new Array(0);
    const [open,setOpen]=useState(false);
    function calculatePrice(x:number,y:number){
        const price=x*y;
        prices=[...prices,price];
        return(
            price
        )
    }
    function calculateTotal(){
        let result=0;
        prices.map((price)=>{
            result+=price;
        })
        return result;
    }
    function handleDelete(name:string){
        const item=itemsObj.find((item)=>item.name===name);
        if(!item){
            return
        }
        const newArray=itemsObj.filter((item)=>item.name !== name);
        handleCart(newArray);
        handleItemsSelected();
        handleClick(item.index);
    }
    function handleDialog(){
        setOpen(true);
    }
    
    return(
        <div className='bg-white w-full p-5 flex flex-col justify-around md:w-xl rounded-2xl '>
            <h1 className='text-Red font-bold text-xl mb-10'>Your Cart ({itemsSlected})
            </h1>
            {(itemsSlected === 0) ? (
                <>
                 <img src="/assets/images/illustration-empty-cart.svg" alt="" className='self-center mb-5'/>
                 <p className='text-Rose-500 font-medium self-center text-center m-10'>Your added items will appear here</p>
                </>
            ) :(
                <>
                 <ul>
                 {itemsObj.map((itemObj,index)=>{
                   return(
                    <li key={index} className='flex relative border-b-2 border-Rose-100 flex-col p-2 gap-1.5'>
                        <h1 className='text-Rose-900 font-semibold'>{itemObj.name}</h1>
                        <div className='flex gap-3'>
                            <span className='text-Red text-[0.9rem] font-semibold'>{itemObj.quantity}x</span>
                            <span className='text-Rose-400'>@ ${itemObj.price.toFixed(2)}</span>
                            <span className='text-Rose-500 font-medium'> ${calculatePrice(itemObj.price,itemObj.quantity).toFixed(2)}</span>
                        </div>
                        <button className='absolute right-0 border border-Rose-400 rounded-full p-0.5 top-1/3 ' onClick={()=>handleDelete(itemObj.name)}>
                            <img src="/assets/images/icon-remove-item.svg" alt="" className='w-2.5'/>
                        </button>
                    </li>
                   )
                })}
                 </ul>
                 <div className='flex justify-between py-6 items-center'>
                    <h1 className='text-Rose-900'>
                        Order Total
                    </h1>
                    <span className='text-Rose-900 font-bold text-2xl'>${calculateTotal().toFixed(2)}</span>
                 </div>
                 <div className='bg-Rose-50 flex justify-center items-center p-4 gap-x-3 rounded-xl mb-7'>
                    <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
                    <p className='text-Rose-900 font-medium'>
                        This is a <b>carbon-neutral</b> delivery
                    </p>
                 </div>
                 <ConfirmBtn handleDialog={handleDialog}/>
                 <Dialog open={open} onClose={()=>setOpen(false)} as="div" className="relative z-10 focus:outline-none">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel transition
                                       className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 flex flex-col gap-5 ">
                                <img src="/assets/images/icon-order-confirmed.svg" alt="" className='size-10' />
                                <DialogTitle className='text-Rose-900 text-4xl font-bold'>
                                    Order Confirmed
                                </DialogTitle>
                                <p className='text-Rose-500'>
                                    We hope you enjoy your food!
                                </p>
                                <div className='bg-Rose-50 p-5 rounded-xl '>
                                    <ul >
                                        {itemsObj.map((itemObj,index)=>{
                                        return(
                                            <li key={index} className=' relative border-b-2 border-Rose-100  p-3 flex gap-3'>
                                                <img src={itemObj.img} alt="" className='aspect-square size-15 rounded-[0.5rem]'/>
                                                <div className='flex gap-1.5 flex-col'>
                                                    <h1 className='text-Rose-900 font-semibold text-[0.8rem] '>{itemObj.name}</h1>
                                                    <div className='flex gap-3'>
                                                        <span className='text-Red text-[0.9rem] font-semibold'>{itemObj.quantity}x</span>
                                                        <span className='text-Rose-400'>@ ${itemObj.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <span className='text-Rose-500 font-medium absolute right-0 top-1/3' > ${prices[index].toFixed(2)}</span>
                                            </li>
                                        )
                                        })}
                                    </ul>
                                    <div className='flex justify-between py-6 items-center'>
                                        <h1 className='text-Rose-900'>
                                            Order Total
                                        </h1>
                                        <span className='text-Rose-900 font-bold text-2xl'>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={()=>{setOpen(false);
                                    handleReset()
                                }} className="bg-Red text-white font-medium w-full py-2 rounded-4xl text-xl hover:bg-Rose-900 focus:bg-Rose-900 transition ">
                                    Start New Order
                                </button>
                            </DialogPanel>
                        </div>
                    </div>
                 </Dialog>
                </>
            )
            }
            
        </div>
    )
}
export default Cart