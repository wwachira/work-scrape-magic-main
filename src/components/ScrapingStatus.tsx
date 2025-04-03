
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface ScrapingStatusProps {
  isActive: boolean;
  progress: number;
  jobsFound: number;
  pagesScraped: number;
  timeElapsed: number;
  errorCount: number;
}

const ScrapingStatus = ({
  isActive,
  progress,
  jobsFound,
  pagesScraped,
  timeElapsed,
  errorCount,
}: ScrapingStatusProps) => {
  // Format the elapsed time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={isActive ? "border-job-blue-500" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Scraping Status
          {isActive && (
            <span className="ml-2 flex gap-1">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {isActive ? "Actively scraping job data..." : "Ready to start scraping"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-secondary p-2 rounded">
              <div className="text-muted-foreground">Jobs Found</div>
              <div className="text-xl font-semibold">{jobsFound}</div>
            </div>
            <div className="bg-secondary p-2 rounded">
              <div className="text-muted-foreground">Pages Scraped</div>
              <div className="text-xl font-semibold">{pagesScraped}</div>
            </div>
            <div className="bg-secondary p-2 rounded">
              <div className="text-muted-foreground">Time Elapsed</div>
              <div className="text-xl font-semibold">{formatTime(timeElapsed)}</div>
            </div>
            <div className={`bg-secondary p-2 rounded ${errorCount > 0 ? "bg-red-50" : ""}`}>
              <div className={`text-muted-foreground ${errorCount > 0 ? "text-red-500" : ""}`}>Errors</div>
              <div className={`text-xl font-semibold ${errorCount > 0 ? "text-red-500" : ""}`}>{errorCount}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapingStatus;
