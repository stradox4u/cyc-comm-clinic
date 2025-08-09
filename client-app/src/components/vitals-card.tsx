import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type VitalsCardProps = {
  blood_pressure?: string | undefined;
  heart_rate?: string | undefined;
  temperature?: string | undefined;
  height?: string | undefined;
  weight?: string | undefined;
  respiratory_rate?: string | undefined;
  oxygen_saturation?: string | undefined;
  others?: string | undefined;
  created_at?: string | undefined;
  created_by_id?: string;
  created_by?: {
    id: string;
    first_name: string;
    last_name: string;
    role_title: string;
  };
};

export const VitalsCard = ({
  blood_pressure,
  heart_rate,
  temperature,
  height,
  weight,
  respiratory_rate,
  oxygen_saturation,
  others,
  created_at,
  created_by,
}: VitalsCardProps) => {
 
  return (
    <Card className="my-4 w-full">
      <CardHeader>
        <CardTitle>Vitals Summary</CardTitle>
        <div className="text-xs text-gray-400 mt-2">
          Recorded at:{" "}
          {created_at ? new Date(created_at).toLocaleString() : "N/A"}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Recorded by:{" "}
          {created_by 
            ? `${created_by.role_title} ${created_by.first_name} ${created_by.last_name}`
            : "N/A"}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
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
        <div className="flex flex-col  items-center">
          <span className="font-medium">Respiratory Rate</span>{" "}
          <Badge variant="outline">{respiratory_rate ? `${respiratory_rate}` : "N/A"}</Badge>
        </div>
        <div className="flex flex-col  items-center">
          <span className="font-medium">O2 Saturation</span>{" "}
          <Badge variant="outline">{oxygen_saturation ? `${oxygen_saturation}%` : "N/A"}</Badge>
        </div>
        <div className="flex flex-col  items-center">
          <span className="font-medium">Notes</span>{" "}
          <Badge variant="outline">{others ? `${others}%` : "N/A"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
