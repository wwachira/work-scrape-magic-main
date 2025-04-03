
import { useRef } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Download, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Job } from "@/types/job";
import { toast } from "sonner";

interface JobDataTableProps {
  jobs: Job[];
  onExportCSV: () => void;
  onExportWord: () => void;
}

const JobDataTable = ({ jobs, onExportCSV, onExportWord }: JobDataTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Scraped Job Data</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-job-blue-700 border-job-blue-300 hover:bg-job-blue-50"
            onClick={onExportCSV}
            disabled={jobs.length === 0}
          >
            <Download size={16} className="mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-job-teal-700 border-job-teal-300 hover:bg-job-teal-50"
            onClick={onExportWord}
            disabled={jobs.length === 0}
          >
            <FileText size={16} className="mr-2" />
            Word
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border" ref={tableRef}>
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/90 backdrop-blur-sm">
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No jobs scraped yet. Start scraping to see results here.
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.salary || "Not specified"}</TableCell>
                      <TableCell>
                        <QualityIndicator quality={job.dataQuality} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component to display data quality
const QualityIndicator = ({ quality }: { quality: number }) => {
  let color = "bg-red-500";
  let text = "Poor";

  if (quality >= 80) {
    color = "bg-green-500";
    text = "Excellent";
  } else if (quality >= 60) {
    color = "bg-job-blue-500";
    text = "Good";
  } else if (quality >= 40) {
    color = "bg-yellow-500";
    text = "Fair";
  }

  return (
    <Badge variant="outline" className="gap-1 py-1">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <span>{text}</span>
    </Badge>
  );
};

export default JobDataTable;
