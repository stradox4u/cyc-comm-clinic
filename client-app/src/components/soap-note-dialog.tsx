import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Save } from "lucide-react";
import { type SoapNote } from '../lib/schema';

export default function SoapNoteDialog({
  appointmentId,
  vitals,
  purposes,
  setAppointmentId,
  showAsDialog = true
}: {
  appointmentId: string,
  vitals: object,
  purposes: string[],
  setAppointmentId: React.Dispatch<React.SetStateAction<string | null>>;
  showAsDialog?: boolean
}) {
  const [soapNote, setSoapNote] = useState<SoapNote>({
      appointment_id:  appointmentId,
      subjective: {
        symptoms: [],
        purpose_of_appointment: purposes,
        others: ""
      },
      objective: {
        physical_exam_report: [],
        vitals_summary: vitals,
        labs: {},
        others: ""
      },
      assessment: {
        diagnosis: [],
        differential: []
      },
      plan: {
        prescription: [],
        test_requests: [],
        recommendation: [],
        has_referral: false,
        referred_provider_name: "",
        others: ""
      }
    });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(`SoapNote: ${soapNote}`);
      const res = await fetch(`/api/provider/soapnotes/record`, {
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
    // Reset form
    setSoapNote({
      appointment_id: appointmentId,
      subjective: {
        symptoms: [],
        purpose_of_appointment: purposes,
        others: ""
      },
      objective: {
        physical_exam_report: [],
        vitals_summary: vitals,
        labs: {},
        others: ""
      },
      assessment: {
        diagnosis: [],
        differential: []
      },
      plan: {
        prescription: [],
        test_requests: [],
        recommendation: [],
        has_referral: false,
        referred_provider_name: "",
        others: ""
      }
    });
  };

const existingVitals = soapNote.objective?.vitals_summary;
const excludeFields = [
  "id", "created_by_id", "appointment_id", "created_at", "updated_at"
]
const vitalsText = existingVitals
  ? Object.entries(existingVitals)
      .filter(([key]) => !excludeFields.includes(key))
      .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
      .join("\n")
  : "";

  const soapContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Subjective</label>
        <Textarea
            placeholder="Patient's description of symptoms, history of present illness, review of symptoms..."
            value={(soapNote.subjective?.symptoms ?? []).join('\n')}
            onChange={(e) =>
              setSoapNote({
                ...soapNote,
                  subjective: {
                    ...soapNote.subjective,
                      symptoms: e.target.value.split('\n'),
                  },
              })
            }
        />
        <Textarea
          placeholder="Purpose of appointment..."
          value={(soapNote.subjective?.purpose_of_appointment ?? []).join('\n')}
          readOnly
          className="cursor-not-allowed"
        />
        <Textarea
          placeholder="Review of symptoms..."
          value={soapNote.subjective?.others}
          onChange={(e) =>
          setSoapNote({
            ...soapNote,
            subjective: {
              ...soapNote.subjective,
              others: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Objective</label>
        <Textarea
          placeholder="Physical examination findings..."
          value={soapNote.objective?.physical_exam_report}
          onChange={(e) =>
            setSoapNote({
              ...soapNote,
              objective: {
                ...soapNote.objective,
                  physical_exam_report: e.target.value.split('\n'),
              },
            })
          }
        />
        <Textarea
          placeholder="Vitals..."
          value={vitalsText}
          readOnly
        className="cursor-not-allowed"
        />
        <Textarea
          placeholder="Any other observations..."
          value={soapNote.objective?.others}
          onChange={(e) =>
          setSoapNote({
            ...soapNote,
            objective: {
              ...soapNote.objective,
              others: e.target.value,
               },
            })
            }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Assessment</label>
        <Textarea
          placeholder="Clinical impression, problem list..."
          value={(soapNote.assessment?.diagnosis ?? []).join('\n')}
          onChange={(e) =>
            setSoapNote({
              ...soapNote,
              assessment: {
                ...soapNote.assessment,
                diagnosis: e.target.value.split('\n'),
              },
            })
          }
        />
        <Textarea
          placeholder="Differential diagnosis..."
          value={(soapNote.assessment?.differential ?? []).join('\n')}
          onChange={(e) =>
            setSoapNote({
              ...soapNote,
              assessment: {
                ...soapNote.assessment,
                differential: e.target.value.split('\n'),
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Plan</label>
        <div className="space-y-4">
          {(soapNote.plan?.prescription ?? []).length === 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSoapNote({
                ...soapNote,
                plan: {
                  ...soapNote.plan,
                  prescription: [
                  ...(soapNote.plan?.prescription ?? []),
                  {
                    medication_name: "",
                    dosage: "",
                    frequency: "",
                    duration: "",
                    instructions: "",
                    start_date: new Date(),
                  },
                  ],
                },
              })}
            >
            Add Prescription
            </Button>
          )}
          {(soapNote.plan?.prescription ?? []).map((prescription, index) => (
            <div key={index} className="border rounded p-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Prescription {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const updated = [...(soapNote.plan?.prescription ?? [])];
                      updated.splice(index, 1);
                      setSoapNote({
                        ...soapNote,
                         plan: { ...soapNote.plan, prescription: updated },
                      });
                    }}
                  >
                  Remove
                  </Button>
              </div>
              <Input
                placeholder="Medication Name"
                value={prescription.medication_name}
                onChange={(e) => {
                  const updated = [...(soapNote.plan?.prescription ?? [])];
                  updated[index].medication_name = e.target.value;
                  setSoapNote({
                    ...soapNote,
                    plan: { ...soapNote.plan, prescription: updated },
                  });
                }}
              />
              <Input
                placeholder="Dosage"
                value={prescription.dosage}
                onChange={(e) => {
                  const updated = [...(soapNote.plan?.prescription ?? [])];
                  updated[index].dosage = e.target.value;
                  setSoapNote({
                    ...soapNote,
                    plan: { ...soapNote.plan, prescription: updated },
                  });
                }}
              />
              <Input
                placeholder="Frequency"
                value={prescription.frequency}
                onChange={(e) => {
                  const updated = [...(soapNote.plan?.prescription ?? [])];
                  updated[index].frequency = e.target.value;
                  setSoapNote({
                    ...soapNote,
                    plan: { ...soapNote.plan, prescription: updated },
                  });
                }}
              />
              <Input
                placeholder="Duration"
                value={prescription.duration}
                onChange={(e) => {
                  const updated = [...(soapNote.plan?.prescription ?? [])];
                  updated[index].duration = e.target.value;
                  setSoapNote({
                    ...soapNote,
                    plan: { ...soapNote.plan, prescription: updated },
                  });
                }}
              />
              <Textarea
                placeholder="Instructions"
                value={prescription.instructions}
                onChange={(e) => {
                  const updated = [...(soapNote.plan?.prescription ?? [])];
                  updated[index].instructions = e.target.value;
                  setSoapNote({
                    ...soapNote,
                    plan: { ...soapNote.plan, prescription: updated },
                  });
                }}
              />
            </div>
          ))}
          <Button
            type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSoapNote({
                      ...soapNote,
                      plan: {
                        ...soapNote.plan,
                        prescription: [
                          ...(soapNote.plan?.prescription ?? []),
                          {
                            medication_name: "",
                            dosage: "",
                            frequency: "",
                            duration: "",
                            instructions: "",
                            start_date: new Date()
                          },
                        ],
                      },
                    })
                  }
                  className="mt-2"
                >
                  Save Prescription
          </Button>
        </div>
        <Textarea
          placeholder="Test requests (one per line)..."
          value={(soapNote.plan?.test_requests ?? []).join('\n')}
          onChange={(e) => 
            setSoapNote({
              ...soapNote,
              plan: {
              ...soapNote.plan,
              test_requests: e.target.value
                .split('\n')
                .filter((test) => test.trim() !== ""),
              },
            })
          }
        />
        <Textarea
          placeholder="Recommendations (one per line)..."
          value={(soapNote.plan?.recommendation ?? []).join('\n')}
          onChange={(e) => 
            setSoapNote({
              ...soapNote,
              plan: {
                ...soapNote.plan,
                recommendation: e.target.value
                  .split('\n')
                  .filter((rec) => rec.trim() !== ""),
              },
            })
          }
        />
        <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="has-referral" className="mb-0">Referral?</label>
          <input
            id="has-referral"
            type="checkbox"
            checked={soapNote.plan?.has_referral ?? false}
            onChange={(e) =>
              setSoapNote({
                ...soapNote,
                plan: {
                  ...soapNote.plan,
                  has_referral: e.target.checked,
                  referred_provider_name: e.target.checked
                    ? soapNote.plan?.referred_provider_name ?? ""
                    : "",
                },
              })
            }
          />
          </div>
          {soapNote.plan?.has_referral && (
            <Input
              id="referred-provider-name"
              placeholder="Referred provider name"
              value={soapNote.plan?.referred_provider_name ?? ""}
              onChange={(e) =>
                setSoapNote({
                  ...soapNote,
                  plan: {
                    ...soapNote.plan,
                    referred_provider_name: e.target.value,
                  },
                })
              }
              className="ml-2"
            />
          )}
        </div>
        <Textarea
          id="plan-others"
          placeholder="Other plan details..."
          value={soapNote.plan?.others ?? ""}
          onChange={(e) =>
            setSoapNote({
              ...soapNote,
              plan: {
              ...soapNote.plan,
              others: e.target.value,
              },
            })
          }
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
  );

  if (!showAsDialog) {
    return soapContent;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setAppointmentId(appointmentId)}variant="outline" size="sm">
          SOAP Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record SOAP Note</DialogTitle>
          <DialogDescription>
            Document the patient's subjective, objective, assessment, and plan.
          </DialogDescription>
        </DialogHeader>
        {soapContent}
      </DialogContent>
    </Dialog>
  );
}
