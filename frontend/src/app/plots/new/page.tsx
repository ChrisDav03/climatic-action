import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { PlotForm } from "./plotForm";

async function PlotsNewPage() {
  return (
    <div>
      <Card>
        <CardContent>
          <PlotForm />
        </CardContent>
      </Card>
    </div>
  );
}
export default PlotsNewPage