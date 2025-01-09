import { CircleCheck } from "lucide-react";

//back button
export const ConvertSuccess = () => {
  return (
    <div className="flex flex-col items-center">
      <CircleCheck className="mb-4 h-24 w-24 text-green-500" />
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
        Converted successfully!
      </h1>
    </div>
  );
};
