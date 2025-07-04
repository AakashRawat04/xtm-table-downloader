console.log("=== XTM TABLE DOWNLOADER STARTED ===");
console.log("Current URL:", window.location.href);

function extractTableData(table) {
	const rows = Array.from(table.rows);
	return rows.map((row) =>
		Array.from(row.cells).map((cell) => cell.innerText.trim())
	);
}

function convertToCSV(data) {
	return data.map((row) => row.join(",")).join("\n");
}

function downloadCSV(data, filename = "xtm_projects.csv") {
	const csv = convertToCSV(data);
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);

	console.log("✅ CSV download completed:", filename);
}

function addDownloadButton(iframeDoc, table) {
	// Check if button already exists
	if (
		document.querySelector("#xtm-download-btn") ||
		iframeDoc.querySelector("#xtm-download-btn")
	) {
		console.log("Button already exists, skipping...");
		return;
	}

	console.log(
		"🔘 Creating download button for table with",
		table.rows.length,
		"rows"
	);

	const button = document.createElement("button");
	button.innerText = "⬇ Download Table";
	button.id = "xtm-download-btn";
	button.style.cssText = `
        margin: 10px 0;
        padding: 10px 15px;
        background-color: #2196f3;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        z-index: 9999;
        position: relative;
        font-size: 14px;
        float: right;
        margin-left: auto;
    `;

	button.onclick = () => {
		console.log("🔽 Download button clicked");
		console.log("📊 Extracting data from table...");
		const data = extractTableData(table);
		console.log("📄 Extracted", data.length, "rows");
		downloadCSV(data);
	};

	// Try to place button in the iframe
	const iframeBody = iframeDoc.body;
	if (iframeBody) {
		// Look for a good place to put the button in the iframe
		const wrapper =
			iframeDoc.querySelector("#projects_table_wrapper") ||
			iframeDoc.querySelector(".dataTables_wrapper") ||
			table.parentNode;

		if (wrapper) {
			// Create a container div for proper right alignment
			const buttonContainer = iframeDoc.createElement("div");
			buttonContainer.style.cssText = `
				width: 100%;
				text-align: right;
				margin: 10px 0;
				clear: both;
			`;
			buttonContainer.appendChild(button);
			wrapper.insertBefore(buttonContainer, wrapper.firstChild);
			console.log("✅ Button added to iframe wrapper (right-aligned)");
		} else {
			// Create a container and add to body
			const buttonContainer = iframeDoc.createElement("div");
			buttonContainer.style.cssText = `
				position: fixed;
				top: 20px;
				right: 20px;
				z-index: 10000;
			`;
			buttonContainer.appendChild(button);
			iframeBody.appendChild(buttonContainer);
			console.log("✅ Button added to iframe body (fixed right position)");
		}
	} else {
		// Fallback: add button to main page
		document.body.appendChild(button);
		console.log("✅ Button added to main page");
	}
}

function checkIframeTable() {
	console.log("🔍 Checking for iframe table...");

	const iframe = document.querySelector("#projectsIframe");
	if (!iframe) {
		console.log("❌ No iframe found");
		return false;
	}

	try {
		const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		if (!iframeDoc) {
			console.log("❌ Cannot access iframe document");
			return false;
		}

		const table = iframeDoc.querySelector("#projects_table");
		if (!table) {
			console.log("❌ No table found in iframe");
			return false;
		}

		console.log(`📊 Found table with ${table.rows.length} rows`);

		// Check if table has meaningful data (more than just headers)
		if (table.rows.length > 1) {
			console.log("✅ Table has data, adding download button");
			addDownloadButton(iframeDoc, table);
			return true;
		} else {
			console.log("⏳ Table found but no data yet");
			return false;
		}
	} catch (error) {
		console.log("❌ Error accessing iframe:", error.message);
		return false;
	}
}

// Start monitoring
let checkAttempts = 0;
const maxAttempts = 60; // Try for 60 seconds
let buttonAdded = false;

function monitorTable() {
	if (buttonAdded || checkAttempts >= maxAttempts) {
		return;
	}

	checkAttempts++;
	console.log(`� Monitor attempt ${checkAttempts}/${maxAttempts}`);

	if (checkIframeTable()) {
		buttonAdded = true;
		console.log("🎉 Download button successfully added!");
		return;
	}

	// Continue monitoring
	setTimeout(monitorTable, 1000);
}

// Start monitoring immediately
setTimeout(monitorTable, 500);

console.log("🎯 XTM Table Downloader monitoring started");
