import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import { TooltipWrapper } from "../shared/TooltipWrapper";

type StatsCardsProps = {
  title: string;
  value: number;
  explanation: string;
};

function StatsCard({ title, value, explanation }: StatsCardsProps) {
  return (
    <Card className="bg-muted transition-transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="capitalize text-lg">{title}</CardTitle>
          <TooltipWrapper content={explanation}>
            <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
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
