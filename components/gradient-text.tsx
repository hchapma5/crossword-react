import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => {
  return (
    <span className="gradient-text hover:animate-gradient">{children}</span>
  );
};

export default GradientText;
