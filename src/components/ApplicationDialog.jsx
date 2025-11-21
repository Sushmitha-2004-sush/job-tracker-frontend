import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  CircularProgress
} from '@mui/material';

function ApplicationDialog({ open, onClose, onSave, application, loading }) {
  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    job_url: '',
    status: 'applied',
    application_date: new Date().toISOString().split('T')[0],
    salary_range: '',
    location: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    notes: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const statusChoices = [
    { value: 'applied', label: 'Applied' },
    { value: 'interview_scheduled', label: 'Interview Scheduled' },
    { value: 'technical_round', label: 'Technical Round' },
    { value: 'hr_round', label: 'HR Round' },
    { value: 'offer_received', label: 'Offer Received' },
    { value: 'rejected', label: 'Rejected' }
  ];

  // Validation functions
  const validateName = (name) => {
    if (!name) return '';
    const nameRegex = /^[A-Za-z\s.]+$/;
    if (!nameRegex.test(name)) {
      return 'Name can only contain letters, spaces, and periods';
    }
    return '';
  };

  const validateCompanyName = (name) => {
    if (!name) return 'Company name is required';
    if (name.length < 2) return 'Company name must be at least 2 characters';
    if (name.length > 100) return 'Company name is too long';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return ''; // Optional field
    
    // Indian phone number: 10 digits, can start with 6-9
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    
    // Remove spaces, hyphens, +91
    const cleanPhone = phone.replace(/[\s\-+]/g, '');
    
    // Check if it's exactly 10 digits after removing country code
    const phoneWithoutCode = cleanPhone.replace(/^91/, '');
    
    if (!indianPhoneRegex.test(phoneWithoutCode)) {
      return 'Enter valid 10-digit Indian mobile number (e.g., 9876543210)';
    }
    
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return ''; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Enter a valid email address';
    }
    return '';
  };

  const validateURL = (url) => {
    if (!url) return ''; // Optional field
    try {
      new URL(url);
      return '';
    } catch {
      return 'Enter a valid URL (e.g., https://example.com)';
    }
  };

  useEffect(() => {
    if (application) {
      setFormData({
        company_name: application.company_name || '',
        job_title: application.job_title || '',
        job_url: application.job_url || '',
        status: application.status || 'applied',
        application_date: application.application_date || new Date().toISOString().split('T')[0],
        salary_range: application.salary_range || '',
        location: application.location || '',
        contact_person: application.contact_person || '',
        contact_email: application.contact_email || '',
        contact_phone: application.contact_phone || '',
        notes: application.notes || ''
      });
    } else {
      setFormData({
        company_name: '',
        job_title: '',
        job_url: '',
        status: 'applied',
        application_date: new Date().toISOString().split('T')[0],
        salary_range: '',
        location: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        notes: ''
      });
    }
    setValidationErrors({});
  }, [application, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    let error = '';
    switch(name) {
      case 'company_name':
        error = validateCompanyName(value);
        break;
      case 'contact_person':
        error = validateName(value);
        break;
      case 'contact_phone':
        error = validatePhone(value);
        break;
      case 'contact_email':
        error = validateEmail(value);
        break;
      case 'job_url':
        error = validateURL(value);
        break;
      default:
        break;
    }
    
    setValidationErrors({
      ...validationErrors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submit
    const newErrors = {
      company_name: validateCompanyName(formData.company_name),
      contact_person: validateName(formData.contact_person),
      contact_phone: validatePhone(formData.contact_phone),
      contact_email: validateEmail(formData.contact_email),
      job_url: validateURL(formData.job_url)
    };
    
    setValidationErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    // Clean up the data before sending
    const cleanedData = {
      company_name: formData.company_name,
      job_title: formData.job_title,
      job_url: formData.job_url || null,
      status: formData.status,
      application_date: formData.application_date,
      salary_range: formData.salary_range || null,
      location: formData.location || null,
      contact_person: formData.contact_person || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
      notes: formData.notes || null
    };
    
    onSave(cleanedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {application ? 'Edit Application' : 'Add New Application'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                error={!!validationErrors.company_name}
                helperText={validationErrors.company_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Job Title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job URL"
                name="job_url"
                type="url"
                value={formData.job_url}
                onChange={handleChange}
                error={!!validationErrors.job_url}
                helperText={validationErrors.job_url || 'Optional: Link to job posting'}
                placeholder="https://careers.company.com/job123"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusChoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Application Date"
                name="application_date"
                type="date"
                value={formData.application_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary Range"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleChange}
                placeholder="e.g., 10-15 LPA or 50k-60k per month"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore, Remote, Hybrid"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                error={!!validationErrors.contact_person}
                helperText={validationErrors.contact_person || 'Optional: HR/Recruiter name'}
                placeholder="e.g., Priya Sharma"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                error={!!validationErrors.contact_phone}
                helperText={validationErrors.contact_phone || 'Optional: 10-digit Indian number'}
                placeholder="9876543210"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={handleChange}
                error={!!validationErrors.contact_email}
                helperText={validationErrors.contact_email || 'Optional'}
                placeholder="recruiter@company.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional details, interview feedback, etc."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ApplicationDialog;
