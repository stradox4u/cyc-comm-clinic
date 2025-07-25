interface ProgressIndicatorProps {
  step: number;
  progressPercentage: number;
}

const ProgressIndicator = ({ progressPercentage }: ProgressIndicatorProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-full bg-[#6A5CA3]/30 rounded h-1.5 overflow-hidden">
        <div
          className="bg-[#6A5CA3] h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-black font-semibold text-nowrap">
        {progressPercentage}% completed
      </p>
    </div>
  );
};

export default ProgressIndicator;
