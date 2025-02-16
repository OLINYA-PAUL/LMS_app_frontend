import { styles } from "@/app/styles/style";
import React from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import toast from "react-hot-toast";

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface courseDataProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;

  benefits: Benefit[];
  setBenefits: React.Dispatch<React.SetStateAction<Benefit[]>>;
  prerequites: Prerequisite[];
  setPrerequites: React.Dispatch<React.SetStateAction<Prerequisite[]>>;
}

const CourseData = ({
  active,
  setActive,
  benefits,
  setBenefits,
  prerequites,
  setPrerequites,
}: courseDataProps) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;

    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequitesChange = (index: number, value: string) => {
    const updatedPrerequites = [...prerequites];
    updatedPrerequites[index].title = value;

    setPrerequites(updatedPrerequites);
  };

  const handlePrerequites = () => {
    setPrerequites([...prerequites, { title: "" }]);
  };

  const handleRemoveBenefits = (index: number) => {
    if (index === 0) return toast.error("First field cannot be deleted");

    let updatedBenefits = [...benefits];

    updatedBenefits = updatedBenefits.filter((_, i: number) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handleRemovePrerequites = (index: number) => {
    if (index === 0) return toast.error("First field cannot be deleted");

    let updatedPrerequites = [...prerequites];

    updatedPrerequites = updatedPrerequites.filter(
      (_, i: number) => i !== index
    );
    setPrerequites(updatedPrerequites);
  };

  const handleNext = () => {
    if (!prerequites[0].title || !benefits[0].title) {
      return toast.error("Please fill all the fields");
    }

    setActive(active + 1);
  };

  const prev = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[90%] px-20 max-sm:px-0 mt-10">
      <div>
        <label className={`${styles.lable} `}>
          What are the benefits in this course
        </label>
        <div className="w-full mt-5">
          {benefits.map((items: Benefit, index: number) => (
            <div className="w-full" key={index}>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="benefits in this course"
                required
                name=""
                value={items.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
            </div>
          ))}
          <div className="w-full flex items-center justify-between">
            <AddCircleOutline
              style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
              onClick={handleAddBenefits}
            />

            <RemoveCircleOutline
              style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
              onClick={() => handleRemoveBenefits(benefits.length - 1)}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className={`${styles.lable} `}>
          What are the Prerequites in this course
        </label>
        <div className="w-full mt-5">
          {prerequites.map((items: Prerequisite, index: number) => (
            <div className="w-full" key={index}>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="Prerequites in this course"
                required
                name=""
                value={items.title}
                onChange={(e) => handlePrerequitesChange(index, e.target.value)}
              />
            </div>
          ))}

          <div className="w-full flex items-center justify-between">
            <AddCircleOutline
              style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
              onClick={handlePrerequites}
            />

            <RemoveCircleOutline
              style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
              onClick={() => handleRemovePrerequites(prerequites.length - 1)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-10">
        <button
          className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          onClick={prev}
        >
          Prev
        </button>

        <button
          className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
