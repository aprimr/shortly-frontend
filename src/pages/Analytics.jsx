import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QrCode from "react-qr-code";

import { FiTrash2 } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdQrScanner } from "react-icons/io";
import { LuMousePointerClick } from "react-icons/lu";
import { PiTrendUpBold } from "react-icons/pi";
import { MdNumbers } from "react-icons/md";

export default function AnalyticsPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qrData, setQrData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const navigate = useNavigate();
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalShortened, setTotalShortened] = useState(0);
  const [mostClicked, setMostClicked] = useState(0);

  // for calculating most clicked if updated
  let tempUrls = [];

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/urls/get-urls?username=${username}`
        );

        if (res.status === 200) {
          const fetchedUrls = res.data.urls;
          setUrls(fetchedUrls);

          // Calculate total clicks and total shortened URLs
          const totalClicksCalculated = fetchedUrls.reduce(
            (acc, url) => acc + (parseInt(url.clicks) || 0), // Ensure clicks are integers
            0
          );
          setTotalClicks(totalClicksCalculated);

          // Calculate total shortened URLs
          setTotalShortened(fetchedUrls.length);

          // Top
          let initialClicks = 0;

          fetchedUrls.forEach((url) => {
            if (parseInt(url.clicks) > initialClicks) {
              initialClicks = url.clicks;
            }
          });
          setMostClicked(initialClicks);
        }
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUrls();
    } else {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    let newMostClicked = 0;
    urls.forEach((url) => {
      const clicks = parseInt(url.clicks);
      if (clicks > newMostClicked) {
        newMostClicked = clicks;
      }
    });
    setMostClicked(newMostClicked);
  }, [tempUrls]);

  const handleQrPopup = (index, url) => {
    setShowQrPopup(!showQrPopup);
    setQrData({ sn: index, url });
  };

  const handleDelete = async (obj) => {
    tempUrls = urls.filter((url) => url._id !== obj._id);
    setUrls(tempUrls);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/delete-url`,
        { data: { id: obj._id } }
      );
      if (res.status === 200) {
        setTotalShortened(totalShortened - 1);
        setTotalClicks(totalClicks - obj.clicks);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10 sm:px-0 md:px-4">
      {showQrPopup && <QrCodePopup closePopup={handleQrPopup} data={qrData} />}
      <h1 className="text-3xl font-semibold mb-6">URL Analytics</h1>

      {/* Analytics Summary Cards */}
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">Total Clicks</h2>
          <p className="text-3xl font-bold text-emerald-400">{totalClicks}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">
            Top Performer’s Clicks
          </h2>
          <p className="text-3xl font-semibold text-emerald-400">
            {mostClicked}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">
            Total URLs Shortened
          </h2>
          <p className="text-3xl font-bold text-emerald-400">
            {totalShortened}
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden gap-4 mb-6 w-full justify-around px-4">
        {/* Total Clicks */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-1/3 h-36">
          <LuMousePointerClick className="text-4xl text-gray-100 mb-2" />
          <p className="text-3xl font-bold text-emerald-400">{totalClicks}</p>
          <span className="text-[12px] font-extralight">Clicks</span>
        </div>

        {/* Top Performer's Clicks */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-1/3 h-36">
          <PiTrendUpBold className="text-4xl text-gray-100 mb-2" />
          <p className="text-3xl font-bold text-emerald-400">{mostClicked}</p>
          <span className="text-[12px] font-extralight">Top Clicks</span>
        </div>

        {/* Total URLs Shortened */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-1/3 h-36">
          <MdNumbers className="text-4xl text-gray-100 mb-2" />
          <p className="text-3xl font-bold text-emerald-400">
            {totalShortened}
          </p>
          <span className="text-[12px] font-extralight">Total Urls</span>
        </div>
      </div>

      {/* DESKTOP view */}
      {/* URLS Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl hidden md:block">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">All URLs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-200">SN</th>
                <th className="px-4 py-2 text-left text-gray-200">
                  Original URL
                </th>
                <th className="px-4 py-2 text-left text-gray-200">Short URL</th>
                <th className="px-4 py-2 text-left text-gray-200">Clicks</th>
                <th className="px-4 py-2 text-left text-gray-200">Expires</th>
                <th className="px-4 py-2 text-left text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : urls.length > 0 ? (
                urls.map((url, index) => (
                  <tr key={url._id} className="hover:bg-gray-700">
                    <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-400 truncate max-w-xs">
                      {url.longUrl}
                    </td>
                    <td className="px-4 py-2 text-emerald-400">
                      <a
                        target="_blank"
                        href={`${import.meta.env.VITE_FRONTEND_URL}/${
                          url.shortId
                        }`}
                      >
                        {import.meta.env.VITE_FRONTEND_URL}/{url.shortId}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-gray-400">{url.clicks}</td>
                    <td className="px-4 py-2 text-gray-400">
                      {url.expiryDate
                        ? new Date(url.expiryDate).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-2 flex flex-row gap-2">
                      <button
                        onClick={() => handleDelete(url)}
                        className="text-red-500 hover:text-red-600 py-2 rounded-full flex items-center"
                      >
                        <FiTrash2 className="text-xl mr-2" />
                      </button>
                      <button
                        onClick={() => handleQrPopup(index, url)}
                        className="text-gray-200 hover:text-gray-100 py-2 rounded-full flex items-center"
                      >
                        <IoMdQrScanner className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document view */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl md:hidden">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">All URLs</h2>
        {loading ? (
          <SkeletonDocument />
        ) : urls.length > 0 ? (
          urls.map((url, index) => (
            <div
              key={url._id}
              className="bg-gray-900 p-4 rounded-lg mb-4 shadow-md"
            >
              {/* Index & Delete Button */}
              <div className="flex justify-between items-center text-gray-200 font-semibold mb-2">
                <p className="bg-gray-700 px-2 py-[1px] rounded-md flex items-center">
                  {index + 1}
                </p>
                <div className="flex flex-row">
                  <button
                    onClick={() => handleDelete(url)}
                    className="text-red-500 hover:text-red-600 p-1 rounded-md flex items-center"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleQrPopup(index, url)}
                    className="text-gray-200 hover:text-gray-100 p-1 rounded-md flex items-center"
                  >
                    <IoMdQrScanner className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Original URL */}
              <p className="text-gray-400 text-sm">Original URL:</p>
              <p className="text-emerald-400 break-words">{url.longUrl}</p>

              {/* Short URL */}
              <p className="text-gray-400 text-sm mt-2">Short URL:</p>
              <a
                target="_blank"
                href={`${import.meta.env.VITE_FRONTEND_URL}/${url.shortId}`}
                className="text-emerald-400 break-words"
              >
                {import.meta.env.VITE_FRONTEND_URL}/{url.shortId}
              </a>

              {/* Clicks & Expiry Date in One Row */}
              <div className="flex flex-col mt-2 text-gray-400 text-sm">
                <p>
                  Clicks: <span className="text-white">{url.clicks}</span>
                </p>
                <p>
                  Expires:{" "}
                  <span className="text-white">
                    {url.expiryDate
                      ? new Date(url.expiryDate).toLocaleDateString()
                      : "Never"}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-400">No Data Available</p>
        )}
      </div>
    </div>
  );
}

const QrCodePopup = ({ closePopup, data }) => {
  const shortUrl = `${import.meta.env.VITE_FRONTEND_URL}/${data.url.shortId}`;
  const qrPayload = `Original Url: ${
    data.url.longUrl
  }, Short Url: ${shortUrl}, Created at: ${
    data.url.createdAt?.split("T")[0]
  }, Expires on: ${data.url.expiryDate?.split("T")[0] || "Never"}`;

  return (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 sm:p-6 overflow-auto z-50">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl bg-gray-800 p-4 sm:p-6 md:p-10 rounded-lg shadow-lg flex flex-col max-h-[95vh] overflow-y-auto">
        {/* Number */}
        <span className="absolute top-0 left-0 border-2 border-emerald-500 text-white px-3 py-1 rounded-br-lg rounded-tl-lg text-sm sm:text-base">
          {data.sn + 1}
        </span>

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-0 right-0 bg-red-500 hover:bg-rose-600 text-white px-3 py-1 rounded-bl-sm rounded-tr-lg text-sm sm:text-base"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-10">
          {/* Left Section */}
          <div className="flex-1 w-full text-white">
            <h2 className="text-xl sm:text-2xl text-center font-semibold mb-4">
              URL Details
            </h2>

            <p className="text-sm sm:text-base font-medium">Original URL:</p>
            <div className="max-w-full overflow-x-auto rounded p-1 mb-2">
              <p className="text-sm sm:text-base text-emerald-500 break-all">
                {data.url.longUrl}
              </p>
            </div>

            <p className="text-sm sm:text-base font-medium">Short URL:</p>
            <div className="max-w-full overflow-x-auto mb-2">
              <a
                target="_blank"
                href={`${shortUrl}`}
                className="text-sm sm:text-base text-emerald-500 break-all"
              >
                {shortUrl}
              </a>
            </div>

            <div className="flex flex-wrap justify-between mt-4 gap-4">
              <div>
                <p className="text-sm font-medium">Clicks:</p>
                <p className="text-sm text-emerald-500">{data.url.clicks}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Created at:</p>
                <p className="text-sm text-emerald-500">
                  {data.url.createdAt?.split("T")[0] || "Never"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Expires on:</p>
                <p className="text-sm text-emerald-500">
                  {data.url.expiryDate?.split("T")[0] || "Never"}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center items-center md:items-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white p-2 rounded shadow-md flex items-center justify-center">
              <QrCode
                value={JSON.stringify(qrPayload)}
                size={160}
                level="Q"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-2">
      <div className="w-6 h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-4 py-2">
      <div className="w-32 h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-4 py-2">
      <div className="w-20 h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-4 py-2">
      <div className="w-10 h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-4 py-2">
      <div className="w-32 h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-4 py-2">
      <div className="w-20 h-8 bg-gray-700 rounded"></div>
    </td>
  </tr>
);

const SkeletonDocument = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-full md:hidden">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-900 w-full p-4 rounded-lg mb-4 shadow-md animate-pulse"
        >
          {/* Title & Delete Button */}
          <div className="flex justify-between items-center mb-3">
            <div className="h-6 w-32 bg-gray-700 rounded"></div>
            <div className="h-6 w-6 bg-gray-700 rounded"></div>
          </div>

          {/* Document Content Placeholder */}
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/5 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>

          {/* Metadata (Clicks, Expiry Date, etc.) */}
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-2/5"></div>
            <div className="h-4 bg-gray-700 rounded w-3/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
