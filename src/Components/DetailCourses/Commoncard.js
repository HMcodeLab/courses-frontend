import { useContext, useState } from "react";
import { ReactComponent as Cart } from "../../Assets/Icons/cartblack.svg";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globalinfo } from "../../App";
import { BASE_URL } from "../../Api/api";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { IoIosShareAlt } from "react-icons/io";
import { RWebShare } from "react-web-share";
import ReactPlayer from "react-player";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { formatDate } from "../../helpers/helper_function";
import { div } from "@tensorflow/tfjs";

export default function Commoncard(props) {
  let { Data } = props;
  // console.log(Data);
  const [IsMuted, setIsMuted] = useState(true);

  const { pathname } = useLocation();
  let login = localStorage.getItem("COURSES_USER_TOKEN");
  let navigate = useNavigate();
  // const [Show, setShow] = useState(false)

  const { setCartSize, cartSize } = useContext(Globalinfo);

  async function Addtocart(courseid) {
    try {
      if (login) {
        let token = jwtDecode(login);
        let email = token.email;
        let quantity = 1;
        let url = BASE_URL + "/addtocart";
        let data = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, courseid, quantity }),
        });
        let response = await data.json();
        // console.log(response);
        if (response.success) {
          toast.success(response.msg);
          setCartSize(cartSize + 1);
        } else {
          toast.error(response.msg);
        }
      } else {
        localStorage.setItem("ADD_TO_CART_HISTORY", window.location.pathname);
        // console.log("add to cart withour log")
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function Addtowishlist(courseid) {
    try {
      if (login) {
        let token = jwtDecode(login);
        let email = token.email;
        let url = BASE_URL + "/addtowishlist";
        let data = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, courseid }),
        });
        let response = await data.json();
        // console.log(response);
        if (response.success) {
          toast.success(response.msg);
        } else {
          toast.error(response.msg);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { userDetail } = useContext(Globalinfo);

  let purchasedCourses = [];
  if (Data) {
    userDetail?.purchased_courses?.forEach((val) => {
      purchasedCourses.push(val?.course?._id);
    });
  }

  const handleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMuted((prev) => !prev);
  };
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default context menu behavior
  };
  // console.log(Data);
  return (
    <div className="bg-[#E2FFF1] w-[full] h-max my-14 p-6 rounded-xl flex flex-col  xsm:mt-4 xsm:p-1 xsm:rounded-lg md:p-3 xsm:mb-8">
      <div className="max-h-[14rem] h-fit rounded-xl overflow-hidden bg-white md:h-[35%] relative xsm:h-fit xsm:max-h-[6rem]">
        {
          <span className="bg-transparent p-4 absolute top-0 left-0 z-[99]">
            {IsMuted ? (
              <IoVolumeMuteOutline
                size={"20"}
                style={{
                  cursor: "pointer",
                  color: "black",

                  zIndex: "999999",
                }}
                onClick={handleMute}
              />
            ) : (
              <IoVolumeMediumOutline
                size={"20"}
                style={{
                  cursor: "pointer",
                  color: "black",

                  zIndex: "999999",
                }}
                onClick={handleMute}
              />
            )}
          </span>
        }
        <ReactPlayer
          onContextMenu={handleContextMenu}
          height="100%"
          width="100%"
          url={Data?.featured_video}
          playing={true}
          loop={true}
          muted={IsMuted}
          controls={false}
          className="mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col gap-4 mt-6 xsm:mt-2 xsm:gap-1 md:gap-3 md:mt-4">
        <div className="flex flex-col justify-between items-center xsm:pb-1 ">
          <h2 className="font-nu text-[30px] font-bold xsm:text-[8px] md:text-[12px]">
            ₹{Data?.base_price}
          </h2>

          <div className="gap-y-4 flex w-full px-5 flex-col items-center xsm:gap-x-2 md:gap-x-2">
            {purchasedCourses.includes(Data?._id) ? (
              <Link
                to={"/course/" + Data?.slug}
                className="bg-[#1DBF73] py-2 px-7 flex justify-center rounded-full text-white font-nu font-bold xsm:px-1 xsm:py-1 xsm:text-[8px] md:text-[14px] md:px-[8px] md:py-1"
              >
                View Course
              </Link>
            ) : (
                <div className="space-x-4 w-full flex items-center md:space-x-2 xsm:space-x-3 xsm:mr-1">

                  <div
                    onClick={() => Addtocart(Data?._id)}
                    className="border cursor-pointer flex justify-center w-full py-2 px-10 rounded-full bg-[#1DBF73] text-white font-nu font-bold xsm:px-[5px] xsm:py-[2px] xsm:text-[7px] md:text-[14px] md:px-[8px] md:py-1 "
                  >
                    Add to cart
                  </div>
                </div>
            )}
          
          </div>
        </div>
        <h3 className="font-pop font-semibold xsm:text-[8px] md:text-[14px]">
          {Data?.title}
        </h3>

        <p className="xsm:text-[8px]">
          {Data?.courseCategory === "liveCourse" && (
            <>
              {"Starting On -" + formatDate(Data?.liveClasses[0]?.date)} at{" "}
              {Data.liveClasses[0]?.time}
            </>
          )}
        </p>

        <div className="flex flex-col gap-6 my-6 xsm:hidden md:gap-4 md:my-4">
          <div className="space-y-4 md:space-y-2">
            <p className="font-pop font-semibold md:text-[14px]">
              This Course Includes
            </p>
            <div className="flex items-center space-x-4 md:space-x-2">
              <img className="w-[16px]" src="../Icons/certificate.svg" />
              <p className="font-nu text-[#555555] text-[12px] md:text-[10px]">
                Certifications Of completion
              </p>
            </div>
            <div className="flex items-center space-x-4 md:space-x-2">
              <img className="w-[16px]" src="../Icons/graph.svg" />
              <p className="font-nu text-[#555555] text-[12px] md:text-[10px]">
                32 modules
              </p>
            </div>
            <div className="flex items-center space-x-4 md:space-x-2">
              <img className="w-[16px]" src="../Icons/camera.svg" />
              <p className="font-nu text-[#555555] text-[12px] md:text-[10px]">
                Access on all device
              </p>
            </div>
            <hr />
          </div>

          {/* <div className="space-y-4 md:space-y-2">
            <p className="font-pop font-semibold md:text-[14px]">
              Training 5 Or More People
            </p>
            <p className="font-pop text-[#555555] text-[12px] md:text-[10px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <hr />
          </div> */}
          <div className="space-y-4 md:space-y-2">
            <p className="font-pop font-semibold md:text-[14px]">
              Share this course
            </p>
            <div className="flex space-x-4 ">
              <RWebShare
                data={{
                  text: "Hoping Minds",
                  url: "https://hopingminds.in" + pathname,
                  title: "Hoping Minds",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <IoIosShareAlt className="h-6 w-6 cursor-pointer md:h-4 " />
              </RWebShare>
              {/* <Link to={'https://www.facebook.com/share/Z3c1iwpnxsDk3YJH/?mibextid=qi2Omg'}><img className="w-[12px]" src="../Icons/facebook.svg" /></Link> */}
              {/* <Link to={'https://www.instagram.com/hopingminds_?igsh=MWxvN2F5YmM0aW1lYQ=='}><img className="w-[20px]" src="../Icons/instagram.svg" /></Link> */}
              {/* <Link to={'https://youtube.com/@HopingMinds?si=t7nBGjhMukWF6aN9'}><img className="w-[24px]" src="../Icons/youtube12.svg" /></Link> */}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
      </div>
    
  );
}
