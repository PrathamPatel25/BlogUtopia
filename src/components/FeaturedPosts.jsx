import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedPosts = ({ posts }) => {
  const featuredRef = useRef(null);

  const defaultPosts = [
    {
      title: "Getting Started with React and Tailwind",
      excerpt:
        "Learn how to set up and create beautiful interfaces with React and Tailwind CSS...",
      author: "Sarah Johnson",
      category: "Development",
      readTime: "5 min read",
    },
    {
      title: "The Future of Web Development",
      excerpt:
        "Exploring upcoming trends and technologies shaping the web development landscape...",
      author: "Michael Chen",
      category: "Tech Trends",
      readTime: "8 min read",
    },
    {
      title: "Mastering CSS Grid Layout",
      excerpt:
        "A comprehensive guide to creating responsive layouts using CSS Grid...",
      author: "Emma Davis",
      category: "CSS",
      readTime: "6 min read",
    },
  ];

  const displayPosts = posts && posts.length > 0 ? posts : defaultPosts;

  useEffect(() => {
    const elements = gsap.utils.toArray(".featured-post");
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 100 });

    const triggers = elements.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top center+=100",
        onEnter: () => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={featuredRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 dark:text-white">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <div
              key={index}
              className="featured-post bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all"
            >
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
