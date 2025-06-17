// Fixed SubjectLevelAccordion.tsx
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
import { MdEdit } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { useState } from 'react'
import { BaseCard }  from '@components/shared/Cards/BaseCard'
import { BaseHeader } from '@components/shared/Cards/BaseHeader'
import EditSubjectLevel from './EditSubjectLevel'
import GenericModal from "@components/ui/GenericModal"
import useDeleteSubjectLevel from "../../hooks/useDeleteSubjectLevel"
import type { LevelWithSubjects, Subject } from '../../types/subject.types'

interface Props {
  levels: LevelWithSubjects[]
  filterText?: string
  associationId: number 
}

export const SubjectLevelAccordion = ({ levels, associationId }: Props) => {
  const bgExpanded = useColorModeValue('blue.50', 'blue.900')
  const bgHover = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<{
    levelId: number
    subjectIds: number[]
    levelName?: string
    subjects?: Array<{ id: number; name: string }>
  } | null>(null)

  const isValidAssociationId = associationId !== undefined && 
    associationId !== null && !isNaN(associationId)

  const { mutate: deleteSubject } = useDeleteSubjectLevel(
    isValidAssociationId ? associationId : 0
  )
  
  const handleEditLevel = (levelId: number, currentSubjects: any[], levelName?: string) => {
    const subjectIds = currentSubjects.map(subject => subject.id)
    
    setSelectedLevel({
      levelId,
      subjectIds,
      levelName,
      subjects: currentSubjects
    })
    setEditModalOpen(true)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
    if (!editModalOpen) {
      setSelectedLevel(null)
    }
  }

  const handleDeleteSubject = async (subjectId: number, levelId?: number) => {
    if (!levelId) return
    
    const level = levels.find(l => l.level.id === levelId)
    const subject = level?.subjects.find(s => s.id === subjectId)
    
    if (!subject) return

    deleteSubject({
      levelId,
      subjectId,
      subjectName: subject.name,
    })
  }

  const createSubjectCard = (subject: Subject, levelId: number) => {
    return (
      <BaseCard
        key={subject.id}
        item={subject}
        deleteConfig={{
          onDelete: (subjectId) => handleDeleteSubject(subjectId, levelId),
          deleteTitle: "Delete subject",
          deleteMessage: (name: string) => `Are you sure you want to remove "${name}" from this level?`,
          confirmText: "Yes, delete",
          cancelText: "Cancel",
          canDelete: isValidAssociationId,
        }}
        cardConfig={{
          color: "blue",
          showCode: true,
          onClick: (item) => console.log("Card clicked:", item.name),
        }}
      />
    )
  }

  return (
    <Container maxW="full" p={0}>
      <VStack spacing={4} align="stretch">
        <Accordion 
          allowMultiple 
          defaultIndex={[0]}
        >
          {levels.map((level, index) => {
            // REMOVED: The duplicate filtering logic that was causing the issue
            // const filteredSubjects = level.subjects.filter(subject =>
            //   subject.name.toLowerCase().includes(filterText.toLowerCase())
            // )
            
            // Now we just use the subjects that were already filtered in the presenter
            const filteredSubjects = level.subjects

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
                mb={4}
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
                        py={4}
                        px={4}
                        transition="all 0.2s"
                      >
                        <Flex w="full" align="center">
                          <BaseHeader 
                            title={level.level.name}
                            icon={FaGraduationCap}
                            size="sm"
                          />

                          <Box
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditLevel(level.level.id, level.subjects, level.level.name)
                            }}
                            title="Modifier le niveau"
                            cursor="pointer"
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                            p={2}
                            borderRadius="md"
                          >
                            <Icon as={MdEdit} boxSize={4} color="gray.500" />
                          </Box>

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
                      <SimpleGrid 
                        columns={{ base: 1, md: 2, lg: 4, xl: 5 }} 
                        spacing={4}
                        w="full"
                      >
                        {filteredSubjects.map(subject => 
                          createSubjectCard(subject, level.level.id)
                        )}
                      </SimpleGrid>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </VStack>

      {/* Edit Subject Level Modal */}
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Subject Level"
        size="lg"
      >
        {selectedLevel && (
          <EditSubjectLevel 
            details={{
              levelId: selectedLevel.levelId,
              subjectIds: selectedLevel.subjectIds,
              levelName: selectedLevel.levelName,
              subjects: selectedLevel.subjects
            }}
            onClose={toggleEditModal} 
          />
        )}
      </GenericModal>
    </Container>
  )
}