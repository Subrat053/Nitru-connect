import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { FileText, Phone, Mail, User, ShieldCheck, Tag, Trash2, Plus, RefreshCw, AlertCircle, Calendar, MessageSquare, Download, ArrowLeft } from 'lucide-react';

const EnquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Note form state
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Admin');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchEnquiryDetails = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getEnquiryById(id);
      setEnquiry(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load lead details. It may have been deleted or the ID is invalid.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEnquiryDetails();
    }
  }, [id]);

  const handleStatusChange = async (status) => {
    if (!enquiry) return;
    try {
      const updated = await api.updateEnquiryStatus(enquiry._id, status);
      setEnquiry(prev => ({ ...prev, status: updated.status }));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!enquiry || !newNote.trim()) return;
    setSubmittingNote(true);

    try {
      const updated = await api.addEnquiryNote(enquiry._id, newNote, noteAuthor);
      setEnquiry(prev => ({ ...prev, notes: updated.notes }));
      setNewNote('');
    } catch (err) {
      alert('Failed to add note: ' + err.message);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!enquiry) return;
    if (!window.confirm(`Are you sure you want to delete the enquiry from ${enquiry.companyName}?`)) return;

    try {
      await api.deleteEnquiry(enquiry._id);
      navigate('/admin/enquiries');
    } catch (err) {
      alert('Failed to delete enquiry: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <RefreshCw className="animate-spin text-primary" size={32} />
        <p className="text-xs font-bold text-gray-500 font-montserrat">Loading lead sheet...</p>
      </div>
    );
  }

  if (errorMsg || !enquiry) {
    return (
      <div className="glass-panel text-center max-w-md mx-auto my-8 p-8 rounded-3xl border border-red-200 bg-red-50/20 text-red-600 font-montserrat">
        <AlertCircle className="mx-auto mb-2 text-red-500" size={32} />
        <p className="font-semibold text-sm">{errorMsg || 'Lead details not found.'}</p>
        <Link 
          to="/admin/enquiries" 
          className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold font-montserrat shadow-md transition-all active:scale-95"
        >
          <ArrowLeft size={14} />
          <span>Back to Enquiries</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 text-left font-montserrat">
      <SEO title={`Lead: ${enquiry.companyName}`} />

      {/* Header Info */}
      <div className="glass-panel p-4 rounded-2xl shadow-md bg-white/40 border border-white/50 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/enquiries" 
            className="p-2 border border-white rounded-xl bg-white/60 hover:bg-white/80 transition-colors shadow-sm"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </Link>
          <div className="text-left">
            <h3 className="text-sm font-bold text-neutral">Lead Detail Sheet</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Lead ID: {enquiry._id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status selection */}
          <select
            value={enquiry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-white/80 rounded-xl text-xs font-bold px-3 py-2 bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-colors bg-white/60 shadow-sm"
            title="Delete Lead"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main card box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-md flex flex-col gap-6 bg-white/40 border border-white/50">
        <div className="flex justify-between items-start gap-4 border-b border-white/60 pb-5">
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-neutral">{enquiry.companyName}</h3>
            <span className={`inline-flex text-[9px] font-bold px-2 py-0.5 rounded-full border mt-1.5 ${
              enquiry.status === 'New' ? 'text-blue-700 bg-blue-50 border-blue-100' :
              enquiry.status === 'In Progress' ? 'text-orange-700 bg-orange-50 border-orange-100' :
              enquiry.status === 'Converted' ? 'text-green-700 bg-green-50 border-green-100' :
              'text-gray-700 bg-gray-50 border-gray-100'
            }`}>
              {enquiry.status}
            </span>
          </div>
        </div>

        {/* Grid details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
              <User className="text-primary/70" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">Contact Client</span>
              <span className="font-bold text-neutral">{enquiry.fullName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
              <Tag className="text-primary/70" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">Service Requested</span>
              <span className="font-bold text-neutral">{enquiry.selectedService}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
              <Mail className="text-primary/70" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">Email Address</span>
              <a href={`mailto:${enquiry.email}`} className="font-bold text-primary hover:underline">{enquiry.email}</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
              <Phone className="text-primary/70" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">Phone Number</span>
              <a href={`tel:${enquiry.phone}`} className="font-bold text-neutral hover:text-primary transition-colors">{enquiry.phone}</a>
            </div>
          </div>

          {enquiry.businessType && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                <ShieldCheck className="text-primary/70" size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase">Business Sector</span>
                <span className="font-bold text-neutral">{enquiry.businessType}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
              <Calendar className="text-primary/70" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">Submitted Date</span>
              <span className="font-bold text-neutral">
                {new Date(enquiry.createdAt).toLocaleString('en-GB')}
              </span>
            </div>
          </div>
        </div>

        {/* Source page */}
        {enquiry.sourcePage && (
          <div className="bg-white/60 border border-white rounded-xl p-3.5 text-[11px] text-gray-400 font-bold text-left">
            <span>Submission Route:</span> <span className="text-primary">{enquiry.sourcePage}</span>
          </div>
        )}

        {/* Message */}
        <div className="flex flex-col gap-2 text-left">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enquiry Message</h4>
          <div className="bg-white/60 border border-white p-4 rounded-xl text-gray-500 text-xs font-semibold leading-relaxed whitespace-pre-wrap">
            {enquiry.message || 'No additional requirements message submitted.'}
          </div>
        </div>

        {/* File Attachment Upload */}
        <div className="flex flex-col gap-2 text-left">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Uploaded Statement/Bill</h4>
          {enquiry.uploadedFile ? (
            <div className="border border-white rounded-2xl p-4 flex items-center justify-between bg-white/60 hover:bg-white/80 hover:border-primary/40 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                  <FileText className="text-primary shrink-0" size={20} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-neutral truncate max-w-[200px] sm:max-w-xs">
                    {enquiry.uploadedFile.split('/').pop()}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">Statement Attachment</span>
                </div>
              </div>
              <a
                href={enquiry.uploadedFile}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary-dark text-white text-[11px] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <Download size={14} />
                <span>Download</span>
              </a>
            </div>
          ) : (
            <div className="border border-dashed border-white text-gray-400 text-xs p-4 rounded-2xl text-center bg-white/20 font-bold">
              No files uploaded with this consultation request.
            </div>
          )}
        </div>

        {/* Follow-up Note Logs & Form */}
        <div className="border-t border-white/60 pt-6 flex flex-col gap-5 text-left">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare size={16} className="text-primary/70" />
            <span>Follow-up History Log</span>
          </h4>

          {/* Notes Timeline List */}
          <div className="flex flex-col gap-3">
            {enquiry.notes && enquiry.notes.length > 0 ? (
              enquiry.notes.map((note, idx) => (
                <div key={idx} className="bg-white/60 border border-white p-3.5 rounded-xl flex flex-col gap-2 text-[11px]">
                  <div className="flex justify-between items-center text-gray-400 font-bold">
                    <span>By: {note.addedBy || 'Agent'}</span>
                    <span>{new Date(note.addedAt).toLocaleString('en-GB')}</span>
                  </div>
                  <p className="text-gray-500 font-semibold leading-relaxed">{note.note}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic font-semibold">No notes logged yet. Record call updates below.</p>
            )}
          </div>

          {/* Note Form */}
          <form onSubmit={handleAddNote} className="flex flex-col gap-3">
            <textarea
              placeholder="Add follow-up notes (e.g., Left voicemail, switching utility from Octopus, card sales volume verified...)"
              rows="3"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              required
              className="border border-white rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none"
            />
            
            <div className="flex justify-between items-center gap-4">
              {/* Author selector */}
              <input
                type="text"
                value={noteAuthor}
                onChange={(e) => setNoteAuthor(e.target.value)}
                placeholder="Author name"
                className="border border-white rounded-xl px-3 py-2 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold max-w-[120px]"
              />
              
              <button
                type="submit"
                disabled={submittingNote || !newNote.trim()}
                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-md disabled:bg-gray-300 disabled:pointer-events-none"
              >
                {submittingNote ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />}
                <span>Add Note</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetails;
