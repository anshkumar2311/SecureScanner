// This is a simulated scanner for educational purposes
// A real scanner would implement actual vulnerability detection logic

interface ScanResult {
  url: string
  scanDate: string
  scanDuration: string
  securityScore: number
  riskLevel: string
  vulnerabilitiesSummary: {
    high: number
    medium: number
    low: number
  }
  vulnerabilities: Array<{
    name: string
    severity: string
    description: string
    location: string
    evidence?: string
    cvss?: string
  }>
  recommendations: Array<{
    title: string
    description: string
    code?: string
    resources?: string[]
  }>
  technicalDetails: {
    headers: string
    technologies: string[]
    ports: Array<{
      number: number
      service: string
    }>
    dns: string
  }
}

export async function scanForVulnerabilities(url: string): Promise<ScanResult> {
  // In a real application, this would perform actual vulnerability scanning
  // This is a simulated response for educational purposes

  // Simulate scanning delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Extract domain for more realistic simulation
  const domain = new URL(url).hostname

  // Generate different vulnerabilities based on the URL to make it seem more realistic
  const vulnerabilities = generateVulnerabilities(domain)

  // Count vulnerabilities by severity
  const high = vulnerabilities.filter((v) => v.severity === "high").length
  const medium = vulnerabilities.filter((v) => v.severity === "medium").length
  const low = vulnerabilities.filter((v) => v.severity === "low").length

  // Calculate a security score (lower with more severe issues)
  const securityScore = Math.max(0, 100 - (high * 15 + medium * 7 + low * 2))

  // Determine risk level
  let riskLevel = "Low"
  if (high > 0) riskLevel = "High"
  else if (medium > 0) riskLevel = "Medium"

  // Generate scan duration (random between 15-45 seconds)
  const scanDuration = `${15 + Math.floor(Math.random() * 30)} seconds`

  return {
    url,
    scanDate: new Date().toLocaleString(),
    scanDuration,
    securityScore,
    riskLevel,
    vulnerabilitiesSummary: {
      high,
      medium,
      low,
    },
    vulnerabilities,
    recommendations: generateRecommendations(vulnerabilities),
    technicalDetails: generateTechnicalDetails(domain),
  }
}

function generateVulnerabilities(domain: string) {
  // Create a deterministic but seemingly random set of vulnerabilities based on domain
  const domainHash = hashCode(domain)
  const vulnerabilityPool = [
    {
      name: "Cross-Site Scripting (XSS)",
      severity: "high",
      description:
        "The application does not properly sanitize user input before reflecting it in the response, allowing attackers to inject malicious scripts that execute in users' browsers.",
      location: "/search?q=parameter",
      evidence: `<script>alert('XSS Vulnerability Found')</script>`,
      cvss: "8.2",
    },
    {
      name: "SQL Injection",
      severity: "high",
      description:
        "The application constructs SQL queries using unsanitized user input, potentially allowing attackers to manipulate database queries and access unauthorized data.",
      location: "/products?id=parameter",
      evidence: "id=1' OR '1'='1",
      cvss: "8.5",
    },
    {
      name: "Missing Content Security Policy",
      severity: "medium",
      description:
        "The application does not implement a Content Security Policy header, which helps prevent XSS attacks by specifying which dynamic resources are allowed to load.",
      location: "HTTP Headers",
      cvss: "5.8",
    },
    {
      name: "Insecure Cookie Configuration",
      severity: "medium",
      description:
        "Cookies are being set without the 'secure' and 'HttpOnly' flags, which means they could be transmitted over unencrypted connections and accessed by client-side scripts.",
      location: "HTTP Headers",
      evidence: "Set-Cookie: sessionid=123456; path=/",
      cvss: "5.4",
    },
    {
      name: "Server Information Disclosure",
      severity: "low",
      description:
        "The server is revealing detailed version information in HTTP headers, which could help attackers identify specific vulnerabilities in the server software.",
      location: "HTTP Headers",
      evidence: "Server: Apache/2.4.41 (Ubuntu)",
      cvss: "3.7",
    },
    {
      name: "Cross-Site Request Forgery (CSRF)",
      severity: "medium",
      description:
        "The application does not implement anti-CSRF tokens, making it vulnerable to cross-site request forgery attacks where unauthorized commands are transmitted from a user the website trusts.",
      location: "/user/profile",
      cvss: "6.8",
    },
    {
      name: "Outdated TLS Version",
      severity: "medium",
      description:
        "The server supports outdated TLS protocols (TLS 1.0/1.1) which have known vulnerabilities and have been deprecated by major browsers.",
      location: "TLS Configuration",
      cvss: "5.9",
    },
    {
      name: "Open Redirect",
      severity: "low",
      description:
        "The application allows redirects to arbitrary external domains, which could be exploited in phishing attacks.",
      location: "/redirect?url=parameter",
      evidence: "/redirect?url=https://malicious-site.com",
      cvss: "4.3",
    },
    {
      name: "Insecure CORS Configuration",
      severity: "medium",
      description:
        "The application has a permissive CORS policy that allows requests from any origin, potentially enabling cross-origin attacks.",
      location: "HTTP Headers",
      evidence: "Access-Control-Allow-Origin: *",
      cvss: "5.5",
    },
    {
      name: "Missing HTTP Strict Transport Security",
      severity: "low",
      description:
        "The application does not implement HSTS, which helps protect against protocol downgrade attacks and cookie hijacking.",
      location: "HTTP Headers",
      cvss: "3.8",
    },
  ]

  // Select a subset of vulnerabilities based on domain hash
  const numVulnerabilities = domainHash % 7 // 0-6 vulnerabilities

  // If we get 0, return an empty array (no vulnerabilities)
  if (numVulnerabilities === 0) {
    return []
  }

  // Shuffle the vulnerability pool deterministically based on domain
  const shuffled = [...vulnerabilityPool].sort(() => (domainHash % 13) - 6)

  // Take the first n vulnerabilities
  return shuffled.slice(0, numVulnerabilities)
}

function generateRecommendations(vulnerabilities: any[]) {
  const recommendationMap = {
    "Cross-Site Scripting (XSS)": {
      title: "Implement proper input validation and output encoding",
      description:
        "Sanitize all user inputs and encode output to prevent XSS attacks. Use context-appropriate encoding when inserting untrusted data into HTML, JavaScript, CSS, or URLs.",
      code: `// Example using DOMPurify library
import DOMPurify from 'dompurify';

// Sanitize user input
const userInput = req.body.comment;
const sanitizedInput = DOMPurify.sanitize(userInput);

// Now safe to insert into HTML
document.getElementById('comment').innerHTML = sanitizedInput;`,
      resources: ["OWASP XSS Prevention Cheat Sheet", "Content Security Policy (CSP) Implementation Guide"],
    },
    "SQL Injection": {
      title: "Use parameterized queries or prepared statements",
      description:
        "Never concatenate user input directly into SQL queries. Use parameterized queries, prepared statements, or an ORM to ensure proper separation of code and data.",
      code: `// Example using parameterized query with Node.js and MySQL
const mysql = require('mysql2/promise');

async function getUserData(userId) {
  const connection = await mysql.createConnection({/*config*/});
  
  // Safe parameterized query
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?', 
    [userId]
  );
  
  return rows;
}`,
      resources: ["OWASP SQL Injection Prevention Cheat Sheet", "Bobby Tables: A guide to preventing SQL injection"],
    },
    "Missing Content Security Policy": {
      title: "Implement a Content Security Policy",
      description:
        "Add a Content Security Policy header to restrict which resources can be loaded and executed by the browser, reducing the risk of XSS and other code injection attacks.",
      code: `// Example CSP header
Content-Security-Policy: default-src 'self'; 
  script-src 'self' https://trusted-cdn.com; 
  style-src 'self' https://trusted-cdn.com; 
  img-src 'self' data: https://trusted-cdn.com; 
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  form-action 'self';`,
      resources: ["MDN Content Security Policy Guide", "CSP Evaluator Tool"],
    },
    "Insecure Cookie Configuration": {
      title: "Set secure attributes on cookies",
      description:
        "Always set the Secure, HttpOnly, and SameSite attributes on sensitive cookies to prevent theft and unauthorized access.",
      code: `// Example in Express.js
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    secure: true,        // Only sent over HTTPS
    httpOnly: true,      // Not accessible via JavaScript
    sameSite: 'strict',  // Only sent in same-site requests
    maxAge: 3600000      // Session timeout
  }
}));`,
      resources: ["OWASP Session Management Cheat Sheet", "HTTP Cookies Security Best Practices"],
    },
    "Server Information Disclosure": {
      title: "Minimize server information disclosure",
      description:
        "Configure your server to not reveal detailed version information in HTTP headers, error pages, or other responses.",
      code: `# Example for Apache (in httpd.conf)
ServerTokens Prod
ServerSignature Off

# Example for Nginx (in nginx.conf)
server_tokens off;`,
      resources: ["OWASP Information Leakage Prevention", "Server Hardening Guidelines"],
    },
  }

  // Generate recommendations based on found vulnerabilities
  const recommendations = vulnerabilities.map((vuln) => {
    // If we have a specific recommendation for this vulnerability, use it
    if (recommendationMap[vuln.name]) {
      return recommendationMap[vuln.name]
    }

    // Otherwise, generate a generic recommendation
    return {
      title: `Fix ${vuln.name}`,
      description: `Address the ${vuln.severity} severity ${vuln.name} vulnerability to improve security.`,
      resources: ["OWASP Top 10 Web Application Security Risks"],
    }
  })

  // Add general recommendations if there are few specific ones
  if (recommendations.length < 3) {
    recommendations.push({
      title: "Implement regular security testing",
      description:
        "Conduct regular security assessments, including penetration testing and code reviews, to identify and address vulnerabilities early.",
      resources: ["OWASP Testing Guide", "Web Application Security Testing Methodology"],
    })

    recommendations.push({
      title: "Keep software components updated",
      description:
        "Regularly update all software components, libraries, and frameworks to ensure you have the latest security patches.",
      resources: ["OWASP Dependency Check", "Software Composition Analysis Best Practices"],
    })
  }

  return recommendations
}

function generateTechnicalDetails(domain: string) {
  // Generate realistic-looking technical details based on the domain
  const domainHash = hashCode(domain)

  // Generate a list of technologies based on domain hash
  const techPool = [
    "Apache",
    "Nginx",
    "IIS",
    "Node.js",
    "Express",
    "React",
    "Angular",
    "Vue.js",
    "jQuery",
    "Bootstrap",
    "WordPress",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Cloudflare",
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes",
    "Docker",
    "Varnish",
    "Memcached",
    "Tomcat",
    "Java",
    "Python",
    "Ruby on Rails",
  ]

  // Select 3-7 technologies based on domain hash
  const numTechs = 3 + (domainHash % 5)
  const technologies = []
  for (let i = 0; i < numTechs; i++) {
    const index = Math.abs((domainHash * (i + 1)) % techPool.length)
    technologies.push(techPool[index])
  }

  // Generate mock HTTP headers
  const serverType = technologies.includes("Nginx")
    ? "Nginx"
    : technologies.includes("Apache")
      ? "Apache"
      : "Microsoft-IIS"
  const serverVersion = `${1 + (domainHash % 10)}.${domainHash % 10}`

  const headers = `HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Server: ${serverType}/${serverVersion}
Content-Type: text/html; charset=UTF-8
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
${domainHash % 5 === 0 ? "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com;\n" : ""}`

  // Generate mock open ports
  const commonPorts = [
    { number: 80, service: "HTTP" },
    { number: 443, service: "HTTPS" },
    { number: 22, service: "SSH" },
    { number: 21, service: "FTP" },
    { number: 25, service: "SMTP" },
    { number: 3306, service: "MySQL" },
    { number: 5432, service: "PostgreSQL" },
    { number: 27017, service: "MongoDB" },
    { number: 6379, service: "Redis" },
    { number: 8080, service: "HTTP-Alt" },
  ]

  // Select 2-5 ports based on domain hash
  const numPorts = 2 + (domainHash % 4)
  const ports = []
  ports.push(commonPorts[0]) // Always include HTTP
  ports.push(commonPorts[1]) // Always include HTTPS

  // Add some additional ports
  for (let i = 2; i < numPorts; i++) {
    const index = 2 + Math.abs((domainHash * (i + 1)) % (commonPorts.length - 2))
    ports.push(commonPorts[index])
  }

  // Generate mock DNS information
  const ipSegments = [192 + (domainHash % 32), 168 + (domainHash % 32), 0 + (domainHash % 256), 1 + (domainHash % 254)]
  const ip = ipSegments.join(".")

  const dns = `Domain: ${domain}
IP Address: ${ip}
A Record: ${domain} -> ${ip}
MX Records:
  - mail.${domain} (Priority: 10)
  - mail2.${domain} (Priority: 20)
NS Records:
  - ns1.${domain.split(".")[1]}.com
  - ns2.${domain.split(".")[1]}.com
TTL: 3600 seconds`

  return {
    headers,
    technologies,
    ports,
    dns,
  }
}

// Simple hash function to generate deterministic but seemingly random results
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

