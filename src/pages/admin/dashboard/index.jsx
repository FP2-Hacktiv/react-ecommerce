import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReportSales } from "../../../store/global/globalAction";
import Toast from "../../../components/toast";

const Page = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const { isLoading } = useSelector((state) => state.global);

  const handleGetReportSales = async () => {
    try {
      const res = await dispatch(fetchReportSales());

      if (res.meta.requestStatus !== "fulfilled") {
        Toast({
          type: "error",
          message: "Failed Fetch",
        });
      } else {
        setContent(res.payload.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetReportSales();
  }, []);

  const totalProfit = content.reduce(
    (total, item) => total + item.totalProfit,
    0
  );

  return (
    <>
      {isLoading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <div className="w-[90%] mx-auto">
          <h1 className="text-xl font-bold mb-4 text-center">Sales Recap</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-200 font-medium">
                <td className="text-left py-2 px-4">Product Name</td>
                <td className="text-left py-2 px-4">Total Sold</td>
                <td className="text-left py-2 px-4">Product Price</td>
                <td className="text-left py-2 px-4">Profit</td>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{item.productName}</td>
                  <td className="py-2 px-4">{item.totalSold}</td>
                  <td className="py-2 px-4">{item.productPrice}</td>
                  <td className="py-2 px-4">{item.totalProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-3">
            {/* <hr className="" /> */}
            <p className="font-semibold">Total Profit: {totalProfit}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
