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
  RefreshCw,
} from "lucide-react";

const InsightPage = () => {
  // query
  const { data, isError, error, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["aiAnalysis"],
    queryFn: getAiAnalysis,
    staleTime: 0, 
    gcTime: 0, 
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
  });

  const handleRefresh = async () => {
    try {
      console.log("Refreshing AI analysis..."); // Debug log
      await refetch();
      console.log("Refresh completed"); // Debug log
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  };

  return (
    <>
      <DashboardHeader title="AI analysis" />

      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-6">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold">AI Analysis</h1>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
              <FlaskConical className="w-4 h-4" />
              <span className="text-xs font-medium">Experimental</span>
            </div>
          </div>
          <p className="text-purple-100 text-sm md:text-base">
            Get personalized AI-powered insights about your financial health and
            spending patterns.
          </p>
        </div>

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="bg-white rounded-2xl border border-purple-100 p-8 shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-purple-600 font-medium">
                {isLoading
                  ? "Loading your financial data..."
                  : "Refreshing analysis..."}
              </p>
            </div>
          </div>
        )}

        {/* Error Handling */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center justify-center text-center">
              <p className="text-red-700 font-medium">{error.message}</p>
            </div>
          </div>
        )}

        {/* Display Data */}
        {data && !isLoading && !isFetching && (
          <div className="space-y-4">
            {/* Greeting Card */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">
                    Welcome Back!
                  </h3>
                  <p className="text-purple-700">{data?.greeting}</p>
                </div>
              </div>
            </div>

            {/* Analysis Cards Grid */}
            <div className="grid gap-4">
              {/* Summary */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Financial Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data?.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spending Analysis */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Spending Insights
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data?.spendingAnalysis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Budget Performance */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <BarChart2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Budget Performance
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data?.budgetPerformance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Goal Progress
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data?.goalProgress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      Recommended Next Steps
                    </h3>
                    <p className="text-purple-100 leading-relaxed">
                      {data?.nextSteps}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleRefresh}
            disabled={isLoading || isFetching}
            className="
              flex items-center gap-2 px-6 py-3 
              bg-gradient-to-r from-purple-600 to-violet-600 
              text-white font-medium rounded-full 
              hover:from-purple-700 hover:to-violet-700 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 cursor-pointer
            "
          >
            <RefreshCw
              className={`w-4 h-4 ${
                isLoading || isFetching ? "animate-spin" : ""
              }`}
            />
            {isLoading || isFetching ? "Refreshing..." : "Refresh Analysis"}
          </button>
        </div>
      </section>
    </>
  );
};

export default InsightPage;
