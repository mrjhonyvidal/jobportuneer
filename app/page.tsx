import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Button>Default Button </Button>
      <Button variant="outline" size="icon">
        <Camera> </Camera>
      </Button>
    </div>
  );
};
export default HomePage;
