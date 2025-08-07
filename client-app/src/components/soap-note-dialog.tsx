import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Save } from "lucide-react";

export default function SoapNoteDialog({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [soapNote, setSoapNote] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/soap-note/${appointmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(soapNote),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit SOAP note");
      }

      // Reset form or show toast here
    } catch (error) {
      console.error("SOAP Note Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          SOAP Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record SOAP Note</DialogTitle>
          <DialogDescription>
            Document the patient's subjective, objective, assessment, and plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subjective</label>
            <Textarea
              value={soapNote.subjective}
              onChange={(e) =>
                setSoapNote({ ...soapNote, subjective: e.target.value })
              }
              placeholder="Patient's self-reported symptoms..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Objective</label>
            <Textarea
              value={soapNote.objective}
              onChange={(e) =>
                setSoapNote({ ...soapNote, objective: e.target.value })
              }
              placeholder="Measurable/observed data..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assessment</label>
            <Textarea
              value={soapNote.assessment}
              onChange={(e) =>
                setSoapNote({ ...soapNote, assessment: e.target.value })
              }
              placeholder="Diagnosis or summary of findings..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan</label>
            <Textarea
              value={soapNote.plan}
              onChange={(e) =>
                setSoapNote({ ...soapNote, plan: e.target.value })
              }
              placeholder="Treatment plan or next steps..."
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save SOAP Note
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
