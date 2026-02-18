'use client';

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu mobile */}
      <div className={`
        lg:hidden fixed inset-y-0 right-0 z-40
        w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <nav className="p-6 space-y-6" dir="rtl">
          <div className="mb-6">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                <img src="/mascot.jpg" alt="ArabClaw" className="w-12 h-12 rounded-full" />
                <span className="text-xl font-bold text-gray-900">ArabClaw</span>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
          >
            الرئيسية
          </Link>
          <Link
            href="/openclaw"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
          >
            ما هو OpenClaw؟
          </Link>
          <Link
            href="/install"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
          >
            التثبيت
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
          >
            المدونة
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
          >
            من نحن
          </Link>
        </nav>
      </div>

      {/* Desktop navbar */}
      <nav className="hidden lg:block sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/mascot.jpg" alt="ArabClaw" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-gray-900">ArabClaw</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                الرئيسية
              </Link>
              <Link href="/openclaw" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                ما هو OpenClaw؟
              </Link>
              <Link href="/install" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                التثبيت
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                المدونة
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                من نحن
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
