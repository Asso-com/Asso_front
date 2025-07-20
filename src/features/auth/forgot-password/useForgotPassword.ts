
import { useState } from "react";
import { type FormikHelpers } from "formik";
export type Step = 'email' | 'verification' | 'reset';
type FormValues = Record<string, string>;
export const useForgotPassword = (onBackToLogin: () => void) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');

  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("*******7772");

  const handleEmailSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const email = values.email;
    if (!email) {
      setError("Please enter your email address");
      setSubmitting(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMaskedPhone("*******7772");
      setCurrentStep("verification");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (pin === "123456") {
        setCurrentStep('reset');
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (
    values: { newPassword: string; confirmPassword: string },
    helpers: any
  ) => {
    console.log(values);
    //const { newPassword, confirmPassword } = values;

    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onBackToLogin();
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
      helpers.setSubmitting(false);
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'email': return 33;
      case 'verification': return 66;
      case 'reset': return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'email': return 'Reset Your Password';
      case 'verification': return 'Verify Your Identity';
      case 'reset': return 'Create New Password';
    }
  };

  return {
    currentStep,
    setCurrentStep,
    pin,
    setPin,
    isLoading,
    error,
    setError,
    maskedPhone,
    handleEmailSubmit,
    handlePinSubmit,
    handlePasswordReset,
    getStepProgress,
    getStepTitle,
  };
}; 