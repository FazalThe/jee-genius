
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ArrowLeft, FileText, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuestionUploadProps {
  selectedTopics: string[];
  totalQuestionsNeeded: number;
  onQuestionUpload: (questions: any[]) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export function QuestionUpload({
  selectedTopics,
  totalQuestionsNeeded,
  onQuestionUpload,
  onBack,
  onGenerate,
}: QuestionUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedQuestions, setUploadedQuestions] = useState<any[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setError(null);
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          validateAndProcessQuestions(json);
        } catch (err) {
          setError("Invalid JSON format. Please check your file and try again.");
        }
      };
      reader.readAsText(file);
    } else if (fileExtension === 'csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const questions = parseCSV(csv);
          validateAndProcessQuestions(questions);
        } catch (err) {
          setError("Invalid CSV format. Please check your file and try again.");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Unsupported file format. Please upload a JSON or CSV file.");
    }
  };

  const parseCSV = (csv: string): any[] => {
    // A simple CSV parser (can be expanded for more robust handling)
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const questions = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(value => value.trim());
      const question: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        question[header] = values[index];
      });
      
      questions.push(question);
    }
    
    return questions;
  };

  const validateAndProcessQuestions = (questions: any[]) => {
    // Basic validation - check if questions have required fields
    // This would be expanded based on your question format
    if (!Array.isArray(questions)) {
      setError("Invalid question format. Questions should be in an array.");
      return;
    }
    
    if (questions.length === 0) {
      setError("No questions found in the file.");
      return;
    }
    
    // Check if questions have basic required fields
    // Modify this based on your actual question structure
    const isValid = questions.every(q => 
      q.question && (q.topic || q.subtopic || q.subject) && q.correctAnswer
    );
    
    if (!isValid) {
      setError("Some questions are missing required fields.");
      return;
    }
    
    // Filter questions based on selected topics if needed
    // This is a placeholder - implement actual filtering logic based on your data structure
    const filteredQuestions = questions.filter(q => {
      // Example filtering logic - modify based on your data structure
      return selectedTopics.some(topicId => 
        q.topicId === topicId || q.subtopicId === topicId
      );
    });
    
    setUploadedQuestions(questions); // Using all questions for now
    setIsUploaded(true);
    onQuestionUpload(questions);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Topic Selection
      </Button>

      <Card className="p-6">
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-sage-500 bg-sage-50" : "border-gray-300"
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,.csv"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">Drag and drop your question file here</p>
                <p className="text-sm text-gray-500">
                  or click to browse (CSV or JSON formats accepted)
                </p>
              </div>
            </div>
          </div>

          {fileName && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{fileName}</span>
              {isUploaded && <Check className="w-5 h-5 text-green-500 ml-auto" />}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-sage-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">File Format Requirements:</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>For JSON: Array of question objects</li>
              <li>For CSV: Header row followed by one question per row</li>
              <li>Required fields: question, correctAnswer, and topic/subtopic identifiers</li>
              <li>Optional: difficulty, explanations, incorrect options</li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Selected Topics: {selectedTopics.length}</p>
              <p className="text-sm text-gray-600">Questions Needed: {totalQuestionsNeeded}</p>
              <p className="text-sm text-gray-600">Questions Uploaded: {uploadedQuestions.length}</p>
            </div>
            <Button 
              className="bg-sage-500 hover:bg-sage-600"
              disabled={!isUploaded}
              onClick={onGenerate}
            >
              Generate Test
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-white p-5 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-3">Sample Question Format (JSON):</h3>
        <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`[
  {
    "question": "A particle starts from rest with constant acceleration...",
    "subject": "physics",
    "topic": "mechanics",
    "subtopic": "kinematics",
    "subtopicId": "kinematics",
    "options": [
      "2 m/s²",
      "4 m/s²",
      "6 m/s²",
      "8 m/s²"
    ],
    "correctAnswer": "4 m/s²",
    "difficulty": "medium",
    "explanation": "Using the equation s = ut + (1/2)at²..."
  }
]`}
        </pre>
      </div>
    </div>
  );
}
