"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import AuthContext from "@context/AuthContext";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { toast } from "react-toastify";

const UpdateServiceForm = ({ type }) => {
  const searchParams = useSearchParams();
  const serviceslug = searchParams.get("slug");
  const formRef = useRef();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [numReviews, setNumReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([
    "/assets/images/defaultimage.png",
  ]);
  const { user, editService, loading, error, clearError } =
    useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    editService({
      name,
      category,
      slug,
      availability,
      quantity,
      description,
      numReviews,
      rating,
      images,
    });
  };

  const onChange = (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);
    const previewImages = [];
    console.log("Selected files", selectedFiles);

    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          previewImages.push(reader.result);

          // Check if all images have been read and update state
          if (previewImages.length === selectedFiles.length) {
            setImagePreview([...previewImages]);
          }
        }
      };

      reader.readAsDataURL(selectedFiles[i]);
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`/api/ourservices/${serviceslug}`);
        const service = await response.json();

        if (service) {
          setName(service.name);
          setSlug(service.slug);
          setCategory(service.category);
          setAvailability(service.availability);
          setQuantity(service.quantity);
          setRating(service.rating);
          setNumReviews(service.numReviews);
          setDescription(service.description);
          setIsLoading(false); // Set isLoading to false after fetching
          toast.success("Service details fetched successfully");
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("Error fetching service details.");
      }
    };
    fetchServiceDetails();
  }, [serviceslug]);

  return (
    <div className="createservice_form_container">
      <div className="form-image">
        <Image
          src="/assets/images/register_img.png"
          width={400}
          height={400}
          alt="register image"
          className="register-image"
        />
      </div>
      <form onSubmit={submitHandler} ref={formRef}>
        <h1>{type} Service Form</h1>
        <input
          type="text"
          name="name"
          placeholder="service name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="slug"
          placeholder="Enter Slug"
          value={slug}
          required
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          type="text"
          name="category"
          placeholder="Enter Your category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          name="availability"
          type="text"
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        <input
          type="number"
          name="quantity"
          placeholder="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          name="numReviews"
          placeholder="numReviews"
          value={numReviews}
          onChange={(e) => setNumReviews(e.target.value)}
        />
        <select
          name="select"
          id=""
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Rating...</option>
          <option value="1">1 </option>
          <option value="2">2 </option>
          <option value="3">3 </option>
          <option value="4">4 </option>
          <option value="5">5 </option>
        </select>

        <textarea
          name="textarea"
          id=""
          cols="60"
          rows="7"
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div>
          {imagePreview.map((preview, index) => (
            <Image
              key={index}
              src={preview}
              alt={`image-${index}`}
              width={100}
              height={100}
              priority
            />
          ))}
        </div>
        <div className="file_upload">
          <p>
            <input
              name="file"
              type="file"
              id="formFile"
              accept="image/*"
              multiple
              onChange={onChange}
            />
          </p>

          <div className="mb-4">
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="md:w-2/3 lg:w-80">
                <h5 style={{ color: "red" }}>
                  (*) Only accept image files less than 1mb in size and the
                  format include png/jpeg/jpg
                </h5>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateServiceForm;
