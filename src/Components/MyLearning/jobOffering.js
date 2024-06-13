import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../Api/api'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { applyJob, getAllJobAplicants } from '../../helpers/helperapi'

const JobOffering = ({ courses }) => {
    const navigate = useNavigate();

    const [jobOpeningData, setJobOpeningData] = useState()


    useEffect(() => {

        getAllJobAplicants()
        fetchUserData()
    }, [])


    const fetchUserData = async () => {

        try {
            const res = await axios.get(
                `${BASE_URL}/getalljobppenings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("COURSES_USER_TOKEN")}`,
                },
            }
            );
            console.log(res.data?.jobOpenings);
            setJobOpeningData(res?.data?.jobOpenings);
        } catch (error) {
            console.log(error)
        }

    }

    const handleApply = async (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            const res = await applyJob(id)
            console.log(res)
            if (res) {

                toast.success('You have Successfully Applied')
            }
            else {
                toast.error("Error while applying")
            }
        } catch (error) {
            toast.error("Error while applying")
        }


    }




    return (
        <>
            <div className="px-[5%] my-[3%] flex gap-10 space-y-8 justify-between xsm:flex-col-reverse xsm:mt-3">
                <div className={`flex flex-col justify-between xsm:w-[100%] md:w-[65%] md:gap-3 ${!jobOpeningData ? "w-full" : 'w-[70%]'}`}>
                    {!jobOpeningData ? <div className="flex justify-center  items-center w-full mt-10"><div className="text-center font-semibold text-2xl w-full "> No Job Found</div></div> : ''}

                    {
                        jobOpeningData?.map((item, ind) => {
                            return (<>
                                <div onClick={() => navigate("/jobpreview?jobid=" + item?._id)} key={ind} className="h-[12rem] w-full flex flex-row gap-4 bg-[#E2FFF1] p-4 mt-4 rounded-2xl justify-between shadow-2xl shadow-[#D9D9D9] xsm:p-2 xsm:rounded-lg xsm:h-[10vh] md:mt-0 md:p-3">
                                    <div className="w-[25%] rounded-2xl">
                                        <img className="w-full h-full rounded-xl xsm:rounded-lg object-cover " src={item?.logoUrl} />
                                    </div>
                                    <div className="w-[60%] flex flex-col justify-between">
                                        <div className="space-y-2 xsm:space-y-1">
                                            <p className="font-pop font-semibold text-[18px] xsm:text-[12px] md:text-[16px]">{item.position}</p>
                                            <p className="font-pop text-[#555555] text-[13px] xsm:hidden md:text-[10px]">{item.company}</p>
                                            <div className="flex space-x-36 xsm:space-x-10 md:space-x-16">
                                                <div className="flex space-x-2 items-center xsm:space-x-1">
                                                    <img className="w-[16px] h-[16px] xsm:w-3 xsm:h-3 md:w-4 md:h-4 object-cover" src="../Icons/RCDesign.svg" />
                                                    <p className="font-pop text-[11px] font-medium text-[#555555] xsm:text-[8px] md:text-[10px]">{item.location}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-[15%] justify-end  justify-self-end items-start md:mt-2">

                                        <button onClick={(e) => handleApply(e, item._id)}
                                            className="bg-[#1DBF73] py-2 px-6 rounded-full text-white text-[14px] font-nu font-bold xsm:text-[6px] xsm:py-1 xsm:px-3 md:text-[10px] md:px-3 md:py-1" >Apply</button>
                                    </div>
                                </div>
                            </>)
                        })
                    }
                </div>
                {/* <div className="w-[25%] justify-self-start flex flex-col Certificate-right gap-y-5 xsm:flex-row xsm:justify-between md:gap-y-4">
                    <p className="font-pop text-center font-semibold text-[18px] xsm:hidden md:text-[14px]">Explore Jobs</p>
                    <button className="bg-[#E2FFF1] py-3 px-10 rounded-lg font-nu font-semibold xsm:text-[8px] xsm:py-2 xsm:px-6 xsm:rounded-sm md:text-[14px] md:py-2">Applied Jobs</button>
                    <button className="bg-[#E2FFF1] py-3 px-10 rounded-lg font-nu font-semibold xsm:text-[8px] xsm:py-2 xsm:px-6 xsm:rounded-sm md:text-[14px] md:py-2">Openings For You</button>
                </div> */}
            </div>
        </>
    )
}

export default JobOffering