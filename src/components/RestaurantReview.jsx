import React from "react";
import { AiFillStar } from "react-icons/ai";
import defaultImage from "../assets/blank.png";
import { Progress } from "@material-tailwind/react";
import ReviewForm from "../features/restaurant/ReviewForm";
import { useState, useEffect } from "react";
import axios from "../config/axios";
import useAuth from "../Hooks/use-auth";
import useBooking from "../Hooks/use-booking";


export default function RestaurantReview({ resId, allreviewMessage, res }) {
  const { authUser } = useAuth();
  // console.log(authUser);

  console.log(`ALLREVIEWMESSAGE`,allreviewMessage);

  const [averageScore, setAverageScore] = useState(0);
  const [cusInfo,setCusInfo] = useState([]);

  const checkCusId = allreviewMessage?.reviews?.find(
    (item) => item.customerId === authUser?.id
  );
  // console.log(`checkCusId=======>`,checkCusId);

  const totalScore = allreviewMessage?.reviews?.reduce((acc, review) => {
    return acc + review.score;
  }, 0);

  const customerInfo = {};

  // allreviewMessage?.getCusId?.find((item)=> {
  //   customerInfo.id = item.id,
  //   customerInfo.img = item.profileImg,
  //   customerInfo.name = item.firstName
  // });
  // console.log(`VALUE =============>`,customerInfo);

  useEffect(()=>{
    allreviewMessage?.getCusId?.map((item)=> setCusInfo(item));
  },[cusInfo]);
  // console.log(`VALUE =============>`,customerInfo);

  useEffect(() => {
    const newAverageScore = totalScore / allreviewMessage?.reviews?.length;
    setAverageScore(newAverageScore);
    // console.log(averageScore);
  }, [totalScore, averageScore]);

  const [isOpenAfterComplete, setIsOpenAfterComplete] = useState(false);

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`http://localhost:8888/review/${reviewId}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const scoreCounts = {};
  res?.Reviews.forEach((item) => {
    const score = item.score;
    // no score
    if (!scoreCounts[score]) {
      scoreCounts[score] = 1;
      // have score + 1
    } else {
      scoreCounts[score]++;
    }
  });
  // console.log(scoreCounts);

  return (
    <div className="w-full pt-4 my-10 border shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-evenly text-red-600 text-xl">
          <div className="font-bold">Reviews(xx,xxx)</div>
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center w-20 h-20 border-4 border-red-600 rounded-full text-2xl font-semibold">
              {averageScore ? averageScore.toFixed(1) : "-"}
            </div>
            <div>xx,xxx Reviews</div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              {[...Array(5)].map((item, index) => (
                <AiFillStar key={index} />
              ))}
            </div>
            <div className="flex">
              {[...Array(4)].map((item, index) => (
                <AiFillStar key={index} />
              ))}
            </div>
            <div className="flex">
              {[...Array(3)].map((item, index) => (
                <AiFillStar key={index} />
              ))}
            </div>
            <div className="flex">
              {[...Array(2)].map((item, index) => (
                <AiFillStar key={index} />
              ))}
            </div>
            <div className="flex">
              <AiFillStar />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-32">
            <Progress value={scoreCounts["5"]} color="red" />
            <Progress value={scoreCounts["4"]} color="red" />
            <Progress value={scoreCounts["3"]} color="red" />
            <Progress value={scoreCounts["2"]} color="red" />
            <Progress value={scoreCounts["1"]} color="red" />
          </div>
        </div>
        <button
          className="p-3 text-center bg-primary self-center text-white cursor-pointer rounded-md"
          onClick={() => setIsOpenAfterComplete(!isOpenAfterComplete)}
        >
          Review Us!
        </button>
        <div>
          <ReviewForm isOpenAfterComplete={isOpenAfterComplete} resId={resId} />
        </div>
        <div className="w-full border-b-2"></div>
        <div className="flex flex-col">
          {allreviewMessage?.reviews?.map((item, index) => (
            <div key={index}>
              <div className="flex py-4 px-2">
                <div className="w-40 px-10 pt-2 text-xs">
                  <div className="w-full">
                    <img src={item.customer.profileImg}/>
                    <p>{item.customer.firstName}</p>
                  
                  </div>
                  {/* <div>{cusInfo.id === item.customerId ? <p>{customerInfo.name}</p> : <p>BULL</p>}</div> */}
                  <div>{item.createAt}</div>
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <div>{item.restaurant}</div>
                  <div className="flex">
                    {[...Array(item.score)].map((item, index) => (
                      <AiFillStar key={index} color="orange" />
                    ))}
                  </div>
                  <div>{item.message}</div>
                  <div className="flex gap-3 w-20 h-20">
                    <img src="" alt="" />
                    {/* {item.ReviewImage.map((el, index) => (
                      <img
                        src={el}
                        alt="review-pic"
                        key={`${item.reviewId}-${index}`}
                      />
                    ))} */}
                  </div>
                </div>
                {checkCusId && item.customerId === authUser.id ? (
                  <div className="p-3 bg-secondary text-white h-10 flex items-center">
                    <button onClick={() => handleDeleteReview(item.id)}>
                      Delete
                    </button>
                  </div>
                ) : undefined}
              </div>
              <div className="w-full border-b-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
