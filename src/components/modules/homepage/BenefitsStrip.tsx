// src/components/BenefitsStrip.tsx
"use client";
import React from "react";

type Benefit = {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bg?: string;
};

const benefits: Benefit[] = [
    {
        title: "Free Shipping",
        subtitle: "Order Over $600",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 7h11v6H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7h4l3 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" />
                <circle cx="18.5" cy="17.5" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: "Cash on Delivery",
        subtitle: "100% Secure",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Home Delivery",
        subtitle: "64 District Cover in Delivery",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "24/7 Support",
        subtitle: "Ready for You",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function BenefitsStrip() {
    return (
        <section aria-labelledby="benefits-heading" className="py-8 bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
            <div className="mx-auto max-w-7xl px-6">
                <h2 id="benefits-heading" className="sr-only">Why choose MediStore</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {benefits.map((b, idx) => (
                        <article
                            key={idx}
                            className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-[#111111] shadow-sm hover:shadow-md transition-shadow duration-150"
                            role="group"
                            aria-labelledby={`benefit-${idx}-title`}
                        >
                            <div
                                className="flex-none w-12 h-12 rounded-md flex items-center justify-center text-white"
                                style={{ background: idx % 2 === 0 ? "linear-gradient(135deg,#111827,#374151)" : "linear-gradient(135deg,#065f46,#10b981)" }}
                                aria-hidden
                            >
                                <span className="text-white">{b.icon}</span>
                            </div>

                            <div className="min-w-0">
                                <h3 id={`benefit-${idx}-title`} className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {b.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{b.subtitle}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}