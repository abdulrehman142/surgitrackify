import React, { useState } from "react";
import { colors } from "../styles/colors";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export const AIInsightsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hello! I'm your RFID Surgical Tracking AI Assistant. I can help you with queries like:",
      timestamp: "14:30",
    },
    {
      id: "2",
      role: "ai",
      content:
        '• "Which OR is delayed?"\n• "Show me patient bottlenecks today"\n• "What\'s the average wait time?"\n• "Predict when room 3 will be available?"\n• "Which surgeries are running behind schedule?"',
      timestamp: "14:30",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestionQueries = [
    "Which OR is delayed?",
    "Show bottlenecks today",
    "Average turnover time?",
    "How long was Michael Brown in pre-op?",
    "Staff efficiency today",
    "Daily summary",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: generateAIResponse(inputValue),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (query: string) => {
    setInputValue(query);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("delay"))
      return "Operating Room 3 and 5 are experiencing delays:\n\n• OR-3: 45 minutes behind schedule (waiting for anesthetist)\n• OR-5: 30 minutes delay (equipment sterilization)\n\nRecommendation: Prioritize staffing in Pre-Op rooms to manage the queue.";

    if (lowerQuery.includes("bottleneck"))
      return "Current bottlenecks identified:\n\n1. Pre-Op Stage: 3 patients waiting (avg wait: 45 mins)\n2. Recovery: 2 patients awaiting discharge (delayed case reviews)\n3. Staff availability: Nursing shortage in Post-Op\n\nAction: Expedite discharge reviews and consider temporary staffing.";

    if (lowerQuery.includes("wait"))
      return "Average wait time analysis:\n\n• Check-in to Pre-Op: 12 minutes (target: 10 mins)\n• Pre-Op to OR: 23 minutes (target: 20 mins) ⚠️\n• OR to Recovery: 5 minutes (on track)\n• Recovery to Discharge: 45 minutes (ahead of 60-min target)\n\nHighest variance: Pre-Op to OR stage.";

    if (lowerQuery.includes("predict") || lowerQuery.includes("flow"))
      return "Patient flow prediction for next 2 hours:\n\n• Room 1: Will be free at 15:30 (current case ends ~1h 15m)\n• Room 2: Available at 15:45 (ongoing 45-min procedure)\n• Room 3: Available now (cleaning in progress, 10 mins remaining)\n• Room 4: Will be occupied at 15:00 (next scheduled case)\n\nOptimal scheduling window: 15:30-15:45 for additional cases.";

    if (lowerQuery.includes("turnover"))
      return "Average room turnover time today: 18 minutes\n\n• Fastest: OR 8 — 10m\n• Slowest: OR 5 — 25m\n• Target: 15m\n\nOR 3 and OR 8 are currently in cleaning phase. Consider allocating additional housekeeping to OR 5.";

    if (lowerQuery.includes("patient") && (lowerQuery.includes("pre-op") || lowerQuery.includes("pre op") || lowerQuery.includes("how long")))
      return "Patient dwell times in Pre-Op today:\n\n• Michael Brown (P003): 1h 45m — DELAYED ⚠️\n• Lisa Anderson (P006): 2h 10m — CRITICAL ⚠️\n• John Smith (P001): 45m — on track\n\nAverage Pre-Op time: 58 minutes (target: 30m)";

    if (lowerQuery.includes("staff") || lowerQuery.includes("surgeon") || lowerQuery.includes("efficiency"))
      return "Staff efficiency summary:\n\n• Dr. Chen: 95% efficiency, 5 cases, 15m avg turnover\n• Dr. Williams: 92% efficiency, 4 cases\n• Dr. Patel: 78% efficiency — 3 delays today\n\nRecommendation: Review scheduling for Dr. Patel's afternoon block.";

    if (lowerQuery.includes("summary") || lowerQuery.includes("today"))
      return "Daily Surgical Center Summary:\n\n✓ 24 patients admitted\n✓ 8 of 12 cases completed\n✓ 75% OR utilization\n✓ 2 delayed cases requiring attention\n✓ 18m average turnover time\n✓ 23m average wait (Pre-Op to OR)\n\nTop bottleneck: Pre-Op stage (3 patients waiting)";

    return "I'm processing your query. Based on current data, here are the key insights:\n\n✓ 24 patients admitted today\n✓ 4 patients currently in OR\n✓ 75% overall utilization rate\n✓ 18m average turnover time\n\nTry asking about delays, bottlenecks, turnover, or a specific patient.";
  };

  return (
    <div style={{ backgroundColor: colors.softBg }} className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.deepGreen }}>
          AI Insights & Analytics
        </h1>
        <p className="text-gray-600">
          Smart queries and AI-generated recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg shadow-sm border border-gray-100 flex flex-col h-96 md:h-[600px]"
            style={{ backgroundColor: "white" }}
          >
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                    style={{
                      backgroundColor:
                        message.role === "user" ? colors.deepGreen : "#f3f3f3",
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user"
                          ? "text-white text-opacity-70"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.deepGreen }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor: colors.deepGreen,
                          animationDelay: "0.2s",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor: colors.deepGreen,
                          animationDelay: "0.4s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Ask me anything about your surgical center..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  style={{
                    backgroundColor: colors.deepGreen,
                    opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                  }}
                  className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Queries */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestionQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(query)}
                  style={{
                    backgroundColor: colors.softBg,
                    color: colors.deepGreen,
                    border: `1px solid ${colors.deepGreen}`,
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Summary Sidebar */}
        <div>
          <div
            className="p-6 rounded-lg shadow-sm border border-gray-100"
            style={{ backgroundColor: "white" }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.deepGreen }}
            >
              Key Insights
            </h3>
            <div className="space-y-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: colors.softBg }}
              >
                      <div className="flex gap-2">
                 <div className="h-4 w-4">
                     <img src="/surgitrackifyimages/warning.png" />
                 </div>

                <p className="text-sm font-medium text-gray-900 mb-1">
                  Critical Alert
                </p>
                </div>
                <p className="text-xs text-gray-700">
                  OR-3 delayed 45 mins. Anesthetist shortage in Pre-Op.
                </p>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: colors.softBg }}
              >
                        <div className="flex gap-2">
                 <div className="h-5 w-5">
                     <img src="/surgitrackifyimages/bottleneck.png" />
                 </div>

                <p className="text-sm font-medium text-gray-900 mb-1">
                  Bottleneck Detected
                </p>
                </div>
                <p className="text-xs text-gray-700">
                  Pre-Op stage has 3 patients (avg wait: 45 mins vs 20 min target)
                </p>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: colors.softBg }}
              >
                         <div className="flex gap-2">
                 <div className="h-5 w-5">
                     <img src="/surgitrackifyimages/optimization.png" />
                 </div>

                <p className="text-sm font-medium text-gray-900 mb-1">
           Optimization Opportunity
                </p>
                </div>
                <p className="text-xs text-gray-700">
                  Rooms 1 & 2 will be free 15:30-15:45. Schedule non-urgent
                  cases.
                </p>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: colors.softBg }}
              >
                          <div className="flex gap-2">
                 <div className="h-5 w-5">
                     <img src="/surgitrackifyimages/dashboard.png" />
                 </div>

                <p className="text-sm font-medium text-gray-900 mb-1">
           Performance Metric
                </p>
                </div>
                <p className="text-xs text-gray-700">
                  OR utilization at 75%. Target: 80%. 5% improvement needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
