import LoaderGif from "../images/loader.gif";

function Loader (){
    return (
        <div className="absolute flex items-center justify-center w-screen h-screen bg-black backdrop-blur-lg" >
            <img src={LoaderGif} className="w-[50px] bg-white rounded-full" alt="Loading..." />
        </div>
    );
}

export default Loader;