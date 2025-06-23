import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    ${isCompleted 
                      ? 'bg-success-900 text-white' 
                      : isCurrent 
                        ? 'bg-primary-900 text-white' 
                        : 'bg-neutral-200 text-neutral-600'
                    }
                  `}
                >
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-primary-900' : 'text-neutral-600'}`}>
                    {step}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4
                    ${isCompleted ? 'bg-success-900' : 'bg-neutral-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile Step Names */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-primary-900">
          {steps[currentStep - 1]}
        </p>
        <p className="text-xs text-neutral-600">
          Étape {currentStep} sur {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;