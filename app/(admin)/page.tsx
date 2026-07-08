import React from "react";
import { BookOpen, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Clinical Knowledge Overview
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Manage veterinary subject categories, review pending protocol drafts, and publish clinical reference notes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Subjects</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">4</div>
          <span className="text-xs text-slate-500 mt-1 block">Active clinical disciplines</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Published Notes</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">56</div>
          <span className="text-xs text-teal-600 font-medium mt-1 block">Publicly accessible via RLS</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Draft Protocols</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">7</div>
          <span className="text-xs text-amber-600 font-medium mt-1 block">Pending peer review</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">System Status</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-serif font-semibold text-teal-600">Connected</div>
          <span className="text-xs text-slate-500 mt-1 block">Supabase Client initialized</span>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-serif font-semibold text-slate-900 text-base">
            Recently Modified Clinical Notes
          </h2>
          <span className="text-xs font-medium text-slate-500">Showing last 5 protocols</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">Canine Cardiology</span>
              <h3 className="text-sm font-medium text-slate-900 mt-0.5">Pimobendan Dosage & Titration Protocol in MMVD</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                Published
              </span>
              <span className="text-xs text-slate-400">2h ago</span>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider block">Equine Orthopedics</span>
              <h3 className="text-sm font-medium text-slate-900 mt-0.5">Diagnostic Abaxial Sesamoid Nerve Block Landmark Guide</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                Published
              </span>
              <span className="text-xs text-slate-400">1d ago</span>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">Feline Endocrinology</span>
              <h3 className="text-sm font-medium text-slate-900 mt-0.5">Feline Diabetic Ketoacidosis (DKA) CRI Fluid Algorithm</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Draft
              </span>
              <span className="text-xs text-slate-400">2d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
