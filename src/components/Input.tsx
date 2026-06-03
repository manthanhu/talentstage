"use client";

import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

export type InputType = "text" | "email" | "password" | "number" | "textarea";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  variant?: "default" | "glass";
}

export function Input({
  label,
  error,
  helpText,
  icon,
  fullWidth = true,
  variant = "glass",
  disabled,
  className,
  type = "text",
  ...props
}: InputProps) {
  const baseClasses = `
    px-4 py-2.5 rounded-xl
    transition-all duration-300
    text-text-primary placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-purple-electric/50
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses =
    variant === "glass"
      ? "glass border border-border-subtle hover:border-border-glow"
      : "bg-bg-card border border-border-subtle";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}

        <input
          type={type}
          disabled={disabled}
          className={`
            ${baseClasses}
            ${variantClasses}
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-danger/50 focus:ring-red-danger/30" : ""}
            ${className || ""}
            w-full
          `}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-danger text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}

      {helpText && !error && (
        <p className="mt-1.5 text-xs text-text-muted">{helpText}</p>
      )}
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  variant?: "default" | "glass";
  rows?: number;
}

export function TextArea({
  label,
  error,
  helpText,
  fullWidth = true,
  variant = "glass",
  disabled,
  className,
  rows = 4,
  ...props
}: TextAreaProps) {
  const baseClasses = `
    px-4 py-2.5 rounded-xl
    transition-all duration-300
    text-text-primary placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-purple-electric/50
    disabled:opacity-50 disabled:cursor-not-allowed
    resize-vertical
  `;

  const variantClasses =
    variant === "glass"
      ? "glass border border-border-subtle hover:border-border-glow"
      : "bg-bg-card border border-border-subtle";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}

      <textarea
        disabled={disabled}
        rows={rows}
        className={`
          ${baseClasses}
          ${variantClasses}
          ${error ? "border-red-danger/50 focus:ring-red-danger/30" : ""}
          ${className || ""}
          w-full
        `}
        {...props}
      />

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-danger text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}

      {helpText && !error && (
        <p className="mt-1.5 text-xs text-text-muted">{helpText}</p>
      )}
    </div>
  );
}
