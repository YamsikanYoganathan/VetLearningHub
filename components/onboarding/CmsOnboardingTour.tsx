"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Layers,
  BookOpen,
  FileText,
  Plus,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CmsTourStep {
  targetId: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const CMS_TOUR_STEPS: CmsTourStep[] = [
  {
    targetId: "cms-tour-sidebar",
    title: "CMS Navigation Workspace",
    description:
      "Quickly navigate between your Overview Dashboard, Academic Areas, Subjects, Topics, and Reference Notes.",
    icon: LayoutDashboard,
  },
  {
    targetId: "cms-tour-metrics",
    title: "Knowledge Metrics",
    description:
      "Monitor real-time platform statistics including total published notes, active drafts, subjects, and disciplines.",
    icon: ShieldCheck,
  },
  {
    targetId: "cms-tour-create-note",
    title: "Create Reference Notes",
    description:
      "Draft and publish structured veterinary articles using the rich TipTap clinical editor and diagnostic matrices.",
    icon: Plus,
  },
  {
    targetId: "cms-tour-areas",
    title: "Academic Disciplines",
    description:
      "Manage top-level curriculum branches such as Clinical Sciences, Pre-Clinical Disciplines, and Paraclinical Studies.",
    icon: Layers,
  },
  {
    targetId: "cms-tour-subjects",
    title: "Subject Modules",
    description:
      "Categorize specific medical and surgical subjects under parent academic areas with defined prerequisites.",
    icon: BookOpen,
  },
  {
    targetId: "cms-tour-notes",
    title: "Protocol & Note Management",
    description:
      "Review recently modified articles, manage publication status (Draft, Published, Archived), and preview live content.",
    icon: FileText,
  },
];

const CMS_ONBOARDING_KEY = "vetulan-cms-onboarding-completed";

export function CmsOnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Check if first-time CMS user
  useEffect(() => {
    try {
      const isCompleted = localStorage.getItem(CMS_ONBOARDING_KEY);
      if (!isCompleted) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage error fallback
    } finally {
      setHasCheckedStorage(true);
    }
  }, []);

  // Keyboard navigation (ESC to close, Arrow keys)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIndex]);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem(CMS_ONBOARDING_KEY, "true");
    } catch {}
    setIsOpen(false);
  }, []);

  const handleNext = () => {
    if (currentStepIndex < CMS_TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToTarget(CMS_TOUR_STEPS[nextIndex].targetId);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      scrollToTarget(CMS_TOUR_STEPS[prevIndex].targetId);
    }
  };

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const startTour = () => {
    setCurrentStepIndex(0);
    setIsOpen(true);
    scrollToTarget(CMS_TOUR_STEPS[0].targetId);
  };

  if (!hasCheckedStorage) return null;

  const currentStep = CMS_TOUR_STEPS[currentStepIndex];
  const IconComponent = currentStep.icon;

  return (
    <>
      {/* Floating Re-Open CMS Tour Trigger */}
      {!isOpen && (
        <button
          type="button"
          onClick={startTour}
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-border text-text-secondary hover:text-primary hover:border-sky-300 text-xs font-semibold shadow-sm transition-all cursor-pointer backdrop-blur-md"
          title="Restart CMS workspace guide"
        >
          <HelpCircle className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">CMS Workspace Tour</span>
        </button>
      )}

      {/* Tour Dialog Card */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-slate-900/25 backdrop-blur-[2px] pointer-events-auto transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="CMS Workspace Tour"
            className="relative pointer-events-auto w-full max-w-md bg-white rounded-2xl border border-border/80 shadow-float p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150"
          >
            {/* Tour Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 shadow-2xs">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    CMS Workspace Guide
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    Step {currentStepIndex + 1} of {CMS_TOUR_STEPS.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
                aria-label="Skip CMS tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tour Body */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Tour Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-border/80">
              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {CMS_TOUR_STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === currentStepIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="h-8 px-3 text-xs rounded-xl"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
                    <span>Back</span>
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 px-3.5 text-xs bg-primary text-white hover:bg-primary-hover rounded-xl"
                >
                  <span>
                    {currentStepIndex === CMS_TOUR_STEPS.length - 1
                      ? "Finish"
                      : "Next"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
