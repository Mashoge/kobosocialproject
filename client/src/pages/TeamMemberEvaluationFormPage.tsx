import { useState } from "react";
import { Home, Star } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createEvaluation } from "@/services/evaluationService";

export const TeamMemberEvaluationFormPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectTitle: "",
    feedback: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectTitle || rating === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createEvaluation({
        evaluatorName: formData.name,
        evaluatorType: "team-member",
        email: formData.email,
        projectName: formData.projectTitle,
        rating,
        feedback: formData.feedback,
      });

      toast({
        title: "Evaluation Submitted",
        description: "Thank you for your feedback!",
        className: "bg-green-50 text-green-800 border-green-200",
      });

      setTimeout(() => setLocation("/team-member-dashboard"), 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your evaluation.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full min-h-screen flex flex-col font-sans">
      <header className="w-full h-[85px] bg-[rgba(217,207,199,0.85)] shadow-lg flex items-center justify-between px-10">
        <button
          onClick={() => setLocation("/team-member-dashboard")}
          className="flex items-center gap-2 text-black hover:opacity-70"
          data-testid="button-home-evaluation"
        >
          <Home size={24} />
          <span className="font-playfair">Home</span>
        </button>
        <h1 className="text-black text-2xl font-semibold font-playfair">Project Evaluation</h1>
        <div className="w-24" />
      </header>

      <main className="flex-1 px-10 py-8">
        <Card className="max-w-2xl mx-auto shadow-md overflow-hidden">
          <div className="bg-[#e5e5e5] h-16 flex items-center px-8">
            <h2 className="text-black font-semibold text-2xl font-playfair">Team Member Evaluation Form</h2>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">NAME</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your Full Name"
                    className="border-gray-300"
                    data-testid="input-evaluation-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">EMAIL ADDRESS</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="border-gray-300"
                    data-testid="input-evaluation-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">PROJECT TITLE</label>
                  <Input
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    placeholder="The name of the project"
                    className="border-gray-300"
                    data-testid="input-evaluation-title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-4">RATING</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none transition-transform active:scale-90"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      data-testid={`star-rating-${star}`}
                    >
                      <Star
                        size={32}
                        className={`${
                          star <= (hover || rating)
                            ? "fill-zinc-900 text-zinc-900"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">COMMENTS / FEEDBACK</label>
                <Textarea
                  value={formData.feedback}
                  onChange={(e) => handleInputChange("feedback", e.target.value)}
                  placeholder="Tell us about the project..."
                  className="w-full resize-none border-gray-300 min-h-[150px]"
                  data-testid="input-evaluation-feedback"
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  type="button"
                  onClick={() => setLocation("/team-member-dashboard")}
                  variant="outline"
                  className="px-12 border-gray-300"
                  data-testid="button-cancel-evaluation"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 bg-[#83ffb3] hover:bg-[#6ae091] text-black font-semibold disabled:opacity-50"
                  data-testid="button-submit-evaluation"
                >
                  {isSubmitting ? "Submitting..." : "Submit Evaluation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
