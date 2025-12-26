'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const links = [
  { label: 'Documentation', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Contact', href: '#' },
];

export function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-white/5">
      <div className="container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo/Brand */}
            <div className="text-center md:text-left">
              <motion.div
                className="font-display font-bold text-xl mb-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="gradient-text">ElevenLabs</span>
              </motion.div>
              <p className="text-sm text-text-tertiary">
                The Way of the Voice Agent
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </motion.a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-sm text-text-tertiary">
              © {new Date().getFullYear()} ElevenLabs
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
