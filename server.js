// server.js
// Run: npm init -y && npm i express multer node-fetch dotenv
// then set KIRI_API_KEY in .env and run: node server.js

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 3001;
const KIRI_API_KEY = process.env.KIRI_API_KEY; // put your key in .env

// 1) Upload photos to KIRI and return job id
app.post('/api/upload-photos', upload.array('photos'), async (req, res) => {
    try {
        if (!KIRI_API_KEY) return res.status(500).json({ error: 'Missing KIRI_API_KEY' });

        // Build form-data for KIRI (check KIRI API docs for exact param names)
        const form = new FormData();
        for (const file of req.files) {
            form.append('images[]', fs.createReadStream(file.path), file.originalname);
        }
        // optional: add project metadata
        form.append('project_name', req.body.project_name || 'client-upload');

        // Send to KIRI image-upload endpoint (example path - check their docs for exact URL)
        const kiriUploadUrl = 'https://api.kiriengine.app/3dgs/scan/image-upload'; // confirm in docs
        const response = await fetch(kiriUploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${KIRI_API_KEY}`
            },
            body: form
        });

        const json = await response.json();

        // Clean up local files
        req.files.forEach(f => fs.unlinkSync(f.path));

        // Return KIRI response (likely contains a serial/model id)
        return res.json(json);
    } catch (err) {
        console.error('Upload error', err);
        return res.status(500).json({ error: String(err) });
    }
});

// 2) Poll job status / fetch model (example route; KIRI has job-check endpoints)
app.get('/api/job-status/:id', async (req, res) => {
    const id = req.params.id;
    // Example: GET https://api.kiriengine.app/3dgs/scan/status/{id}
    const statusUrl = `https://api.kiriengine.app/3dgs/scan/status/${id}`;
    try {
        const response = await fetch(statusUrl, {
            headers: { 'Authorization': `Bearer ${KIRI_API_KEY}` }
        });
        const json = await response.json();
        res.json(json);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

// 3) Proxy download of final GLB (if needed)
app.get('/api/download/:modelId', async (req, res) => {
    const modelId = req.params.modelId;
    // Example endpoint - check KIRI docs for actual download URL
    const downloadUrl = `https://api.kiriengine.app/3dgs/scan/download/${modelId}?format=glb`;
    try {
        const response = await fetch(downloadUrl, {
            headers: { 'Authorization': `Bearer ${KIRI_API_KEY}` }
        });
        if (!response.ok) return res.status(response.status).send(await response.text());
        res.setHeader('Content-Type', 'model/gltf-binary');
        response.body.pipe(res);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.listen(PORT, () => console.log(`Proxy server listening ${PORT}`));