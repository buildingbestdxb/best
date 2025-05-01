"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { FaInstagram } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  XIcon
} from "react-share";
import { FacebookIcon, LinkedinIcon, WhatsappIcon,EmailIcon } from "react-share";
import Image from "next/image";
import shareIcon from "../../../public/assets/img/news-details/share-icon.svg";

const ShareArticle = () => {
  const [showIcons, setShowIcons] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Container animation (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // Icons appear one by one
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }, // Reverse order on hide
    },
  };

  // Individual icon animation
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  // const shareOnInstagram = async () => {
  //   const instagramUrl = "https://www.instagram.com/";
  //   try {
  //     await navigator.clipboard.writeText(shareUrl);

  //     window.open(instagramUrl, "_blank");
  //   } catch (err) {
  //     console.error("Failed to copy URL:", err);
  //   }
  // };

//   const shareOnInstagram = () => {
//     const imageUrl = "https://www.desertboard.ae/_next/static/media/share.54901c09.svg"; // Replace with your article image
//     const articleUrl = "https://www.desertboard.ae/article/67ab4af0ad0aabc6e9df99fb"; // Your article link

//     const instagramStoryUrl = `https://www.instagram.com/stories/create/?background=${encodeURIComponent(imageUrl)}`;

//     window.open(instagramStoryUrl, "_blank");

//     alert("Your article link: " + articleUrl + " (Add it manually in the story).");
// };



  return (
    <div className="relative w-fit">
      {/* Share Button */}
      <motion.button
        onClick={() => setShowIcons(!showIcons)}
        className="flex items-center gap-2 pb-6 cursor-pointer transition-transform transform hover:scale-110"
        whileTap={{ scale: 0.9 }}
      >
        <Image src={shareIcon} alt="Share Icon" />
        <p className="uppercase font-[800] text-[#FE6601] flex gap-2 items-center text-[16px]">
          Share Article
        </p>

      </motion.button>

      {/* Animated Social Icons */}
      <AnimatePresence>
        {showIcons && (
          <motion.div
            className="flex gap-3  bottom-2md:right-[-41px] lg:right-[-26px]  xl:right-[-29px] px-0  rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {[
              { Component: EmailShareButton, Icon: EmailIcon },
              { Component: FacebookShareButton, Icon: FacebookIcon },
              { Component: TwitterShareButton, Icon: XIcon },
              { Component: LinkedinShareButton, Icon: LinkedinIcon },
              { Component: WhatsappShareButton, Icon: WhatsappIcon },
            ].map(({ Component, Icon }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                variants={itemVariants}
              >
                <Component url={shareUrl} onClick={()=>{}} openShareDialogOnClick>
                  <Icon size={32} round iconFillColor="#FF671F" style={{borderColor:"#FF671F",borderWidth:"2px",borderRadius:"50%"}} bgStyle={{fill:"none"}}/>
                </Component>
              </motion.div>
            ))}
            {/* <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                variants={itemVariants}
              >
              <p onClick={shareOnInstagram}   rel="noopener noreferrer">
                <div className="bg-[#E4405F] cursor-pointer rounded-full w-[32px] h-[32px] flex align-center justify-center">
                  <FaInstagram size={32} color="#fff" className="w-[18px]"/>
                  </div>
              </p>
              </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareArticle;