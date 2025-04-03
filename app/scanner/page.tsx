"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Shield, Loader2, ExternalLink, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { scanForVulnerabilities } from "@/lib/scanner"
import { VulnerabilityReport } from "@/components/vulnerability-report"
import { Badge } from "@/components/ui/badge"
import { ScanHistory } from "@/components/scan-history"
import { ScanningAnimation } from "@/components/scanning-animation"
import Link from "next/link"

export default function ScannerPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)
  const [error, setError] = useState("")
  const [scanHistory, setScanHistory] = useState<any[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [currentScanStage, setCurrentScanStage] = useState("")

  const handleScan = async () => {
    if (!url) {
      setError("Please enter a URL to scan")
      return
    }

    // Basic URL validation
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
    } catch (e) {
      setError("Please enter a valid URL")
      return
    }

    try {
      setIsScanning(true)
      setError("")
      setScanResults(null)
      setScanProgress(0)

      // Simulate scanning stages
      const stages = [
        "Initializing scanner...",
        "Performing reconnaissance...",
        "Checking HTTP headers...",
        "Analyzing response patterns...",
        "Testing for XSS vulnerabilities...",
        "Checking for SQL injection points...",
        "Scanning for CSRF vulnerabilities...",
        "Analyzing server configuration...",
        "Testing authentication mechanisms...",
        "Checking for information disclosure...",
        "Finalizing results...",
      ]

      for (let i = 0; i < stages.length; i++) {
        setCurrentScanStage(stages[i])
        setScanProgress(Math.floor((i / stages.length) * 100))
        // Wait between 300-800ms for each stage to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500))
      }

      // Complete the progress bar
      setScanProgress(100)

      // Perform the scan
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
      const results = await scanForVulnerabilities(normalizedUrl)
      setScanResults(results)

      // Add to scan history
      setScanHistory((prev) => [
        {
          url: normalizedUrl,
          timestamp: new Date().toISOString(),
          score: results.securityScore,
          issues:
            results.vulnerabilitiesSummary.high +
            results.vulnerabilitiesSummary.medium +
            results.vulnerabilitiesSummary.low,
        },
        ...prev.slice(0, 4), // Keep only the 5 most recent scans
      ])
    } catch (err) {
      setError("An error occurred during scanning. Please try again.")
      console.error(err)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto py-10 max-w-6xl px-4">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">SecureScanner</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Advanced vulnerability detection and security analysis platform
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-primary/5">
                XSS Detection
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                SQL Injection
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                CSRF Analysis
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                Header Security
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>New Security Scan</span>
                {isScanning && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardTitle>
              <CardDescription>Enter the target URL to perform a comprehensive security analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={isScanning}
                />
                <Button onClick={handleScan} disabled={isScanning} className="gap-2">
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    "Start Scan"
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isScanning && (
                <div className="mt-6">
                  <ScanningAnimation progress={scanProgress} stage={currentScanStage} />
                </div>
              )}
            </CardContent>
            {!isScanning && !scanResults && (
              <CardFooter className="text-sm text-muted-foreground border-t pt-6">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>All scans are performed for educational purposes only</span>
                </div>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>History of your previous security analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <ScanHistory history={scanHistory} />
            </CardContent>
          </Card>
        </div>

        {scanResults && (
          <div className="mt-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <VulnerabilityReport results={scanResults} />
              </TabsContent>
              <TabsContent value="vulnerabilities">
                <Card>
                  <CardHeader>
                    <CardTitle>Detected Vulnerabilities</CardTitle>
                    <CardDescription>Detailed analysis of security issues found during the scan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scanResults.vulnerabilities.length > 0 ? (
                        scanResults.vulnerabilities.map((vuln: any, index: number) => (
                          <Alert
                            key={index}
                            className={`
                              mb-4
                              ${
                                vuln.severity === "high"
                                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                                  : vuln.severity === "medium"
                                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                                    : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                              }
                            `}
                          >
                            <AlertCircle
                              className={`h-4 w-4 ${
                                vuln.severity === "high"
                                  ? "text-red-500"
                                  : vuln.severity === "medium"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                              }`}
                            />
                            <AlertTitle className="font-semibold flex items-center gap-2">
                              {vuln.name}
                              <Badge
                                variant={
                                  vuln.severity === "high"
                                    ? "destructive"
                                    : vuln.severity === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {vuln.severity.toUpperCase()}
                              </Badge>
                            </AlertTitle>
                            <AlertDescription>
                              <p className="mt-2">{vuln.description}</p>
                              <div className="mt-4 text-sm">
                                <div>
                                  <strong>Location:</strong> {vuln.location}
                                </div>
                                {vuln.evidence && (
                                  <div className="mt-1">
                                    <strong>Evidence:</strong>
                                    <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                                      {vuln.evidence}
                                    </pre>
                                  </div>
                                )}
                                {vuln.cvss && (
                                  <div className="mt-1">
                                    <strong>CVSS Score:</strong> {vuln.cvss}
                                  </div>
                                )}
                              </div>
                            </AlertDescription>
                          </Alert>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                          <h3 className="text-xl font-medium mb-2">No Vulnerabilities Detected</h3>
                          <p className="text-muted-foreground max-w-md">
                            Our scan did not detect any vulnerabilities in this target. However, this does not guarantee
                            complete security.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Recommendations</CardTitle>
                    <CardDescription>Actionable steps to improve the security posture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {scanResults.recommendations.length > 0 ? (
                      <div className="space-y-6">
                        {scanResults.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className="mt-0.5">
                              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">{rec.title}</h3>
                              <p className="text-sm text-muted-foreground">{rec.description}</p>
                              {rec.code && (
                                <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-x-auto">{rec.code}</pre>
                              )}
                              {rec.resources && (
                                <div className="mt-2">
                                  <h4 className="text-xs font-medium mb-1">Resources:</h4>
                                  <ul className="text-xs space-y-1">
                                    {rec.resources.map((resource: string, i: number) => (
                                      <li key={i} className="flex items-center gap-1">
                                        <ExternalLink className="h-3 w-3" />
                                        <a href="#" className="text-primary hover:underline">
                                          {resource}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No recommendations available.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="technical">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                    <CardDescription>Detailed technical information about the scan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">HTTP Headers</h3>
                        <div className="bg-muted rounded-md p-3 overflow-x-auto">
                          <pre className="text-xs">{scanResults.technicalDetails.headers}</pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Technologies Detected</h3>
                        <div className="flex flex-wrap gap-2">
                          {scanResults.technicalDetails.technologies.map((tech: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Open Ports</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {scanResults.technicalDetails.ports.map((port: any, i: number) => (
                            <div key={i} className="bg-muted rounded-md p-2 text-xs">
                              <span className="font-medium">{port.number}</span>
                              <span className="text-muted-foreground ml-2">{port.service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">DNS Information</h3>
                        <div className="bg-muted rounded-md p-3 overflow-x-auto">
                          <pre className="text-xs">{scanResults.technicalDetails.dns}</pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>SecureScanner v1.0 - Educational Tool for Security Research</p>
          <p className="mt-1">
            This tool is designed for educational purposes only. Always obtain proper authorization before scanning any
            website.
          </p>
        </footer>
      </div>
    </div>
  )
}
