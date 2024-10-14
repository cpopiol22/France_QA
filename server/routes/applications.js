const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

// Get all applications for a job
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all applications for a user
router.get('/user', async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.userId })
      .populate('job', 'title company')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create new application
router.post('/', async (req, res) => {
  try {
    const application = new Application({
      job: req.body.jobId,
      applicant: req.user.userId,
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update application status
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;