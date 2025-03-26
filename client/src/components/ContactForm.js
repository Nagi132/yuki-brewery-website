// src/components/ContactForm.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({
    variant = "default", // "default", "inline", "compact"
    buttonText = "Send",
    buttonColor = "black",
    buttonClassName = "",
    buttonWrapperClassName = "",
    placeholders = {
        name: "Your name",
        email: "Your email",
        message: "Your message"
    },
    successMessage = "Thanks for your message. We'll be in touch soon!",
    errorMessage = "There was a problem sending your message. Please try again.",
    className = "",
    formClassName = "", 
    inputClassName = "", 
    textareaRows = null, 
    fields = ["name", "email", "message"],
    extraFields = {},
    redirectUrl = "",
    hideAfterSubmit = true,
    nameLastNameGrid = false // Support for firstName/lastName grid layout
}) {
    // Create refs for form and recaptcha
    const formRef = useRef(null);
    const recaptchaRef = useRef(null);

    // Form state
    const initialFormData = {
        name: "",
        email: "",
        subject: "",
        message: "",
        lastName: "", // Added for nameLastNameGrid support
        ...Object.fromEntries(Object.keys(extraFields).map(key => [key, extraFields[key].value || ""]))
    };

    const [formData, setFormData] = useState(initialFormData);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    // Status state
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    // Handle recaptcha token expiry
    useEffect(() => {
        // Set up a token refresh interval (tokens expire after 2 minutes)
        const refreshToken = () => {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                recaptchaRef.current.execute();
            }
        };

        const intervalId = setInterval(refreshToken, 110000); // Refresh slightly before expiry (2min = 120000ms)

        return () => clearInterval(intervalId);
    }, []);

    // Handle recaptcha change
    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (fields.includes("email") && !formData.email.includes('@')) {
            setStatus({
                submitting: false,
                submitted: false,
                error: "Please enter a valid email address"
            });
            return;
        }

        // Execute recaptcha if not already done
        if (!recaptchaToken && recaptchaRef.current) {
            try {
                await recaptchaRef.current.execute();
            } catch (error) {
                console.error('ReCAPTCHA execution failed:', error);
                setStatus({
                    submitting: false,
                    submitted: false,
                    error: "ReCAPTCHA verification failed. Please try again."
                });
                return;
            }
        }

        setStatus({
            submitting: true,
            submitted: false,
            error: null
        });

        try {
            // Get EmailJS credentials from environment variables or use placeholders for development
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

            // Add recaptcha token to form data
            const formElement = formRef.current;
            const recaptchaInput = document.createElement('input');
            recaptchaInput.type = 'hidden';
            recaptchaInput.name = 'g-recaptcha-response';
            recaptchaInput.value = recaptchaToken;
            formElement.appendChild(recaptchaInput);

            // Send email using EmailJS
            const result = await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            console.log('Email sent successfully:', result.text);

            // Remove the recaptcha input we added
            formElement.removeChild(recaptchaInput);

            // Update status
            setStatus({
                submitting: false,
                submitted: true,
                error: null
            });

            // Reset form data
            setFormData(initialFormData);

            // Redirect if URL provided
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }

            // Reset success message after delay if not redirecting
            if (!redirectUrl && !hideAfterSubmit) {
                setTimeout(() => {
                    setStatus(prev => ({
                        ...prev,
                        submitted: false
                    }));
                }, 5000);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus({
                submitting: false,
                submitted: false,
                error: errorMessage
            });
        }
    };

    // If form was submitted and hideAfterSubmit is true, show only success message
    if (status.submitted && hideAfterSubmit) {
        return (
            <div className={`p-4 bg-green-50 border border-green-200 rounded-md text-green-700 ${className}`}>
                {successMessage}
            </div>
        );
    }

    // Common input style based on variant - with custom override option
    const getInputClass = (isTextarea = false) => {
        if (inputClassName) return inputClassName;

        const baseClass = "focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors";

        switch (variant) {
            case "inline":
                return `px-3 py-2 text-sm border border-gray-300 ${baseClass}`;
            case "compact":
                return `px-3 py-1.5 text-xs border border-gray-300 ${baseClass}`;
            default: // "default"
                return `w-full px-4 py-2 text-sm border border-gray-300 ${baseClass}`;
        }
    };

    // Button style based on variant and color
    const getButtonClass = () => {
        if (buttonClassName) return buttonClassName;
        
        const colorClass = buttonColor === "black"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-amber-500 text-white hover:bg-amber-600";

        switch (variant) {
            case "inline":
                return `px-4 py-2 text-sm ${colorClass} transition-colors`;
            case "compact":
                return `px-3 py-1.5 text-xs ${colorClass} transition-colors`;
            default: // "default"
                return `px-6 py-2 text-sm ${colorClass} transition-colors`;
        }
    };

    // Determine number of rows for textarea
    const getTextareaRows = () => {
        if (textareaRows !== null) return textareaRows;

        switch (variant) {
            case "compact": return 3;
            case "inline": return 4;
            default: return 5;
        }
    };

    return (
        <div className={className}>
            {status.submitted && !hideAfterSubmit && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                    {successMessage}
                </div>
            )}

            {status.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {status.error}
                </div>
            )}

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`space-y-3 ${variant === "inline" ? "flex flex-wrap gap-3 items-end" : ""} ${formClassName}`}
            >
                {/* Business Name field (if included in extraFields) */}
                {extraFields.businessName && (
                    <div className={variant === "inline" ? "flex-1 min-w-[180px]" : ""}>
                        <input
                            type={extraFields.businessName.type || "text"}
                            id="businessName"
                            name="businessName"
                            value={formData.businessName || ""}
                            onChange={handleChange}
                            placeholder={extraFields.businessName.placeholder || "Business Name"}
                            className={getInputClass()}
                            required={extraFields.businessName.required}
                            disabled={status.submitting}
                        />
                    </div>
                )}

                {/* Name Field - with firstName/lastName grid option */}
                {fields.includes("name") && nameLastNameGrid ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={placeholders.name || "First Name"}
                            className={getInputClass()}
                            required={fields.includes("name")}
                            disabled={status.submitting}
                        />
                        
                        {/* Last Name field */}
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            placeholder={placeholders.lastName || "Last Name"}
                            className={getInputClass()}
                            disabled={status.submitting}
                        />
                    </div>
                ) : fields.includes("name") && (
                    <div className={variant === "inline" ? "flex-1 min-w-[180px]" : ""}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={placeholders.name}
                            className={getInputClass()}
                            required={fields.includes("name")}
                            disabled={status.submitting}
                        />
                    </div>
                )}

                {/* Email Field */}
                {fields.includes("email") && (
                    <div className={variant === "inline" ? "flex-1 min-w-[180px]" : ""}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={placeholders.email}
                            className={getInputClass()}
                            required={fields.includes("email")}
                            disabled={status.submitting}
                        />
                    </div>
                )}

                {/* Subject Field */}
                {fields.includes("subject") && (
                    <div className={variant === "inline" ? "flex-1 min-w-[180px]" : ""}>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject || ""}
                            onChange={handleChange}
                            placeholder={placeholders.subject || "Subject"}
                            className={getInputClass()}
                            required={fields.includes("subject")}
                            disabled={status.submitting}
                        />
                    </div>
                )}

                {/* Extra Fields */}
                {Object.entries(extraFields).map(([name, config]) => {
                    // Skip businessName (handled separately) and hidden fields
                    if (name === 'businessName' || config.type === 'hidden') return null;
                    
                    return (
                        <div key={name} className={variant === "inline" ? "flex-1 min-w-[180px]" : ""}>
                            {variant !== "inline" && variant !== "compact" && config.label && (
                                <label htmlFor={name} className="block text-sm font-medium text-zinc-900 mb-1">
                                    {config.label}
                                </label>
                            )}
                            <input
                                type={config.type || "text"}
                                id={name}
                                name={name}
                                value={formData[name] || ""}
                                onChange={handleChange}
                                placeholder={config.placeholder || config.label || name}
                                className={getInputClass()}
                                required={config.required}
                                disabled={status.submitting}
                            />
                        </div>
                    );
                })}

                {/* Hidden Fields */}
                {Object.entries(extraFields).map(([name, config]) => {
                    if (config.type !== 'hidden') return null;
                    
                    return (
                        <input
                            key={name}
                            type="hidden"
                            id={name}
                            name={name}
                            value={config.value || ""}
                        />
                    );
                })}

                {/* Message Field */}
                {fields.includes("message") && (
                    <div className={variant === "inline" ? "w-full" : ""}>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={placeholders.message}
                            rows={getTextareaRows()}
                            className={`${getInputClass(true)} resize-none`}
                            required={fields.includes("message")}
                            disabled={status.submitting}
                        ></textarea>
                    </div>
                )}

                {/* Invisible reCAPTCHA */}
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY"}
                    onChange={handleRecaptchaChange}
                />

                {/* Submit Button */}
                <div className={buttonWrapperClassName || (variant === "inline" ? "flex-none" : "")}>
                    <button
                        type="submit"
                        className={getButtonClass()}
                        disabled={status.submitting}
                    >
                        {status.submitting ? "Sending..." : buttonText}
                    </button>
                    
                    {/* Success message inline (if submitted and not hidden) */}
                    {status.submitted && !hideAfterSubmit && (
                        <span className="ml-4 text-green-600 text-sm">
                            {successMessage}
                        </span>
                    )}
                    
                    {/* Error message inline */}
                    {status.error && (
                        <span className="ml-4 text-black text-sm">
                            {errorMessage}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}