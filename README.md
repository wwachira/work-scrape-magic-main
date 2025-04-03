
# JobScraperPro

JobScraperPro is a web application that allows users to scrape job listings from various job boards like LinkedIn, Indeed, and Glassdoor. This application provides a user-friendly interface for initiating scraping jobs, filtering by location and job title, and exporting the data in various formats.

## Features

- **Web Interface:**
  - Input field for job board URLs
  - Filters for location and job title
  - Real-time scraping status indicator
  - "Buy Me Coffee" support button

- **Scraping Functionality:**
  - Simulates extracting job titles, companies, locations, and salary ranges
  - Handles pagination simulation
  - Validates data and indicates quality

- **Export System:**
  - Export scraped data into a CSV file
  - Generate a Word document template for the data
  - File naming convention: [Date]_[Job-Title]_[Location].{csv/docx}

- **UI Components:**
  - Responsive table display for scraped data
  - Data quality indicators
  - Saved templates for reusable configurations

## Running the Application

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser and navigate to `http://localhost:8080`

## Usage Guide

1. **Input Job Board URL:**
   - Enter the URL of the job board search results page
   - Select the source (LinkedIn, Indeed, etc.)
   - Optionally add filters for job title and location

2. **Start Scraping:**
   - Click the "Start Scraping" button to begin
   - Watch the real-time status updates

3. **View Results:**
   - Scraped job data will appear in the table below
   - Quality indicators show data completeness

4. **Export Data:**
   - Use the CSV button to export as a spreadsheet
   - Use the Word button to create a formatted document

5. **Templates:**
   - Save frequently used search configurations as templates
   - Access and run saved templates from the sidebar

## Notes

- In a production environment, web scraping should comply with the terms of service of the respective job boards
- For actual implementation, you would need to handle anti-bot measures, rate limiting, and proper request handling

## Support

If you find this project useful, consider supporting the developer:
- [Buy Me a Coffee](https://buymeacoffee.com/wwachira)

