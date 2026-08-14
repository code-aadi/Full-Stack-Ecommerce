import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null)
  const {userLogin, loginLoading} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setError(null)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
  const result =  await userLogin(formData)
  if(!result.sucess){
 setError(result.message)
  }
  };

  return (
    <>
      <style>{`
        .auth-container {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: #f8fafc;
        }

        .auth-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          width: 100%;
          max-width: 420px;
          padding: 32px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .auth-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .auth-header p {
          color: #64748b;
          font-size: 0.9rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .auth-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .auth-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .forgot-link {
          font-size: 0.82rem;
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .auth-btn {
          width: 100%;
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
          margin-top: 4px;
        }

        .auth-btn:hover {
          background: #4338ca;
        }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 0.88rem;
          color: #64748b;
        }

        .auth-footer a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }
          .login-error{
  text-align: center;
  color: rgb(255, 29, 29);
}
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  className="auth-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="auth-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
 {error && <p className='login-error'>{error}</p> }
            <button type="submit" className="auth-btn" disabled = {loginLoading}>
              <LogIn size={18} />
              <span>Sign In</span>
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;