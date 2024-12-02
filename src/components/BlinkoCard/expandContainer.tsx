import { helper } from "@/lib/helper";
import { useIsIOS } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ExpandableContainerProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const ANIMATION_CONFIG = {
  type: "spring",
  damping: 20,
  stiffness: 300,
  mass: 0.6,
} as const;

const BASE_STYLES = {
  boxShadow: '0 0 15px -5px #5858581a',
} as const;

export const ExpandableContainer = ({ isExpanded, children }: ExpandableContainerProps) => {
  const isIOS = useIsIOS()
  
  if (isIOS) {
    if (isExpanded) {
      return createPortal(
        <div
          className='w-full expand-container fixed inset-0 touch-manipulation'
          style={{
            ...BASE_STYLES,
            backgroundColor: 'var(--background)',
            zIndex: 20,
            width: "100vw",
            height: "100vh",
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {children}
        </div>,
        document.body
      );
    }
  
    return (
      <div
        className='w-full expand-container touch-manipulation'
        style={{
          ...BASE_STYLES,
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className='w-full'
      style={{
        ...BASE_STYLES,
        position: isExpanded ? 'fixed' : 'relative',
        top: isExpanded ? 0 : 'auto',
        left: isExpanded ? 0 : 'auto',
        zIndex: isExpanded ? 50 : 1,
      }}
      layout
      animate={{
        width: isExpanded ? "100vw" : "100%",
        height: isExpanded ? "100vh" : "auto",
        scale: isExpanded ? 1 : 1,
      }}
      transition={ANIMATION_CONFIG}
    >
      {children}
    </motion.div>
  );
};