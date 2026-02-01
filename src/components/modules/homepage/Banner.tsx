"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="bg-white dark:bg-[#1A1A1D] transition-colors duration-200 rounded-xl">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: text */}
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white leading-tight">
                        MediStore
                        <span className="block text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                            Your Trusted Online Medicine Shop
                        </span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                        Fast delivery, verified medicines, and trusted pharmacists. Order OTC medicines with confidence — cash on delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-black text-white hover:opacity-95 transition">
                            Shop Now
                        </Link>

                        <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
                            Learn More
                        </Link>
                    </div>

                    {/* Avatars + stat: use small fixed avatars so they don't expand */}
                    <div className="flex items-center gap-3 mt-4">
                        <div className="flex -space-x-3">
                        </div>

                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            <strong className="text-black dark:text-white">100k+</strong> Satisfied Customers
                        </div>
                    </div>
                </div>

                {/* Right: hero image */}
                <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800">
                    <Image
                        src="https://images.unsplash.com/photo-1576602975754-efdf313b9342"
                        alt="Pharmacist"
                        width={900}
                        height={900}
                        className="object-cover w-full h-full"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                    <div className="absolute left-4 bottom-4 bg-white/80 dark:bg-black/60 text-sm rounded-md px-3 py-1 backdrop-blur-sm">
                        Trusted Pharmacists
                    </div>
                </div>
            </div>
        </section>
    );
}