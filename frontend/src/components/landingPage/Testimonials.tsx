import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "TechCorp",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content:
      "Fundly completely transformed how I manage my finances. The AI insights helped me save $3,000 in just 6 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    company: "StartupXYZ",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "The budgeting features are incredible. I finally have control over my spending and I'm actually excited about checking my finances.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    company: "Self-employed",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "As a freelancer, tracking irregular income was always a nightmare. Fundly made it simple and stress-free!",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Financial Advisor",
    company: "WealthPlan Co.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "I recommend Fundly to all my clients. The reporting features provide insights that even surprise me as a professional.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Small Business Owner",
    company: "Park's Bakery",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    content:
      "Managing both personal and business finances became so much easier. The goal tracking feature is my favorite!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Teacher",
    company: "Lincoln High School",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    content:
      "On a teacher's salary, every dollar counts. Fundly helped me find money I didn't even know I was wasting.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Nurse",
    company: "City General Hospital",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    content:
      "Working night shifts made it hard to track expenses. Fundly's automatic categorization is a lifesaver!",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    role: "Data Analyst",
    company: "Analytics Pro",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    content:
      "The data visualizations are beautiful and actually useful. Finally, a finance app that speaks my language!",
    rating: 5,
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      className="flex-shrink-0 w-96 mx-4"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 relative overflow-hidden group hover:border-purple-200 transition-all duration-300">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -translate-y-10 translate-x-10 group-hover:bg-purple-100 transition-colors duration-300" />

        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-purple-500/30 mb-4" />

        {/* Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
          "{testimonial.content}"
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
          />
          <div>
            <div className="font-semibold text-gray-900">
              {testimonial.name}
            </div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
            <div className="text-xs text-purple-600 font-medium">
              {testimonial.company}
            </div>
          </div>
        </div>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
    </motion.div>
  );
};

export default function TestimonialSection() {
  const [isHovered, setIsHovered] = useState(false);

  // Double the testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-purple-600 fill-current" />
            <span className="text-sm font-semibold text-purple-700">
              Loved by Thousands
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What our users{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              are saying
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their
            financial lives with Fundly
          </p>
        </motion.div>

        {/* Testimonials Scroll Container */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-20 pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            className="flex"
            animate={{
              x: isHovered ? 0 : [-1600, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">12,000+</span> happy
              customers
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-20 w-16 h-16 bg-purple-200/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 right-32 w-12 h-12 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-lg"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  );
}
