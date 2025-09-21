import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GoBackButton = memo(() => {
  const navigate = useNavigate();
  return (
    
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="ml-3 transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-black hover:text-slate-200"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Retornar
      </Button>
    
  );
});
