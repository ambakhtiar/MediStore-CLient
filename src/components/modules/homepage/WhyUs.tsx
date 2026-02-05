"use client";
import Image from "next/image";

export default function WhyUs() {
    return (
        <section className="bg-white dark:bg-[#07070a] transition-colors rounded-xl">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: text */}
                <div className="space-y-6">
                    <p className="text-pink-600 text-2xl font-bold uppercase tracking-wide">Why Us</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Our Commitment to Quality
                    </h2>

                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="flex-none w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                                {/* icon example: box */}
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M3 7l9-4 9 4-9 4-9-4z" />
                                    <path d="M3 7v10l9 4 9-4V7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wide Product Range</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-4">
                            <div className="flex-none w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                                {/* icon example: shield */}
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M12 3l8 4v5c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V7l8-4z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quality Assurance</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-4">
                            <div className="flex-none w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                                {/* icon example: leaf */}
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M12 2a10 10 0 00-10 10c0 5.25 4.5 9.5 10 10 5.5-.5 10-4.75 10-10A10 10 0 0012 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eco-Friendly Practices</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Right: image */}
                <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1604145942179-63cd583fcf64"
                        alt="Pharmacist"
                        width={900}
                        height={900}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}