import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GoBackButton = memo(() => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-2">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="ml-3 transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-black hover:text-slate-200"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Retornar
      </Button>
    </div>
  );
});
