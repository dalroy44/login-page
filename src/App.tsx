import React, { useState, useEffect } from 'react';
import './index.css';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticationStatus, setAuthenticationStatus] = useState<'success' | 'failed' | ''>('');

  // Function to validate email format
  const isValidEmail = (emailAddress: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

  // Effect for email validation
  useEffect(() => {
    if (email === '') {
      setEmailErrorMessage('');
    } else if (!isValidEmail(email)) {
      setEmailErrorMessage('Email is invalid.');
    } else {
      setEmailErrorMessage('');
    }
  }, [email]);

  // Effect for password validation
  useEffect(() => {
    if (userPassword === '') {
      setPasswordErrorMessage('');
    } else if (userPassword.length < 8) {
      setPasswordErrorMessage('Password is less than 8 characters.');
    } else {
      setPasswordErrorMessage('');
    }
  }, [userPassword]);

  // Derived state to check if the form is valid for submission
  const isEmailValid: boolean = isValidEmail(email);
  const isPasswordValid: boolean = userPassword.length >= 8;
  const isFormValid: boolean = isEmailValid && isPasswordValid;

  // Handler for form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setAuthenticationStatus('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.5) {
        setAuthenticationStatus('success');
      } else {
        setAuthenticationStatus('failed');
      }
    }, 2000);
  };

  // Handler for email input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  // Handler for password input change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserPassword(event.target.value);
  };

  // Handler to toggle password visibility
  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Render the component
  return (
    <div className="container">
      <h2 className="form-title">Welcome Back!</h2>
      <p className="form-subheading">
        Don't have an account? <a href="#" className="form-subheading-link">Sign Up</a>
      </p>

      {/* Display loader while loading */}
      {loading && <div className="loader"></div>}

      {/* Display success message */}
      {!loading && authenticationStatus === 'success' && (
        <p className="status-message success-message">Sign In Successful</p>
      )}
      {/* Display failure message */}
      {!loading && authenticationStatus === 'failed' && (
        <p className="status-message failure-message">Sign In Failed</p>
      )}

      {!loading && !authenticationStatus && (
        <>
          <form onSubmit={handleFormSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={handleEmailChange}
                placeholder="email@gmail.com"
                disabled={loading}
              />
              {emailErrorMessage && <span className="error-message">{emailErrorMessage}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                className="form-input"
                value={userPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                disabled={loading}
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
              {passwordErrorMessage && <span className="error-message">{passwordErrorMessage}</span>}
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-container">
              <a href="#" className="form-subheading-link">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="social-divider">
            <span>or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons-container">
            <button type="button" className="btn-social google">Google</button>
            <button type="button" className="btn-social facebook">Facebook</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
