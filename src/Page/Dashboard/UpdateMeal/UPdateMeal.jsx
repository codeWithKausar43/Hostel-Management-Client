import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ForwardedDatePicker = React.forwardRef(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <DatePicker selected={value} onChange={onChange} {...rest} ref={ref} />
    );
  }
);

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate("");
  const axiosSecure = useAxiosSecure();
  const [meal, setMeal] = useState({});
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(meal?.photoUrl || "");
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  // Specific id get request
  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
      setPhotoUrl(res.data?.photoUrl);
    });
  }, [id]);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data?.success) {
        return data?.data?.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      return null;
    }
  };

  // Meal default value set
  useEffect(() => {
    reset({
      title: meal?.title || "",
      category: meal?.category || "",
      ingredients: meal?.ingredients || "",
      price: meal?.price || "",
      deadline: meal?.deadline || "",
      name: user?.displayName || "",
      email: user?.email || "",
      description: meal?.description || "",
    });
  }, [meal, user, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    if (!photoFile && !meal?.photoUrl) {
      setError("photoFile", {
        type: "manual",
        message: "Please upload a photo!",
      });
      return;
    }

    let imageUrl = photoUrl;
    if (photoFile) {
      imageUrl = await uploadImage(photoFile);
    }

    const updateInfo = {
      name: data?.name,
      email: data?.email,
      category: data?.category,
      price: data?.price,
      ingredients: data?.ingredients,
      title: data?.title,
      deadline: data?.deadline,
      description: data?.description,
      photoUrl: imageUrl,
    };

    axiosSecure
      .patch(`/meals/${id}`, updateInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data?.modifiedCount) {
          Swal.fire({
            title: `${data.title} successfully updated`,
            icon: "success",
            timer: 1500,
          });
          navigate("/dashboard/allMeals");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: `${error.message}`,
          icon: "error",
          timer: 1500,
        });
      });
  };

  // Image change handler with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      // Validate file type
      if (!fileType.startsWith("image/")) {
        setError("photoFile", {
          type: "manual",
          message: "Please upload a valid image file!",
        });
        clearErrors("photoFile");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (fileSize > 5 * 1024 * 1024) {
        setError("photoFile", {
          type: "manual",
          message: "File size must be under 5MB!",
        });
        clearErrors("photoFile");
        return;
      }

      // If valid, set the file and clear any previous errors
      setPhotoFile(file);
      clearErrors("photoFile");
    }
  };

  return (
    <div className="md:mt-12 w-full md:w-[90%] mx-auto">
      <div className="bg-blue-gray-100 box-content p-12 rounded-xl">
        <h3 className="text-center mb-4 underline text-2xl font-bold">
          Update Meal
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2 justify-around">
            {/* Title */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Title</span>
              <input
                {...register("title")}
                type="text"
                className="input input-bordered w-full"
              />
            </label>

            {/* Category */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Category</span>
              <select
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option disabled>Select a category</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Upcoming</option>
              </select>
            </label>

            {/* Ingredients */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Ingredients</span>
              <input
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
                type="text"
                className="input input-bordered w-full"
              />
            </label>

            {/* Price */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Price</span>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                className="input input-bordered w-full"
              />
            </label>

            {/* Post Date (DatePicker) */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Post Date</span>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <ForwardedDatePicker
                    {...field}
                    className="border p-2 rounded-md w-full"
                    selected={startDate}
                    defaultValue={meal?.deadline}
                    onChange={(date) => {
                      setStartDate(date);
                      const formattedDate = date.toLocaleDateString("en-US");
                      field.onChange(formattedDate);
                    }}
                  />
                )}
              />
            </label>

            {/* Name */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Name</span>
              <input
                readOnly
                {...register("name")}
                defaultValue={user?.displayName}
                type="text"
                className="input input-bordered w-full"
              />
            </label>

            {/* Email */}
            <label className="form-control w-full">
              <span className="label-text mb-2">Email</span>
              <input
                readOnly
                {...register("email")}
                defaultValue={user?.email}
                type="text"
                className="input input-bordered w-full"
              />
            </label>

            {/* Photo file upload */}
            <div className=" hidden md:flex flex-col gap-4 items-start w-full md:mt-7">
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="photoFile" className="cursor-pointer w-full">
                  <div className="flex items-center justify-center bg-white text-black py-3 px-4 rounded-lg shadow-md hover:bg-blue-200 transition-all duration-200 w-full">
                    <span>{photoUrl ? "Change Image" : "Upload Photo"}</span>
                  </div>
                </label>
                <input
                  id="photoFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Show uploaded image preview or default image */}
                {photoFile || photoUrl ? (
                  <img
                    src={photoFile ? URL.createObjectURL(photoFile) : photoUrl}
                    alt="Uploaded Preview"
                    className="w-20 h-10 object-cover rounded-md"
                  />
                ) : null}
              </div>

              {errors?.photoFile?.message && (
                <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                  {errors?.photoFile?.message}
                </span>
              )}
            </div>

            {/* Description */}
            <label className="form-control col-span-2 hidden md:flex w-full">
              <span className="label-text mb-2">Description</span>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={meal?.description}
                placeholder="description"
                className="textarea textarea-bordered"
              ></textarea>
            </label>

            {/* responsive for phone image  */}
            <div className="flex md:hidden flex-col gap-4 items-start w-full md:mt-7 mt-4">
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="photoFile" className="cursor-pointer w-full">
                  <div className="flex items-center justify-center bg-white text-black py-3 px-4 rounded-lg shadow-md hover:bg-blue-200 transition-all duration-200 w-full">
                    <span>{photoUrl ? "Change Image" : "Upload Photo"}</span>
                  </div>
                </label>
                <input
                  id="photoFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Show uploaded image preview or default image */}
                {photoFile || photoUrl ? (
                  <img
                    src={photoFile ? URL.createObjectURL(photoFile) : photoUrl}
                    alt="Uploaded Preview"
                    className="w-20 h-10 object-cover rounded-md"
                  />
                ) : null}
              </div>

              {errors?.photoFile?.message && (
                <span className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">
                  {errors?.photoFile?.message}
                </span>
              )}
            </div>
            {/*  responsive for phone description*/}
            <label className="form-control md:hidden flex">
              <span className="label-text mb-2">Description</span>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={meal?.description}
                placeholder="description"
                className="textarea textarea-bordered"
              ></textarea>
            </label>
            <button
              type="submit"
              className="justify-center w-60 px-6 bg-blue-500 text-white py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
            >
              Update Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMeal;
