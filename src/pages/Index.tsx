
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ScraperForm from "@/components/ScraperForm";
import ScrapingStatus from "@/components/ScrapingStatus";
import JobDataTable from "@/components/JobDataTable";
import SavedTemplates from "@/components/SavedTemplates";
import { Job } from "@/types/job";
import { Template } from "@/types/template";
import { scrapeJobs, generateCSV, generateWord, generateFileName, downloadBlob } from "@/utils/mockScraperService";
import { getTemplates, saveTemplate, deleteTemplate } from "@/utils/templateStorage";
import { toast } from "sonner";

const Index = () => {
  // State for scraped jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  
  // State for scraping status
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobsFound, setJobsFound] = useState(0);
  const [pagesScraped, setPagesScraped] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // Templates state
  const [templates, setTemplates] = useState<Template[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    url: "",
    jobTitle: "",
    location: "",
    source: "linkedin",
  });
  
  // Timer ref for tracking elapsed time
  const timerRef = useRef<number | null>(null);
  
  // Load saved templates on component mount
  useEffect(() => {
    setTemplates(getTemplates());
  }, []);
  
  // Handle timer for elapsed time during scraping
  useEffect(() => {
    if (isLoading && !timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (!isLoading && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isLoading]);
  
  // Handle form submission to start scraping
  const handleSubmit = async (data: typeof formData) => {
    try {
      // Reset all scraping state
      setIsLoading(true);
      setProgress(0);
      setJobsFound(0);
      setPagesScraped(0);
      setErrorCount(0);
      setTimeElapsed(0);
      setJobs([]);
      setFormData(data);
      
      // Start the scraping process with progress updates
      const scrapedJobs = await scrapeJobs(
        data.url,
        data.jobTitle,
        data.location,
        data.source,
        (progress, found, pages, errors) => {
          setProgress(progress);
          setJobsFound(found);
          setPagesScraped(pages);
          setErrorCount(errors);
        }
      );
      
      setJobs(scrapedJobs);
      toast.success(`Successfully scraped ${scrapedJobs.length} jobs`);
    } catch (error) {
      console.error("Error during scraping:", error);
      toast.error("An error occurred during scraping. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle saving a template
  const handleSaveTemplate = (name: string) => {
    const newTemplate = saveTemplate({
      ...formData,
      name,
    });
    setTemplates([...templates, newTemplate]);
  };
  
  // Handle using a saved template
  const handleUseTemplate = (template: Template) => {
    setFormData({
      url: template.url,
      jobTitle: template.jobTitle,
      location: template.location,
      source: template.source,
    });
    
    toast.info(`Template "${template.name}" loaded successfully`);
  };
  
  // Handle deleting a template
  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
    setTemplates(templates.filter(template => template.id !== id));
  };
  
  // Export functions
  const handleExportCSV = () => {
    if (jobs.length === 0) return;
    
    const fileName = generateFileName(formData.jobTitle, formData.location, "csv");
    const blob = generateCSV(jobs);
    downloadBlob(blob, fileName);
    
    toast.success(`Exported ${jobs.length} jobs to ${fileName}`);
  };
  
  const handleExportWord = () => {
    if (jobs.length === 0) return;
    
    const fileName = generateFileName(formData.jobTitle, formData.location, "docx");
    const blob = generateWord(jobs);
    downloadBlob(blob, fileName);
    
    toast.success(`Exported ${jobs.length} jobs to ${fileName}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-job-blue-900">Job Scraper Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScraperForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              onSaveTemplate={handleSaveTemplate}
            />
            
            <ScrapingStatus
              isActive={isLoading}
              progress={progress}
              jobsFound={jobsFound}
              pagesScraped={pagesScraped}
              timeElapsed={timeElapsed}
              errorCount={errorCount}
            />
            
            <JobDataTable
              jobs={jobs}
              onExportCSV={handleExportCSV}
              onExportWord={handleExportWord}
            />
          </div>
          
          <div>
            <SavedTemplates
              templates={templates}
              onUseTemplate={handleUseTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          </div>
        </div>
      </main>
      
      <footer className="py-4 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>JobScraperPro - web scraping interface for job boards</p>
          <p className="text-xs mt-1">
            Note: This is a demo. Compliance with above sites for web scraping is Mandatory.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
