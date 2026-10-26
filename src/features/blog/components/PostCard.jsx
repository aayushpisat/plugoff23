import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const PostCard = ({ post }) => {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:border-zinc-300 text-left">
      <div className="relative aspect-[16/9] bg-zinc-100 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-900/90 backdrop-blur text-white">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 text-xs text-zinc-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="mt-2 text-xs text-zinc-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-[10px] text-zinc-700">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs font-medium text-zinc-700">{post.author}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform">
            <span>Read Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
