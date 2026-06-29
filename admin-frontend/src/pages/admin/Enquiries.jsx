import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Inbox, FileText, Phone, Mail, User, ShieldCheck, Tag, Trash2, Plus, RefreshCw, AlertCircle, Calendar, MessageSquare, Download } from 'lucide-react';

const Enquiries = () => {
  const location = useLocation();
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Note form state
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Admin');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchEnquiries = async (selectId = null) => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getEnquiries();
      setEnquiries(data);
      
      // Select an active item if passed from state or if requested
      if (data.length > 0) {
        const preSelectId = selectId || location.state?.activeEnquiryId;
        if (preSelectId) {
          const match = data.find(e => e._id === preSelectId);
          if (match) setSelectedEnquiry(match);
          else setSelectedEnquiry(data[0]);
        } else {
          setSelectedEnquiry(data[0]);
        }
      } else {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load enquiries. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [location.state?.activeEnquiryId]);

  const handleStatusChange = async (status) => {
    if (!selectedEnquiry) return;
    try {
      const updated = await api.updateEnquiryStatus(selectedEnquiry._id, status);
      // Update local state lists
      setEnquiries(prev => prev.map(e => e._id === selectedEnquiry._id ? { ...e, status: updated.status } : e));
      setSelectedEnquiry(prev => ({ ...prev, status: updated.status }));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNote.trim()) return;
    setSubmittingNote(true);

    try {
      const updated = await api.addEnquiryNote(selectedEnquiry._id, newNote, noteAuthor);
      // Update local list and selection
      setEnquiries(prev => prev.map(e => e._id === selectedEnquiry._id ? { ...e, notes: updated.notes } : e));
      setSelectedEnquiry(prev => ({ ...prev, notes: updated.notes }));
      setNewNote('');
    } catch (err) {
      alert('Failed to add note: ' + err.message);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry) return;
    if (!window.confirm(`Are you sure you want to delete the enquiry from ${selectedEnquiry.companyName}?`)) return;

    try {
      await api.deleteEnquiry(selectedEnquiry._id);
      const remaining = enquiries.filter(e => e._id !== selectedEnquiry._id);
      setEnquiries(remaining);
      setSelectedEnquiry(remaining.length > 0 ? remaining[0] : null);
    } catch (err) {
      alert('Failed to delete enquiry: ' + err.message);
    }
  };

  // Filters
  const filteredList = enquiries.filter(e => {
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      e.companyName.toLowerCase().includes(searchLower) ||
      e.fullName.toLowerCase().includes(searchLower) ||
      e.selectedService.toLowerCase().includes(searchLower) ||
      e.email.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 text-left font-montserrat h-[calc(100vh-140px)]">
      <SEO title="Lead Management" />

      {/* Filter and search top header bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-md bg-white/40 border border-white/50 shrink-0">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'New', 'In Progress', 'Converted', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                filterStatus === status
                  ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-dark'
                  : 'bg-white/60 text-gray-500 border-white hover:border-primary hover:text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search company, client, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
          />
          <Inbox className="absolute left-3 top-3 text-primary/70" size={14} />
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <RefreshCw className="animate-spin text-primary" size={32} />
          <p className="text-xs font-bold text-gray-500">Loading enquiries...</p>
        </div>
      ) : errorMsg ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-semibold text-xs">
          <AlertCircle size={32} className="text-red-500 mb-2" />
          <p>{errorMsg}</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <Inbox size={48} className="text-gray-300 mb-2" />
          <h3 className="font-bold text-neutral">No Enquiries Found</h3>
          <p className="text-gray-400 text-xs mt-1">Submit an enquiry on the public pages to test this table.</p>
        </div>
      ) : (
        /* Split view layout */
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Left panel list */}
          <div className="w-full lg:w-96 glass-panel rounded-3xl overflow-y-auto shadow-md flex flex-col divide-y divide-white/45 bg-white/40 border border-white/50 no-scrollbar">
            {filteredList.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs font-bold">
                No matching leads found.
              </div>
            ) : (
              filteredList.map((enq) => (
                <button
                  key={enq._id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-5 text-left flex flex-col gap-2.5 transition-colors focus:outline-none border-l-4 ${
                    selectedEnquiry?._id === enq._id
                      ? 'bg-white/70 border-primary shadow-sm'
                      : 'border-transparent hover:bg-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-neutral text-xs sm:text-sm truncate">{enq.companyName}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                      enq.status === 'New' ? 'text-blue-700 bg-blue-50 border-blue-100' :
                      enq.status === 'In Progress' ? 'text-orange-700 bg-orange-50 border-orange-100' :
                      enq.status === 'Converted' ? 'text-green-700 bg-green-50 border-green-100' :
                      'text-gray-700 bg-gray-50 border-gray-100'
                    }`}>
                      {enq.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold">
                    <span className="truncate max-w-[60%]">{enq.fullName}</span>
                    <span>
                      {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>

                  <span className="text-[9px] text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded font-bold self-start truncate max-w-full">
                    {enq.selectedService}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Right panel details */}
          <div className="flex-1 glass-panel rounded-3xl shadow-md overflow-y-auto p-6 md:p-8 flex flex-col gap-8 bg-white/40 border border-white/50 no-scrollbar">
            {selectedEnquiry ? (
              <>
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between border-b border-white/60 pb-5 gap-4">
                  <div className="flex flex-col gap-1 text-left">
                    <h3 className="text-base sm:text-lg font-bold text-neutral">{selectedEnquiry.companyName}</h3>
                    <p className="text-[10px] font-bold text-gray-400">LEAD ID: {selectedEnquiry._id}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status selection */}
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="border border-white/80 rounded-xl text-xs font-bold px-3 py-2 bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
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

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <User className="text-primary/70" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Contact Client</span>
                      <span className="font-bold text-neutral">{selectedEnquiry.fullName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Tag className="text-primary/70" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Service Requested</span>
                      <span className="font-bold text-neutral">{selectedEnquiry.selectedService}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Mail className="text-primary/70" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Email Address</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-primary hover:underline">{selectedEnquiry.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Phone className="text-primary/70" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Phone Number</span>
                      <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-neutral hover:text-primary transition-colors">{selectedEnquiry.phone}</a>
                    </div>
                  </div>

                  {selectedEnquiry.businessType && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                        <ShieldCheck className="text-primary/70" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-bold uppercase">Business Sector</span>
                        <span className="font-bold text-neutral">{selectedEnquiry.businessType}</span>
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
                        {new Date(selectedEnquiry.createdAt).toLocaleString('en-GB')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Source track */}
                {selectedEnquiry.sourcePage && (
                  <div className="bg-white/60 border border-white rounded-xl p-3.5 text-[11px] text-gray-400 font-bold text-left">
                    <span>Submission Route:</span> <span className="text-primary">{selectedEnquiry.sourcePage}</span>
                  </div>
                )}

                {/* Message Box */}
                <div className="flex flex-col gap-2 text-left">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enquiry Message</h4>
                  <div className="bg-white/60 border border-white p-4 rounded-xl text-gray-500 text-xs font-semibold leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.message || 'No additional requirements message submitted.'}
                  </div>
                </div>

                {/* File Attachment Upload */}
                <div className="flex flex-col gap-2 text-left">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Uploaded Statement/Bill</h4>
                  {selectedEnquiry.uploadedFile ? (
                    <div className="border border-white rounded-2xl p-4 flex items-center justify-between bg-white/60 hover:bg-white/80 hover:border-primary/40 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                          <FileText className="text-primary shrink-0" size={20} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-neutral truncate max-w-[200px] sm:max-w-xs">
                            {selectedEnquiry.uploadedFile.split('/').pop()}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">Statement Attachment</span>
                        </div>
                      </div>
                      <a
                        href={selectedEnquiry.uploadedFile}
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
                    {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                      selectedEnquiry.notes.map((note, idx) => (
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
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-xs font-bold">
                Select an enquiry from the left list to review detailed specifications.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
