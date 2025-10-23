import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import MyCVFile from "../../assets/files/CV.pdf";
import { FiDownload } from "react-icons/fi";

const DownloadCVButton: React.FC = () => {
    return (
        <Button
            className="interactive"
            onClick={() => {
                const link = document.createElement("a");
                link.href = MyCVFile;
                link.download = "NguyenTrungAnh_CV.pdf"; 
                link.click();
            }}
        >
            <motion.span
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
            }}
            className="flex items-center gap-2"
        >
            <FiDownload className="w-5 h-5" />
            MyCV
        </motion.span>
        </Button>
    );
};

export default DownloadCVButton;
