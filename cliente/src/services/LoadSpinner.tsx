import { RefreshCcwDot }  from 'lucide-react';

export const LoaderSpinner = () => {
  return (
    <div className="loading">
      <div className="animate-spin">
        <RefreshCcwDot size={30} />
        
      </div>
    </div>
  )
}