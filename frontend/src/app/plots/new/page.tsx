import {Card, CardContent, CardHeader, Grid} from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

function PlotsNewPage() {
  return (
    <div>
      <Card>
        <CardContent>
            <form>
                <Label>
                    Nombre Parcela
                </Label>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}