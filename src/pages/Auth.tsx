
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TeleMed</span>
          </div>
          <p className="text-gray-600">Welcome to your healthcare platform</p>
        </div>

        {/* Auth Forms */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Toggle between login and signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
