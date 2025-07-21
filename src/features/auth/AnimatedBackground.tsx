import React from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import backgroundImage from "@/assets/images/background.webp";
const floatLeft = keyframes`
  0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
  50% { transform: translateX(-30px) translateY(-20px) rotate(5deg); }
`;

const floatRight = keyframes`
  0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
  50% { transform: translateX(30px) translateY(-25px) rotate(-5deg); }
`;

const slideLeft = keyframes`
  0%, 100% { transform: translateX(0px) scaleX(1) rotate(0deg); }
  50% { transform: translateX(-40px) scaleX(1.1) rotate(-2deg); }
`;

const slideRight = keyframes`
  0%, 100% { transform: translateX(0px) scaleX(1) rotate(0deg); }
  50% { transform: translateX(40px) scaleX(1.1) rotate(2deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.2); }
`;

const waveMotion = keyframes`
  0%, 100% { transform: translateY(0px) scaleY(1); }
  50% { transform: translateY(-15px) scaleY(1.05); }
`;

interface AnimatedBackgroundProps {
  isLogin: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isLogin }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex={0}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        // filter="brightness(0.6) contrast(1.1)"
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient={
          "linear(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(63, 81, 181, 0.85) 50%, rgba(103, 58, 183, 0.8) 100%)"
        }
      />

      <Box
        position="absolute"
        top="-20%"
        left={isLogin ? "-15%" : "15%"}
        width="140%"
        height="60%"
        bg="rgba(255, 255, 255, 0.15)"
        borderRadius="0 0 70% 30%"
        transform={
          isLogin
            ? "rotate(-12deg) scaleX(1)"
            : "rotate(35deg) scaleX(1.6) translateY(-15%) translateX(20%)"
        }
        transition="all 2.5s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${slideLeft} 15s ease-in-out infinite`
            : `${slideRight} 12s ease-in-out infinite`
        }
      />

      <Box
        position="absolute"
        bottom="-25%"
        right={isLogin ? "-20%" : "20%"}
        width="130%"
        height="70%"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="50% 50% 0 0"
        transform={
          isLogin
            ? "rotate(8deg) scaleY(1)"
            : "rotate(-30deg) scaleY(1.5) translateX(25%) translateY(10%)"
        }
        transition="all 2.8s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${floatRight} 18s ease-in-out infinite`
            : `${floatLeft} 14s ease-in-out infinite`
        }
      />

      <Box
        position="absolute"
        top="35%"
        left={isLogin ? "-10%" : "60%"}
        width="80%"
        height="40%"
        bg="rgba(255, 255, 255, 0.08)"
        borderRadius={isLogin ? "0 90% 90% 0" : "90% 0 0 90%"}
        transform={
          isLogin
            ? "rotate(5deg)"
            : "rotate(-25deg) scaleX(1.4) scaleY(1.2) translateY(-20px)"
        }
        transition="all 2.2s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${waveMotion} 12s ease-in-out infinite`
            : `${waveMotion} 8s ease-in-out infinite`
        }
      />

      {!isLogin && (
        <>
          <Box
            position="absolute"
            top="5%"
            left="65%"
            width="70%"
            height="90%"
            bg="rgba(255, 255, 255, 0.08)"
            borderRadius="0 0 0 100%"
            transform="rotate(-40deg) scaleY(1.8) scaleX(1.3)"
            transition="all 2.5s cubic-bezier(0.4, 0, 0.2, 1)"
            animation={`${waveMotion} 16s ease-in-out infinite reverse`}
          />
          <Box
            position="absolute"
            top="20%"
            right="5%"
            width="50%"
            height="60%"
            bg="rgba(255, 255, 255, 0.05)"
            borderRadius="100% 0 0 0"
            transform="rotate(45deg) scaleX(1.5)"
            transition="all 2s cubic-bezier(0.4, 0, 0.2, 1)"
            animation={`${slideLeft} 14s ease-in-out infinite`}
          />
        </>
      )}

      <Box
        position="absolute"
        top="20%"
        right={isLogin ? "15%" : "75%"}
        width="120px"
        height="120px"
        bg="rgba(255, 255, 255, 0.12)"
        borderRadius="30px"
        transform={
          isLogin
            ? "rotate(45deg) scale(1)"
            : "rotate(-80deg) scale(1.8) translateY(-40px) translateX(-30px)"
        }
        transition="all 2s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${floatLeft} 10s ease-in-out infinite`
            : `${floatRight} 7s ease-in-out infinite`
        }
        _before={{
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          bg: "rgba(255, 255, 255, 0.25)",
          borderRadius: "20px",
        }}
      />

      <Box
        position="absolute"
        bottom="35%"
        left={isLogin ? "10%" : "70%"}
        width="100px"
        height="80px"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="12px"
        transform={
          isLogin
            ? "rotate(15deg) scale(1)"
            : "rotate(-45deg) scale(1.7) translateX(50px) translateY(-25px)"
        }
        transition="all 2.3s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${slideRight} 11s ease-in-out infinite reverse`
            : `${slideLeft} 8s ease-in-out infinite reverse`
        }
        _after={{
          content: '""',
          position: "absolute",
          top: "15%",
          left: "15%",
          width: "70%",
          height: "4px",
          bg: "rgba(255, 255, 255, 0.3)",
          borderRadius: "2px",
          boxShadow:
            "0 15px 0 rgba(255, 255, 255, 0.2), 0 30px 0 rgba(255, 255, 255, 0.15)",
        }}
      />

      <Box
        position="absolute"
        top="60%"
        right={isLogin ? "25%" : "5%"}
        width="90px"
        height="90px"
        bg="rgba(255, 255, 255, 0.08)"
        borderRadius="50%"
        border="4px solid rgba(255, 255, 255, 0.15)"
        transform={
          isLogin
            ? "scale(1)"
            : "scale(2.2) translateY(-60px) translateX(-40px)"
        }
        transition="all 2.1s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${pulseGlow} 8s ease-in-out infinite`
            : `${pulseGlow} 5s ease-in-out infinite`
        }
        _before={{
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "50%",
          bg: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
        }}
      />

      <Box
        position="absolute"
        top="30%"
        left={isLogin ? "75%" : "15%"}
        width="40px"
        height="40px"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="50%"
        transform={
          isLogin
            ? "scale(1)"
            : "scale(2.8) translateY(-45px) translateX(-20px)"
        }
        transition="all 1.8s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${floatRight} 9s ease-in-out infinite`
            : `${floatLeft} 6s ease-in-out infinite`
        }
      />

      <Box
        position="absolute"
        bottom="50%"
        right={isLogin ? "8%" : "85%"}
        width="60px"
        height="60px"
        bg="rgba(255, 255, 255, 0.06)"
        borderRadius="15px"
        transform={
          isLogin
            ? "rotate(0deg)"
            : "rotate(360deg) scale(1.8) translateX(-30px) translateY(20px)"
        }
        transition="all 2.4s cubic-bezier(0.4, 0, 0.2, 1)"
        animation={
          isLogin
            ? `${slideLeft} 13s ease-in-out infinite reverse`
            : `${slideRight} 9s ease-in-out infinite reverse`
        }
      />

      {!isLogin && (
        <>
          <Box
            position="absolute"
            top="12%"
            left="3%"
            width="100px"
            height="100px"
            bg="rgba(255, 255, 255, 0.12)"
            borderRadius="20px"
            transform="rotate(60deg) scale(1.5)"
            animation={`${floatLeft} 10s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            bottom="15%"
            right="8%"
            width="70px"
            height="70px"
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="50%"
            transform="scale(1.8)"
            animation={`${pulseGlow} 4s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            top="45%"
            left="8%"
            width="60px"
            height="60px"
            bg="rgba(255, 255, 255, 0.08)"
            borderRadius="30px"
            transform="rotate(30deg) scale(1.4)"
            animation={`${slideRight} 11s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            top="70%"
            right="15%"
            width="45px"
            height="45px"
            bg="rgba(255, 255, 255, 0.09)"
            borderRadius="50%"
            transform="scale(2)"
            animation={`${floatRight} 8s ease-in-out infinite`}
          />
        </>
      )}

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.04}
        backgroundImage="radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 2px, transparent 0)"
        backgroundSize="60px 60px"
        transform={
          isLogin
            ? "translateX(0px) translateY(0px)"
            : "translateX(80px) translateY(-80px) rotate(25deg) scale(1.1)"
        }
        transition="all 3s cubic-bezier(0.4, 0, 0.2, 1)"
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="radial(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)"
      />
    </Box>
  );
};

export default AnimatedBackground;
