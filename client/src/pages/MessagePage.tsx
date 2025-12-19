import { Send, Search, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const MessagePage = (): JSX.Element => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Thanks for the update!",
      timestamp: "10:30 AM",
      unread: 2,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Marketing Team",
      lastMessage: "Campaign is ready for review",
      timestamp: "09:15 AM",
      unread: 0,
      avatar: "MT",
    },
    {
      id: 3,
      name: "David Chen",
      lastMessage: "Can we schedule a meeting?",
      timestamp: "Yesterday",
      unread: 1,
      avatar: "DC",
    },
    {
      id: 4,
      name: "Design Team",
      lastMessage: "New mockups are available",
      timestamp: "Yesterday",
      unread: 0,
      avatar: "DT",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I wanted to check on the campaign status.",
      timestamp: "10:15 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Sarah! The campaign is progressing well. We've reached 15,000 impressions so far.",
      timestamp: "10:20 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "Thanks for the update!",
      timestamp: "10:30 AM",
      isOwn: false,
    },
  ];

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center px-10">
        <h1 className="text-black text-2xl font-semibold font-playfair">Messages</h1>
      </header>

      <main className="flex-1 flex gap-6 p-8">
        {/* Conversations List */}
        <Card className="w-80 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-6">
            <h2 className="text-black font-semibold text-lg font-playfair">Conversations</h2>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search conversations..."
                className="pl-10 py-2 text-sm border-gray-300"
                data-testid="input-search-conversations"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                data-testid={`item-conversation-${conv.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#83ffb3] flex items-center justify-center text-xs font-semibold text-gray-800">
                      {conv.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{conv.name}</p>
                      <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 text-right">{conv.timestamp}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-6">
            <h2 className="text-black font-semibold text-lg font-playfair">Sarah Johnson</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.id}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.isOwn
                      ? "bg-[#83ffb3] text-gray-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex gap-3">
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message..."
                  className="w-full resize-none border-gray-300 text-sm"
                  rows={3}
                  data-testid="input-message"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  data-testid="button-attach"
                  className="h-10 w-10"
                >
                  <Paperclip size={20} className="text-gray-600" />
                </Button>
                <Button
                  data-testid="button-send-message"
                  className="bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold rounded-lg px-6"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
