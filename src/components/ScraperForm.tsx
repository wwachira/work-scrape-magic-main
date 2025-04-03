
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Search, Save, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface ScraperFormProps {
  onSubmit: (data: {
    url: string;
    jobTitle: string;
    location: string;
    source: string;
  }) => void;
  isLoading: boolean;
  onSaveTemplate: (name: string) => void;
}

const ScraperForm = ({ onSubmit, isLoading, onSaveTemplate }: ScraperFormProps) => {
  const [url, setUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState("linkedin");
  const [templateName, setTemplateName] = useState("");

  const generateUrl = () => {
    if (!jobTitle && !location) {
      toast.error("Please provide at least a job title or location to generate a URL");
      return;
    }

    const encodedTitle = encodeURIComponent(jobTitle);
    const encodedLocation = encodeURIComponent(location);
    
    let generatedUrl = "";
    
    switch (source) {
      case "linkedin":
        generatedUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "indeed":
        generatedUrl = `https://www.indeed.com/jobs?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "glassdoor":
        generatedUrl = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodedTitle}&locT=C&locId=0&locKeyword=${encodedLocation}`;
        break;
      case "monster":
        generatedUrl = `https://www.monster.com/jobs/search?q=${encodedTitle}&where=${encodedLocation}`;
        break;
      case "handshake":
        generatedUrl = `https://app.joinhandshake.com/stu/jobs?text=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "ziprecruiter":
        generatedUrl = `https://www.ziprecruiter.com/jobs/search?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "wayup":
        generatedUrl = `https://www.wayup.com/search/${encodedTitle}/?location=${encodedLocation}`;
        break;
      case "simplyhired":
        generatedUrl = `https://www.simplyhired.com/search?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "theladders":
        generatedUrl = `https://www.theladders.com/jobs/search-jobs?keywords=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "youtern":
        generatedUrl = `https://www.youtern.com/search/job?q=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "collegegrad":
        generatedUrl = `https://collegegrad.com/search?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "builtin":
        generatedUrl = `https://builtin.com/jobs?search=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "wellfound":
        generatedUrl = `https://wellfound.com/jobs?search=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "jobspresso":
        generatedUrl = `https://jobspresso.co/?search_keywords=${encodedTitle}&search_location=${encodedLocation}`;
        break;
      case "stackoverflow":
        generatedUrl = `https://stackoverflow.com/jobs?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "outsourcely":
        generatedUrl = `https://www.outsourcely.com/remote-jobs?keyword=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "toptal":
        generatedUrl = `https://www.toptal.com/jobs/search?term=${encodedTitle}`;
        break;
      case "skipthedrive":
        generatedUrl = `https://www.skipthedrive.com/search/?search=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "nodesk":
        generatedUrl = `https://nodesk.co/remote-jobs/?search=${encodedTitle}`;
        break;
      case "remotehabits":
        generatedUrl = `https://remotehabits.com/remote-jobs/?search=${encodedTitle}`;
        break;
      case "remotive":
        generatedUrl = `https://remotive.com/remote-jobs?search=${encodedTitle}`;
        break;
      case "remote4me":
        generatedUrl = `https://remote4me.com/?keyword=${encodedTitle}`;
        break;
      case "pangian":
        generatedUrl = `https://pangian.com/job-travel-remote/?search=${encodedTitle}`;
        break;
      case "remotees":
        generatedUrl = `https://remotees.com/remote-jobs?search=${encodedTitle}`;
        break;
      case "europeremotely":
        generatedUrl = `https://europeremotely.com/?search=${encodedTitle}`;
        break;
      case "remoteokeurope":
        generatedUrl = `https://remoteok.com/remote-jobs-in-europe?search=${encodedTitle}`;
        break;
      case "remoteofasia":
        generatedUrl = `https://remoteok.com/remote-jobs-in-asia?search=${encodedTitle}`;
        break;
      case "flexjobs":
        generatedUrl = `https://www.flexjobs.com/search?search=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "remoteco":
        generatedUrl = `https://remote.co/remote-jobs/search/?search_keywords=${encodedTitle}`;
        break;
      case "weworkremotely":
        generatedUrl = `https://weworkremotely.com/remote-jobs/search?term=${encodedTitle}`;
        break;
      case "remoteok":
        generatedUrl = `https://remoteok.com/remote-${encodedTitle.toLowerCase().replace(/ /g, '-')}-jobs`;
        break;
      case "angellist":
        generatedUrl = `https://angel.co/jobs?q=${encodedTitle}&l=${encodedLocation}`;
        break;
      case "freelancer":
        generatedUrl = `https://www.freelancer.com/jobs/search?q=${encodedTitle}`;
        break;
      case "workingnomads":
        generatedUrl = `https://www.workingnomads.com/jobs?search=${encodedTitle}`;
        break;
      case "virtualvocations":
        generatedUrl = `https://www.virtualvocations.com/jobs?search=${encodedTitle}&location=${encodedLocation}`;
        break;
      case "remotefreelance":
        generatedUrl = `https://remote-freelance.com/jobs/search?q=${encodedTitle}`;
        break;
      case "remoterocketship":
        generatedUrl = `https://remoterocketship.com/?s=${encodedTitle}`;
        break;
      default:
        generatedUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=${encodedLocation}`;
    }
    
    setUrl(generatedUrl);
    toast.success("URL generated successfully");
  };

  // Update URL when source, jobTitle, or location changes
  useEffect(() => {
    if (jobTitle || location) {
      generateUrl();
    }
  }, [source]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a job board URL");
      return;
    }
    
    onSubmit({
      url,
      jobTitle,
      location,
      source,
    });
  };

  const handleSaveTemplate = () => {
    if (!templateName) {
      toast.error("Please enter a template name");
      return;
    }
    
    onSaveTemplate(templateName);
    toast.success(`Template "${templateName}" saved successfully`);
    setTemplateName("");
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="url">Job Board URL</Label>
                  <Input
                    id="url"
                    placeholder="https://www.linkedin.com/jobs/search/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateUrl}
                    className="h-10"
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Generate URL
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="source">Source</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger id="source">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="indeed">Indeed</SelectItem>
                  <SelectItem value="glassdoor">Glassdoor</SelectItem>
                  <SelectItem value="monster">Monster</SelectItem>
                  <SelectItem value="handshake">Handshake (Students/Grads)</SelectItem>
                  <SelectItem value="ziprecruiter">ZipRecruiter</SelectItem>
                  <SelectItem value="wayup">WayUp (Entry-level)</SelectItem>
                  <SelectItem value="simplyhired">SimplyHired</SelectItem>
                  <SelectItem value="theladders">The Ladders</SelectItem>
                  <SelectItem value="youtern">Youtern (Internships)</SelectItem>
                  <SelectItem value="collegegrad">CollegeGrad (New Grads)</SelectItem>
                  <SelectItem value="builtin">BuiltIn Tech</SelectItem>
                  <SelectItem value="wellfound">Wellfound (AngelList)</SelectItem>
                  <SelectItem value="jobspresso">Jobspresso</SelectItem>
                  <SelectItem value="stackoverflow">Stack Overflow Jobs</SelectItem>
                  <SelectItem value="outsourcely">Outsourcely</SelectItem>
                  <SelectItem value="toptal">Toptal</SelectItem>
                  <SelectItem value="skipthedrive">Skip The Drive</SelectItem>
                  <SelectItem value="nodesk">NoDesk</SelectItem>
                  <SelectItem value="remotehabits">RemoteHabits</SelectItem>
                  <SelectItem value="remotive">Remotive</SelectItem>
                  <SelectItem value="remote4me">Remote4Me</SelectItem>
                  <SelectItem value="pangian">Pangian</SelectItem>
                  <SelectItem value="remotees">Remotees</SelectItem>
                  <SelectItem value="europeremotely">Europe Remotely</SelectItem>
                  <SelectItem value="remoteokeurope">Remote OK Europe</SelectItem>
                  <SelectItem value="remoteofasia">Remote of Asia</SelectItem>
                  <SelectItem value="flexjobs">FlexJobs</SelectItem>
                  <SelectItem value="remoteco">Remote.co</SelectItem>
                  <SelectItem value="weworkremotely">We Work Remotely</SelectItem>
                  <SelectItem value="remoteok">RemoteOK</SelectItem>
                  <SelectItem value="angellist">AngelList</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="workingnomads">Working Nomads</SelectItem>
                  <SelectItem value="virtualvocations">Virtual Vocations</SelectItem>
                  <SelectItem value="remotefreelance">Remote Freelance</SelectItem>
                  <SelectItem value="remoterocketship">Remote Rocketship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="job-title">Job Title (Filter)</Label>
              <Input
                id="job-title"
                placeholder="e.g. Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location (Filter)</Label>
              <Input
                id="location"
                placeholder="e.g. Remote, New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full bg-job-blue-600 hover:bg-job-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Scraping...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search size={18} />
                    Start Scraping
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor="template-name">Save as Template</Label>
                <Input
                  id="template-name"
                  placeholder="Template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                className="border-job-teal-500 text-job-teal-700 hover:bg-job-teal-50"
                onClick={handleSaveTemplate}
                disabled={!templateName}
              >
                <Save size={18} className="mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScraperForm;
