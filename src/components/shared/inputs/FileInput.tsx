import React, {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  useColorModeValue,
  CircularProgress,
} from "@chakra-ui/react";
import { FiUser, FiEdit2 } from "react-icons/fi";

interface FileInputProps {
  name: string;
  label?: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  helperText?: string;
  accept?: string;
  maxSize?: number;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  value = null,
  onChange,
  isDisabled = false,
  isLoading = false,
  isRequired = false,
  isInvalid = false,
  errorMessage,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const dragAcceptBg = useColorModeValue("blue.50", "blue.900");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (value instanceof File) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);
    } else if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith("image/")) {
      if (preview) URL.revokeObjectURL(preview);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange?.(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (preview) URL.revokeObjectURL(preview);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange?.(file);
    }
  };

  const triggerFileInput = () => {
    if (!isDisabled) fileInputRef.current?.click();
  };

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <Flex align="center" gap={4} wrap="wrap">
        <Box
          position="relative"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          cursor={isDisabled ? "not-allowed" : "pointer"}
          borderRadius="full"
          border="2px dashed"
          borderColor={borderColor}
          bg={isDragging ? dragAcceptBg : "transparent"}
          p={1}
          transition="all 0.2s ease"
        >
          {isLoading ? (
            <CircularProgress isIndeterminate size="80px" color="blue.500" />
          ) : (
            <Avatar
              size="xl"
              src={preview ?? undefined}
              icon={<FiUser size="32px" />}
              name="Upload Avatar"
            />
          )}

          {!isDisabled && (
            <IconButton
              icon={<FiEdit2 />}
              aria-label="Edit"
              size="xs"
              position="absolute"
              bottom={1}
              right={1}
              borderRadius="full"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            />
          )}
        </Box>

        <Input
          type="file"
          id={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          display="none"
          disabled={isDisabled}
        />
      </Flex>

      {errorMessage && (
        <FormErrorMessage fontSize="sm" mt={1}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FileInput;
