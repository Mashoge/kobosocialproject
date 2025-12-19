import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";

export const ClientRequestFormPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <button
          onClick={() => setLocation("/client-dashboard")}
          className="flex items-center gap-2 text-black hover:opacity-70"
          data-testid="button-home-request-form"
        >
          <Home size={24} />
          <span className="font-playfair">Home</span>
        </button>
        <h1 className="text-black text-2xl font-semibold font-playfair">Project Request Form</h1>
        <div className="w-24" />
      </header>

      <main className="flex-1 px-10 py-8">
        <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-8">
            <h2 className="text-black font-semibold text-2xl font-playfair">Project Request Form</h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Project Details */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">Project Details</h3>
              <div>
                <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                  Project Title:
                </label>
                <Input
                  placeholder="Video Advertisement e.g."
                  className="w-full border-gray-300"
                  data-testid="input-project-title"
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">Project Description</h3>
              <Textarea
                placeholder="Type purpose, category of the project & other needed information..."
                className="w-full resize-none border-gray-300 min-h-32"
                data-testid="input-project-description"
              />
            </div>

            {/* File Upload */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-2">
                Attach Supporting Files
              </h3>
              <p className="text-gray-600 text-sm mb-4">Related to the proposed project</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 text-sm">
                  Drag & Drop or <span className="text-blue-500 cursor-pointer">Choose file</span> to upload
                </p>
                <p className="text-gray-400 text-xs mt-2">xls, pdf, png, jpeg</p>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                    NAME
                  </label>
                  <Input
                    placeholder="Juan Dela Cruz e.g."
                    className="border-gray-300"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                    COUNTRY
                  </label>
                  <Input
                    placeholder="Philippines e.g."
                    className="border-gray-300"
                    data-testid="input-country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                    EMAIL ADDRESS
                  </label>
                  <Input
                    placeholder="juan1735@email.com e.g."
                    className="border-gray-300"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                    CURRENT ADDRESS
                  </label>
                  <Input
                    placeholder="City, Street, Province/State e.g."
                    className="border-gray-300"
                    data-testid="input-address"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                  CONTACT NUMBER
                </label>
                <Input
                  placeholder="09123456789 e.g."
                  className="border-gray-300"
                  data-testid="input-contact-number"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={() => setLocation("/client-dashboard")}
                variant="outline"
                className="px-12 border-gray-300"
                data-testid="button-cancel-request"
              >
                Cancel
              </Button>
              <Button
                className="px-12 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold"
                data-testid="button-submit-request"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
