import { FC } from "react";
import { motion } from "framer-motion";
import { BiErrorCircle } from "react-icons/bi";

interface Props {
  text: string;
}

const ErrorPopup: FC<Props> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="absolute bottom-6 left-[50%] translate-x-[-50%] bg-white px-4 py-2 rounded-md flex items-center gap-2 shadow-lg"
    >
      <BiErrorCircle className="text-red-400 w-5 h-5" />
      <p className="text-red-400 font-semibold">{text}</p>
    </motion.div>
  );
};

export default ErrorPopup;
