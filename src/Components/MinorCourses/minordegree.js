import { Link } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import { useEffect, useState } from "react";

export default function MinorDegree(){
    const [allcategories, setallcategories] = useState([])
    useEffect(() => {
     async function Fetchdata(){
        let url=BASE_URL+'/getminordegreecategories'
        const data=await fetch(url)
        const response=await data.json()
        setallcategories(response?.categories)
        // console.log(response);
     }
     Fetchdata()
    }, [])
    
    return(<>
    <div className="my-4 pt-14 xsm:pt-4 xsm:mb-0 xsm:px-[2%] md:my-4 px-[5%]">
                <p className="font-pop font-semibold text-[30px] xsm:text-[18px] md:text-[20px]">For Minor Degree</p>
            </div>
    <div className="pb-20 grid grid-cols-4 gap-5 px-[5%] py-5 xsm:grid-cols-1 xsm:gap-3 xsm:pb-10">
    {
        allcategories?.map((item)=>{
            return(<>
            <Link to='/minorCourse?minordegree=true&category=Full Stack Development' className="border shadow-2xl rounded-xl">
                <img src={item?.Category_image} className="h-[28vh] rounded-t-xl w-full xsm:h-[15vh] md:h-[20vh]" alt="course"/>
                <div className="font-bold text-xl text-center my-10 xsm:my-5 xsm:text-[12px] md:text-lg md:my-8 ">{item?.Category_Name}</div>
            </Link>
            </>)
        })
    }
            {/* <Link to='/minorCourse?category=Full Stack Development' className="border shadow-2xl">
                <img src="/fsd.jpg" className="h-[25vh] w-full"/>
                <div className="font-bold text-xl text-center my-10">Full Stack Development</div>
            </Link>
            <Link to='/minorCourse?category=Data Science' className="border shadow-2xl">
                <img src="/ds.jpg" className="h-[25vh] w-full"/>
                <div className="font-bold text-xl text-center my-10">Data Science</div>
            </Link>
            <Link to='/minorCourse?category=Management' className="border shadow-2xl">
                <img src="/management.jpg" className="h-[25vh] w-full"/>
                <div className="font-bold text-xl text-center my-10">Management</div>
            </Link>
            <Link to='/minorCourse?category=AI/ML' className="border shadow-2xl">
                <img src="/aiml.png" className="h-[25vh] w-full"/>
                <div className="font-bold text-xl text-center my-10">AI & ML</div>
            </Link> */}

    </div>
    </>)
}