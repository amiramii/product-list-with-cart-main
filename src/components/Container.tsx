import Product from './Product';
function Container(){
    return(
        <div className=' flex flex-col p-10 gap-7 xl:p-20 min-w-full'>
            <h1 className='text-5xl font-extrabold text-Rose-900'>Desserts</h1>
            <Product/>
        </div>
    )
}
export default Container;