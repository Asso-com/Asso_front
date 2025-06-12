import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Icon,
  SimpleGrid,
  Container,
  useColorModeValue,
  Flex,
  VStack,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { SubjectCard } from './SubjectCard'
import { FaEdit } from 'react-icons/fa'
import { LevelHeader } from './LevelHeader'
import type { LevelWithSubjects } from '../../types/subject.types'

interface Props {
  levels: LevelWithSubjects[]
  filterText?: string
}

export const SubjectLevelAccordion = ({ levels, filterText = '' }: Props) => {
  const bgExpanded = useColorModeValue('blue.50', 'blue.900')
  const bgHover = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="full" p={0}>
      {/* Use VStack to handle spacing between accordion items */}
      <VStack spacing={4} align="stretch">
        <Accordion 
          allowMultiple 
          defaultIndex={[0]}
        >
          {levels.map((level, index) => {
            const filteredSubjects = level.subjects.filter(subject =>
              subject.name.toLowerCase().includes(filterText.toLowerCase())
            )

            if (filteredSubjects.length === 0) return null

            return (
              <AccordionItem 
                key={index}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                overflow="hidden"
                shadow="sm"
                _hover={{ shadow: 'md' }}
                transition="all 0.2s"
                mb={4} // Add margin bottom for spacing
              >
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton
                        _expanded={{ 
                          bg: bgExpanded,
                          borderBottomWidth: '1px',
                          borderBottomColor: borderColor
                        }}
                        _hover={{ bg: bgHover }}
                        p={6}
                        transition="all 0.2s"
                      >
                        <Flex w="full" align="center">
                          {/* Partie gauche : Icône + Titre */}
                          <Flex align="center" gap={4} flex="1">
                            <LevelHeader level={level.level} />
                          </Flex>

                          {/* Bouton Éditer */}
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Éditer niveau', level.level.id);
                            }}
                            title="Modifier le niveau"
                            cursor="pointer"
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                            p={2}
                            borderRadius="md"
                          >
                            <Icon as={FaEdit} boxSize={4} color="gray.500" />
                          </Box>

                          {/* Chevron */}
                          <Icon 
                            as={isExpanded ? ChevronUpIcon : ChevronDownIcon} 
                            boxSize={5}
                            color={isExpanded ? 'blue.500' : 'gray.400'}
                            transition="all 0.2s"
                            _hover={{ color: 'blue.500' }}
                            ml={2}
                          />
                        </Flex>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={6} pt={4} px={6}>
                      {/* Grid layout for better card organization */}
                      <SimpleGrid 
                        columns={{ base: 1, md: 2, lg: 3, xl: 4 }} 
                        spacing={{ base: 4, md: 6 }}
                        w="full"
                      >
                        {filteredSubjects.map(subject => (
                          <SubjectCard 
                            key={subject.id} 
                            subject={subject}
                            color="blue" // or determine color based on level/subject
                            SubjectLevelId={subject.id} // or the appropriate ID
                          />
                        ))}
                      </SimpleGrid>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </VStack>
    </Container>
  )
}