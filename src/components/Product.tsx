import { useEffect,useState } from "react";
import AddBtn from './AddBtn';
import Cart from './Cart';

type product={
    image:{
        thumbnail:string,
        mobile:string,
        tablet:string,
        desktop:string,
    };
    name:string,
    category:string,
    price:number,
}
type obj={
    index:number,
    price:number,
    name:string,
    quantity:number,
    img:string
}
function Product(){
    const [clicked,setClicked]=useState<boolean[]>([]);
    function handleClick(index:number){
        const updated=[...clicked];
        updated[index]=!updated[index];
        setClicked(updated);
    }
    const [itemsObj,setItemsObj]=useState<obj[]>([]);
    function handleReset(){
        setItemsObj([]);
        setClicked([]);
        setItemsSlected(0);
    }
    function handleCart(obj:obj[]){
        setItemsObj(obj)
    }
    function handleCartItems(e:obj){
        const exists=itemsObj.find((item)=>item.name===e.name);
        if(!exists){
            setItemsObj([...itemsObj,e]);
        }else{
            const updatedItemsObj=itemsObj.map((item)=>{
                return (item.name === e.name) ? {
                    ...item,
                    quantity:e.quantity,
                }: item
            })
            setItemsObj(updatedItemsObj);
        }
        
    }
    function handleIncrement(){
        setItemsSlected((i)=>i+1)
    }
    function handleDecrement(){
        if(itemsSlected>0){
            setItemsSlected((i)=>i-1)
        }
        
    }
    const [products,setProducts]=useState<product[]>([]);
    useEffect(()=>{
        fetch('/data.json')
        .then((res)=>{return res.json()})
        .then((data)=>{setProducts(data)});
    },[])
    const displayProducts=products.map((product,index)=>{
        return(
            <li key={index} className="flex flex-col gap-y-1">
                <div className="relative mb-10">
                    <picture >
                        <source srcSet={product.image.desktop} media="(min-width:80rem)"/>
                        <source srcSet={product.image.tablet} media="(min-width:48rem)"/>
                        <img src={product.image.mobile} alt={`${product.name} + picture`} className="rounded-2xl w-full object-cover hover:border-Red hover:border-2 focus:outline-Red" tabIndex={0} />
                    </picture>
                    <AddBtn 
                    onAdd={handleIncrement}
                    onIncrement={handleDecrement}
                    clicked={clicked[index]}
                    onShow={(i:number)=>handleCartItems({
                        index:index,
                        price:product.price,
                        name:product.name,
                        quantity:i,
                        img:product.image.thumbnail
                    })}
                    handleClick={()=>handleClick(index)}
                    />
                </div>
                <h1 className="text-Rose-400  font-medium ">{product.category}</h1>
                <h1 className="text-Rose-900 font-bold text-3xs">{product.name}</h1>
                <p className="text-Red font-semibold">
                    <span>$</span>
                    {product.price.toFixed(2)}
                </p>
            </li>
        )
    })
    const [itemsSlected,setItemsSlected]=useState(0);
    function handleItemsSelected(){
        setItemsSlected(i=>i-1);
    }
    return(
        <>
            <div className="flex flex-col gap-5 xl:flex-row md:items-center xl:items-start">
                <ul className="flex flex-col gap-y-5 md:grid md:grid-cols-3 md:gap-5">
                    {displayProducts}
                </ul>
                <Cart itemsSlected={itemsSlected} itemsObj={itemsObj}
                handleCart={handleCart}
                handleItemsSelected={handleItemsSelected}
                handleClick={handleClick}
                handleReset={handleReset}
                />
            </div>
        </>
    )
}
export default Product;