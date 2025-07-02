import { useNavigate } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";
import { FaArrowLeft } from "react-icons/fa";

const Promocode = () => {
  const { darkMode } = useThemeStore();
  const navigate = useNavigate();
  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Alert */}
      <div
        className={`rounded-md px-4 py-3 mb-4 flex items-center justify-between border ${
          darkMode
            ? "bg-gray-800 border-yellow-700 text-yellow-300"
            : "bg-yellow-100 border-yellow-300 text-yellow-800"
        }`}
      >
        <p className="text-sm">
          🚨 If You Are Facing Any Problem Please Contact Us
        </p>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            darkMode
              ? "bg-yellow-800 text-white"
              : "bg-yellow-200 hover:bg-yellow-300 text-black"
          }`}
        >
          Contact Us
        </button>
      </div>
      <div
        className={`rounded-md shadow-sm mx-auto p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex gap-6 items-center">
          <span>
            <FaArrowLeft onClick={() => navigate("/recharge")} />
          </span>
          <div>
            <h2 className="font-semibold text-sm ">PROMO CODE</h2>
            <p className="text-[10px]">JOIN CHANNEL TO WIN PROMOCODE</p>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center mt-6 w-[100%]">
          <img src="" alt="" className="h-40 w-auto" />

          <p>ENTER PROMOCODE HERE</p>
          <form className="w-[100%]">
            <input
              type="number"
              placeholder="XXXX-XXXX-XXXX"
              className="border-1 border-gray-200 outline-none rounded-md w-full h-12 text-center focus:border-orange-400 focus:outline-none px-3 my-7"
            />
            <button className="border-1 border-orange-400 bg-none text-orange-400 hover:bg-orange-400 hover:text-white rounded h-12 w-full transition ">
              REEDEEM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Promocode;
