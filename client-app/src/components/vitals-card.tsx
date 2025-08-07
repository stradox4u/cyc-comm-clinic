import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type VitalsCardProps = {
  blood_pressure?: string | undefined;
  heart_rate?: string | undefined;
  temperature?: string | undefined;
  height?: string | undefined;
  weight?: string | undefined;
  created_at?: string | undefined;
};

export const VitalsCard = ({
  blood_pressure,
  heart_rate,
  temperature,
  height,
  weight,
  created_at,
}: VitalsCardProps) => {
  return (
    <Card className="my-4 w-full">
      <CardHeader>
        <CardTitle>Vitals Summary</CardTitle>
        <div className="text-xs text-gray-400 mt-2">
          Recorded at:{" "}
          {created_at ? new Date(created_at).toLocaleString() : "N/A"}
        </div>
      </CardHeader>
      <CardContent className="flex gap-12 justify-between w-full">
        <div className="flex flex-col items-center">
          <span className="font-medium">Blood Pressure</span>{" "}
          <Badge variant="outline">{blood_pressure || "N/A"}</Badge>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Heart Rate</span>{" "}
          <Badge variant="outline">
            {heart_rate ? `${heart_rate} bpm` : "N/A"}
          </Badge>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Temperature:</span>{" "}
          <Badge variant="outline">
            {temperature ? `${temperature} °F` : "N/A"}
          </Badge>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Height</span>{" "}
          <Badge variant="outline">{height ? `${height} inches` : "N/A"}</Badge>
        </div>
        <div className="flex flex-col  items-center">
          <span className="font-medium">Weight</span>{" "}
          <Badge variant="outline">{weight ? `${weight} kg` : "N/A"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
