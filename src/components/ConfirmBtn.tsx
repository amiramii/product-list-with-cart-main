function ConfirmBtn({handleDialog}:{handleDialog:()=>void}){
    return(
        <>
         <button onClick={handleDialog} className="bg-Red text-white font-medium w-11/12 py-4 rounded-4xl text-xl hover:bg-Rose-900 focus:bg-Rose-900 transition ">
            Confirm Order
         </button>
        </>
    )
}
export default ConfirmBtn