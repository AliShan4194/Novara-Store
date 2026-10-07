import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function SectionHeading({ eyebrow, title, linkTo, linkLabel = 'View all', align = 'between' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`mb-10 flex items-end gap-6 sm:mb-14 ${align === 'center' ? 'flex-col items-center text-center' : 'justify-between'}`}
    >
      <div>
        {eyebrow && (
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/70" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-4xl leading-[1.04] tracking-[-0.025em] sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group hidden shrink-0 items-center gap-1.5 border-b border-ink/30 pb-1 text-sm font-medium transition hover:border-accent hover:text-accent sm:inline-flex"
        >
          {linkLabel}
          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </motion.div>
  )
}
