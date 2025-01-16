import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Logo from "@/components/ui/logo";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemsVariants,
  iconVariants,
  buttonVariants,
} from "../animations-framer-motion/animationsSettingsLayoutPageError";

export default function LayoutErrorPage({
  redirect,
  error,
  onRetry,
  onBackToHome,
}) {
  return (
    <motion.div
      initial="initial"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <motion.div
        variants={itemsVariants}
        className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center"
      >
        <motion.div variants={iconVariants}>
          <Logo />
        </motion.div>

        <motion.div variants={iconVariants}>
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        </motion.div>

        <motion.h2
          variants={itemsVariants}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          An error occurred
        </motion.h2>

        <motion.p variants={itemsVariants} className="text-gray-600 mb-6">
          {error}
        </motion.p>

        <motion.div variants={itemsVariants} className="space-y-3">
          <motion.div
            variants={buttonVariants}
            whileHover={"hover"}
            whileTap={"tap"}
          >
            <Button
              onClick={onRetry}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Try Again
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button onClick={onBackToHome} variant="outline" className="w-full">
              Back to {redirect} page
            </Button>
          </motion.div>
        </motion.div>
        <motion.p
          variants={itemsVariants}
          className="mt-4 text-sm text-gray-500"
        >
          If the problem persists, please contact support
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
