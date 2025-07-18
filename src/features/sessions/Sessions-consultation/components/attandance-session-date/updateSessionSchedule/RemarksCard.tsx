import { Card, CardBody, VStack, Text ,FormControl, FormLabel, Textarea, FormErrorMessage} from "@chakra-ui/react";
import type{ FormikProps } from "formik";
import type { UpdateSessionFormData } from "./EditSessionSchedule";

interface RemarksCardProps {
  cardBg: string;
  formik: FormikProps<UpdateSessionFormData>;
}

const RemarksCard: React.FC<RemarksCardProps> = ({ cardBg, formik }) => (

  <Card bg={cardBg} shadow="md" borderRadius="md" flex={1}>
    <CardBody>
      <VStack align="start" spacing={3} h="100%">
        <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
          Session Remarks
        </Text>

        <VStack spacing={3} width="100%" flex={1}>
          <FormControl isInvalid={!!(formik.errors.adminRemark && formik.touched.adminRemark)}>
            <FormLabel fontSize="sm" fontWeight="medium">
              Administration Remark
            </FormLabel>
            <Textarea
              name="adminRemark"
              value={formik.values.adminRemark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter administration remarks..."
              size="sm"
              resize="vertical"
              minH="80px"
              borderColor="blue.200"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
              _hover={{
                borderColor: "blue.300",
              }}
            />
            <FormErrorMessage>
              {formik.touched.adminRemark && formik.errors.adminRemark}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!(formik.errors.profRemark && formik.touched.profRemark)}>
            <FormLabel fontSize="sm" fontWeight="medium">
              Professor Remark
            </FormLabel>
            <Textarea
              name="profRemark"
              value={formik.values.profRemark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter professor remarks..."
              size="sm"
              resize="vertical"
              minH="80px"
              borderColor="green.200"
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px green.500",
              }}
              _hover={{
                borderColor: "green.300",
              }}
            />
            <FormErrorMessage>
              {formik.touched.profRemark && formik.errors.profRemark}
            </FormErrorMessage>
          </FormControl>
        </VStack>
      </VStack>
    </CardBody>
  </Card>
);

export default RemarksCard;