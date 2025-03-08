
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ChapterSelection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">JEE Main Practice</h1>
        <p className="mt-2 text-lg text-gray-600">
          Select a chapter to start practicing
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* These will be dynamically populated from the database later */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle>Physics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Practice physics problems for JEE</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle>Chemistry</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Practice chemistry problems for JEE</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle>Mathematics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Practice mathematics problems for JEE</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChapterSelection;
