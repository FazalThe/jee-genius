
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Book } from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  questionsCount: number;
}

const chapters: Chapter[] = [
  { id: "phy1", name: "Physics - Mechanics", questionsCount: 25 },
  { id: "phy2", name: "Physics - Waves", questionsCount: 20 },
  { id: "chem1", name: "Chemistry - Organic", questionsCount: 30 },
  { id: "chem2", name: "Chemistry - Inorganic", questionsCount: 25 },
  { id: "math1", name: "Mathematics - Calculus", questionsCount: 35 },
  { id: "math2", name: "Mathematics - Algebra", questionsCount: 30 },
];

export function ChapterSelection() {
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors">
          Step 1 of 2
        </Badge>
        <h1 className="text-4xl font-semibold text-gray-900">Select Chapters</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Choose the chapters you want to include in your practice test. We'll
          generate a custom test based on your selection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <Card
            key={chapter.id}
            className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedChapters.includes(chapter.id)
                ? "border-sage-400 bg-sage-50"
                : "border-gray-200 hover:border-sage-200"
            }`}
            onClick={() => toggleChapter(chapter.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    selectedChapters.includes(chapter.id)
                      ? "bg-sage-400 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Book className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{chapter.name}</h3>
                  <p className="text-sm text-gray-500">
                    {chapter.questionsCount} questions
                  </p>
                </div>
              </div>
              {selectedChapters.includes(chapter.id) && (
                <Check className="text-sage-500 h-5 w-5 animate-fade-in" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          disabled={selectedChapters.length === 0}
          className="bg-sage-400 hover:bg-sage-500 text-white px-8 py-2 rounded-lg transition-colors"
        >
          Generate Test ({selectedChapters.length} chapters selected)
        </Button>
      </div>
    </div>
  );
}
