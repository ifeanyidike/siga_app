"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";
import UserAddresses from "@components/user/UserAddresses";
import UserInfo from "@components/user/UserInfo";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const UserProfile = ({
  name,
  singleUserAddress,
  handleEdit,
  handleDelete,
  singleUserInfo,
  description,
  handleUserUpdate,
  handleUserDelete,
}) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/me");
    },
  });
  const { updateUser } = useContext(AuthContext);
  // console.log(addressData)

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <>
      <section style={{ width: "100%;" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "left" }}>
          <span style={{ color: "linear-gradient(to right, #00f, #0ff)" }}>
            {name} Profile
          </span>{" "}
        </h1>

        <UserInfo
          singleUserInfo={singleUserInfo}
          handleUserUpdate={() =>
            handleUserUpdate && handleUserUpdate(singleUserInfo)
          }
          handleUserDelete={() =>
            handleUserDelete && handleUserDelete(singleUserInfo)
          }
          description={description}
        />

        {singleUserAddress.map((useraddress) => (
          <UserAddresses
            key={useraddress._id}
            useraddress={useraddress}
            handleEdit={() => handleEdit && handleEdit(useraddress)}
            handleDelete={() => handleDelete && handleDelete(useraddress)}
          />
        ))}

        <Link href={"/address/new"}>
          <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
            <i className="mr-1 fa fa-plus"></i> Add new address
          </button>
        </Link>
        <hr className="my-4" />
      </section>
    </>
  );
};

export default UserProfile;
