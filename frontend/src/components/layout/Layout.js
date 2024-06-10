import { Outlet } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/className";
import { useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-row  drop-shadow-lg ">
      <div className="flex flex-col pt-6 p-4 bg-gray-800 ">
        <div>Logo</div>
        <div className="flex flex-col gap-4">
          <Link
            className={classNames(
              "p-4 hover:bg-gray-600 rounded-lg m-0 active:bg-gray-500"
            )}
            to={"/"}
          >
            <HomeIcon
              className={classNames(
                location.pathname === "/" ? "text-gray-200" : "text-gray-500",
                "size-6  group-active:bg-gray-300 "
              )}
            />
          </Link>
          <Link
            className="p-4 hover:bg-gray-600 rounded-lg m-0 active:bg-gray-500"
            to="/view-music"
          >
            <MagnifyingGlassCircleIcon
              className={classNames(
                location.pathname === "/view-music"
                  ? "text-gray-200"
                  : "text-gray-500",
                "size-6  group-active:bg-gray-400"
              )}
            />
          </Link>
          <Link
            className="p-4 hover:bg-gray-600 rounded-lg m-0 active:bg-gray-500"
            to="/create-music"
          >
            <MusicalNoteIcon
              className={classNames(
                location.pathname === "/create-music"
                  ? "text-gray-200"
                  : "text-gray-500",
                "size-6  group-active:bg-gray-400"
              )}
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-[100vh] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
