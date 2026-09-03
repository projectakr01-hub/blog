import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { Blog } from "@/lib/types";
import { calculateReadingTime } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const readingTime = calculateReadingTime(blog.content);
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Header */}
      <Link href={`/blog/${blog.slug}`} className="relative block h-52 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={blog.coverImage || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"}
          alt={blog.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase text-emerald-950 dark:text-emerald-100 bg-emerald-300/90 dark:bg-emerald-800/90 backdrop-blur-md rounded-full shadow-sm">
            {blog.category}
          </span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Meta Info */}
        <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 space-x-4">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
          {blog.excerpt}
        </p>

        {/* SEO Tags Badges */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {blog.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 rounded-md"
              >
                <Tag className="w-2.5 h-2.5 mr-1 text-emerald-500" />
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
          >
            <span>Read Article & Technical Specs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
