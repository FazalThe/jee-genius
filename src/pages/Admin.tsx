
import AdminQuestionManager from "@/components/AdminQuestionManager";
import { Toaster } from "@/components/ui/toaster";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-sage-600">
                JEE Main Practice - Admin
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminQuestionManager />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Admin;
