# 📧 Email Learning Agent

## Overview

The Email Learning Agent is an advanced n8n workflow designed to automatically analyze your daily email communications and build comprehensive behavioral and communication insights. This AI-powered system processes your emails every morning to extract patterns, understand relationships, and store learning memories that can enhance your communication effectiveness over time.

## 🎯 Purpose

This workflow transforms your email data into actionable intelligence by:
- **Daily Email Analysis**: Automatically processes previous day's emails each morning at 8 AM
- **Behavioral Learning**: Extracts communication patterns, response behaviors, and relationship dynamics
- **Memory Storage**: Builds a comprehensive database of communication insights in Airtable
- **Pattern Recognition**: Identifies recurring themes, response patterns, and communication styles
- **Relationship Mapping**: Develops understanding of your professional and personal communication networks

## 🏗️ Architecture

**Single Agent Design**: Uses one specialized AI agent with comprehensive analysis capabilities
**Daily Processing**: Triggered automatically every morning to analyze the previous 24 hours of emails
**Memory System**: Stores insights in structured Airtable database for long-term learning and pattern recognition

## 📊 Memory Categories

The system categorizes insights into five main types:

### 1. Contact Memories
- Individual communication patterns with specific people
- Relationship dynamics and professional connections
- Response expectations and communication preferences
- Contact-specific behavioral insights

### 2. Style Memories
- Personal writing voice and tone patterns
- Communication style variations by context (formal vs. casual)
- Language preferences and recurring phrases
- Email formatting and structure preferences

### 3. Pattern Memories
- Response timing patterns and preferences
- Email priority handling behaviors
- Communication frequency patterns with different contacts
- Workflow and process-driven email behaviors

### 4. Content Memories
- Recurring topics and project themes
- Subject matter expertise areas
- Information sharing patterns
- Content consumption and sharing behaviors

### 5. Behavioral Memories
- Email management and organization behaviors
- Response triggers and decision patterns
- Communication preferences and boundaries
- Stress indicators and communication changes

## 🔧 Setup Requirements

### Required Credentials

1. **Gmail OAuth2**
   - Purpose: Access your Gmail account for email retrieval
   - Setup: Configure OAuth2 credentials in n8n for Gmail access
   - Permissions: Read access to emails

2. **OpenRouter API**
   - Purpose: Access to GPT-4.1-mini for AI analysis
   - Setup: Create account at OpenRouter and get API key
   - Model: Configured for `openai/gpt-4.1-mini`

3. **Airtable Personal Access Token**
   - Purpose: Store and manage learning memories
   - Setup: Create Personal Access Token in Airtable settings
   - Permissions: Read/Write access to your Email Learning base

### Airtable Database Setup

Create a new Airtable base called "Email Learning" with a table named "Email Learning Memories" containing these fields:

#### Core Fields
- **Memory ID** (Single line text) - Unique identifier for each memory
- **Date Created** (Date) - When the memory was first created
- **Memory Type** (Single select: Contact, Style, Pattern, Content, Behavioral)
- **Memory Category** (Single line text) - Specific subcategory
- **Memory Summary** (Single line text) - Brief description of the insight
- **Detailed Insight** (Long text) - Comprehensive explanation with evidence
- **Confidence Score** (Number, 0-1) - Reliability of the insight
- **Source Email Count** (Number) - Number of emails supporting this insight

#### Context Fields
- **Contact Name** (Single line text) - Name of the person (if contact-related)
- **Contact Email** (Email) - Email address of the contact
- **Contact Relationship** (Single line text) - Professional/personal relationship
- **Email Domain** (Single line text) - Domain of the email address
- **Project/Topic** (Single line text) - Related project or topic

#### Behavioral Fields
- **Response Pattern** (Single line text) - How you typically respond
- **Response Time** (Single line text) - Typical response timing
- **Communication Style** (Single line text) - Tone and style characteristics
- **Email Frequency** (Single line text) - How often you communicate
- **Typical Email Length** (Single line text) - Length patterns

#### Learning Fields
- **Times Reinforced** (Number) - How many times pattern was observed
- **Last Reinforced** (Date) - Most recent confirmation of pattern
- **Exceptions Noted** (Long text) - Unusual behaviors or pattern breaks
- **Evolution Notes** (Long text) - How patterns change over time
- **Action Triggers** (Long text) - What prompts specific behaviors

## ⚙️ Configuration

### Workflow Settings

1. **Schedule Configuration**
   - **Trigger**: Daily at 8:00 AM (cron: `0 8 * * *`)
   - **Email Range**: Previous 24 hours
   - **Processing Limit**: 50 emails per run
   - **Memory Context**: 20 message window for AI analysis

2. **Gmail Query Settings**
   - **Default Query**: `after:{{ yesterdayDate }}`
   - **Customizable**: Modify to include/exclude specific labels or senders
   - **Examples**:
     - `after:2025-01-26 -label:spam` (exclude spam)
     - `after:2025-01-26 has:attachment` (only emails with attachments)
     - `after:2025-01-26 from:important-domain.com` (specific domain)

3. **AI Analysis Settings**
   - **Model**: GPT-4.1-mini via OpenRouter
   - **Context Window**: 20 messages for conversation memory
   - **Think Tool**: Enabled for complex reasoning
   - **Output Format**: Structured JSON matching Airtable schema

### Customization Options

#### Email Filtering
Modify the Gmail query in the "Fetch Yesterday's Emails" node:
```javascript
// Basic query (default)
"after:{{ $node['Initialize Analysis Session'].json.yesterdayDate }}"

// Exclude automated emails
"after:{{ $node['Initialize Analysis Session'].json.yesterdayDate }} -from:noreply -from:no-reply"

// Focus on important emails only
"after:{{ $node['Initialize Analysis Session'].json.yesterdayDate }} is:important"

// Specific labels only
"after:{{ $node['Initialize Analysis Session'].json.yesterdayDate }} label:work"
```

#### Analysis Categories
Customize the memory types in the structured output parser schema to focus on specific aspects:
- Add custom memory types
- Modify confidence scoring criteria
- Adjust required fields based on your needs

#### Memory Retention
Configure how memories are stored and updated:
- Set confidence thresholds for memory creation
- Adjust reinforcement logic
- Customize evolution tracking

## 🚀 Usage

### Initial Setup
1. Import the workflow into your n8n instance
2. Configure all required credentials (Gmail, OpenRouter, Airtable)
3. Set up your Airtable base with the specified schema
4. Update credential IDs in the workflow nodes
5. Test the workflow with a manual execution
6. Activate the workflow for daily processing

### Daily Operation
The workflow runs automatically every morning at 8 AM:
1. **Initialization**: Creates session ID and sets date parameters
2. **Email Retrieval**: Fetches previous day's emails from Gmail
3. **Preprocessing**: Cleans and structures email data
4. **AI Analysis**: Processes emails through the learning agent
5. **Memory Storage**: Saves new insights or reinforces existing patterns
6. **Summary Generation**: Creates daily analysis summary

### Monitoring
- Check workflow execution history for daily runs
- Review Airtable database for new memories and insights
- Monitor confidence scores to assess insight quality
- Track pattern evolution over time

## 📈 Expected Outputs

### Daily Analysis Summary
Each run produces:
- Total emails processed
- New memories created
- Existing memories reinforced
- Key behavioral insights discovered
- Communication patterns identified
- Recommended actions based on insights

### Memory Database Growth
Over time, you'll build:
- **Contact Profiles**: Deep understanding of communication with each person
- **Style Evolution**: How your communication style changes in different contexts
- **Pattern Recognition**: Predictable behaviors and response patterns
- **Content Intelligence**: Topics and themes that drive your communications
- **Behavioral Insights**: Triggers, preferences, and optimization opportunities

## 🔍 Troubleshooting

### Common Issues

1. **No Emails Retrieved**
   - Check Gmail OAuth2 credentials
   - Verify date format in query
   - Ensure sufficient permissions

2. **AI Analysis Errors**
   - Verify OpenRouter API key and credits
   - Check model availability (`openai/gpt-4.1-mini`)
   - Review system prompt for clarity

3. **Airtable Storage Failures**
   - Confirm Personal Access Token permissions
   - Verify base and table names match exactly
   - Check field types match schema requirements

4. **Memory Duplication**
   - Review existing memory check logic
   - Adjust filtering criteria in Airtable queries
   - Consider memory ID generation strategy

### Performance Optimization

- **Large Email Volumes**: Increase processing limit or implement batching
- **Complex Analysis**: Adjust AI context window size
- **Storage Efficiency**: Implement memory archiving for old insights
- **Cost Management**: Monitor OpenRouter usage and adjust frequency if needed

## 🔒 Privacy & Security

### Data Handling
- **Email Content**: Processed in memory only, not permanently stored
- **AI Processing**: Sent to OpenRouter for analysis (review their privacy policy)
- **Memory Storage**: Behavioral insights stored in your Airtable base
- **Access Control**: Secure your n8n instance and Airtable base appropriately

### Best Practices
- Use dedicated credentials with minimal required permissions
- Regularly review stored memories for sensitive information
- Consider excluding personal or confidential email labels
- Implement proper backup and recovery procedures

## 🚀 Advanced Usage

### Integration Opportunities
- **CRM Integration**: Connect insights to customer relationship management
- **Calendar Analysis**: Correlate email patterns with calendar events
- **Task Management**: Use insights to optimize workflow and task prioritization
- **Communication Coaching**: Identify areas for communication improvement

### Analytics Extensions
- **Trend Analysis**: Track communication pattern changes over time
- **Relationship Scoring**: Quantify relationship strength based on communication
- **Productivity Metrics**: Measure email efficiency and response optimization
- **Sentiment Tracking**: Monitor emotional patterns in communications

## 📚 Related Workflows

This workflow pairs well with:
- **Calendar Learning Agent**: Analyze meeting patterns and scheduling behaviors
- **Task Management Agent**: Understand work patterns and productivity cycles  
- **Communication Optimizer**: Use insights to improve email effectiveness
- **Relationship CRM**: Build comprehensive contact intelligence

## 🤝 Support

For questions, customizations, or troubleshooting:
1. Check n8n community forums for general workflow questions
2. Review OpenRouter documentation for AI model issues
3. Consult Airtable support for database configuration help
4. Refer to Gmail API documentation for email access issues

---

**Version**: 1.0  
**Last Updated**: January 2025  
**Compatibility**: n8n v1.0+, requires LangChain nodes 