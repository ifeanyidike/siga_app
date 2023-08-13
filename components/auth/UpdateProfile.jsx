"use client";

import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import AuthContext from "@context/AuthContext";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { toast } from "react-toastify";

const UpdateProfile = ({
  type,
  // onImageChange,
  // user,
  // setUser,
  // updateUser,
  // handleSubmit,
  // submitting,
  // setSubmitting,
  // avartaPreview,
  // avarta,
  // handleImageSubmit,
}) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const formRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [avarta, setAvarta] = useState("");
  const [avartaPreview, setAvartaPreview] = useState(
    "/assets/images/defaultimage.png"
  );
  const { user, updateUserProfile, loading, error, clearError } =
    useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.set("name", name);
    // formData.set("email", email);
    // formData.set("phone", phone);
    // formData.set("role", role);
    // formData.set("image", avarta);

    updateUserProfile({
      name,
      email,
      phone,
      role,
      avarta,
    });
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvartaPreview(reader.result);
      }
    };
    setAvarta(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, user]);

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">{type} Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Phone No </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Type your Phone No"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1"> User Role </label>
            <select
              name="role"
              id="role"
              placeholder="select"
              required
              type="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Manager</option>
            </select>
          </div>
          <div className="profile_image">
            <Image
              src={avartaPreview}
              alt="image"
              width={100}
              height={100}
              priority
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="file_upload">
            <p>
              <input
                type="file"
                id="formFile"
                accept="image/*"
                onChange={onChange}
              />
            </p>
            {/* {avarta && !avartaPreview && ( */}
            <p>
              <button type="submit">Upload Files</button>
            </p>
            {/* )} */}

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
            {/* {avartaPreview && (
              <code>
                <pre>{JSON.stringify(avartaPreview, null, 2)}</pre>
              </code>
            )} */}
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading ? true : false}
          >
            {loading ? "Updading..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
