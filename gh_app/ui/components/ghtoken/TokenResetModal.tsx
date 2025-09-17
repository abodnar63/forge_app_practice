import { 
    ModalTitle,
    ModalTransition,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    
} from "@forge/react"

import React from "react"

type TokenResetModalProps = {
    close: (e: any) => void,
    confirm: (e: any) => void
 }

export const TokenResetModal: React.FC<TokenResetModalProps> = ({close, confirm}) => {
    return (
        <ModalTransition>
            <Modal onClose={close}>
                <ModalHeader>
                <ModalTitle appearance="warning">
                    Reset Token
                </ModalTitle>
                </ModalHeader>
                <ModalBody>
                This action will permanently remove your current GH token from the application,
                This can't be undone.
                </ModalBody>
                <ModalFooter>
                <Button appearance="subtle" onClick={close}>
                    Cancel
                </Button>
                <Button appearance="warning" onClick={confirm}>
                    Reset
                </Button>
                </ModalFooter>
            </Modal>
        </ModalTransition>
    )
}