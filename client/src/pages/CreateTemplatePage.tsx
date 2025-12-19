import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  helpText?: string;
}

export const CreateTemplatePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [step, setStep] = useState<"select" | "preview" | "name">("select");

  const templates: Template[] = [
    {
      id: "docs",
      name: "Docs",
      description: "Create your template using docs",
      icon: "W",
      color: "bg-blue-100",
      helpText: "Best for reports, proposal, documentation.",
    },
    {
      id: "ppt",
      name: "PPT",
      description: "Create your template using PPT slides",
      icon: "P",
      color: "bg-red-100",
      helpText: "Best for presentation, pitches, visual content.",
    },
    {
      id: "excel",
      name: "Excel",
      description: "Create your template using Excel",
      icon: "E",
      color: "bg-green-100",
      helpText: "Best for data tracking, logs, tables.",
    },
    {
      id: "template-a",
      name: "Template A",
      description: "Create your template using docs",
      icon: "A",
      color: "bg-yellow-100",
      helpText: "Best for reports, proposal, documentation.",
    },
    {
      id: "template-b",
      name: "Template B",
      description: "Create your template using PPT slides",
      icon: "B",
      color: "bg-red-100",
      helpText: "Best for presentation, pitches, visual content.",
    },
    {
      id: "template-c",
      name: "Template C",
      description: "Create your template using Excel",
      icon: "C",
      color: "bg-amber-100",
      helpText: "Best for data tracking, logs, tables.",
    },
    {
      id: "template-d",
      name: "Template D",
      description: "Create your template using docs",
      icon: "D",
      color: "bg-pink-100",
      helpText: "Best for reports, proposal, documentation.",
    },
    {
      id: "template-e",
      name: "Template E",
      description: "Create your template using PPT slides",
      icon: "E",
      color: "bg-emerald-100",
      helpText: "Best for presentation, pitches, visual content.",
    },
    {
      id: "template-f",
      name: "Template F",
      description: "Create your template using Excel",
      icon: "F",
      color: "bg-purple-100",
      helpText: "Best for data tracking, logs, tables.",
    },
  ];

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setStep("preview");
  };

  const handlePreviewConfirm = () => {
    setStep("name");
  };

  const handleAddTemplate = () => {
    if (templateName.trim() && selectedTemplate) {
      // Here you would typically save the template
      console.log("Template created:", { name: templateName, template: selectedTemplate.id });
      setLocation("/campaign");
    }
  };

  if (step === "name" && selectedTemplate) {
    return (
      <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
        <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center px-10">
          <button
            onClick={() => setLocation("/campaign")}
            className="text-black text-sm font-playfair hover:opacity-70 flex items-center gap-2"
            data-testid="button-back-to-campaign"
          >
            ← Back to campaign list
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center px-10 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 ${selectedTemplate.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-2xl font-bold text-gray-800">{selectedTemplate.icon}</span>
              </div>
            </div>

            <h2 className="text-xl font-playfair font-semibold text-center mb-2">
              Template Preview
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Is this the template you want to add?
            </p>

            <div className="bg-gray-100 rounded-lg p-6 mb-6 min-h-32 flex items-center justify-center">
              <p className="text-gray-600 text-sm text-center">
                This is where you can see the preview, example of the {selectedTemplate.name} file
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-playfair font-semibold text-gray-800 mb-2">
                Name this template
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Give your template instance unique name
              </p>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g. Template 1"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="input-template-name"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setStep("preview");
                  setTemplateName("");
                }}
                variant="outline"
                className="flex-1 border-gray-300"
                data-testid="button-back-template"
              >
                Back
              </Button>
              <Button
                onClick={handleAddTemplate}
                disabled={!templateName.trim()}
                className="flex-1 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold disabled:opacity-50"
                data-testid="button-add-template"
              >
                Add Template
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === "preview" && selectedTemplate) {
    return (
      <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
        <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center px-10">
          <button
            onClick={() => setLocation("/campaign")}
            className="text-black text-sm font-playfair hover:opacity-70 flex items-center gap-2"
            data-testid="button-back-to-campaign"
          >
            ← Back to campaign list
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center px-10 py-8">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setStep("select")}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-playfair font-semibold">Template Preview</h2>
                <button
                  onClick={() => setStep("select")}
                  className="text-gray-600 hover:text-gray-800"
                  data-testid="button-close-preview"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Is this the template you want to add?
              </p>

              <div
                className={`${selectedTemplate.color} rounded-lg p-6 mb-6 min-h-32 flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">{selectedTemplate.icon}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center mb-6">
                This is where you can see the preview, example of the {selectedTemplate.name} file
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("select")}
                  variant="outline"
                  className="flex-1 border-gray-300"
                  data-testid="button-choose-different"
                >
                  Choose different
                </Button>
                <Button
                  onClick={handlePreviewConfirm}
                  className="flex-1 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold"
                  data-testid="button-use-this-template"
                >
                  Use this Template
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center px-10">
        <button
          onClick={() => setLocation("/campaign")}
          className="text-black text-sm font-playfair hover:opacity-70 flex items-center gap-2"
          data-testid="button-back-to-campaign"
        >
          ← Back to campaign list
        </button>
      </header>

      <main className="flex-1 px-10 py-8">
        <h1 className="text-2xl font-playfair font-semibold text-center mb-2">
          Choose a template
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select a template to start building your project
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`${template.color} rounded-lg p-6 hover:shadow-lg transition flex flex-col items-center text-center group`}
              data-testid={`button-template-${template.id}`}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <span className="text-3xl font-bold text-gray-800">{template.icon}</span>
              </div>
              <h3 className="font-playfair font-semibold text-gray-800 text-lg mb-1">
                {template.name}
              </h3>
              <p className="text-gray-700 text-sm mb-3">{template.description}</p>
              <p className="text-xs text-gray-600 mb-4">{template.helpText}</p>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
