import { motion } from "framer-motion";
import { animationBlur} from '@/constants/motionProps';

const heroHeader = "Descubrí el Hogar de tus Sueños.";
const lettersHeader = heroHeader.split("");

export const HeroAnimatedText = () => {
  return (
    <>
      {lettersHeader.map((letter, index) => (
        <motion.h1
          initial={animationBlur.initial}
          animate={animationBlur.animate}
          transition={{ ...animationBlur.transition, delay: 0.1 * index }}
          key={index}
          className={`text-3xl md:text-6xl font-bold ${
            index === lettersHeader.length - 1
              ? "text-red-600"
              : "text-gray-900"
          } mb-6 inline-block`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.h1>
      ))}
    </>
  );
};
