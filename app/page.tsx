import Link from "next/link"
import { Shield, CheckCircle, AlertTriangle, Lock, ArrowRight, Server, Database, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SecureScanner</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/scanner">
              <Button>Launch Scanner</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex bg-primary/10 text-primary border-primary/20 mb-2">
                  Educational Security Tool
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Advanced Web Vulnerability Scanner
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Identify security vulnerabilities in web applications with our comprehensive scanning platform. Built
                  for educational purposes and security research.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/scanner">
                  <Button size="lg" className="gap-2">
                    Start Scanning <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-primary/20 via-muted/30 to-muted shadow-xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <Shield className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-bold">SecureScanner</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Comprehensive vulnerability detection and analysis
                  </p>
                  <div className="flex gap-2 mt-6">
                    <Badge variant="outline" className="bg-primary/5">
                      XSS Detection
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5">
                      SQL Injection
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5">
                      CSRF Analysis
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Comprehensive Security Analysis</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our scanner detects a wide range of vulnerabilities and provides actionable recommendations to improve
                your security posture.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Vulnerability Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Identifies common web vulnerabilities including XSS, SQL injection, CSRF, and insecure
                    configurations.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Security Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Provides actionable recommendations with code examples to fix identified vulnerabilities.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Technical Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Examines HTTP headers, server configurations, and technology stack to identify security weaknesses.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Process</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How SecureScanner Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our scanner follows a systematic approach to identify and report security vulnerabilities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
            <div className="grid gap-8">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Enter Target URL</h3>
                  <p className="text-muted-foreground">
                    Start by entering the URL of the website you want to scan for vulnerabilities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Automated Scanning</h3>
                  <p className="text-muted-foreground">
                    Our scanner analyzes the target for common vulnerabilities, examines HTTP headers, and checks server
                    configurations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Comprehensive Report</h3>
                  <p className="text-muted-foreground">
                    Review a detailed report with identified vulnerabilities, security score, and actionable
                    recommendations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Implement Fixes</h3>
                  <p className="text-muted-foreground">
                    Follow the provided recommendations and code examples to address the identified security issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/scanner">
              <Button size="lg" className="gap-2">
                Try It Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                About The Project
              </div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Educational Security Tool
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SecureScanner Pro was developed as an educational tool to help developers and security researchers
                understand common web vulnerabilities and how to detect them.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                This project is designed for educational purposes only. Always obtain proper authorization before
                scanning any website.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Technologies Used
              </div>
              <h3 className="text-2xl font-bold">Built With Modern Tools</h3>
              <p className="text-muted-foreground">
                This project leverages cutting-edge technologies to provide a comprehensive security scanning
                experience.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>Next.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Security APIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Scan Your Website?</h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start using our vulnerability scanner to identify security issues and improve your web application's
                security posture.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/scanner">
                <Button size="lg" variant="secondary" className="gap-2">
                  Launch Scanner <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">SecureScanner</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SecureScanner. Educational tool for security research.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
