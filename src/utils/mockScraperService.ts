
import { Job } from "@/types/job";

// Function to simulate fetching jobs from a job board
export const scrapeJobs = async (
  url: string,
  jobTitle: string,
  location: string,
  source: string,
  onProgress: (progress: number, found: number, pages: number, errors: number) => void
): Promise<Job[]> => {
  // This is a mock function that simulates job scraping
  // In a real application, this would be replaced with actual web scraping logic
  
  const totalPages = Math.floor(Math.random() * 3) + 3; // 3-5 pages
  const mockJobs: Job[] = [];
  let errorCount = 0;
  
  // Sample job titles based on filter or defaults
  // Include more entry-level and junior focused job titles
  const jobTitles = jobTitle 
    ? [
        `Senior ${jobTitle}`, 
        `${jobTitle} Manager`, 
        `${jobTitle} Associate`, 
        `${jobTitle} Specialist`,
        `Junior ${jobTitle}`,
        `Entry-Level ${jobTitle}`,
        `${jobTitle} Intern`,
        `Graduate ${jobTitle}`,
        `${jobTitle} Trainee`,
        `Assistant ${jobTitle}`,
      ]
    : [
        "Software Engineer", 
        "Product Manager", 
        "Data Scientist", 
        "UX Designer",
        "Marketing Specialist",
        "Sales Representative",
        "Project Manager",
        "Business Analyst",
        "DevOps Engineer",
        "Full Stack Developer",
        "Junior Developer",
        "Entry-Level Software Engineer",
        "Graduate Software Developer",
        "Junior Data Analyst",
        "Marketing Assistant",
        "IT Support Technician",
        "Junior UX/UI Designer",
        "Sales Development Representative",
        "Customer Success Associate",
        "Research Assistant",
      ];
  
  // Sample companies - adding more companies known for hiring juniors/new grads
  const companies = [
    "Acme Corp", 
    "TechGiant Inc.", 
    "Innovative Solutions", 
    "DataWise Analytics",
    "CloudScale Technologies", 
    "DigitalFuture", 
    "NextGen Systems", 
    "ByteWorks",
    "GlobalTech Enterprises",
    "Quantum Software",
    "GradStart Inc.",
    "FirstJob Technologies",
    "NewTalent Group",
    "TechBootcamp Partners",
    "EarlyCareer Solutions",
    "JuniorHire Co.",
    "GrowthPath Labs",
    "FreshTalent Innovations",
    "CareerLaunch Systems",
    "DevTrainee Network",
  ];
  
  // Sample locations
  const locations = location 
    ? [`${location}`, `Remote, ${location}`, `Hybrid, ${location}`]
    : ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Chicago, IL", "Boston, MA"];
  
  // Sample salary ranges - adjusted to show more entry-level salaries
  const salaries = [
    "$40,000 - $55,000",
    "$45,000 - $65,000",
    "$50,000 - $70,000",
    "$55,000 - $75,000",
    "$60,000 - $80,000",
    "$70,000 - $90,000", 
    "$80,000 - $100,000",
    "$90,000 - $110,000",
    null, // Some jobs don't list salary
    null,
  ];
  
  // Simulate page-by-page scraping with delays
  for (let i = 0; i < totalPages; i++) {
    // Add a random delay to simulate network requests
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Random number of jobs per page (5-12)
    const jobsPerPage = Math.floor(Math.random() * 8) + 5;
    
    // Simulate errors occasionally
    const hasError = Math.random() < 0.15; // 15% chance of error
    
    if (hasError) {
      errorCount++;
      // Continue to next page, simulating that we failed to scrape this page
      onProgress(
        Math.round(((i + 1) / totalPages) * 100),
        mockJobs.length,
        i + 1,
        errorCount
      );
      continue;
    }
    
    // Generate random jobs for this page
    for (let j = 0; j < jobsPerPage; j++) {
      const randomTitleIndex = Math.floor(Math.random() * jobTitles.length);
      const randomCompanyIndex = Math.floor(Math.random() * companies.length);
      const randomLocationIndex = Math.floor(Math.random() * locations.length);
      const randomSalaryIndex = Math.floor(Math.random() * salaries.length);
      
      // Calculate data quality (completeness) score
      const dataQuality = Math.floor(Math.random() * 60) + 40; // 40-100
      
      mockJobs.push({
        title: jobTitles[randomTitleIndex],
        company: companies[randomCompanyIndex],
        location: locations[randomLocationIndex],
        salary: salaries[randomSalaryIndex],
        dataQuality,
      });
    }
    
    // Update progress after each page
    onProgress(
      Math.round(((i + 1) / totalPages) * 100),
      mockJobs.length,
      i + 1,
      errorCount
    );
  }
  
  return mockJobs;
};

// Function to generate file name based on job parameters
export const generateFileName = (jobTitle: string, location: string, format: string): string => {
  const date = new Date().toISOString().slice(0, 10);
  const title = jobTitle || "All-Jobs";
  const loc = location || "All-Locations";
  
  return `${date}_${title.replace(/\s+/g, '-')}_${loc.replace(/\s+/g, '-')}.${format}`;
};

// Mock function to generate a CSV file for download
export const generateCSV = (jobs: Job[]): Blob => {
  // Create CSV header row
  const header = "Job Title,Company,Location,Salary,Data Quality\n";
  
  // Create CSV data rows
  const csvData = jobs.map(job => {
    return `"${job.title}","${job.company}","${job.location}","${job.salary || 'Not specified'}","${job.dataQuality}"`;
  }).join("\n");
  
  const csvContent = header + csvData;
  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
};

// Mock function to generate a Word document for download
export const generateWord = (jobs: Job[]): Blob => {
  // In a real implementation, this would generate an actual Word document
  // Here we'll just generate a mock HTML representation for simulation purposes
  
  let htmlContent = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>Scraped Job Listings</h1>
      <p>Date: ${new Date().toLocaleDateString()}</p>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  jobs.forEach(job => {
    htmlContent += `
      <tr>
        <td>${job.title}</td>
        <td>${job.company}</td>
        <td>${job.location}</td>
        <td>${job.salary || 'Not specified'}</td>
      </tr>
    `;
  });
  
  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // In a real app, we would convert this to .docx format
  // For this mock, we'll return it as an HTML file
  return new Blob([htmlContent], { type: "application/vnd.ms-word" });
};

// Helper function to download a blob as a file
export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
