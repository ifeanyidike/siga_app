"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { countries } from "countries-list";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const serviceSlug = searchParams.get("slug");

  // const { data: session } = useSession()

  const router = useRouter();
  const { data: session, update } = useSession();

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    phoneNo: "",
    zipCode: "",
  });
  const countriesList = Object.values(countries);

  const registerUser = async ({ name, email, password, phone }) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
      });
      console.log(data);
      if (data) {
        setSuccess(success?.response?.data.message);
      }
    } catch (error) {
      setError("An error occurred during registration."); // Generic error message
      return false; // Return error status
    }
  };

  const updateUserProfile = async (formData) => {
    setLoading(true);
    // console.log("userId", userId);
    // if (!userId) return alert("User ID not Found");

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      // formDataObj.append('role', formData.role)

      formDataObj.append("image", formData.avatar);

      const response = await axios.patch(`/api/users/${userId}`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const { name, email, phone, avatar } = response.data;
        await update({
          ...session,
          user: {
            ...session?.user,
            name,
            email,
            phone,
            avatar,
          },
        });
        setLoading(false);
        alert("User updated successfully!");
        router.push("/me/userprofilepage");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editService = async (props) => {
    if (!serviceSlug) {
      alert("Service Id not available");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", props.name);
      formData.append("slug", props.slug);
      formData.append("description", props.description);
      formData.append("category", props.category);
      formData.append("availability", props.availability);
      formData.append("quantity", props.quantity);
      formData.append("rating", props.rating);
      formData.append("numReviews", props.numReviews);

      Array.from(props.images).forEach((file, i) => {
        formData.append(`images-${i}`, file);
      });

      const response = await axios.patch(
        `/api/ourservices/${serviceSlug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Service updated Successfully!");
        router.push("/admin/sigaservices");
      } else {
        alert("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error.message);
      alert("An error occurred while updating the service");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const postService = async (formData) => {
    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("slug", formData.slug);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formDataObj.append("availability", formData.availability);
      formDataObj.append("quantity", formData.quantity);
      formDataObj.append("rating", formData.rating);
      formDataObj.append("numReviews", formData.numReviews);
      Array.from(formData.images).forEach((file, i) => {
        formDataObj.append(`images-${i}`, file, file.name);
      });

      console.log(formDataObj);
      const response = await axios.post("/api/ourservices/new", formDataObj);
      if (response.status === 200) {
        router.push("/");
      }
      console.log(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const addNewAddress = async ({
  //   street,
  //   city,
  //   state,
  //   phoneNo,
  //   zipCode,
  //   country,
  // }) => {
  //   try {
  //     const { data } = await axios.post('/api/address/new', {
  //       street,
  //       city,
  //       state,
  //       phoneNo,
  //       zipCode,
  //       country,
  //       user,
  //     })
  //     if (data?.ok) {
  //       setSuccess(success?.response?.data.message)
  //       router.push('/me')
  //     }
  //   } catch (error) {
  //     setError(error?.response?.data?.message)
  //   }
  // }
  const addNewAddress = async (e) => {
    setSubmitting(true);

    try {
      const response = await fetch("/api/address/new", {
        method: "POST",
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          state: address.state,
          phoneNo: address.phoneNo,
          zipCode: address.zipCode,
          country: address.country,
          user: session?.user._id,
        }),
      });
      if (response.ok) {
        router.push("/me");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        service,
        setService,
        address,
        editService,
        updateUserProfile,
        loading,
        setAddress,
        submitting,
        setSubmitting,
        postService,
        setUser,
        registerUser,
        clearError,
        success,
        addNewAddress,
        countriesList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
