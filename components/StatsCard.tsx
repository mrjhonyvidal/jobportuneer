import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipWrapper } from "./TooltipWrapper";
import { Info } from "lucide-react"; // Question mark icon

type StatsCardsProps = {
  title: string;
  value: number;
  explanation: string; // Added prop for the tooltip content
};

function StatsCard({ title, value, explanation }: StatsCardsProps) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="capitalize">{title}</CardTitle>
          <TooltipWrapper content={explanation}>
            <Info className="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
          </TooltipWrapper>
        </div>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default StatsCard;
