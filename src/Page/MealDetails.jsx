import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { BiSolidLike } from "react-icons/bi";
import { FaStarOfDavid } from "react-icons/fa";
const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [meal, setMeal] = useState({});
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  console.log(meal);
  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Details || Hostel Management</title>
      </Helmet>
      <div className="">
        <div className="mt-6 grid mx-auto md:w-[90%] lg:w-[70%] grid-cols-1 lg:grid-cols-2 gap-12 border p-8 rounded-md">
          <div>
            <div className="flex justify-between">
              <div className="md:flex gap-4 items-center">
                <p className="mb-2">
                  <img
                    className="rounded-full size-20 object-cover"
                    src={meal.photoUrl}
                    alt=""
                  />
                </p>
                <div>
                  <p className="mb-2 text-xl">{meal.title}</p>
                  <p className="mb-2 text-xl">{meal.email}</p>
                </div>
              </div>
              <p className="text-md mt-32 md:mt-0 ml-2 md:ml-0">
               {meal.deadline}
              </p>
            </div>
            <div className="divider"></div>
            <div className="grid md:grid-cols-4  grid-cols-2 mb-2 text-2xl">
              <p className="text-lg"> {meal.category}</p>
              <p className="text-lg">${meal.price}</p>
              <p className="text-lg flex items-center gap-1"><BiSolidLike />{meal.like}</p>
              <p className="text-lg flex items-center gap-1"><FaStarOfDavid/>{meal.like}</p>
            </div>
            <p>{meal.description}</p>
          </div>

          <div className="">
            <h3 className="mb-8 text-xl ">Review : </h3>
            <form>
              {/* Date Picker Input Field */}
              <div className="flex flex-col md:flex-row  justify-between ">
                <div>
                  <p className="text-gray-700">Deadline :</p>
                  <DatePicker
                    className="border p-2 rounded-md"
                    selected={startDate}
                    name="deadline"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  <label className="text-gray-700">Rating :</label>
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    onChange={setRating}
                    required
                  />
                </div>
              </div>
              <div className="md:flex justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Title :</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="service title"
                    // defaultValue={title}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">User Email:</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="user email"
                    // defaultValue={user?.email}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <label className="label">
                <span className="label-text">Review :</span>
              </label>
              <textarea
                name="review"
                className="textarea textarea-bordered w-full"
                placeholder="review"
                required
              ></textarea>
              <input
                className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                type="submit"
                value="Add Review"
              />
            </form>
          </div>
        </div>
        <div>
          {/* <div className="mt-12">
            <h3 className="text-2xl font-semibold">Reviews:</h3>
            <p className="mt-2  text-lg">
              <span className="size-2 px-2 py-1 rounded-full  bg-orange-200 mr-2">
                {review.length}
              </span>
              Reviews For This Service
            </p>
            {review.length > 0 &&
              review.map((r, i) => (
                <div
                  key={i}
                  className="mt-5 border-y-2 py-6 flex gap-6 items-center"
                >
                  <div>
                    <img
                      className="size-24 rounded-full"
                      src={r?.user?.user_photoURL}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{r?.user?.name}</p>
                    <p>{new Date(r?.deadline).toLocaleDateString()}</p>
                    <p className="text-sm font-sans w-20">
                      <Rating style={{ maxWidth: 180 }} value={r?.rating} />
                    </p>
                    <p>{r?.review}</p>
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MealDetails;
