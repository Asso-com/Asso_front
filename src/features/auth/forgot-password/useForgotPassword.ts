import { useSendOtp } from './../hooks/useSendOtp';
import { useState } from "react";
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { useResetPassword } from '../hooks/useResetPassword';

export type Step = 'email' | 'verification' | 'reset';

export const useForgotPassword = (onBackToLogin: () => void) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const resetPasswordMutation = useResetPassword();

  const maskPhone = (phoneNumber: string): string => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length >= 4) {
      const lastFourDigits = cleanPhone.slice(-4);
      const maskedPart = '*'.repeat(Math.max(0, cleanPhone.length - 4));
      return maskedPart + lastFourDigits;
    }
    return phoneNumber;
  };

const handleEmailSubmit = async (
  values: { email: string }, 
  formikHelpers: any
) => {
  try {
    setError("");
    setSuccessMessage("");
    setSubmittedEmail(values.email);
    const response = await sendOtpMutation.mutateAsync({ email: values.email });
    setMaskedPhone(maskPhone(response.data));
    setSuccessMessage(response.data);
    setCurrentStep("verification");
  } catch (err: any) {
    setError(err?.message || "Failed to send verification code. Please try again.");
    setTimeout(() => setError(""), 7000); 
  } finally {
    formikHelpers.setSubmitting(false);
  }
};

const handlePinSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (pin.length !== 6) {
    setError("Please enter the complete 6-digit verification code");
    setTimeout(() => setError(""), 7000); 
    return;
  }
  
  setError("");
  
  try {
    await verifyOtpMutation.mutateAsync({ 
      email: submittedEmail, 
      otpCode: pin 
    });
    setCurrentStep('reset');
  } catch (err: any) {
    setError(err?.message || "Invalid verification code. Please try again.");
    setTimeout(() => setError(""), 7000);
  }
};

const handleResendOtp = async () => {
  if (!submittedEmail) return;
  
  try {
    setError("");
    const response = await sendOtpMutation.mutateAsync({ email: submittedEmail });
    setSuccessMessage(response.data);
  } catch (err: any) {
    setError(err?.message || "Failed to resend code. Please try again.");
    setTimeout(() => setError(""), 7000); 
  }
};

  const handlePasswordReset = async (
    values: { newPassword: string; confirmPassword: string },
    helpers: any
  ) => {
    setError("");
    
    try {
      await resetPasswordMutation.mutateAsync({
        email: submittedEmail,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      });
      onBackToLogin();
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. Please try again.");
    } finally {
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

  const isLoading = sendOtpMutation.isPending || 
                   verifyOtpMutation.isPending || 
                   resetPasswordMutation.isPending;

  return {
    currentStep,
    setCurrentStep,
    pin,
    setPin,
    isLoading,
    error,
    setError,
    successMessage,
    maskedPhone,
    setMaskedPhone,
    submittedEmail,
    handleEmailSubmit,
    handlePinSubmit,
    handlePasswordReset,
    handleResendOtp,
    getStepProgress,
    getStepTitle,
    mutations: {
      sendOtp: sendOtpMutation,
      verifyOtp: verifyOtpMutation,
      resetPassword: resetPasswordMutation,
    }
  };
};