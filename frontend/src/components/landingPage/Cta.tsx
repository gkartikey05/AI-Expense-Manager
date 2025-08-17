import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const Cta = () => {
  return (
    <motion.div
      className="flex flex-col-reverse lg:flex-row items-center justify-between py-18 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto gap-5"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Text Content on the left */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Get Started with Fundly
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-md ">
          Take control of your finances today. With Fundly, you can track your
          income, manage expenses, and make smarter decisions with easy-to-read
          reports.
        </p>
        <Button className="cursor-pointer">Start Your Journey</Button>
      </div>

      {/* Image on the right */}
      <div className="w-full lg:w-1/2">
        <img
          src={assets.home}
          alt="CTA Image"
          className="w-full  h-full rounded-lg shadow-lg"
        />
      </div>
    </motion.div>
  );
};

export default Cta;
