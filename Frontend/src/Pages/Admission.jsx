import React, { useState } from 'react';
import { User, ClipboardList, BookOpen, Bus, DollarSign, ChevronRight, CheckCircle, XCircle, ChevronLeft } from 'lucide-react';
import '../CSS/Admission.css';
import axios from 'axios';

const FEE_STRUCTURE = {
  departments: [
    { id: 'cse', name: 'Computer Science & Engineering', fee: 150000 },
    { id: 'mech', name: 'Mechanical Engineering', fee: 120000 },
    { id: 'eec', name: 'Electrical & Electronics Engineering', fee: 135000 },
    { id: 'civil', name: 'Civil Engineering', fee: 110000 },
  ],
  services: [
    { id: 'hostel', name: 'Hostel Accommodation', fee: 60000, icon: BookOpen },
    { id: 'library', name: 'Premium Library Access', fee: 5000, icon: ClipboardList },
    { id: 'transport', name: 'College Transport Service', fee: 25000, icon: Bus },
  ],
};

const Admission = () => {
  const [step, setStep] = useState(1);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    departmentId: '',
    dob: '',
    address: '',
    city: '',
    contact: '',
    password: '', // added password field
  });
  const [selectedServices, setSelectedServices] = useState({
    hostel: false,
    library: false,
    transport: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  };

  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    if (studentDetails.name && studentDetails.email && studentDetails.phone && studentDetails.departmentId && studentDetails.password) {
      setStep(2);
      setStatus(null);
    } else {
      setStatus({
        type: 'error',
        message: 'Please fill in all required student details, including password, and select a department.',
      });
    }
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const baseFee = FEE_STRUCTURE.departments.find(
    (dep) => dep.id === studentDetails.departmentId
  )?.fee || 0;

  const selectedServiceList = FEE_STRUCTURE.services.filter(
    (service) => selectedServices[service.id]
  );
  const totalServiceFees = selectedServiceList.reduce((sum, s) => sum + s.fee, 0);
  const totalFee = baseFee + totalServiceFees;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Processing admission and generating payment link...' });

    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Prepare the form data for submission
    const formData = {
      ...studentDetails,
      basefee: baseFee,
      hostel: selectedServices.hostel ? 'Yes' : 'No',
      library: selectedServices.library ? 'Yes' : 'No',
      transport: selectedServices.transport ? 'Yes' : 'No',
      totalfee: totalFee,
    };

    // Make an API call to register the student (POST request)
    try {
      const response = await axios.post('http://localhost:7000/admission', {
        ...formData,
      });

      const result = await response.data;

      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: `Admission for ${studentDetails.name} confirmed! Total fee of ${formatCurrency(
            totalFee
          )} is payable. Redirecting to payment confirmation...`,
        });
        setTimeout(() => {
          setStep(1);
          setStudentDetails({
            name: '',
            email: '',
            phone: '',
            departmentId: '',
            dob: '',
            address: '',
            city: '',
            contact: '',
            password: '', // reset password
          });
          setSelectedServices({ hostel: false, library: false, transport: false });
          setStatus(null);
        }, 6000);
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Submission failed. Please check your network and try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred while registering. Please try again later.',
      });
    }

    setIsSubmitting(false);
  };

  const StatusMessage = ({ status }) => {
    if (!status) return null;
    const Icon =
      status.type === 'success'
        ? CheckCircle
        : status.type === 'error'
        ? XCircle
        : ClipboardList;

    return (
      <div className={`status-message ${status.type}`}>
        <Icon className="w-5 h-5 mr-3" />
        <p>{status.message}</p>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <header className="app-header">
          <h1 className="app-title">
            <ClipboardList className="app-title-icon" />
            Student Admission System
          </h1>
          <p className="app-subtitle">Enrollment & Dynamic Fee Calculation</p>
        </header>

        <div className="steps-nav">
          {[{ id: 1, name: 'Basic Details', icon: User }, { id: 2, name: 'Fee Structure', icon: DollarSign }].map(
            (item) => (
              <div key={item.id} className="step-item">
                <div
                  className={`step-icon-container ${
                    item.id <= step ? 'step-active' : 'step-inactive'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <p
                  className={`step-name ${
                    item.id <= step ? 'step-text-active' : 'step-text-inactive'
                  }`}
                >
                  {item.name}
                </p>
              </div>
            )
          )}
        </div>

        <div className="form-content">
          <StatusMessage status={status} />

          {step === 1 && (
            <form onSubmit={handleStepOneSubmit} className="space-y-6">
              <h2 className="section-title">1. Student Registration</h2>

              <div className="form-grid">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={studentDetails.name}
                  onChange={handleDetailChange}
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={studentDetails.email}
                  onChange={handleDetailChange}
                  className="form-input"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (e.g., 9876543210)"
                  value={studentDetails.phone}
                  onChange={handleDetailChange}
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={studentDetails.password}
                  onChange={handleDetailChange}
                  className="form-input"
                  required
                  minLength="6"
                />
                <input
                  type="date"
                  name="dob"
                  value={studentDetails.dob}
                  onChange={handleDetailChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={studentDetails.address}
                  onChange={handleDetailChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={studentDetails.city}
                  onChange={handleDetailChange}
                  className="form-input"
                />
                <input
                  type="number"
                  name="contact"
                  placeholder="Contact Number"
                  value={studentDetails.contact}
                  onChange={handleDetailChange}
                  className="form-input"
                />
   
                                  <select
                    name="departmentId"
                    value={studentDetails.departmentId}
                    onChange={handleDetailChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {FEE_STRUCTURE.departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} ({formatCurrency(dept.fee)} Base Fee)
                      </option>
                    ))}
                  </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Next: Configure Fees <ChevronRight className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <h2 className="section-title">2. Optional Services & Total Fee</h2>

              <div className="department-card">
                <h3 className="department-title">
                  <User className="w-6 h-6 mr-3 text-indigo-500" />
                  Department: {FEE_STRUCTURE.departments.find((dep) => dep.id === studentDetails.departmentId)?.name}
                </h3>
                <p className="department-fee">{formatCurrency(baseFee)}</p>
              </div>

              <div className="services-section-title">Add Optional Services</div>
              <div className="services-grid">
                {FEE_STRUCTURE.services.map((service) => {
                  const isSelected = selectedServices[service.id];
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`service-card ${isSelected ? 'selected' : ''}`}
                      role="button"
                      tabIndex="0"
                    >
                      <div className="card-header">
                        <div className="card-title">
                          <service.icon className="card-icon" />
                          <h3 className="card-name">{service.name}</h3>
                        </div>
                        <span className="card-fee">{formatCurrency(service.fee)}</span>
                      </div>
                      <p className="card-message">
                        {isSelected ? 'Service Selected' : 'Click to Add Service'}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="summary-card">
                <h3 className="summary-title">Total Fee Summary</h3>
                <div className="summary-details-list">
                  <div className="summary-line">
                    <span>Base Fee (Tuition)</span>
                    <span>{formatCurrency(baseFee)}</span>
                  </div>
                  {selectedServiceList.map((service) => (
                    <div key={service.id} className="summary-detail">
                      <span>+ {service.name}</span>
                      <span>{formatCurrency(service.fee)}</span>
                    </div>
                  ))}
                  <div className="summary-total">
                    <span>Total Fee Payable</span>
                    <span className="total-amount">{formatCurrency(totalFee)}</span>
                  </div>
                </div>
              </div>

              <div className="form-actions justify-between">
                <button
                  onClick={() => {
                    setStep(1);
                    setStatus(null);
                  }}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="mr-2" /> Back to Details
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm & Finalize Admission'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admission;


