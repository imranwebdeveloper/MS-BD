"use client";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import logo from "../../../app/logo.png";
import Link from "next/link";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const Header = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <header className="root header ">
      <div className="layout gap-2 flex justify-between items-center container ">
        <div>
          <Link href="/">
            <Image
              src={logo}
              alt="MobileSellerBD.com"
              width={60}
              height={60}
              priority
              className="md:w-20 md:h-10 w-16 h-8"
            />
          </Link>
        </div>

        <div className="df_jc_ic gap-2 ">
          <button
            type="button"
            onClick={openModal}
            className="text-lg p-2 md:hidden"
            aria-label="search"
          >
            <BsSearch />
          </button>
          <Search />
          <button
            onClick={() => signIn()}
            className="btn-login"
            aria-label="login"
          >
            Login
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed  bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-0 w-full overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                  <div className="fixed w-full flex bg-primary-bg-light z-10 top-0 left-0 items-center p-2 ">
                    <input
                      type="text"
                      className="focus:outline-none w-full py-2 bg-slate-100 rounded-3xl px-2 "
                      placeholder="Find your phone here..."
                    />

                    <span className="px-3 text-lg ">
                      <BsSearch />
                    </span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;
