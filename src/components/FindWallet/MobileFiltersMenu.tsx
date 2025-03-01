import { useTranslation } from "next-i18next"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

import walletData from "@/data/wallets/wallet-data"

import OldHeading from "../OldHeading"

import { MobileFiltersButton } from "./MobileFiltersButton"
import { ResetFiltersButton } from "./ResetFiltersButton"
import WalletFilterPersona from "./WalletFilterPersona"
import WalletFilterSidebar, {
  WalletFilterSidebarProps,
} from "./WalletFilterSidebar"

import { useWalletTable } from "@/hooks/useWalletTable"

type MobileFiltersMenuProps = WalletFilterSidebarProps & {
  showMobileSidebar: boolean
  onOpen: () => void
  onClose: () => void
}

export const MobileFiltersMenu = ({
  filters,
  resetWalletFilter,
  resetFilters,
  updateFilterOption,
  updateFilterOptions,
  selectedPersona,
  setFilters,
  setSelectedPersona,
  showMobileSidebar,
  onOpen,
  onClose,
}: MobileFiltersMenuProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { filteredWallets } = useWalletTable({ filters, t, walletData })

  return (
    <>
      <MobileFiltersButton
        filters={filters}
        showMobileSidebar={showMobileSidebar}
        onOpen={onOpen}
        onClose={onClose}
      />

      <Drawer
        isOpen={showMobileSidebar}
        placement="start"
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent bg="background.base">
          <DrawerHeader mb={4}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody position="relative" p={3}>
            {/* Wallet Personas */}
            <Box px={{ base: showMobileSidebar ? 0 : 4, "2xl": 0 }}>
              <OldHeading
                as="h3"
                fontSize={showMobileSidebar ? "lg" : "xl"}
                fontWeight="bold"
                lineHeight={1.4}
                mt={0}
                mb={2}
              >
                {t("page-find-wallet-personas-title")}
              </OldHeading>

              <WalletFilterPersona
                resetFilters={resetFilters}
                setFilters={setFilters}
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
                showMobileSidebar={showMobileSidebar}
              />
            </Box>

            <WalletFilterSidebar
              overflow="auto"
              {...{
                filters,
                resetWalletFilter,
                updateFilterOption,
                updateFilterOptions,
                resetFilters,
                selectedPersona,
                setFilters,
                setSelectedPersona,
                showMobileSidebar,
              }}
            />

            <Flex
              justifyContent="space-between"
              alignItems="center"
              position="fixed"
              bottom={0}
              left={0}
              w="100%"
              h="85px"
              px={9}
              py={5}
              bg="background.base"
              zIndex={3}
            >
              <Box flex={1} me={2}>
                <ResetFiltersButton
                  resetFilters={resetFilters}
                  resetWalletFilter={resetWalletFilter}
                />
              </Box>

              <Button w="100%" flex={1} onClick={onClose}>
                {t("page-find-wallet-see-wallets")}{" "}
                {`(${filteredWallets.length})`}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
