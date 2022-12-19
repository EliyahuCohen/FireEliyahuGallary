import useFirestore, { DOC } from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImage }: { setSelectedImage: any }) => {
  const { docs } = useFirestore("images");
  //when we are invoking this Hook it gose stright to the useEffect hook that triggers that function that gives us these documents
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc: DOC) => {
          return (
            <motion.div
              layout
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="img-wrap"
              key={doc.id}
              onClick={() => setSelectedImage(doc.url)}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                src={doc.url}
                alt={`uploaded imag ${doc.id}`}
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
