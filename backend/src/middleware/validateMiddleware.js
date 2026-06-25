const validateEnquiry = (req, res, next) => {
  const { fullName, email, phone, companyName, businessType, selectedService, consentAccepted, honeypot } = req.body;

  // 1. Honeypot check: If the honeypot field is filled, reject silently or with success mock to waste spammer's time.
  if (honeypot && honeypot.trim() !== '') {
    console.warn('Spam bot detected via honeypot field fill!');
    // Respond with mock success so the bot thinks it succeeded
    return res.status(200).json({
      success: true,
      message: 'Thank you. Nitru Connect team will contact you soon.',
    });
  }

  // 2. Standard field presence validation
  if (!fullName || fullName.trim() === '') {
    return res.status(400).json({ message: 'Full name is required' });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'Email address is required' });
  }

  if (!phone || phone.trim() === '') {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  if (!companyName || companyName.trim() === '') {
    return res.status(400).json({ message: 'Company name is required' });
  }

  if (!businessType || businessType.trim() === '') {
    return res.status(400).json({ message: 'Business type is required' });
  }

  if (!selectedService || selectedService.trim() === '') {
    return res.status(400).json({ message: 'Please select a service' });
  }

  if (consentAccepted === undefined || consentAccepted !== true) {
    return res.status(400).json({ message: 'You must accept the data consent terms' });
  }

  next();
};

module.exports = { validateEnquiry };
