import Ratings from "@/utils/Rating";
import { IReview } from "./Reviews";
import Image from "next/image";

const ReviewCard = ({
  reviews,
  index,
}: {
  reviews: IReview;
  index: number;
}) => {
  return (
    <div className="w-full ">
      <div
        className=" p-3 w-[95%] mx-auto h-auto rounded-lg bg-white dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] shadow-sm dark:shadow-inner  text-left mb-10"
        key={index}
      >
        <div className="w-full flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={reviews.avatar}
              alt="review_image"
              height={40}
              width={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-Poppins font-bold ">
                {reviews.name}
              </h1>
              <p className="text-sm font-Poppins text-left">
                {reviews.professor}
              </p>
            </div>
          </div>
          <Ratings rating={5.0} />
        </div>
        <div className="w-full  mt-2">
          <p className="text-sm font-Poppins ">{reviews.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
