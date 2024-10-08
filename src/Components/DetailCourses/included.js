import React, { useState } from "react";
import NewModal from "./modal";

const Included = ({ curiculum, title }) => {
  const [courseData, setCourseData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const data = [
    {
      svg: "/Icons/project.svg",
      title: " Projects",
    },
    {
      svg: "/Icons/module.svg",
      title: curiculum?.length + " Modules",
    },
    {
      svg: "/Icons/assignment.svg",
      title: "Assignments",
    },
    {
      svg: "/Icons/notes.svg",
      title: "Notes",
    },
  ];

  const handleClick = (ind) => {
    let temp = [];
    if (ind === 0) {
      setType("Project");
      temp = curiculum.map((val) => ({
        title: val?.chapter_name,
        allData: val?.project,
      }));
    } else if (ind === 1) {
      setType("Module");
      temp = curiculum.map((val) => ({
        title: val?.chapter_name,
        allData: val?.lessons,
      }));
    } else if (ind === 2) {
      setType("Assignment");
      temp = curiculum.map((val) => ({
        title: val?.chapter_name,
        allData: val?.lessons,
      }));
    } else if (ind === 3) {
      setType("Notes");
      temp = curiculum.map((val) => ({
        title: val?.chapter_name,
        allData: val?.lessons,
      }));
    }

    // Check if there is any valid data before opening the modal
    const hasData = temp.some(
      (item) => item.allData && item.allData.length > 0
    );

    if (hasData) {
      setCourseData(temp);
      handleModalOpen();
    } else {
      console.log(`No ${type} data available`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-3 xsm:grid-cols-2">
        {data?.map((val, ind) => (
          <div
            className="border border-green-500 rounded-[12px] flex flex-col justify-center items-center p-7 gap-3 cursor-pointer xsm:p-3 hover:shadow-2xl"
            key={ind}
            onClick={() => handleClick(ind)}
          >
            <img
              src={val.svg}
              alt={val?.title}
              className="h-[40px] w-auto xsm:h-[35px]"
            />
            <h5 className="text-[0.9rem] font-semibold xsm:text-[14px] text-center">
              {val?.title}
            </h5>
          </div>
        ))}
      </div>
      {modalOpen && (
        <NewModal
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          datas={courseData}
          type={type}
          title={title}
        />
      )}
    </>
  );
};

export default Included;
