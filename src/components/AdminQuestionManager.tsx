
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { addQuestion, Question } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminQuestionManager = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState({
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: 0,
    explanation: '',
    difficulty: 'medium' as const,
    chapter: '',
    topic: '',
    marks: 4
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!question.question_text || question.options.some(opt => !opt) || 
        !question.explanation || !question.chapter || !question.topic) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addQuestion(question);
      toast({
        title: "Success!",
        description: "Question added to the database",
        variant: "success"
      });
      
      // Reset form
      setQuestion({
        question_text: '',
        options: ['', '', '', ''],
        correct_answer: 0,
        explanation: '',
        difficulty: 'medium',
        chapter: '',
        topic: '',
        marks: 4
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add question",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add New JEE Question</CardTitle>
        <CardDescription>
          Create a new question for the JEE Main practice database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea 
              id="question" 
              value={question.question_text}
              onChange={(e) => setQuestion({ ...question, question_text: e.target.value })}
              placeholder="Enter the question text"
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-4">
            <Label>Options</Label>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="correctAnswer" 
                    checked={question.correct_answer === index}
                    onChange={() => setQuestion({ ...question, correct_answer: index })}
                    id={`option-${index}`}
                    className="mr-2"
                  />
                  <Label htmlFor={`option-${index}`}>Correct</Label>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea 
              id="explanation" 
              value={question.explanation}
              onChange={(e) => setQuestion({ ...question, explanation: e.target.value })}
              placeholder="Explain the correct answer"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter</Label>
              <Input 
                id="chapter" 
                value={question.chapter}
                onChange={(e) => setQuestion({ ...question, chapter: e.target.value })}
                placeholder="e.g., Physics, Chemistry"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input 
                id="topic" 
                value={question.topic}
                onChange={(e) => setQuestion({ ...question, topic: e.target.value })}
                placeholder="e.g., Kinematics, Organic Chemistry"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={question.difficulty} 
                onValueChange={(value: any) => setQuestion({ ...question, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input 
                id="marks" 
                type="number" 
                value={question.marks}
                onChange={(e) => setQuestion({ ...question, marks: parseInt(e.target.value) || 0 })}
                min="1"
                max="10"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Adding..." : "Add Question"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminQuestionManager;
