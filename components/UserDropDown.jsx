import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import AuthContext from "@context/AuthContext";

export default function UserDropDown() {
  const { user } = useContext(AuthContext);
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };
  console.log("session", session);
  return (
    <div className="userdropdown_top_container">
      <Menu as="div" className="topcontainer_user_wrapper">
        <div className="userimage_name_wrapper">
          <Menu.Button className="admindropdown-btn">
            <Image
              style={{ borderRadius: "50%" }}
              src={
                session?.user.avatar
                  ? session?.user.avatar.url
                  : "/assets/images/defaultimage.png"
              }
              height={30}
              width={30}
              alt="user image"
            />
            {session?.user && session?.user.name}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="dropdown-element">
            <div className="dropdown-element-wrapper ">
              <Menu.Item>
                <Link href={"/me"} className="dropdown-element-btn">
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "/assets/images/defaultimage.png"
                    }
                    height={30}
                    width={30}
                    alt="user image"
                  />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={"/me/userprofilepage"}>
                  <button className="dropdown-element-btn">Profile</button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="dropdown-element-btn"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
