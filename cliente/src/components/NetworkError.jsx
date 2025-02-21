
import { useToast } from "./ui/use-toast";

const NetworkError = ( error ) => {
  console.log('error toast')
    const { toast } = useToast();
        toast({
      title: "Error",
      description: `Se ha producido un error en la comunicación con el server ${error.message}`,
    })
  return null
}

export default NetworkError