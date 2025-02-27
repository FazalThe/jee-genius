
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Book, ChevronDown, ChevronUp, Clock, Hash } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

interface Subject {
  id: string;
  name: string;
  topics: Topic[];
  color: string;
  icon: string;
  defaultQuestions: number;
}

const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    color: "blue",
    icon: "⚛️",
    defaultQuestions: 25,
    topics: [
      {
        id: "mechanics",
        name: "Mechanics",
        subtopics: [
          { id: "physics-measurement", name: "Physics & Measurement" },
          { id: "kinematics", name: "Kinematics" },
          { id: "laws-motion", name: "Laws of Motion" },
          { id: "work-energy-power", name: "Work, Energy & Power" },
          { id: "rotational-motion", name: "Rotational Motion" },
          { id: "gravity", name: "Gravity" },
          { id: "mechanics-solids-fluids", name: "Mechanics of Solids & Fluids" },
          { id: "oscillations-waves", name: "Oscillations & Waves" },
        ],
      },
      {
        id: "heat-thermodynamics",
        name: "Heat & Thermodynamics",
        subtopics: [
          { id: "thermal-properties", name: "Thermal Properties" },
          { id: "thermodynamics", name: "Thermodynamics" },
          { id: "kinetic-theory-gases", name: "Kinetic Theory of Gases" },
        ],
      },
      {
        id: "optics-modern-physics",
        name: "Optics & Modern Physics",
        subtopics: [
          { id: "ray-optics", name: "Ray Optics" },
          { id: "wave-optics", name: "Wave Optics" },
          { id: "dual-nature-radiation", name: "Dual Nature of Radiation" },
          { id: "atoms-nuclei", name: "Atoms & Nuclei" },
        ],
      },
      {
        id: "current-electricity-emi",
        name: "Current Electricity & EMI",
        subtopics: [
          { id: "alternating-current", name: "Alternating Current" },
          { id: "semiconductors", name: "Semiconductors (Electronic Devices)" },
          { id: "current-electricity", name: "Current Electricity" },
          { id: "electromagnetic-induction", name: "Electromagnetic Induction" },
        ],
      },
      {
        id: "electrostatics-magnetism",
        name: "Electrostatics & Magnetism",
        subtopics: [
          { id: "electrostatics", name: "Electrostatics" },
          { id: "magnetic-effects", name: "Magnetic Effects of Current & Magnetism" },
          { id: "electromagnetic-waves", name: "Electromagnetic Waves & Communication System" },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    color: "green",
    icon: "🧪",
    defaultQuestions: 25,
    topics: [
      {
        id: "organic",
        name: "Organic",
        subtopics: [
          { id: "characterization-compounds", name: "Characterization of Organic Compounds & Basic Principles" },
          { id: "hydrocarbons", name: "Hydrocarbons & Their Substituents" },
          { id: "oxygen-compounds", name: "Oxygen-containing Compounds" },
          { id: "nitrogen-compounds", name: "Nitrogen-containing Compounds" },
          { id: "biomolecules-polymers", name: "Biomolecules & Polymers" },
          { id: "practical-chemistry", name: "Principles Related to Practical & Everyday Life Chemistry" },
        ],
      },
      {
        id: "inorganic",
        name: "Inorganic",
        subtopics: [
          { id: "classification-elements", name: "Classification of Elements & Periodicity" },
          { id: "chemical-bonding", name: "Chemical Bonding & Molecular Structure" },
          { id: "hydrogen-s-block", name: "Hydrogen & s-Block Elements" },
          { id: "p-block", name: "p-Block Elements" },
          { id: "d-f-block", name: "d- and f-Block Elements" },
          { id: "coordination-compounds", name: "Coordination Compounds" },
        ],
      },
      {
        id: "physical",
        name: "Physical",
        subtopics: [
          { id: "basic-concepts", name: "Basic Concepts" },
          { id: "atomic-structure", name: "Atomic Structure" },
          { id: "states-matter", name: "States of Matter & Solutions" },
          { id: "thermodynamics-chem", name: "Thermodynamics" },
          { id: "equilibrium", name: "Equilibrium" },
          { id: "redox-electrochemistry", name: "Redox & Electrochemistry" },
          { id: "chemical-kinetics", name: "Chemical Kinetics" },
          { id: "surface-chemistry", name: "Surface Chemistry" },
        ],
      },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    color: "purple",
    icon: "📐",
    defaultQuestions: 25,
    topics: [
      {
        id: "algebra",
        name: "Algebra",
        subtopics: [
          { id: "complex-numbers", name: "Complex Numbers & Quadratic Equations" },
          { id: "permutations-combinations", name: "Permutations & Combinations" },
          { id: "progressions-series", name: "Progressions, Series & Binomial Theorem" },
          { id: "math-reasoning", name: "Mathematical Reasoning & Induction" },
          { id: "statistics", name: "Statistics" },
          { id: "probability", name: "Probability" },
          { id: "matrices-determinants", name: "Matrices & Determinants" },
        ],
      },
      {
        id: "trigonometry",
        name: "Trigonometry",
        subtopics: [
          { id: "trigonometric-identities", name: "Trigonometric Identities" },
          { id: "solutions-triangles", name: "Solutions of Triangles" },
          { id: "height-distances", name: "Height & Distances" },
        ],
      },
      {
        id: "calculus",
        name: "Calculus",
        subtopics: [
          { id: "sets-relations", name: "Sets, Relations & Functions" },
          { id: "limit-differentiation", name: "Limit & Differentiation" },
          { id: "applications-differentiation", name: "Applications of Differentiation" },
          { id: "integration", name: "Integration" },
          { id: "application-integrals", name: "Application of Integrals" },
          { id: "differential-equations", name: "Differential Equations" },
        ],
      },
      {
        id: "coordinate-geometry",
        name: "Coordinate Geometry",
        subtopics: [
          { id: "straight-line", name: "Straight Line" },
          { id: "circles", name: "Circles" },
          { id: "conic-sections", name: "Conic Sections" },
          { id: "3d-geometry", name: "3D Geometry" },
          { id: "vectors", name: "Vectors" },
        ],
      },
    ],
  },
];

export function ChapterSelection() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(["physics", "chemistry", "mathematics"]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [questionsPerSubject, setQuestionsPerSubject] = useState<Record<string, number>>(
    subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: subject.defaultQuestions }), {})
  );
  const [testDuration, setTestDuration] = useState<number>(180); // in minutes

  const toggleSubjectExpand = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleSubtopic = (subtopicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(subtopicId)
        ? prev.filter((id) => id !== subtopicId)
        : [...prev, subtopicId]
    );
  };

  const handleQuestionsChange = (subjectId: string, value: number) => {
    setQuestionsPerSubject((prev) => ({
      ...prev,
      [subjectId]: value,
    }));
  };

  const isTopicSelected = (topic: Topic): boolean => {
    // Check if all subtopics are selected
    return topic.subtopics.every((subtopic) => selectedTopics.includes(subtopic.id));
  };

  const getTopicSelectionCount = (topic: Topic): number => {
    // Count how many subtopics are selected
    return topic.subtopics.filter((subtopic) => selectedTopics.includes(subtopic.id)).length;
  };

  const getSubjectColor = (subjectId: string): string => {
    const colorMap: Record<string, string> = {
      physics: "blue-500",
      chemistry: "green-500",
      mathematics: "purple-500",
    };
    return colorMap[subjectId] || "sage-500";
  };

  const getSubjectBgColor = (subjectId: string): string => {
    const colorMap: Record<string, string> = {
      physics: "blue-50",
      chemistry: "green-50",
      mathematics: "purple-50",
    };
    return colorMap[subjectId] || "sage-50";
  };

  const getTotalSelectedTopics = (): number => {
    return selectedTopics.length;
  };

  const getTotalQuestions = (): number => {
    return Object.values(questionsPerSubject).reduce((sum, count) => sum + count, 0);
  };

  const handleSelectAllSubtopics = (topic: Topic, isSelected: boolean) => {
    if (isSelected) {
      // Remove all subtopics
      setSelectedTopics((prev) => 
        prev.filter((id) => !topic.subtopics.some(subtopic => subtopic.id === id))
      );
    } else {
      // Add all subtopics
      const subtopicIds = topic.subtopics.map((subtopic) => subtopic.id);
      setSelectedTopics((prev) => [...prev, ...subtopicIds.filter(id => !prev.includes(id))]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors">
          Step 1 of 2
        </Badge>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Create Your JEE Main Practice Test</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Select topics, customize question count, and set the time limit for your practice test.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-medium text-gray-800">Select Topics</h2>
          
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="overflow-hidden transition-all duration-300"
            >
              <div 
                className={`p-4 cursor-pointer flex items-center justify-between border-b ${
                  expandedSubjects.includes(subject.id) ? `bg-${getSubjectBgColor(subject.id)}` : "bg-white"
                }`}
                onClick={() => toggleSubjectExpand(subject.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl`}>{subject.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-500">
                      {subject.topics.reduce((count, topic) => count + topic.subtopics.length, 0)} subtopics
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {expandedSubjects.includes(subject.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedSubjects.includes(subject.id) && (
                <div className="p-2 bg-white">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="mb-2 rounded-md overflow-hidden border">
                      <div 
                        className={`p-3 cursor-pointer flex items-center justify-between ${
                          isTopicSelected(topic) ? `bg-${getSubjectBgColor(subject.id)}` : "bg-gray-50"
                        }`}
                        onClick={() => {
                          toggleTopicExpand(topic.id);
                          handleSelectAllSubtopics(topic, isTopicSelected(topic));
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Book className={`h-4 w-4 text-${getSubjectColor(subject.id)}`} />
                          <h4 className="font-medium text-gray-800">{topic.name}</h4>
                          {getTopicSelectionCount(topic) > 0 && (
                            <Badge variant="outline" className="ml-2">
                              {getTopicSelectionCount(topic)}/{topic.subtopics.length}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isTopicSelected(topic) && (
                            <Check className={`h-4 w-4 text-${getSubjectColor(subject.id)}`} />
                          )}
                          {expandedTopics.includes(topic.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {expandedTopics.includes(topic.id) && (
                        <div className="p-2 bg-white">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {topic.subtopics.map((subtopic) => (
                              <div
                                key={subtopic.id}
                                className={`p-2 rounded cursor-pointer flex items-center justify-between transition-colors ${
                                  selectedTopics.includes(subtopic.id)
                                    ? `bg-${getSubjectBgColor(subject.id)} border border-${getSubjectColor(subject.id)}`
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => toggleSubtopic(subtopic.id)}
                              >
                                <span className="text-sm">{subtopic.name}</span>
                                {selectedTopics.includes(subtopic.id) && (
                                  <Check className={`h-4 w-4 text-${getSubjectColor(subject.id)}`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Test Configuration</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Test Duration
                  </h3>
                  <span className="font-medium text-sage-600">{testDuration} min</span>
                </div>
                <Slider
                  value={[testDuration]}
                  min={30}
                  max={180}
                  step={15}
                  onValueChange={(value) => setTestDuration(value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>30 min</span>
                  <span>3 hours</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium flex items-center mb-4">
                  <Hash className="mr-2 h-4 w-4" />
                  Questions Per Subject
                </h3>
                
                {subjects.map((subject) => (
                  <div key={subject.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`${subject.id}-questions`} className="text-sm">
                        {subject.name}
                      </Label>
                      <span className="text-sm text-sage-600 font-medium">
                        {questionsPerSubject[subject.id]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`${subject.id}-questions`}
                        type="range"
                        min={0}
                        max={50}
                        value={questionsPerSubject[subject.id]}
                        onChange={(e) => handleQuestionsChange(subject.id, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Total Questions:</span>
                    <span className="font-medium">{getTotalQuestions()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Button
            disabled={getTotalSelectedTopics() === 0 || getTotalQuestions() === 0}
            className="w-full bg-sage-500 hover:bg-sage-600 text-white py-3 rounded-lg transition-colors"
          >
            Generate Test
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            <p>{getTotalSelectedTopics()} topics selected</p>
            <p>{getTotalQuestions()} questions • {testDuration} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
