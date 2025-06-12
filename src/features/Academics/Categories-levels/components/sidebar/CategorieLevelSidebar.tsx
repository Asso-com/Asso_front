import { Button } from "@chakra-ui/react"
import RigthSidebar from "@components/shared/RigthSidebar"
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import FormContent from "./FormContent"

import type { FormContentRef } from "./FormContent"
import type { RootState } from "@store/index"
import { useSelector } from "react-redux"
import useCreateCategoriesLevels from "../../hooks/useCreateCategoriesLevels"

const CategorieLevelSidebar = () => {
  const { t } = useTranslation()
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  )
  const { mutateAsync: createCategorieLevel } =
    useCreateCategoriesLevels(associationId)

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleOpenSidebar = () => setSidebarOpen(true)

  const formRef = useRef<FormContentRef>(null)

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm()
    if (values) {
      try {
        createCategorieLevel(values)
        handleCloseSidebar()
      } catch (error) {}
    }
  }

  return (
    <>
      <Button
        size="md"
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
      >
        {t("Add CategorieLevel")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={"Add CategorieLevel"}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            // isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} />
      </RigthSidebar>
    </>
  )
}

export default CategorieLevelSidebar
