import { getAiAnalysis } from "@/api/aiApi";
import DashboardHeader from "@/components/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import {
  MessageCircle,
  CreditCard,
  BarChart2,
  Target,
  FileText,
  FlaskConical,
} from "lucide-react";

const InsightPage = () => {
  // query
  const { data, isError, error, refetch, isLoading } = useQuery({
    queryKey: ["aiAnalysis"],
    queryFn: getAiAnalysis,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      <DashboardHeader title="AI analysis" />

      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        {/* AI Analysis Section */}
        <h1 className="text-2xl font-normal">
          AI Analysis{" "}
          <span className="text-sm text-gray-500 flex item-center gap-2">
            (Experimental <FlaskConical className="size-4" />)
          </span>
        </h1>
        <p className="text-gray-500">
          Get AI-based analysis of your financial information.
        </p>

        {/* Error Handling */}
        {isError && (
          <div className="h-32 flex items-center justify-center">
            <p className="text-gray-800">{error.message}</p>
          </div>
        )}

        {/* Display Data */}
        {data && (
          <ul className="border-t border-black/20 divide-y divide-gray-200">
            {/* Greeting Section */}
            <li className="flex items-center py-4 text-gray-700">
              <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
              <span className="font-semibold">{data?.greeting}</span>
            </li>

            {/* Summary Section */}
            <li className="flex items-center py-4 text-gray-700">
              <FileText className="w-6 h-6 text-green-500 mr-3" />
              <p className="text-sm">{data?.summary}</p>
            </li>

            {/* Spending Analysis Section */}
            <li className="flex items-center py-4 text-gray-700">
              <CreditCard className="w-6 h-6 text-yellow-500 mr-3" />
              <p className="text-sm">{data?.spendingAnalysis}</p>
            </li>

            {/* Budget Performance Section */}
            <li className="flex items-center py-4 text-gray-700">
              <BarChart2 className="w-6 h-6 text-teal-500 mr-3" />
              <p className="text-sm">{data?.budgetPerformance}</p>
            </li>

            {/* Goal Progress Section */}
            <li className="flex items-center py-4 text-gray-700">
              <Target className="w-6 h-6 text-orange-500 mr-3" />
              <p className="text-sm">{data?.goalProgress}</p>
            </li>

            {/* Next Steps Section */}
            <li className="flex items-center py-4 text-gray-700">
              <MessageCircle className="w-6 h-6 text-purple-500 mr-3" />
              <p className="text-sm font-semibold">{data?.nextSteps}</p>
            </li>
          </ul>
        )}

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          {isLoading ? "Refreshing..." : "Refresh Analysis"}
        </button>
      </section>
    </>
  );
};

export default InsightPage;
