import React, { useEffect } from "react";

function PageNotFound() {

    useEffect(function(){
        window.scrollTo(0, 200);
    },[]);
    
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="font-bold text-9xl">404</h1>
      <p className='text-2xl font-bold text-center' >This Feature Not Implemented Yet</p>
    </div>
  );
}

export default PageNotFound;