import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ConvertSuccess } from "@/components/Converter/ConvertSuccess";
import { ConvertForm } from "@/components/Converter/ConvertForm";

export const Converter = () => {
  const [completed, setIsCompleted] = useState(false);

  return (
    <>
      <Card className="w-full max-w-4xl space-y-6 rounded-lg bg-white px-6 py-10 shadow-lg">
        {completed ? (
          <ConvertSuccess />
        ) : (
          <ConvertForm setIsCompleted={setIsCompleted} />
        )}
      </Card>
    </>
  );
};
