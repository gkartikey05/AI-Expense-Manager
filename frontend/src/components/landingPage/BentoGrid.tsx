import { assets } from "@/assets/assets";
import { motion } from "framer-motion";

const BentoGrid = () => {
  return (
    <motion.div
      className="py-18 sm:py-24 px-4 sm:px-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold">
        Use Anywhere
      </h1>
      <p className="text-center text-gray-500 mt-3 text-xl">
        Seamlessly accessible on mobile, tablet, and laptop—use it your way,
        anytime, anywhere.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 px-4 max-w-7xl gap-5 mx-auto mt-14">
        <div className="relative overflow-hidden col-span-2  flex items-center justify-center ">
          <img src={assets.laptop} alt="Laptop" className="w-full h-auto " />
        </div>

        <div className="relative overflow-hidden col-span-1 flex items-center justify-center ">
          <img src={assets.phone} alt="Mobile" className="w-full h-auto " />
        </div>

        <div className="relative overflow-hidden col-span-1  flex items-center justify-center ">
          <img src={assets.tablet} alt="Tablet" className="w-full h-auto" />
        </div>
      </div>
    </motion.div>
  );
};

export default BentoGrid;
