import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { type SoapNote } from "../lib/schema";

export type SoapNoteCardProps = {
  soapNote: SoapNote;
  created_at?: string;
  created_by?: {
    id: string;
    first_name: string;
    last_name: string;
    role_title: string;
  };
};

export const SoapNoteCard = ({
  soapNote,
  created_at,
  created_by,
}: SoapNoteCardProps) => {
  return (
    <Card className="my-4 w-full">
      <CardHeader>
        <CardTitle>SOAP Note</CardTitle>
        <div className="text-xs text-gray-400 mt-2">
          Created at:{" "}
          {created_at ? new Date(created_at).toLocaleString() : "N/A"}
        </div>
        {created_by && (
          <div className="text-xs text-gray-400 mt-1">
            Created by:{" "}
            {`${created_by.role_title} ${created_by.first_name} ${created_by.last_name}`}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subjective Section */}
        {soapNote.subjective && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600">Subjective</h3>
            {soapNote.subjective.symptoms && soapNote.subjective.symptoms.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {soapNote.subjective.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="secondary">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {soapNote.subjective.purpose_of_appointment && soapNote.subjective.purpose_of_appointment.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Purpose of Appointment:</h4>
                <div className="flex flex-wrap gap-2">
                  {soapNote.subjective.purpose_of_appointment.map((purpose, index) => (
                    <Badge key={index} variant="outline">
                      {purpose}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {soapNote.subjective.others && (
              <div>
                <h4 className="font-medium mb-2">Additional Notes:</h4>
                <p className="text-sm text-gray-600">{soapNote.subjective.others}</p>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Objective Section */}
        {soapNote.objective && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-600">Objective</h3>
            {soapNote.objective.physical_exam_report && soapNote.objective.physical_exam_report.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Physical Exam:</h4>
                <div className="flex flex-wrap gap-2">
                  {soapNote.objective.physical_exam_report.map((exam, index) => (
                    <Badge key={index} variant="secondary">
                      {exam}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {soapNote.objective.vitals_summary && (
              <div>
                <h4 className="font-medium mb-2">Vitals Summary:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                  {soapNote.objective.vitals_summary.blood_pressure && (
                    <div className="text-center">
                      <span className="text-xs text-gray-500">BP</span>
                      <p className="font-medium">{soapNote.objective.vitals_summary.blood_pressure}</p>
                    </div>
                  )}
                  {soapNote.objective.vitals_summary.heart_rate && (
                    <div className="text-center">
                      <span className="text-xs text-gray-500">HR</span>
                      <p className="font-medium">{soapNote.objective.vitals_summary.heart_rate} bpm</p>
                    </div>
                  )}
                  {soapNote.objective.vitals_summary.temperature && (
                    <div className="text-center">
                      <span className="text-xs text-gray-500">Temp</span>
                      <p className="font-medium">{soapNote.objective.vitals_summary.temperature}°F</p>
                    </div>
                  )}
                  {soapNote.objective.vitals_summary.oxygen_saturation && (
                    <div className="text-center">
                      <span className="text-xs text-gray-500">O2 Sat</span>
                      <p className="font-medium">{soapNote.objective.vitals_summary.oxygen_saturation}%</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {soapNote.objective.labs && (
              <div>
                <h4 className="font-medium mb-2">Lab Results:</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(soapNote.objective.labs, null, 2)}
                  </pre>
                </div>
              </div>
            )}
            {soapNote.objective.others && (
              <div>
                <h4 className="font-medium mb-2">Additional Findings:</h4>
                <p className="text-sm text-gray-600">{soapNote.objective.others}</p>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Assessment Section */}
        {soapNote.assessment && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-orange-600">Assessment</h3>
            {soapNote.assessment.diagnosis && soapNote.assessment.diagnosis.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Diagnosis:</h4>
                <div className="flex flex-wrap gap-2">
                  {soapNote.assessment.diagnosis.map((diagnosis, index) => (
                    <Badge key={index} variant="default">
                      {diagnosis}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {soapNote.assessment.differential && soapNote.assessment.differential.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Differential Diagnosis:</h4>
                <div className="flex flex-wrap gap-2">
                  {soapNote.assessment.differential.map((diff, index) => (
                    <Badge key={index} variant="outline">
                      {diff}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Plan Section */}
        {soapNote.plan && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-600">Plan</h3>
            {soapNote.plan.prescription && soapNote.plan.prescription.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Prescriptions:</h4>
                <div className="space-y-2">
                  {soapNote.plan.prescription.map((prescription, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{prescription.medication_name}</div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Dosage:</span> {prescription.dosage} | 
                        <span className="font-medium"> Frequency:</span> {prescription.frequency} | 
                        <span className="font-medium"> Duration:</span> {prescription.duration}
                      </div>
                      {prescription.instructions && (
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Instructions:</span> {prescription.instructions}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Start Date: {new Date(prescription.start_date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {soapNote.plan.test_requests && (
              <div>
                <h4 className="font-medium mb-2">Test Requests:</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(soapNote.plan.test_requests, null, 2)}
                  </pre>
                </div>
              </div>
            )}
            {soapNote.plan.recommendation && (
              <div>
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(soapNote.plan.recommendation, null, 2)}
                  </pre>
                </div>
              </div>
            )}
            {soapNote.plan.has_referral && soapNote.plan.referred_provider_name && (
              <div>
                <h4 className="font-medium mb-2">Referral:</h4>
                <Badge variant="secondary">
                  Referred to: {soapNote.plan.referred_provider_name}
                </Badge>
              </div>
            )}
            {soapNote.plan.others && (
              <div>
                <h4 className="font-medium mb-2">Additional Plan Notes:</h4>
                <p className="text-sm text-gray-600">{soapNote.plan.others}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};