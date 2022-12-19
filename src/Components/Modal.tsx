import { motion } from "framer-motion";
const Modal = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: any;
}) => {
  const closeModal = (e: any) => {
    if (!e.target.classList.contains("selectedImage")) {
      setSelectedImage(null);
    }
  };
  return (
    <motion.div
      className="backdrop"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        className="selectedImage"
        src={selectedImage}
        alt="enlarge picture of the selected"
      />
    </motion.div>
  );
};

export default Modal;
