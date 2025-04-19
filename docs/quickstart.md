# Quick Start Guide

This guide provides a quick introduction to implementing AI voice technologies in your projects.

## Prerequisites

- Node.js 16+ or Python 3.8+
- Basic understanding of REST APIs
- API key from your chosen voice provider

## Basic Implementation

### 1. Choose a Provider

For beginners, we recommend starting with ElevenLabs due to its:
- Simple API
- Good documentation
- Free tier availability
- High-quality voices

### 2. Set Up Your Project

```bash
# Create a new project directory
mkdir voice-project
cd voice-project

# Initialize Node.js project
npm init -y

# Install required dependencies
npm install axios dotenv
```

### 3. Create Environment File

```bash
# Create .env file
touch .env
```

Add your API key:
```
ELEVENLABS_API_KEY=your_api_key_here
```

### 4. Basic Implementation

Create `index.js`:
```javascript
require('dotenv').config();
const axios = require('axios');

class VoiceService {
    constructor() {
        this.apiKey = process.env.ELEVENLABS_API_KEY;
        this.baseUrl = 'https://api.elevenlabs.io/v1';
    }

    async generateSpeech(text) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
                {
                    text: text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                },
                {
                    headers: {
                        'xi-api-key': this.apiKey,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }
            );
            
            // Save the audio file
            const fs = require('fs');
            fs.writeFileSync('output.mp3', response.data);
            console.log('Audio file saved as output.mp3');
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

// Example usage
const voiceService = new VoiceService();
voiceService.generateSpeech('Hello, this is a test of the AI voice system.');
```

### 5. Run Your Project

```bash
node index.js
```

## Common Use Cases

### 1. Text-to-Speech for Content
```javascript
async function createAudioContent(text, outputFile) {
    const voiceService = new VoiceService();
    await voiceService.generateSpeech(text, outputFile);
}

// Example
createAudioContent(
    'Welcome to our tutorial series on AI voice technology.',
    'welcome.mp3'
);
```

### 2. Voice Cloning
```javascript
async function cloneVoice(audioFile, text) {
    const voiceService = new VoiceService();
    // Implementation for voice cloning
    // Note: Requires additional API endpoints and setup
}
```

### 3. Multi-language Support
```javascript
async function generateMultiLanguage(text, language) {
    const voiceService = new VoiceService();
    // Implementation for different languages
    // Note: Requires language-specific voice IDs
}
```

## Next Steps

1. **Explore Advanced Features**
   - Voice cloning
   - Emotional voice generation
   - Multi-language support

2. **Integrate with Your Application**
   - Add to existing projects
   - Implement error handling
   - Add caching for performance

3. **Optimize Performance**
   - Implement connection pooling
   - Add request retries
   - Monitor API usage

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify key is correct
   - Check environment variables
   - Ensure proper formatting

2. **Audio Quality Issues**
   - Adjust voice settings
   - Try different voices
   - Check audio format

3. **Rate Limiting**
   - Implement retry logic
   - Monitor usage
   - Consider upgrading plan

## Resources

- [ElevenLabs API Documentation](https://docs.elevenlabs.io)
- [Voice Provider Comparison](voice-providers.md)
- [Technical Implementation Guide](technical-guides.md) 