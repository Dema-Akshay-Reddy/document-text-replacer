const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const app = express();
const port = 3000;

// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Configure file upload
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Home page with form
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Text Replacer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 700px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
                max-height: none;
                border-radius: 12px;
            }
            h1 {
                font-size: 22px;
            }
            .subtitle {
                font-size: 13px;
                margin-bottom: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .container {
                padding: 15px;
            }
            h1 {
                font-size: 20px;
            }
        }
        .form-group {
            margin-bottom: 25px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
            font-size: 14px;
        }
        input[type="text"],
        input[type="file"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }
        input[type="file"] {
            padding: 10px;
            cursor: pointer;
        }
        .file-info {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        .replacements-container {
            border: 2px dashed #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .replacement-pair {
            display: grid;
            grid-template-columns: 1fr 1fr auto;
            gap: 10px;
            margin-bottom: 15px;
            align-items: start;
        }
        
        /* Mobile: Stack inputs vertically */
        @media (max-width: 768px) {
            .replacements-container {
                padding: 15px;
            }
            .replacement-pair {
                grid-template-columns: 1fr;
                gap: 8px;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
            }
            .replacement-pair:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
            input[type="text"],
            input[type="file"] {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }
        
        .replacement-pair input {
            margin-bottom: 0;
        }
        .remove-btn {
            padding: 12px 16px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
            height: 46px;
        }
        
        /* Mobile: Full width remove button */
        @media (max-width: 768px) {
            .remove-btn {
                width: 100%;
                height: auto;
                padding: 12px;
            }
        }
        .remove-btn:hover {
            background: #d32f2f;
        }
        .add-btn {
            width: 100%;
            padding: 12px;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 20px;
        }
        .add-btn:hover {
            background: #45a049;
        }
        button[type="submit"] {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button[type="submit"]:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        button[type="submit"]:active {
            transform: translateY(0);
        }
        .loading {
            display: none;
            text-align: center;
            margin-top: 20px;
            color: #667eea;
        }
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .example {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            font-size: 12px;
            color: #666;
            margin-top: 10px;
            line-height: 1.6;
        }
        .pair-number {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 10px;
            font-size: 13px;
        }
        
        /* Mobile responsive text */
        @media (max-width: 768px) {
            .example {
                font-size: 11px;
                padding: 8px;
            }
            .file-info {
                font-size: 11px;
            }
        }
        
        /* Touch-friendly buttons on mobile */
        @media (max-width: 768px) {
            .add-btn,
            button[type="submit"] {
                padding: 16px;
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📄 Document Text Replacer</h1>
        <p class="subtitle">Replace multiple texts in Word (.docx) documents</p>
        
        <form id="uploadForm" action="/replace" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="document">Upload Document</label>
                <input type="file" id="document" name="document" accept=".docx" required>
                <div class="file-info">Supported format: .docx (Word documents only)</div>
                <div class="example" style="margin-top: 10px;">
                    📄 Have a PDF? <a href="https://www.ilovepdf.com/pdf_to_word" target="_blank" style="color: #667eea; font-weight: 600;">Convert it to Word here</a> first!
                </div>
            </div>
            
            <div class="form-group">
                <label>Text Replacements</label>
                <div class="replacements-container" id="replacementsContainer">
                    <div class="replacement-pair">
                        <div>
                            <input type="text" name="findText[]" placeholder="Find: e.g. {{NAME}}" required>
                        </div>
                        <div>
                            <input type="text" name="replaceText[]" placeholder="Replace with: e.g. John Doe" required>
                        </div>
                        <button type="button" class="remove-btn" onclick="removePair(this)" style="visibility: hidden;">✕</button>
                    </div>
                </div>
                <button type="button" class="add-btn" onclick="addPair()">+ Add Another Replacement</button>
                <div class="example">
                    💡 You can replace multiple different texts at once!<br>
                    Examples: {{NAME}} → John Doe, [COMPANY] → Acme Corp, {{DATE}} → Jan 1, 2024<br>
                    <br>
                    <strong>⚠️ Formatting Tip:</strong> If a replacement doesn't work, the text might have mixed formatting (bold, italic, etc.). 
                    Try replacing smaller parts or remove formatting in Word first.
                </div>
            </div>
            
            <button type="submit">Replace All & Download</button>
        </form>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Processing your document...</p>
        </div>
    </div>
    
    <script>
        let pairCount = 1;
        
        function addPair() {
            pairCount++;
            const container = document.getElementById('replacementsContainer');
            const newPair = document.createElement('div');
            newPair.className = 'replacement-pair';
            newPair.innerHTML = \`
                <div>
                    <input type="text" name="findText[]" placeholder="Find: e.g. {{EMAIL}}" required>
                </div>
                <div>
                    <input type="text" name="replaceText[]" placeholder="Replace with: e.g. john@example.com" required>
                </div>
                <button type="button" class="remove-btn" onclick="removePair(this)">✕</button>
            \`;
            container.appendChild(newPair);
            updateRemoveButtons();
        }
        
        function removePair(button) {
            const pair = button.closest('.replacement-pair');
            pair.remove();
            pairCount--;
            updateRemoveButtons();
        }
        
        function updateRemoveButtons() {
            const pairs = document.querySelectorAll('.replacement-pair');
            pairs.forEach((pair, index) => {
                const removeBtn = pair.querySelector('.remove-btn');
                if (pairs.length === 1) {
                    removeBtn.style.visibility = 'hidden';
                } else {
                    removeBtn.style.visibility = 'visible';
                }
            });
        }
        
        document.getElementById('uploadForm').addEventListener('submit', function() {
            document.getElementById('loading').style.display = 'block';
        });
    </script>
</body>
</html>
  `);
});

// Handle file upload and text replacement
app.post('/replace', upload.single('document'), async (req, res) => {
  try {
    let { findText, replaceText } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
    
    // Ensure findText and replaceText are arrays
    if (!Array.isArray(findText)) {
      findText = [findText];
    }
    if (!Array.isArray(replaceText)) {
      replaceText = [replaceText];
    }
    
    // Validate we have matching pairs
    if (findText.length !== replaceText.length) {
      await fs.unlink(file.path);
      return res.status(400).send('Mismatch between find and replace values');
    }
    
    // Create replacement pairs
    const replacements = findText.map((find, index) => ({
      find: find,
      replace: replaceText[index]
    })).filter(pair => pair.find && pair.find.trim() !== '');
    
    if (replacements.length === 0) {
      await fs.unlink(file.path);
      return res.status(400).send('No valid replacement pairs provided');
    }
    
    const fileExt = path.extname(file.originalname).toLowerCase();
    let outputBuffer;
    let outputFileName;
    let totalReplacements = 0;
    
    // Check if PDF was uploaded
    if (fileExt === '.pdf') {
      await fs.unlink(file.path);
      return res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>PDF Not Supported</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 600px;
        }
        h2 {
            color: #ff6b6b;
            margin-bottom: 20px;
            font-size: 24px;
        }
        .message {
            background: #fff3cd;
            border-left: 5px solid #ffc107;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            line-height: 1.8;
        }
        .convert-box {
            background: #e3f2fd;
            border-left: 5px solid #2196f3;
            padding: 25px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .convert-box h3 {
            color: #1976d2;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .steps {
            margin: 15px 0;
            padding-left: 20px;
        }
        .steps li {
            margin: 10px 0;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px 5px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
            text-align: center;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .btn-secondary {
            background: #4caf50;
            color: white;
        }
        .button-group {
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>📄 PDF Files Not Supported</h2>
        
        <div class="message">
            <strong>We only support Word documents (.docx)</strong><br>
            Direct PDF text replacement is limited and may not preserve formatting properly.
        </div>
        
        <div class="convert-box">
            <h3>✨ Convert Your PDF to Word (Free!)</h3>
            <p>Use ILovePDF to convert your PDF to Word format in seconds:</p>
            <ol class="steps">
                <li>Click the "Convert PDF to Word" button below</li>
                <li>Upload your PDF file</li>
                <li>Download the converted .docx file</li>
                <li>Come back here and use the Word file</li>
            </ol>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">
                ✓ Free & fast<br>
                ✓ Preserves formatting<br>
                ✓ No registration required
            </p>
        </div>
        
        <div class="button-group">
            <a href="https://www.ilovepdf.com/pdf_to_word" target="_blank" class="btn btn-primary">
                🔄 Convert PDF to Word
            </a>
            <a href="/" class="btn btn-secondary">
                ← Back to App
            </a>
        </div>
    </div>
</body>
</html>
      `);
    }
    
    if (fileExt === '.docx') {
      // Process Word document
      const content = await fs.readFile(file.path);
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      
      // Replace text in the XML files
      const xmlFiles = ['word/document.xml', 'word/header1.xml', 'word/header2.xml', 'word/header3.xml', 
                        'word/footer1.xml', 'word/footer2.xml', 'word/footer3.xml'];
      
      for (const xmlFile of xmlFiles) {
        try {
          let xml = zip.file(xmlFile).asText();
          let modified = false;
          
          // Apply all replacements
          replacements.forEach(pair => {
            const searchText = pair.find;
            const replaceText = pair.replace;
            
            // Method 1: Simple direct replacement (when text is not split across runs)
            if (xml.includes(searchText)) {
              const occurrences = xml.split(searchText).length - 1;
              totalReplacements += occurrences;
              xml = xml.split(searchText).join(replaceText);
              modified = true;
            } else {
              // Method 2: Handle text split across <w:r> (run) elements
              // Word often splits text like "D. Akshay Reddy" into multiple runs due to formatting
              
              // Find all paragraph elements
              const paragraphRegex = /<w:p\b[^>]*>.*?<\/w:p>/gs;
              xml = xml.replace(paragraphRegex, (paragraph) => {
                // Extract all text content from this paragraph
                let textContent = '';
                const textRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
                let match;
                const textNodes = [];
                
                while ((match = textRegex.exec(paragraph)) !== null) {
                  textNodes.push({
                    fullMatch: match[0],
                    text: match[1],
                    index: match.index
                  });
                  textContent += match[1];
                }
                
                // Check if our search text is in this paragraph
                if (textContent.includes(searchText)) {
                  totalReplacements++;
                  modified = true;
                  
                  // Find the position of search text in the combined text
                  const searchIndex = textContent.indexOf(searchText);
                  const searchEnd = searchIndex + searchText.length;
                  
                  // Build new paragraph with replacement
                  let newParagraph = paragraph;
                  let currentPos = 0;
                  let replacementDone = false;
                  
                  // Replace all text nodes
                  textNodes.forEach((node, idx) => {
                    const nodeStart = currentPos;
                    const nodeEnd = currentPos + node.text.length;
                    
                    if (!replacementDone && nodeEnd > searchIndex && nodeStart < searchEnd) {
                      // This node is part of the text to replace
                      if (nodeStart <= searchIndex && nodeEnd >= searchEnd) {
                        // Entire search text is in this one node (shouldn't happen but handle it)
                        const newText = node.text.substring(0, searchIndex - nodeStart) + 
                                       replaceText + 
                                       node.text.substring(searchEnd - nodeStart);
                        newParagraph = newParagraph.replace(node.fullMatch, 
                          `<w:t>${newText}</w:t>`);
                        replacementDone = true;
                      } else if (nodeStart <= searchIndex) {
                        // This node starts the search text
                        const beforeText = node.text.substring(0, searchIndex - nodeStart);
                        newParagraph = newParagraph.replace(node.fullMatch, 
                          `<w:t>${beforeText}${replaceText}</w:t>`);
                        replacementDone = true;
                      } else {
                        // This node is in the middle or end of search text - remove it
                        newParagraph = newParagraph.replace(node.fullMatch, '');
                      }
                    } else if (replacementDone && currentPos < searchEnd) {
                      // Remove nodes that were part of the original search text
                      newParagraph = newParagraph.replace(node.fullMatch, '');
                    }
                    
                    currentPos = nodeEnd;
                  });
                  
                  return newParagraph;
                }
                
                return paragraph;
              });
            }
          });
          
          if (modified) {
            zip.file(xmlFile, xml);
          }
        } catch (e) {
          // File doesn't exist in this document, skip silently
        }
      }
      
      outputBuffer = zip.generate({ type: 'nodebuffer' });
      outputFileName = `updated_${file.originalname}`;
      
    } else {
      await fs.unlink(file.path);
      return res.status(400).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Unsupported File Type</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .error {
            background: #ffebee;
            border: 2px solid #f44336;
            padding: 20px;
            border-radius: 8px;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="error">
        <h2>❌ Unsupported File Type</h2>
        <p>Please upload a Word document (.docx)</p>
        <a href="/">← Try Again</a>
    </div>
</body>
</html>
      `);
    }
    
    // Send the file
    res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(outputBuffer);
    
    // Clean up uploaded file
    await fs.unlink(file.path);
    
    console.log(`✓ Processed ${file.originalname}: ${totalReplacements} replacements made across ${replacements.length} pairs`);
    
  } catch (error) {
    console.error('Error processing file:', error);
    
    // Try to clean up file if it exists
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    res.status(500).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .error {
            background: #ffebee;
            border: 2px solid #f44336;
            padding: 20px;
            border-radius: 8px;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="error">
        <h2>❌ Error Processing Document</h2>
        <p>${error.message}</p>
        <a href="/">← Try Again</a>
    </div>
</body>
</html>
    `);
  }
});

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`\n✅ Document Text Replacer is running!\n`);
    console.log(`   Open your browser to: http://localhost:${port}\n`);
    console.log(`   Press Ctrl+C to stop the server\n`);
  });
}

// Export for Vercel
module.exports = app;
