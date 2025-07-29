import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Search,
  User,
} from "lucide-react";

export default function InsuranceCheck() {
  const [checkData, setCheckData] = useState({
    patientName: "",
    dateOfBirth: "",
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
  });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);

  const handleInsuranceCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        eligible: Math.random() > 0.3, // 70% chance of being eligible
        provider: checkData.insuranceProvider,
        policyNumber: checkData.policyNumber,
        patientName: checkData.patientName,
        copay: Math.random() > 0.5 ? "$25" : "$40",
        deductible: `$${Math.floor(Math.random() * 2000) + 500}`,
        deductibleMet: Math.random() > 0.6,
        coverageDetails: {
          primaryCare: true,
          specialist: true,
          emergency: true,
          prescription: Math.random() > 0.2,
          mentalHealth: Math.random() > 0.4,
          preventive: true,
        },
        notes:
          Math.random() > 0.7
            ? "Prior authorization required for specialist visits"
            : null,
      };

      setCheckResult(mockResult);
      setIsChecking(false);
      // toast.custom({
      //   title: mockResult.eligible ? "Insurance Verified" : "Insurance Issue",
      //   description: mockResult.eligible
      //     ? "Patient insurance is active and eligible for services"
      //     : "Insurance verification failed - please check details",
      //   variant: mockResult.eligible ? "default" : "destructive",
      // });
    }, 2000);
  };

  const recentChecks = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      provider: "Blue Cross Blue Shield",
      status: "eligible",
      checkedAt: "2024-01-15 09:30 AM",
      copay: "$25",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      provider: "Aetna",
      status: "eligible",
      checkedAt: "2024-01-15 09:15 AM",
      copay: "$40",
    },
    {
      id: 3,
      patientName: "Emma Davis",
      provider: "Cigna",
      status: "not-eligible",
      checkedAt: "2024-01-15 08:45 AM",
      copay: "N/A",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      provider: "United Healthcare",
      status: "eligible",
      checkedAt: "2024-01-15 08:30 AM",
      copay: "$30",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Insurance Verification</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Insurance Eligibility Check
          </h2>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Batch Check
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Insurance Check Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Verify Insurance Eligibility
              </CardTitle>
              <CardDescription>
                Enter patient and insurance information to check eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInsuranceCheck} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={checkData.patientName}
                    onChange={(e) =>
                      setCheckData((prev) => ({
                        ...prev,
                        patientName: e.target.value,
                      }))
                    }
                    placeholder="Enter patient full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={checkData.dateOfBirth}
                    onChange={(e) =>
                      setCheckData((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">
                    Insurance Provider *
                  </Label>
                  <Input
                    id="insuranceProvider"
                    value={checkData.insuranceProvider}
                    onChange={(e) =>
                      setCheckData((prev) => ({
                        ...prev,
                        insuranceProvider: e.target.value,
                      }))
                    }
                    placeholder="e.g., Blue Cross Blue Shield"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy/Member ID *</Label>
                  <Input
                    id="policyNumber"
                    value={checkData.policyNumber}
                    onChange={(e) =>
                      setCheckData((prev) => ({
                        ...prev,
                        policyNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter policy or member ID"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupNumber">Group Number</Label>
                  <Input
                    id="groupNumber"
                    value={checkData.groupNumber}
                    onChange={(e) =>
                      setCheckData((prev) => ({
                        ...prev,
                        groupNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter group number (if applicable)"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isChecking}>
                  {isChecking ? (
                    <>
                      <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                      Checking Insurance...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check Eligibility
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Check Results */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
              <CardDescription>
                Insurance eligibility status and coverage details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkResult ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {checkResult.eligible ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      {checkResult.eligible
                        ? "Insurance Active & Eligible"
                        : "Insurance Not Eligible"}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Patient:
                      </span>
                      <span className="font-medium">
                        {checkResult.patientName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Provider:
                      </span>
                      <span className="font-medium">
                        {checkResult.provider}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Policy:
                      </span>
                      <span className="font-medium">
                        {checkResult.policyNumber}
                      </span>
                    </div>

                    {checkResult.eligible && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Copay:
                          </span>
                          <span className="font-medium">
                            {checkResult.copay}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Deductible:
                          </span>
                          <span className="font-medium">
                            {checkResult.deductible}
                            {checkResult.deductibleMet && (
                              <Badge variant="default" className="ml-2 text-xs">
                                Met
                              </Badge>
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {checkResult.eligible && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Coverage Details:
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(checkResult.coverageDetails).map(
                          ([key, covered]) => (
                            <div
                              key={key}
                              className="flex items-center space-x-2"
                            >
                              {covered ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500" />
                              )}
                              <span className="text-xs capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {checkResult.notes && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          {checkResult.notes}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Enter patient information and click "Check Eligibility" to
                    verify insurance coverage
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Checks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Insurance Checks</CardTitle>
            <CardDescription>
              History of recent insurance eligibility verifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentChecks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{check.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {check.provider} • {check.checkedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{check.copay}</span>
                    <Badge
                      variant={
                        check.status === "eligible" ? "default" : "destructive"
                      }
                    >
                      {check.status === "eligible" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Eligible
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Not Eligible
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
