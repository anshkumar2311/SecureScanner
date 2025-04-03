import { CheckCircle, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ScanHistoryProps {
  history: Array<{
    url: string
    timestamp: string
    score: number
    issues: number
  }>
}

export function ScanHistory({ history }: ScanHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No scan history available</p>
        <p className="text-xs mt-1">Previous scans will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((scan, index) => {
        const domain = new URL(scan.url).hostname
        const timeAgo = formatDistanceToNow(new Date(scan.timestamp), { addSuffix: true })

        return (
          <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
            <div
              className={`mt-0.5 ${scan.score >= 80 ? "text-green-500" : scan.score >= 60 ? "text-yellow-500" : "text-red-500"}`}
            >
              {scan.score >= 80 ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate" title={domain}>
                  {domain}
                </h3>
                <span
                  className={`text-xs font-medium ${
                    scan.score >= 80 ? "text-green-500" : scan.score >= 60 ? "text-yellow-500" : "text-red-500"
                  }`}
                >
                  {scan.score}%
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
                <p className="text-xs">
                  {scan.issues} {scan.issues === 1 ? "issue" : "issues"}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

