
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define type for JEE Questions
export interface Question {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  chapter: string;
  topic: string;
  marks: number;
}

// Function to fetch questions from the database based on topics and other criteria
export async function fetchQuestions({
  topics = [],
  difficulty,
  count = 10,
}: {
  topics?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
}): Promise<Question[]> {
  let query = supabase
    .from('jee_questions')
    .select('*');
  
  // Apply topic filter if provided
  if (topics && topics.length > 0) {
    query = query.in('topic', topics);
  }
  
  // Apply difficulty filter if provided
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  
  // Get random questions limited by count
  const { data, error } = await query
    .limit(count)
    .order('id', { ascending: false });
  
  if (error) {
    console.error('Error fetching questions:', error);
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
  
  return data || [];
}

// Function to add new question to the database
export async function addQuestion(question: Omit<Question, 'id'>): Promise<Question> {
  const { data, error } = await supabase
    .from('jee_questions')
    .insert([question])
    .select();
  
  if (error) {
    console.error('Error adding question:', error);
    throw new Error(`Failed to add question: ${error.message}`);
  }
  
  return data?.[0];
}

// Function to get all available topics
export async function getTopics(): Promise<string[]> {
  const { data, error } = await supabase
    .from('jee_questions')
    .select('topic')
    .order('topic');
  
  if (error) {
    console.error('Error fetching topics:', error);
    throw new Error(`Failed to fetch topics: ${error.message}`);
  }
  
  // Get unique topics
  const uniqueTopics = [...new Set(data?.map(item => item.topic))];
  return uniqueTopics;
}
