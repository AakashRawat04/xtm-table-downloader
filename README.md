# XTM Table Downloader

A Chrome extension that adds a convenient download button to XTM project tables, allowing you to export project data as CSV files with a single click.

## Features

- ✅ One-click CSV download of XTM project tables
- ✅ Automatically detects XTM project tables
- ✅ Clean, professional UI integration
- ✅ Works with XTM Cloud interface
- ✅ No data sent to external servers (privacy-focused)

## How to Use

### Option 1: Install from Chrome Web Store (Recommended)
1. Install the extension from the Chrome Web Store
2. Navigate to your XTM project management interface
3. Go to the projects list page
4. Look for the blue "⬇ Download Table CSV" button
5. Click to download your project data as a CSV file

### Option 2: Install from Source Code (Developers)
If you want to install this extension directly from the source code:

1. **Download the Repository**
   ```bash
   git clone https://github.com/yourusername/xtm-table-downloader.git
   # OR download as ZIP from GitHub and extract
   ```

2. **Prepare the Extension**
   - Make sure you have all required files:
     - `manifest.json`
     - `content.js`
     - `style.css`
     - `icons/` folder with icon files (create if missing)

3. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `xtm-table-downloader` folder
   - The extension should now appear in your extensions list

4. **Create Icons (if missing)**
   If you don't see icons, create these files in the `icons/` folder:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels)  
   - `icon128.png` (128x128 pixels)

5. **Test the Extension**
   - Navigate to your XTM project management interface
   - Go to the projects list page
   - You should see the blue "Download Table CSV" button

6. **Troubleshooting**
   - Check the Console (F12) for any error messages
   - Make sure you're on a supported XTM URL
   - Verify the extension is enabled in `chrome://extensions/`

## Supported URLs

- `https://api-test.xtm-intl.com/*`
- `https://*.xtm-intl.com/*`

## Privacy

This extension runs locally in your browser and does not send any data to external servers. All table processing and CSV generation happens on your device.

## Development

### For Developers
If you want to contribute or modify this extension:

1. **Setup Development Environment**
   ```bash
   git clone https://github.com/yourusername/xtm-table-downloader.git
   cd xtm-table-downloader
   ```

2. **File Structure**
   ```
   xtm-table-downloader/
   ├── manifest.json          # Extension configuration
   ├── content.js            # Main functionality
   ├── style.css            # Button styling
   ├── icons/               # Extension icons
   │   ├── icon16.png
   │   ├── icon48.png
   │   └── icon128.png
   └── README.md           # This file
   ```

3. **Key Files Explained**
   - **`manifest.json`**: Defines extension permissions, content scripts, and metadata
   - **`content.js`**: Contains the main logic for detecting tables and adding download functionality
   - **`style.css`**: Styles for the download button
   - **`icons/`**: Extension icons for different sizes

4. **Making Changes**
   - Edit the relevant files
   - Go to `chrome://extensions/`
   - Click the refresh button on your extension to reload changes
   - Test your modifications

5. **Contributing**
   - Fork the repository
   - Make your changes
   - Submit a pull request with a clear description of your changes

## Support

If you encounter any issues or have feature requests, please create an issue on our GitHub repository.

## Version History

### v1.0.0
- Initial release
- Basic CSV download functionality
- Support for XTM project tables
