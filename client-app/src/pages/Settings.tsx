import { Calendar, GlobeIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import { Badge } from "../components/ui/badge";
import GoogleModal from "../components/auth/google-modal";
import { useState } from "react";

const Settings = () => {
  const { user, setUser } = useAuthStore();
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const calendarAuth = searchParams.get("calendar-auth");

  if (calendarAuth && calendarAuth === "success") {
    setUser({ ...user!, has_calendar_acccess: true });

    toast.success("Google calendar authorization confirmed");
  } else if (calendarAuth && calendarAuth === "failed") {
    toast.error("Authorization failed. Try again");
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-">
        <Card>
          <CardHeader>
            <CardTitle>Personal Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Google Calendar Access</div>
                <div className="text-sm text-muted-foreground">
                  Automatically updates your calendar with confirmed
                  appointments
                </div>
              </div>
            </div>
            {user?.has_calendar_acccess ? (
              <Badge className="bg-success">CONFIRMED</Badge>
            ) : (
              <Button onClick={() => setShowGoogleModal(true)}>
                <GlobeIcon />
                Authorize Access
              </Button>
            )}
          </CardContent>
        </Card>
        {showGoogleModal && <GoogleModal open={true} />}
      </div>
    </>
  );
};
export default Settings;
