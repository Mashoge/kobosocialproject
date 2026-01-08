import { Home, Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

import { createProjectRequest } from "@/services/projectRequestService";

// const createProjectRequest = ...

export const ClientRequestFormPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    country: "",
    email: "",
    address: "",
    contactNumber: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.title || !formData.description || !formData.email) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in the project title, description, and your email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the service to store in Firebase
      await createProjectRequest(
        {
          clientName: formData.name,
          email: formData.email,
          projectTitle: formData.title,
          projectDescription: formData.description,
          country: formData.country,
          address: formData.address,
          contactNumber: formData.contactNumber,
        },
        files,
      );

      toast({
        title: "Request Submitted!",
        description:
          "Your project request has been sent to our team for review.",
        className: "bg-green-50 text-green-800 border-green-200",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        name: "",
        country: "",
        email: "",
        address: "",
        contactNumber: "",
      });
      setFiles([]);

      // Redirect after success
      setTimeout(() => setLocation("/client-dashboard"), 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-black text-2xl font-semibold font-playfair">
          Project Request Form
        </h1>
        <div className="w-24" />
      </header>

      <main className="flex-1 px-10 py-8">
        <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-8">
            <h2 className="text-black font-semibold text-2xl font-playfair">
              Project Request Form
            </h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Project Details */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">
                Project Details
              </h3>
              <div>
                <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                  Project Title:
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Video Advertisement e.g."
                  className="w-full border-gray-300"
                  data-testid="input-project-title"
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">
                Project Description
              </h3>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
              <p className="text-gray-600 text-sm mb-4">
                Related to the proposed project
              </p>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 cursor-pointer transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                  accept=".xls,.zip,.pdf,.png,.jpeg"
                />
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-sm">
                  Drag & Drop or{" "}
                  <span className="text-blue-500 cursor-pointer">
                    Choose file
                  </span>{" "}
                  to upload
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  xls, zip, pdf, png, jpeg
                </p>
              </div>

              {/* Selected Files List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-md border border-blue-100"
                    >
                      <div className="flex items-center gap-2 text-blue-700">
                        <FileText size={16} />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-black font-playfair font-semibold text-lg mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                    NAME
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
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
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
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
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
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
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-12 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold disabled:opacity-50"
                data-testid="button-submit-request"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
