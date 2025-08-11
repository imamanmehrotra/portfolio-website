import { PortfolioData } from '@/types/portfolio';
import fs from 'fs';
import path from 'path';

// Dynamic import for pdf-parse to avoid build issues
async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    const pdf = await import('pdf-parse');
    const data = await pdf.default(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    return '';
  }
}

export class DataService {
  private portfolioData: PortfolioData | null = null;
  private summaryText: string | null = null;
  private linkedinText: string | null = null;

  async loadPortfolioData(): Promise<PortfolioData> {
    if (this.portfolioData) return this.portfolioData;
    
    try {
      const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json');
      const portfolioRaw = fs.readFileSync(portfolioPath, 'utf-8');
      this.portfolioData = JSON.parse(portfolioRaw) as PortfolioData;
      return this.portfolioData;
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      throw new Error('Failed to load portfolio data');
    }
  }

  async loadSummaryText(): Promise<string> {
    if (this.summaryText) return this.summaryText;
    
    try {
      const summaryPath = path.join(process.cwd(), '../../summary.txt');
      this.summaryText = fs.readFileSync(summaryPath, 'utf-8');
      return this.summaryText;
    } catch (error) {
      console.error('Error loading summary text:', error);
      return '';
    }
  }

  async loadLinkedInData(): Promise<string> {
    if (this.linkedinText) return this.linkedinText;
    
    try {
      const linkedinPath = path.join(process.cwd(), '../../LinkedIn_Profile.pdf');
      
      if (fs.existsSync(linkedinPath)) {
        const dataBuffer = fs.readFileSync(linkedinPath);
        this.linkedinText = await parsePDF(dataBuffer);
        return this.linkedinText || '';
      } else {
        console.log('LinkedIn PDF not found at:', linkedinPath);
        this.linkedinText = '';
        return '';
      }
    } catch (error) {
      console.error('Error loading LinkedIn data:', error);
      this.linkedinText = '';
      return '';
    }
  }

  async getAllData(): Promise<{
    portfolio: PortfolioData;
    summary: string;
    linkedin: string;
  }> {
    const [portfolio, summary, linkedin] = await Promise.all([
      this.loadPortfolioData(),
      this.loadSummaryText(),
      this.loadLinkedInData()
    ]);

    return { portfolio, summary, linkedin };
  }

  formatDataForLLM(data: {
    portfolio: PortfolioData;
    summary: string;
    linkedin: string;
  }): string {
    const { portfolio, summary, linkedin } = data;
    
    return `
# Aman Mehrotra's Complete Profile

## Personal Information
Name: ${portfolio.personal_info.name}
Title: ${portfolio.personal_info.title}
Tagline: ${portfolio.personal_info.tagline}
Location: ${portfolio.personal_info.location}
Email: ${portfolio.personal_info.email}
Phone: ${portfolio.personal_info.phone}
LinkedIn: ${portfolio.personal_info.linkedin}

## Summary
${portfolio.personal_info.summary}

${summary ? `\n## Additional Summary\n${summary}` : ''}

## Personal Details & Interests
- Native place: Moradabad, India (moved to Bangalore in 2022)
- Favorite food: ${portfolio.personal_info.favorite_food}
- Family: Married to a ${portfolio.personal_info.family.wife}, parents have ${portfolio.personal_info.family.parents}
- Interests: ${portfolio.personal_info.interests.join(', ')}

## Professional Experience
${portfolio.experience.map(exp => `
### ${exp.role} at ${exp.company}
Duration: ${exp.duration}
Location: ${exp.location}
Responsibilities:
${exp.description.map(desc => `- ${desc}`).join('\n')}
`).join('\n')}

## Technical Skills
### Technical Expertise
${portfolio.skills.technical.join(', ')}

### Tools & Technologies
${portfolio.skills.tools.join(', ')}

### Domain Experience
${portfolio.skills.domains.join(', ')}

## Education
${portfolio.education.map(edu => `- ${edu.degree} from ${edu.institution}`).join('\n')}

## Certifications
${portfolio.certifications.map(cert => `- ${cert}`).join('\n')}

## Key Achievements
${portfolio.achievements.map(achievement => `- ${achievement}`).join('\n')}

${linkedin ? `\n## LinkedIn Profile Data\n${linkedin}` : ''}

---
Note: You are Aman Mehrotra's AI assistant. Always respond in first person as if you are Aman himself. Be conversational, friendly, and personal. Share experiences and insights as if you're Aman talking directly to the person. Use "I" instead of "he" or "Aman" when referring to yourself.
`;
  }
}

export const dataService = new DataService();
