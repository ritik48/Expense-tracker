import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { logoOut } from "@/utils/authSlice";
import toast from "react-hot-toast";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.name);

  const isAuthenticated = !!user;
  const dispatch = useDispatch();

  const navigation = isAuthenticated
    ? [
        { name: "Home", href: "/" },
        { name: "Tracker", href: "/tracker" },
        { name: "Dashboard", href: "/dashboard" },
      ]
    : [{ name: "Home", href: "/" }];

  const logout = () => {
    try {
      dispatch(logoOut());
    } catch (error: any) {
      toast.error(error.message || "Error logging out");
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav
        aria-label="Global"
        className="flex items-center justify-between py-2 px-2 sm:px-4 md:px-0  max-w-7xl mx-auto"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <h1 className="text-sm border px-2 py-1 rounded-md  font-semibold">
              Track-it 🚀
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-10">
          {isAuthenticated ? (
            <>
              <div>Welcome, {user} 👋</div>
              <Button className="cursor-pointer" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-900 border border-gray-400 px-3 py-1 rounded-md"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold text-gray-900 border border-gray-400 px-3 py-1 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={handleLinkClick}>
              <h1 className="text-xl border px-2 py-2 rounded-md bg-black text-gray-200 font-semibold">
                Reach up 🚀
              </h1>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      onClick={handleLinkClick}
                      className="block w-full rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 text-center border"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleLinkClick}
                      className="block w-full rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 text-center border"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
